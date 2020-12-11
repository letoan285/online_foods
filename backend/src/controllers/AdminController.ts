import { Request, Response, NextFunction } from 'express';
import { CreateVandorInput } from '../dto/Vandor.dto';
import { Vandor } from '../models';

export const createVandor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, ownerName, phone, foodType, email, password } = <CreateVandorInput>req.body;
    
    const existingVandor = await Vandor.findOne({email});
    
    if(existingVandor !== null){
        return res.json({message: 'Vandor is exist with this email'});
    }

    const createVandor = await Vandor.create({
        name: name,
        address: address,
        phone: phone,
        pincode: pincode,
        foodType: foodType,
        password: password,
        email: email,
        rating: 0,
        salt: 'gegaegaweg',
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
    res.json({message: 'Get Vendor by Id'})

}