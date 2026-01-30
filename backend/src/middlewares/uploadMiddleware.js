import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ✅ recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPth = path.join(__dirname, `../public/uploads/${req.user._id}`);
        fs.mkdirSync(uploadPth, {recursive: true});
        cb(null, uploadPth);
    }, 
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName+path.extname(file.originalname));
    },
    

    
});


export const upload = multer({
    storage});