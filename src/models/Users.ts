import { match } from "assert";
import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  email: string;
  password: string;
  verifyCode: string;
  verifyCodexpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema = new Schema({
  username: {
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..=/, "Please use a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  verifyCOde: {
    type: String,
    required: [true, "Veirfy Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Expiry code is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages:{
    type: [MessageSchema]
  }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel