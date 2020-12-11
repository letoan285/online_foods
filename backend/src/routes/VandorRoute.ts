import express, { Request, Response } from 'express';
import { getVandorProfile, getVandorService, updateVandorProfile, vandorLogin } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post('/login', vandorLogin);

//
router.get('/profile', Authenticate, getVandorProfile);
router.patch('/profile', updateVandorProfile);
router.patch('/service', getVandorService);


export { router as VandorRoute };