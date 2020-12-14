import express, { Request, Response, NextFunction } from 'express';
import { getFoodAvailability, getFoodsIn30Min, getTopRestaurants } from '../controllers';

const router = express.Router();

/**------------- Food Availability--------------- */

router.get('/:pincode', getFoodAvailability);

/** ------------- Top Restaurant----------------------- */
router.get('/top-restaurants/:pincode', getTopRestaurants);

/**-------------- Food available in 30 minutes----------- */
router.get('/foods-in-30-min/:pincode', getFoodsIn30Min);

/**---------------- Search Food------------------------ */

router.get('/search/:pincode');

/**--------------- Find Restaurant by Id---------------- */
router.get('/restaurants/:id');

export {router as ShoppingRoute };