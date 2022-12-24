import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  username: String,
  email: { required: true, type: String, unique: true },
  password: String,
});

//encryp password

UserSchema.methods.encryptPassword = async (password: any) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password: any) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model("User", UserSchema);
