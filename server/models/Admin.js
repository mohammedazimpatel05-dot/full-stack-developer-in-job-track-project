import mongoose from "mongoose";
      import bcrypt from "bcryptjs";
      
      // Define schema (structure of Admin collection in DB)
      const AdminSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true, // must provide
        },
        email: {
          type: String,
          required: true,
          unique: true, // no duplicate emails
        },
        contact: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
      
        role:{
          type: String,
          default: "Admin", // default role is Admin 
          enum: ["Admin", "admin"] ,// can be either Admin or admin
        },
      });
      
      // Before saving → hash password
      AdminSchema.pre("save", async function () {
        if (!this.isModified("password")) return; // only hash if password is new
        this.password = await bcrypt.hash(this.password, 10);

      });
      
      const Admin = mongoose.model("Admin", AdminSchema);
      export default Admin;