# 💅 RominaNails

Plataforma web premium para gestión de turnos y servicios del salón de uñas **RominaNails**.

---

## 🛠️ Stack Tecnológico

| Frontend | Backend |
|---|---|
| React 19 + Vite | Node.js + Express |
| TailwindCSS 3 | MongoDB + Mongoose |
| Framer Motion | JWT Auth |
| Zustand | Multer (uploads) |
| React Router DOM | bcryptjs |
| Swiper, Axios, react-datepicker | dotenv, cors |

---

## 📁 Estructura del Proyecto

```
RominaNails/
├── client/                 # Frontend (React + Vite)
│   ├── public/             # Assets estáticos
│   │   └── images/         # Hero, logo, galería
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   │   ├── layout/     # Navbar, Footer, PageWrapper
│   │   │   └── ui/         # Button, Input, Modal, Badge, Skeleton
│   │   ├── pages/          # Páginas públicas
│   │   │   └── admin/      # Panel de administración
│   │   ├── services/       # Capa API (Axios)
│   │   └── store/          # Estado global (Zustand)
│   ├── .env.example        # Variables de entorno del cliente
│   ├── vercel.json         # Config para deploy en Vercel
│   └── vite.config.js
│
├── server/                 # Backend (Node.js + Express)
│   ├── config/             # Conexión a MongoDB
│   ├── controllers/        # Lógica de negocio
│   ├── middleware/          # Auth, upload, error handler
│   ├── models/             # Modelos Mongoose
│   ├── routes/             # Rutas API REST
│   ├── uploads/            # Imágenes subidas (no se sube a git)
│   ├── utils/              # Scripts (seedAdmin)
│   ├── .env.example        # Variables de entorno del servidor
│   └── server.js           # Entry point
│
├── .gitignore
└── README.md
```

---

## ⚡ Instalación Local

### Requisitos
- **Node.js** v18+
- **MongoDB** (local o [MongoDB Atlas](https://www.mongodb.com/atlas))

### Paso 1 — Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/rominanails.git
cd rominanails
```

### Paso 2 — Configurar el backend

```bash
cd server
npm install
cp .env.example .env
# Editar .env con tus datos (MongoDB URI, JWT secret, etc.)
```

### Paso 3 — Crear usuario admin

```bash
npm run seed
```
> Esto crea el admin con: `admin@rominanails.com` / `admin123`

### Paso 4 — Configurar el frontend

```bash
cd ../client
npm install
# En desarrollo NO necesitás .env (el proxy de Vite maneja todo)
```

### Paso 5 — Ejecutar

Abrir **2 terminales**:

```bash
# Terminal 1 — Backend
cd server
npm run dev
# ➜ http://localhost:5000

# Terminal 2 — Frontend
cd client
npm run dev
# ➜ http://localhost:5173
```

---

## 🌐 Deploy a Producción

### Frontend → Vercel

1. Ir a [vercel.com](https://vercel.com) y conectar tu repo
2. Configurar:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Agregar variable de entorno:
   - `VITE_API_URL` = `https://tu-backend.onrender.com/api`
4. Deploy 🚀

### Backend → Render

1. Ir a [render.com](https://render.com) y crear un **Web Service**
2. Conectar tu repo y configurar:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. Agregar variables de entorno:
   - `PORT` = `5000`
   - `MONGODB_URI` = tu URI de MongoDB Atlas
   - `JWT_SECRET` = una clave secreta segura
   - `NODE_ENV` = `production`
   - `CLIENT_URL` = `https://tu-frontend.vercel.app`
4. Deploy 🚀

### Base de datos → MongoDB Atlas

1. Crear cuenta en [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Crear un cluster gratuito (M0)
3. Copiar la connection string
4. Pegarla en la variable `MONGODB_URI` de Render
5. ¡No olvidar agregar `0.0.0.0/0` en Network Access!

---

## 📋 Variables de Entorno

### Backend (`server/.env`)

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PORT` | Puerto del servidor | `5000` |
| `MONGODB_URI` | URI de MongoDB | `mongodb+srv://...` |
| `JWT_SECRET` | Clave secreta para JWT | `mi_clave_super_secreta` |
| `NODE_ENV` | Entorno | `development` o `production` |
| `CLIENT_URL` | URL del frontend (CORS) | `https://tu-app.vercel.app` |

### Frontend (`client/.env`)

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL completa de la API | `https://tu-backend.onrender.com/api` |

> ⚠️ En desarrollo local NO necesitás crear `.env` en el cliente. El proxy de Vite redirige `/api` a `localhost:5000`.

---

## ✨ Funcionalidades

### Sitio Público
- 🏠 Homepage con hero carousel, servicios, combos, testimonios y FAQ
- 💅 Catálogo de servicios con filtros
- 🖼️ Galería de trabajos
- 🏷️ Promociones y combos
- 📅 Reserva online en 5 pasos
- 📞 Contacto (WhatsApp, Instagram, ubicación)
- ℹ️ Nosotros con mapa de Google

### Panel Admin (`/admin`)
- 📊 Dashboard con estadísticas
- 💅 CRUD de servicios
- 📅 Gestión de reservas
- 🖼️ Gestión de galería
- 🏷️ CRUD de promociones
- ⚙️ Configuración del negocio

---

## 🔐 Credenciales Admin (desarrollo)

```
Email:    admin@rominanails.com
Password: admin123
```

> ⚠️ **Cambiar estas credenciales antes de ir a producción.**

---

## 📝 Scripts Disponibles

### Backend (`server/`)
| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor en modo desarrollo (nodemon) |
| `npm start` | Servidor en producción |
| `npm run seed` | Crear usuario admin |

### Frontend (`client/`)
| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo Vite |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run lint` | Linter ESLint |
