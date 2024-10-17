import mongoose from "mongoose";

const TrailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    properties: { type: Object },
    price: { type: Number, required: true },
    trailClass: { type: Number, required: true },
    difficultyLevel: { type: Number, required: true },
    elevation: { type: Number, required: true },
    trailImages: [{ type: String }],
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
}, {
    timestamps: true,
});

// Check if the model is already defined to prevent overwriting
const Trails = mongoose.models.Trails || mongoose.model('Trails', TrailSchema);

export { Trails };
