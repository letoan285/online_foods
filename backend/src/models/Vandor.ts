import mongoose, {Schema, Document} from 'mongoose';

interface VandorDoc extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: string[];
    rating: number;
    // food: any;
}

const VanderSchema = new Schema({
    name: {
        type: String, required: true
    },
    ownerName: {type: String, required: true},
    foodType: {type: [String]},
    pincode: {type: String, required: true},
    address: {type: String},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    serviceAvailable: { type: Boolean},
    coverImages: {type: [String]},
    rating: {type: Number},
    // food: [{type: mongoose.SchemaTypes.ObjectId, ref: 'food'}]
}, {timestamps: true});

const Vandor = mongoose.model<VandorDoc>('vandor', VanderSchema);

export { Vandor }