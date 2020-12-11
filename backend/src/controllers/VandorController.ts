import { Request, Response, NextFunction } from 'express';
import { EditVandorInput, VandorLoginInput } from '../dto/Vandor.dto';
import { generateSignature, validatePassword } from '../utility/PasswordUtility';
import { findVandor } from './AdminController';

export const vandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInput>req.body;
    const existingVandor = await findVandor('', email);
    
    if(existingVandor !== null){
        //
        const validation = await validatePassword(password, existingVandor.password, existingVandor.salt);
        if(validation){
            const signature = generateSignature({
                _id: existingVandor.id,
                email: existingVandor.email,
                name: existingVandor.name,
                foodTypes: existingVandor.foodType
            });
            return res.json(signature);
        } else {
            return res.status(404).json({message: 'Password is not valid'});
        }
    }
    return res.status(404).json({message: 'Login credential not valid'});
}

export const getVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
   const user = req.user;
   if(user){
       const existingVandor = await findVandor(user._id);
       return res.json(existingVandor);
   }
   return res.status(404).json({message: 'Vandor information not found !'});
}
export const updateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone, address, foodTypes } = <EditVandorInput>req.body;
    const user = req.user;
    
    if(user){
        
        const existingVandor = await findVandor(user._id);

        if(existingVandor !== null){
            existingVandor.name = name;
            existingVandor.address = address;
            existingVandor.phone = phone;
            existingVandor.foodType = foodTypes;
            const savedResult = await existingVandor.save();
            return res.status(201).json(savedResult);
        }
        return res.json(existingVandor);
    }
    return res.status(404).json({message: 'Vandor information not found !'});
}
export const getVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(user){        
        const existingVandor = await findVandor(user._id);
        if(existingVandor !== null){
            // return res.status(404).json({message: 'Vandor information not found !', existingVandor});
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const savedResult = await existingVandor.save();
            return res.status(201).json({message: 'Vandor Service Updated !', data: savedResult});
        }
        return res.json(existingVandor);
    }
    return res.status(404).json({message: 'Vandor information not found !'});
}