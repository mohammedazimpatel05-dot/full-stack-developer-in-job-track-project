import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // optional for login token
import Admin from "../models/Admin.js"
import nodemailer from 'nodemailer';
// -------------------- REGISTER --------------------
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    // check if Admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists ❌" });
    }

    // create new Admin
    const newAdmin = new Admin({ name, email, contact, password });
    await newAdmin.save(); // password will be hashed automatically
    sendEmail(newAdmin);
    res.status(201).json({ message: "Admin registered successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed ❌", error: error.message });
  }
};
const sendEmail = async (newAdmin) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                Admin: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
 
        const mailOptions = {
            from: process.env.EMAIL, // Sender's email address
            to: newAdmin.email, // Receiver's email address
            subject: 'Welcome to Our Service!', // Clear subject for the welcome email
            //remove space before (<p>Hello $ {newAdmin.name},</p>) to <p>Hello $ {newAdmin.name},</p> and add backticks from opening of p tag to closign of last p tag
            html:`<p>Hello $ {newAdmin.name},</p>
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
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find Admin by email
    const Admin = await Admin.findOne({ email });
    if (!Admin) return res.status(400).json({ message: "Invalid credentials ❌" });

    // check password
    const isPasswordValid = await bcrypt.compare(password, Admin.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials ❌" });

    // optional: create token for session
    const token = jwt.sign({ id: Admin._id }, "secretKey123", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful ✅",
      token,
      Admin: {
        AdminId: Admin._id,
        name: Admin.name,
        email: Admin.email,
        contact: Admin.contact,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed ❌", error: error.message });
  }
};