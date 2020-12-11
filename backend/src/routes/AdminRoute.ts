import express, {Request, Response, NextFunction } from 'express';
const router = express.Router();

import {createVandor, getVandorByID, getVandors} from '../controllers';

router.post('/', createVandor);

router.get('/', getVandors);

router.get('/:id', getVandorByID);



export {router as AdminRoute };