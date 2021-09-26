import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
export default mongoose.model('users', UserSchema);