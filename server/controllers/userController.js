import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SendVerificationCode, WelcomeEmail } from "../middleware/Email.js";

// Register User
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await UserModel.findOne({ email: normalizedEmail });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Case 1: Already registered & verified
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email.",
      });
    }

    // Case 2: Registered but not verified  Update OTP & Resend
    if (existingUser && !existingUser.isVerified) {
      existingUser.fullName = fullName;
      existingUser.password = hashedPassword;
      existingUser.verificationCode = verificationCode;
      await existingUser.save();

      await SendVerificationCode(normalizedEmail, fullName, verificationCode);

      return res.status(200).json({
        success: true,
        message: "A new OTP has been sent to your email.",
      });
    }

    // Case 3: New user
    const user = await UserModel.create({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      verificationCode,
      isVerified: false,
    });

    await SendVerificationCode(normalizedEmail, fullName, verificationCode);

    return res.status(201).json({
      success: true,
      message: "Verification code sent to email.",
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Verify Email
export const VerifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ verificationCode: code });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired code.",
      });
    }

    user.isVerified = true;
    user.verificationCode = undefined; 
    await user.save();

    await WelcomeEmail(user.email, user.fullName);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};


// Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    //  Check if user is verified before allowing login

    if (!existingUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
      },   
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back ${existingUser.fullName}`,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// Logout
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    console.log("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

 // to get user profile details 

export const getUserDetails = async (req, res) => {
  try {
    const { fullName, email } = req.user;

    return res.status(200).json({
      success: true,
      user: {
        fullName,
        email,
      },
    });
  } catch (error) {
    console.error("Get User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
