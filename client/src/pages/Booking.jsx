import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import PageWrapper, { SectionHeader } from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useBookingStore from '../store/bookingStore';
import { servicesService, appointmentService, businessService } from '../services';

registerLocale('es', es);

const steps = ['Servicio', 'Fecha', 'Horario', 'Datos', 'Resumen'];

export default function Booking() {
  const { step, selectedServices, selectedDate, selectedTime, clientData, toggleService, setSelectedDate, setSelectedTime, setClientData, setStep, reset } = useBookingStore();

  const [services, setServices] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    servicesService.getAll({ active: true }).then(res => setServices(res.data)).catch(() => {});
    businessService.get().then(res => setBusinessInfo(res.data)).catch(() => {});
    return () => reset();
  }, [reset]);

  useEffect(() => {
    let isMounted = true;
    if (selectedDate && selectedServices.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      const serviceIds = selectedServices.map(s => s._id).join(',');
      appointmentService.getAvailable({ date: selectedDate, serviceIds })
        .then(res => {
          if (isMounted) setAvailableSlots(res.data.slots);
        })
        .catch(() => {
          if (isMounted) setAvailableSlots([]);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => { isMounted = false; };
  }, [selectedDate, selectedServices]);

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      await appointmentService.create({
        clientName: clientData.name,
        phone: clientData.phone,
        email: clientData.email,
        services: selectedServices.map(s => s._id),
        date: selectedDate,
        time: selectedTime,
        notes: clientData.notes,
      });
      setConfirmed(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la reserva');
    } finally {
      setLoading(false);
    }
  };

  const isDaySelectable = (date) => {
    if (!businessInfo) return true;
    const dayIndex = date.getDay(); 
    const daysMap = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const dayName = daysMap[dayIndex];
    const hours = businessInfo?.openingHours?.[dayName];
    
    if (!hours || hours === 'Cerrado') return false;

    // Verificar si la fecha es hoy
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      const [, closeTime] = hours.split('-');
      if (closeTime) {
        const [closeH, closeM] = closeTime.split(':').map(Number);
        const closingTimeToday = new Date();
        closingTimeToday.setHours(closeH, closeM, 0, 0);
        
        const eightHoursFromNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
        
        // Si 8 horas desde ahora supera el horario de cierre de hoy, deshabilitar hoy
        if (eightHoursFromNow > closingTimeToday) {
          return false;
        }
      }
    }

    return true;
  };

  const handleDateSelect = (date) => {
    if (date) {
      // Formatear a YYYY-MM-DD
      const dateStr = date.toISOString().split('T')[0];
      setSelectedDate(dateStr);
      setStep(3);
    } else {
      setSelectedDate('');
    }
  };

  if (confirmed) {
    return (
      <PageWrapper>
        <section className="py-24 min-h-screen flex items-center">
          <div className="max-w-lg mx-auto px-4 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">¡Turno reservado!</h2>
              <p className="text-gray-500 mb-2">Tu reserva fue registrada exitosamente.</p>
              <div className="bg-gray-50 rounded-2xl p-6 mt-6 text-left space-y-2">
                <p><span className="font-semibold">Servicios:</span> {selectedServices.map(s => s.title).join(' + ')}</p>
                <p><span className="font-semibold">Fecha:</span> {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                <p><span className="font-semibold">Hora:</span> {selectedTime} hs</p>
                <p><span className="font-semibold">Nombre:</span> {clientData.name}</p>
              </div>
              <Button onClick={() => { reset(); setConfirmed(false); }} className="mt-8">Reservar otro turno</Button>
            </motion.div>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="pt-20 pb-24 bg-[#fdfbfb] relative overflow-hidden min-h-screen">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-100/40 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-100/40 to-transparent rounded-full blur-[80px] pointer-events-none translate-y-1/4 -translate-x-1/4"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader subtitle="Reservar turno" title="Agendá tu visita" description="Seguí los pasos para reservar tu turno en RominaNails y disfrutar de una experiencia única." />

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > i + 1 ? 'bg-pink-400 text-white' : step === i + 1 ? 'bg-pink-400 text-white ring-4 ring-pink-100' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-pink-400' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12 relative">

            {/* Step 1: Service */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Elegí un servicio</h3>
                <div className="grid gap-3">
                  {services.map(service => {
                    const isSelected = selectedServices.some(s => s._id === service._id);
                    return (
                    <button key={service._id} onClick={() => toggleService(service)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected ? 'border-pink-400 bg-pink-50' : 'border-gray-100 hover:border-pink-200 hover:bg-pink-50/50'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{service.title}</p>
                        <p className="text-sm text-gray-500">{service.category} · {service.duration} min</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-pink-500 text-lg">${service.price.toLocaleString()}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-pink-400 bg-pink-400 text-white' : 'border-gray-300'}`}>
                          {isSelected && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                      </div>
                    </button>
                    )
                  })}
                </div>
                {selectedServices.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">{selectedServices.length} {selectedServices.length === 1 ? 'servicio' : 'servicios'}</p>
                      <p className="font-bold text-pink-500 text-xl">${selectedServices.reduce((a, b) => a + b.price, 0).toLocaleString()}</p>
                    </div>
                    <Button onClick={() => setStep(2)}>Continuar →</Button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 2: Date */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Elegí una fecha</h3>
                <DatePicker
                  selected={selectedDate ? new Date(selectedDate + 'T12:00:00') : null}
                  onChange={handleDateSelect}
                  minDate={new Date()}
                  filterDate={isDaySelectable}
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Seleccionar día..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none text-gray-800 text-lg transition-all"
                  wrapperClassName="w-full"
                />
                <div className="flex gap-3 mt-6">
                  <Button variant="ghost" onClick={() => setStep(1)}>← Atrás</Button>
                </div>
              </div>
            )}

            {/* Step 3: Time */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Elegí un horario</h3>
                {loading ? (
                  <div className="grid grid-cols-3 gap-3">{Array.from({length: 6}).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}</div>
                ) : availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.map(slot => (
                      <button key={slot} onClick={() => { setSelectedTime(slot); setStep(4); }}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          selectedTime === slot ? 'bg-pink-400 text-white shadow-lg shadow-pink-400/30' : 'bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-500 border border-gray-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-8">No hay horarios disponibles para esta fecha</p>
                )}
                <div className="flex gap-3 mt-6">
                  <Button variant="ghost" onClick={() => setStep(2)}>← Atrás</Button>
                </div>
              </div>
            )}

            {/* Step 4: Client Data */}
            {step === 4 && (
              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Tus datos</h3>
                <div className="space-y-4">
                  <Input label="Nombre completo" name="name" required value={clientData.name} onChange={e => setClientData({ ...clientData, name: e.target.value })} placeholder="Ej: María García" />
                  <Input label="Teléfono" name="phone" type="tel" required value={clientData.phone} onChange={e => setClientData({ ...clientData, phone: e.target.value })} placeholder="Ej: 11 2345-6789" />
                  <Input label="Email (opcional)" name="email" type="email" value={clientData.email} onChange={e => setClientData({ ...clientData, email: e.target.value })} placeholder="Ej: maria@email.com" />
                  <Input label="Notas (opcional)" name="notes" type="textarea" value={clientData.notes} onChange={e => setClientData({ ...clientData, notes: e.target.value })} placeholder="Algún pedido especial..." />
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="ghost" onClick={() => setStep(3)}>← Atrás</Button>
                  <Button onClick={() => { if (clientData.name && clientData.phone) setStep(5); }} disabled={!clientData.name || !clientData.phone}>Continuar →</Button>
                </div>
              </div>
            )}

            {/* Step 5: Summary */}
            {step === 5 && (
              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Resumen de tu turno</h3>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4 mb-6">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Servicios</span>
                    <div className="text-right font-semibold">
                      {selectedServices.map(s => <div key={s._id}>{s.title}</div>)}
                    </div>
                  </div>
                  <div className="flex justify-between"><span className="text-gray-500">Duración total</span><span>{selectedServices.reduce((a, b) => a + b.duration, 0)} minutos</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Fecha</span><span className="font-semibold">{new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Horario</span><span className="font-semibold">{selectedTime} hs</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Nombre</span><span>{clientData.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Teléfono</span><span>{clientData.phone}</span></div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg"><span className="font-semibold text-gray-800">Total</span><span className="font-bold text-pink-500">${selectedServices.reduce((a, b) => a + b.price, 0).toLocaleString()}</span></div>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(4)}>← Atrás</Button>
                  <Button onClick={handleConfirm} loading={loading} className="flex-1">Confirmar Reserva ✨</Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
