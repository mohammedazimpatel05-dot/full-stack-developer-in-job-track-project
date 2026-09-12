import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // optional for login token
import User from "../models/User.js"
import nodemailer from 'nodemailer';
// -------------------- REGISTER --------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // create new user
    const newUser = new User({ name, email, contact, password });
    await newUser.save(); // password will be hashed automatically
    sendEmail(newUser);
    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed ❌", error: error.message });
  }
};
const sendEmail = async (newUser) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
 
        const mailOptions = {
            from: process.env.EMAIL, // Sender's email address
            to: newUser.email, // Receiver's email address
            subject: 'Welcome to Our Service!', // Clear subject for the welcome email
            //remove space before (<p>Hello $ {newUser.name},</p>) to <p>Hello $ {newUser.name},</p> and add backticks from opening of p tag to closign of last p tag
            html:`<p>Hello $ {newUser.name},</p>
                   <p>Welcome to our service! We're thrilled to have you onboard.</p>
                   <p>If you have any questions or need help getting started, feel free to reach out to our support team.</p>
                   <p>Best regards,<br>Your Company Name</p> // HTML body for better formatting`
        };
 
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send welcome email' });
            }
            console.log('Email sent:', info.response);
        });
    } catch (error) {
        console.error('Error in email function:', error);
        throw new Error(error);
    }
};

        


// -------------------- LOGIN --------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials ❌" });

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials ❌" });

    // optional: create token for session
    const token = jwt.sign({ id: user._id }, "secretKey123", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role : user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed ❌", error: error.message });
  }
};