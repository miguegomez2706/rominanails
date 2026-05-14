import Service from '../models/Service.js';

// GET /api/services
export const getServices = async (req, res, next) => {
  try {
    const { category, active } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (active !== undefined) filter.isActive = active === 'true';
    else filter.isActive = true;

    const services = await Service.find(filter).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// GET /api/services/:id
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(service);
  } catch (error) {
    next(error);
  }
};

// POST /api/services
export const createService = async (req, res, next) => {
  try {
    const serviceData = { ...req.body };
    if (req.file) {
      serviceData.image = `/uploads/${req.file.filename}`;
    }
    const service = await Service.create(serviceData);
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

// PUT /api/services/:id
export const updateService = async (req, res, next) => {
  try {
    const serviceData = { ...req.body };
    if (req.file) {
      serviceData.image = `/uploads/${req.file.filename}`;
    }
    const service = await Service.findByIdAndUpdate(req.params.id, serviceData, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(service);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/services/:id
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
