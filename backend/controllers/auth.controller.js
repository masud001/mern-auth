import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Validate the request body
    if (!name || !email || !password) {
      throw new Error("Please provide all required fields");
    }
    // Check if the user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationCode();
    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save();

    // jwt token
    generateTokenAndSetCookie(res, user._id);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from the response
      },
    });
  } catch (error) {
    // Handle any errors that occur in the try block
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  res.send("Hello World!, login");
};
export const logout = async (req, res) => {
  res.send("Hello World!, logout");
};
export const forgotPassword = async (req, res) => {
  res.send("Hello World!, forgot password");
};
export const resetPassword = async (req, res) => {
  res.send("Hello World!, reset password");
};
