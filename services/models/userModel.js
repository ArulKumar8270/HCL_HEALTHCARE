import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: false },
    role: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
