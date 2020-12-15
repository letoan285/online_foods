import express, {Request, Response, NextFunction} from 'express';
import { customerLogin, customerSignup, customerVerify, editCustomerProfile, getCustomerProfile, requestOtp } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();


/**-------- Signup / Create Customer------*/
router.post('/signup', customerSignup);


/**-------- Login ---------------------- */
router.post('/login', customerLogin);


router.use(Authenticate);

/**--------- Verify Customer Account---------- */
router.patch('/verify', customerVerify);


/**------- OTP / Requesting OTP------ */
router.get('/otp', requestOtp);


/**-------- Profile------------------ */
router.get('/profile', getCustomerProfile);
router.patch('/profile', editCustomerProfile);
// Cart
// Order
// Payment

export { router as CustomerRoute };