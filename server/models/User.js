import mongoose from "mongoose";
      import bcrypt from "bcryptjs";
      
      // Define schema (structure of user collection in DB)
      const userSchema = new mongoose.Schema({
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
          default: "user", // default role is user 
          enum: ["user", "admin"] ,// can be either user or admin
        },
      });
      
      // Before saving → hash password
      userSchema.pre("save", async function () {
        if (!this.isModified("password")) return; // only hash if password is new
        this.password = await bcrypt.hash(this.password, 10);

      });
      
      const User = mongoose.model("User", userSchema);
      export default User;