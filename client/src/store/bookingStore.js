import { create } from 'zustand';

const useBookingStore = create((set) => ({
  step: 1,
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
  clientData: { name: '', phone: '', email: '', notes: '' },

  setStep: (step) => set({ step }),
  toggleService: (service) => set((state) => {
    const isSelected = state.selectedServices.some(s => s._id === service._id);
    if (isSelected) {
      return { selectedServices: state.selectedServices.filter(s => s._id !== service._id) };
    } else {
      return { selectedServices: [...state.selectedServices, service] };
    }
  }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setClientData: (data) => set({ clientData: data }),

  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 6) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  reset: () => set({
    step: 1,
    selectedServices: [],
    selectedDate: null,
    selectedTime: null,
    clientData: { name: '', phone: '', email: '', notes: '' },
  }),
}));

export default useBookingStore;
