import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/AdminController.js";

const AdminRouter = express.Router();

// routes
AdminRouter.post("/register", registerAdmin); // POST /api/Admins/register
AdminRouter.post("/login", loginAdmin); // POST /api/Admins/login

export default AdminRouter;