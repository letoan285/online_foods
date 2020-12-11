import { Request, Response, NextFunction } from 'express';
import { CreateVandorInput } from '../dto/Vandor.dto';
import { Vandor } from '../models';
import { generateSalt, generatePassword } from '../utility/PasswordUtility';


export const findVandor = async (id: string | undefined, email?: string) => {
   if(email){
    return await Vandor.findOne({email});
   } else {
       return await Vandor.findById(id);
   }
}


export const createVandor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, ownerName, phone, foodType, email, password } = <CreateVandorInput>req.body;
    
    const existingVandor = await findVandor('', email);
      
    if(existingVandor !== null){
        return res.json({message: 'Vandor is exist with this email'});
    }

    // Generate a salt
    const salt = await generateSalt();

    // Generate a password
    const userPassword = await generatePassword(password, salt);

    const createVandor = await Vandor.create({
        name: name,
        address: address,
        phone: phone,
        pincode: pincode,
        foodType: foodType,
        password: userPassword,
        email: email,
        rating: 0,
        salt: salt,
        serviceAvailable: false,
        ownerName: ownerName,
        coverImages: [],
    });

    res.json({message: 'Create Vandor', data: createVandor})
}


export const getVandors = async (req: Request, res: Response, next: NextFunction) => {
    const vanderos = await Vandor.find();
    res.json({message: 'Get Vendors', data: vanderos})
}


export const getVandorByID = async (req: Request, res: Response, next: NextFunction) => {
    const vandorId = req.params.id;
    const vandor = await findVandor(vandorId);
    if(vandor !== null){
        return res.json({message: 'Get Vendor by Id', data: vandor})
    }
    return res.json({message: 'Vandor not found !'})

}