import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

const baseURL = import.meta.env.VITE_API_URL || '/api';

export const UploadButton = generateUploadButton({
  url: `${baseURL}/uploadthing`
});

export const UploadDropzone = generateUploadDropzone({
  url: `${baseURL}/uploadthing`
});
