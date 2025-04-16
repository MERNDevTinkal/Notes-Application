import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default : false,
  },
  verificationCode : String,
} , {timestamps : true});

const UserModel = mongoose.model("user", userSchema);
export default UserModel;
