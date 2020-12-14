import express, { Request, Response } from 'express';
import { addFood, getFoods, getVandorProfile, getVandorService, updateVandorCoverImage, updateVandorProfile, vandorLogin } from '../controllers';
import { Authenticate } from '../middlewares';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'src/images')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+'_'+file.originalname)
    }
});

const images = multer({storage: imageStorage}).array('images', 10);

router.post('/login', vandorLogin);

// Authenticate
router.use(Authenticate);

router.get('/profile', getVandorProfile);
router.patch('/profile', updateVandorProfile);
router.patch('/coverimage', images, updateVandorCoverImage);

router.patch('/service', getVandorService);

// Food route
router.post('/food', images, addFood);
router.get('/foods', getFoods);



export { router as VandorRoute };