import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

// Utilizamos la ruta genérica de nuestro servidor para apuntar a la API de subida
// Esto funcionará asumiendo que el servidor corre en el mismo dominio o tenemos el proxy configurado
export const UploadButton = generateUploadButton({
  url: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/uploadthing` : '/api/uploadthing'
});

export const UploadDropzone = generateUploadDropzone({
  url: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/uploadthing` : '/api/uploadthing'
});
