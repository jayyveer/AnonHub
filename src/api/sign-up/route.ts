import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/Users";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificatinEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const {username, email, password} = await request.json()
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if user already exists by email
  const existingUserByEmail = await UserModel.findOne({ email });

  if (existingUserByEmail) {
    if (existingUserByEmail.isVerified) {
      // If user is already verified, return error
      console.error("Error registering user: User already exists and is verified");
      return Response.json(
        { success: false, message: "User already exists and is verified" },
        { status: 400 }
      );
    } else {
      // Update existing user if not verified
      existingUserByEmail.username = username;
      existingUserByEmail.password = password;
      await existingUserByEmail.save();
    }
  } else {
    // Create new user if not found
    const newUser = new UserModel({ username, email, hashedPassword });
    await newUser.save();
  }

  // Respond with success message
  return Response.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      { success: false, message: "Error registering User" },
      { status: 500 }
    );
  }
}
