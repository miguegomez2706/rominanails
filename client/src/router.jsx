import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import Promotions from './pages/Promotions';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminGallery from './pages/admin/AdminGallery';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminPromotions from './pages/admin/AdminPromotions';
import AdminBusiness from './pages/admin/AdminBusiness';
import AdminLayout from './pages/admin/AdminLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'servicios', element: <Services /> },
      { path: 'galeria', element: <Gallery /> },
      { path: 'reservar', element: <Booking /> },
      { path: 'nosotros', element: <About /> },
      { path: 'contacto', element: <Contact /> },
      { path: 'promociones', element: <Promotions /> },
    ],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'servicios', element: <AdminServices /> },
      { path: 'galeria', element: <AdminGallery /> },
      { path: 'reservas', element: <AdminAppointments /> },
      { path: 'promociones', element: <AdminPromotions /> },
      { path: 'negocio', element: <AdminBusiness /> },
    ],
  },
]);

export default router;
