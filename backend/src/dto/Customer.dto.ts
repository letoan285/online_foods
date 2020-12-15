import { IsEmail, IsEmpty, Length} from 'class-validator';
export class CreateCustomerInput {
    @IsEmail()
    email: string;

    @Length(7, 12)
    phone: string;


    @Length(6, 12)
    password: string;
}

export class UserLoginInput {
    @IsEmail()
    email: string;

    @Length(6, 12)
    password: string;
}


export interface CustomerPayload {
    _id: string;
    email: string;
    verified: boolean;
}


export class EditCustomerProfileInput {
    @Length(3, 15)
    firstName: string;

    @Length(3, 12)
    lastName: string;

    @Length(6, 20)
    address: string;
}