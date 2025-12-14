import express from 'express';
import Admin from "../Model/AdminModel.js";


export const adminSignupAuth = async (req, res, next) => {
  try {

    const { email } = req.body;

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "email is already registered" });
    }

    next();


  }
  catch (error) {

    res.status(500).json({
      message: "Server error...",
      error: error.message

    });


  }
}
