import { v2 as cloudinary } from "cloudinary";
import { CloudStorage } from 'multer-storage-cloudinary';
import multer from "multer";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudStorage({
    cloudinary,
    params : {
        folder:'fundo/events',
        allowed_formats:['jpg','jpeg','png','webp'],
    },
});

export const upload = multer({storage});