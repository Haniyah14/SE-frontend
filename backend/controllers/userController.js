import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


const createResetToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_RESET_SECRET, { expiresIn: "15m" });
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const token = createToken(user._id);
      res.status(200).json({ success: true, token, user: { id: user._id, name: user.name }  });
    } else {
      res.status(400).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error while logging in user: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.status(200).json({ success: true, token , user: { id: user._id, name: user.name } });
  } catch (error) {
    console.log("Error while registering user: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error while logging in admin: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




const verifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    res.status(200).json({ message: "Email verified. You can reset your password." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export {
  loginUser,
  registerUser,
  loginAdmin,
  verifyEmail,
  resetPassword,
};
