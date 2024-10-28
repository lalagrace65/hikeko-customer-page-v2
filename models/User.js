import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {
    type: String,
  },
  isVerified: {type: Boolean, default: false},
  isAdmin: {type: Boolean, default: false},
}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);