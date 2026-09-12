import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const UserRouter = express.Router();

// routes
UserRouter.post("/register", registerUser); // POST /api/users/register
UserRouter.post("/login", loginUser); // POST /api/users/login

export default UserRouter;