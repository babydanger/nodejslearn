import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    permissions: {type: Array, require: false},
})

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserById = (id) => UserModel.findById(id);
export const getUserByEmail = (email) => UserModel.findOne({ email });
export const createUser = (value) => new UserModel(value).save();
export const deleteUserById = (id) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id, value) => UserModel.findByIdAndUpdate(id, value);