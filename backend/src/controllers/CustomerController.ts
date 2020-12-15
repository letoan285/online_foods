import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import express, {Request, Response, NextFunction} from 'express';
import { CreateCustomerInput, UserLoginInput, EditCustomerProfileInput } from '../dto/Customer.dto';
import { Customer } from '../models/Customer';
import { generateOtp, onRequestOTP } from '../utility';
import { generatePassword, generateSalt, generateSignature, validatePassword } from '../utility/PasswordUtility';

export const customerSignup = async (req: Request, res: Response, next: NextFunction) => {

    const customerInputs = plainToClass(CreateCustomerInput, req.body);

    const inputErrors = await validate(customerInputs, {validationError: {target: true}});
    if(inputErrors.length > 0){
        return res.status(400).json(inputErrors);
    }

    const { email, phone, password } = customerInputs;
    const salt = await generateSalt();
    const userPassword = await generatePassword(password, salt);
    const { otp, expiry } = generateOtp();

    const existingCustomer = await Customer.findOne({email: email});
    if(existingCustomer !== null){
        return res.status(409).json({message: 'An user exist with provided email'});
    }

    
    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        phone: phone,
        lat: 0,
        lng: 0
    });

    if(result){
        // Send the OTP to customer
        await onRequestOTP(otp, phone);

        // Generate the signature

        const signature = generateSignature({
            _id: result._id,
            email: result.email,
            verified: result.verified
        });

        return res.status(200).json({signature, verified: result.verified, email: result.email});

        // Send the result to client
    }

    return res.status(400).json({message: 'Error with Sign up'});


}

export const customerLogin = async (req: Request, res: Response, next: NextFunction) => {

    const loginInput = plainToClass(UserLoginInput, req.body);

    const loginErrors = await validate(loginInput, {validationError: {target: false}});

    if(loginErrors.length > 0){
        return res.status(400).json(loginErrors);
    }
    const { email, password } = loginInput;

    const customer = await Customer.findOne({email: email});
    if(customer){
        const validation = await validatePassword(password, customer.password, customer.salt);
        if(validation){
            const signature = generateSignature({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            });

            return res.status(201).json({signature, verified: customer.verified, email: customer.email});
        }
        // return res.status(200).json(loginErrors);
    }
    return res.status(400).json({message: 'Login Error !'});
}

export const customerVerify = async (req: Request, res: Response, next: NextFunction) => {

    const { otp } = req.body;
    const customer = req.user;

    if(customer){
        const profile = await Customer.findById(customer._id);
        if(profile){
            if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()){
                profile.verified = true;
                const updatedCustomerResponse = await profile.save();
                const signature = generateSignature({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                });

                return res.status(200).json({
                    signature,
                    verified: updatedCustomerResponse.verified,
                    email: updatedCustomerResponse.email
                });

            }
        }
    }
}

export const requestOtp = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;
    if(customer){
        const profile = await Customer.findById(customer._id);
        if(profile){

            const { otp, expiry } = generateOtp();
            profile.otp = otp;
            profile.otp_expiry = expiry;

            await profile.save();

            await onRequestOTP(otp, profile.phone);

            res.status(200).json({message: 'OTP sent your register phone number !'});

        }
    }
    return res.status(400).json({message: 'Error With request OTP!'});

}

export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;

    
    if(customer){
        
        const profile = await Customer.findById(customer._id);

        if(profile){

            return res.status(200).json(profile);

        }
    }
    return res.status(400).json({message: 'Error With Get Profile!'});

}

export const editCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;

    const profileInput = plainToClass(EditCustomerProfileInput, req.body);
    const profileErrors = await validate(profileInput, {validationError: {target: false}});

    if(profileErrors.length > 0){
        return res.status(400).json(profileErrors);
    }
    const { firstName, lastName, address } = profileInput;
    
    if(customer){
        
        const profile = await Customer.findById(customer._id);

        if(profile){

            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const result = await profile.save();

            return res.status(200).json(result);

        }
    }
    return res.status(400).json({message: 'Error With Edit Profile!'});
}