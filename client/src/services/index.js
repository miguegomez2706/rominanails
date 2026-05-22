import api from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
};

export const servicesService = {
  getAll: (params) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

export const appointmentService = {
  getAll: (params) => api.get('/appointments', { params }),
  getAvailable: (params) => api.get('/appointments/available', { params }),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
  getStats: () => api.get('/appointments/stats'),
};

export const galleryService = {
  getAll: (params) => api.get('/gallery', { params }),
  upload: (data) => api.post('/gallery', data),
  delete: (id) => api.delete(`/gallery/${id}`),
};

export const promotionService = {
  getAll: () => api.get('/promotions'),
  create: (data) => api.post('/promotions', data),
  update: (id, data) => api.put(`/promotions/${id}`, data),
  delete: (id) => api.delete(`/promotions/${id}`),
};

export const businessService = {
  get: () => api.get('/business'),
  update: (data) => api.put('/business', data),
};

export const instagramService = {
  getFeed: () => api.get('/instagram'),
};
