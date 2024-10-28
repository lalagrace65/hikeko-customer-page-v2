import mongoose, {model, models, Schema} from "mongoose";
import uniqid from 'uniqid';

const BookingSchema = new Schema({
    joinerName:{type: String, required: true},
    email: {type: String, required: true},
    contactNumber: {type: String, required: true},
    pickupLocation: {type: String, required: true},
    age: {type: String, required: true},
    sex: {type: String, required: true},
    homeAddress: {type: String, required: true},
    emergencyContactPerson: {type: String, required: true},
    emergencyContactNumber: {type: String, required: true},
    medicalCondition: {type: String, required: true},
    conditionDetails: {type: String, required: false},
    proofOfPayment: {type: String},
    termsAccepted: {type: Boolean, required: true},
    trailId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail' },
    referenceCode: { type: String, unique: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true }, // Link to Package model
}, 
{timestamps: true}
);

export const Booking = models?.Booking || model('Booking', BookingSchema);