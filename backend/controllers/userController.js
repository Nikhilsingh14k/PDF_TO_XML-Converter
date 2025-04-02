import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
import userModel from "../models/userModel.js";

dotenv.config();

const registerUser = async (req, res) => {
    
  try {
    console.log("Heloooooooooooo32123");
    const { name, email, password } = req.body;
    console.log(name, email);
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log("Heloooooooooooo");
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        console.log("hiiiii");
        console.log(user._id);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid cridentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//Api for user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const saveConversionHistory = async (req, res) => {
    try {
      const { pdfVector, xmlOutput } = req.body;
      console.log("hello");
      const { userId } = req;
      console.log(userId);
  
      if (!req.file || !xmlOutput) {
        return res.status(400).json({ success: false, message: "Missing file data" });
      }
  
      // Upload PDF file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "pdf_uploads", // Cloudinary folder name
        resource_type: "raw",
      });
      console.log(result.secure_url);
      if (!result.secure_url) {
        return res.status(500).json({ success: false, message: "Failed to upload to Cloudinary" });
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Add to user's history
      user.history.push({
        pdfFile: result.secure_url,  // Store Cloudinary file URL
        pdfFileName: req.file.originalname,
        pdfVector: pdfVector || [],
        xmlOutput,
      });

      await user.save();

      res.json({ success: true, message: "History saved successfully", pdfUrl: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  
  
  const deleteHistory = async (req, res) => {
    try {
      const { index } = req.body;
      const { userId } = req;
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      user.history.splice(index, 1);
      await user.save();
  
      res.json({ success: true, message: "History item deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const loadPage= async (req, res) => {
    const { fileName } = req.query;
    console.log(fileName);
    const {userId} = req;
    console.log(userId);
    try {
      const user = await userModel.findById(userId);
      const fileData = user.history.find(file => file.pdfFileName === fileName);
      if (!fileData) {
          return res.json({ success: false, message: "File not found" });
        }
        console.log(fileData.xmlOutput);
        
      
        res.json({
            success: true,
            xmlOutput: fileData.xmlOutput,
            pdfUrl: fileData.pdfFile 
        });
    } catch (error) {
      console.error("Error fetching XML:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
export { registerUser, loginUser, getProfile, saveConversionHistory, deleteHistory ,loadPage};
  
  
  
