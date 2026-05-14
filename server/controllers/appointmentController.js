import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import BusinessInfo from '../models/BusinessInfo.js';

// GET /api/appointments
export const getAppointments = async (req, res, next) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (date) {
      const targetDate = new Date(date);
      const start = new Date(targetDate);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(targetDate);
      end.setUTCHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }
    const appointments = await Appointment.find(filter)
      .populate('services', 'title category price duration')
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// GET /api/appointments/available?date=YYYY-MM-DD&serviceId=xxx
export const getAvailableSlots = async (req, res, next) => {
  try {
    const { date, serviceIds } = req.query;
    if (!date || !serviceIds) {
      return res.status(400).json({ message: 'Fecha y servicios son obligatorios' });
    }

    const ids = serviceIds.split(',');
    const services = await Service.find({ _id: { $in: ids } });
    if (!services.length) return res.status(404).json({ message: 'Servicios no encontrados' });

    const totalDuration = services.reduce((acc, curr) => acc + curr.duration, 0);

    // Get business hours
    let business = await BusinessInfo.findOne();
    if (!business) business = await BusinessInfo.create({});

    const dayOfWeek = new Date(date + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long' }).toLowerCase();
    const hours = business.openingHours?.get(dayOfWeek) || business.openingHours?.get(dayOfWeek.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));

    if (!hours || hours.toLowerCase() === 'cerrado') {
      return res.json({ slots: [], message: 'Día no laboral' });
    }

    const [openTime, closeTime] = hours.split('-');
    const [openH, openM] = openTime.split(':').map(Number);
    const [closeH, closeM] = closeTime.split(':').map(Number);

    // Generate slots every 30 minutes
    const slots = [];
    let currentH = openH;
    let currentM = openM;

    while (currentH < closeH || (currentH === closeH && currentM < closeM)) {
      const endH = currentH + Math.floor((currentM + totalDuration) / 60);
      const endM = (currentM + totalDuration) % 60;

      // Only add if service fits before closing
      if (endH < closeH || (endH === closeH && endM <= closeM)) {
        slots.push(`${String(currentH).padStart(2, '0')}:${String(currentM).padStart(2, '0')}`);
      }

      currentM += 30;
      if (currentM >= 60) {
        currentH += 1;
        currentM -= 60;
      }
    }

    // Get booked appointments for this date
    const targetDate = new Date(date);
    const start = new Date(targetDate);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(targetDate);
    end.setUTCHours(23, 59, 59, 999);
    
    const booked = await Appointment.find({
      date: { $gte: start, $lte: end },
      status: { $in: ['pendiente', 'confirmado'] },
    });

    // Filter out occupied slots
    const bookedTimes = new Set();
    booked.forEach((apt) => {
      const [h, m] = apt.time.split(':').map(Number);
      const dur = apt.duration || 60;
      for (let i = 0; i < dur; i += 30) {
        const slotH = h + Math.floor((m + i) / 60);
        const slotM = (m + i) % 60;
        bookedTimes.add(`${String(slotH).padStart(2, '0')}:${String(slotM).padStart(2, '0')}`);
      }
    });

    const available = slots.filter((slot) => !bookedTimes.has(slot));

    // Filter out slots that are less than 8 hours from now
    const eightHoursFromNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
    const finalAvailable = available.filter((slot) => {
      const slotDate = new Date(date + 'T' + slot);
      return slotDate >= eightHoursFromNow;
    });

    res.json({ slots: finalAvailable, serviceDuration: totalDuration });
  } catch (error) {
    next(error);
  }
};

// POST /api/appointments
export const createAppointment = async (req, res, next) => {
  try {
    const { clientName, phone, email, services: serviceIds, date, time, notes } = req.body;

    // Validate date is not in the past or within 8 hours
    const appointmentDate = new Date(date + 'T' + time);
    const eightHoursFromNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
    
    if (appointmentDate < new Date()) {
      return res.status(400).json({ message: 'No se pueden reservar fechas pasadas' });
    }
    if (appointmentDate < eightHoursFromNow) {
      return res.status(400).json({ message: 'Las reservas deben hacerse con al menos 8 horas de anticipación' });
    }

    const selectedServices = await Service.find({ _id: { $in: serviceIds } });
    if (!selectedServices.length) return res.status(404).json({ message: 'Servicios no encontrados' });

    const totalPrice = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
    const totalDuration = selectedServices.reduce((acc, curr) => acc + curr.duration, 0);

    // Check if slot is available
    const targetDate = new Date(date);
    const start = new Date(targetDate);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(targetDate);
    end.setUTCHours(23, 59, 59, 999);
    
    const existing = await Appointment.findOne({
      date: { $gte: start, $lte: end },
      time,
      status: { $in: ['pendiente', 'confirmado'] },
    });

    if (existing) {
      return res.status(400).json({ message: 'Ese horario ya está ocupado' });
    }

    const appointment = await Appointment.create({
      clientName,
      phone,
      email,
      services: serviceIds,
      date: new Date(date),
      time,
      notes,
      totalPrice,
      duration: totalDuration,
    });

    const populated = await appointment.populate('services', 'title category price duration');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

// PUT /api/appointments/:id
export const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('services', 'title category price duration');

    if (!appointment) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/appointments/:id
export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

// GET /api/appointments/stats
export const getStats = async (req, res, next) => {
  try {
    const today = new Date();
    // Normalize today to UTC midnight to match stored dates
    const localDateString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    const startOfToday = new Date(localDateString);
    
    const endOfToday = new Date(startOfToday);
    endOfToday.setUTCHours(23, 59, 59, 999);

    const startOfWeek = new Date(startOfToday);
    startOfWeek.setUTCDate(startOfToday.getUTCDate() - startOfToday.getDay());

    const startOfMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));

    const [todayCount, weekCount, monthCount, totalRevenue, byStatus, popular] = await Promise.all([
      Appointment.countDocuments({ date: { $gte: startOfToday, $lte: endOfToday } }),
      Appointment.countDocuments({ date: { $gte: startOfWeek } }),
      Appointment.countDocuments({ date: { $gte: startOfMonth } }),
      Appointment.aggregate([
        { $match: { status: { $in: ['confirmado', 'completado'] }, date: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),
      Appointment.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Appointment.aggregate([
        { $unwind: '$services' },
        { $group: { _id: '$services', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
        { $lookup: { from: 'services', localField: '_id', foreignField: '_id', as: 'service' } },
        { $unwind: '$service' },
      ]),
    ]);

    res.json({
      today: todayCount,
      week: weekCount,
      month: monthCount,
      revenue: totalRevenue[0]?.total || 0,
      byStatus,
      popular,
    });
  } catch (error) {
    next(error);
  }
};
