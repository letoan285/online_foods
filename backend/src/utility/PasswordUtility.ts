import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { APP_SECRET } from '../config';
import { VandorPayload } from '../dto/Vandor.dto';
import { AuthPayload } from '../dto/Auth.dto';

export const generateSalt = async () => {
    return await bcrypt.genSalt();
}

export const generatePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await generatePassword(enteredPassword, salt) === savedPassword;
}

export const generateSignature = (payload: VandorPayload) => {
    return jwt.sign(payload, APP_SECRET, {expiresIn: '30d'});
}

export const validateSignature = async (req: Request) => {
    const signature = req.get('Authorization');

    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload;
        req.user = payload;
        return true;
    }
    return false;
}