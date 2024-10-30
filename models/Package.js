import mongoose, {model, models, Schema} from "mongoose";

const PackageSchema = new Schema({
    eventname: {type: String, required: true},
    packageinclusions: {type: String, required: true},
    travelagencyinfo: {type: String, required: true},
    exclusions: {type: String, required: true},
    paymentInfo: {type: String, required: true},
    price: {type: String, required: true},
    trailId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail' },
}, 
{timestamps: true}
);

export const Package = models?.Package || model('Package', PackageSchema);