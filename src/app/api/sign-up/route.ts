import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerification } from "@/helpers/sendVerification";

export async function signup(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  // Step 1: Connect to the database
  await dbConnect();

  try {
    // Step 2: Check if the user already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return { success: false, message: "User already exists with this email." };
    }

    // Step 3: Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Step 4: Create a new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();

    // Step 5: Return a success response
    return { success: true, message: "User registered successfully." };
  } catch (error) {
    console.error("Error during user signup:", error);
    return { success: false, message: "An error occurred during signup." };
  }
}
