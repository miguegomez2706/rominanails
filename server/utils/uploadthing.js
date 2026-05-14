import { createUploadthing } from "uploadthing/express";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

// Creamos un File Router que se encarga de manejar la subida
export const uploadRouter = {
  // Define tantas rutas de subida como necesites
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    // Middleware que se ejecuta en el servidor antes de la subida
    .middleware(async ({ req, res }) => {
      // Podrías validar el usuario aquí si lo deseas
      // Por ejemplo, verificando req.headers.authorization
      return { };
    })
    // Qué sucede cuando termina la subida
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file.url);
      return { fileUrl: file.url, fileKey: file.key };
    }),
};

// UTApi nos permite interactuar con UploadThing desde el backend (por ejemplo, para borrar archivos)
export const utapi = new UTApi();
