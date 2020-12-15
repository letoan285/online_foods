import mongoose, {Schema, Document} from 'mongoose';

interface CustomerDoc extends Document {
    email: string;
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    lat: number;
    lng: number;
    verified: boolean;
    otp_expiry: Date;
    otp: number;

}

const CustomerSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt:{type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    address: {type: String},
    phone:{type: String, required: true},
    lat: {type: Number},
    lng: {type: Number},
    verified:{type: Boolean, required: true},
    otp_expiry:{type:  Date, required: true},
    otp: {type: Number, required: true},
}, {
    toJSON: {
        transform(doc, ret){
            delete ret.password,
            delete ret.salt,
            delete ret.__v
        }
    },
    timestamps: true
});

const Customer = mongoose.model<CustomerDoc>('customer', CustomerSchema);

export { Customer };