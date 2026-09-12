import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import UserRouter from './routes/UserRouter.js';
import path from "path";
import AdminRouter from './routes/AdminRouter.js';
import itemRouter from './routes/itemRouter.js';
const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 2000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
  console.log("DB connected successfully");
  app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
  });
}).catch(error => console.log(error));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/item", itemRouter);
app.use("/api/users", UserRouter);
app.use("/admin", AdminRouter);