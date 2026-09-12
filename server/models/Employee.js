import mongoose from "mongoose";
      import bcrypt from "bcryptjs";
      
      const EmployeeSchema = new mongoose.Schema({
        ename: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true, 
        },
        contact: {
          type: String,
          required: true,
        },
        age: {
          type: String,
          required: true,
        },
        gender : {
          type: String,
          required: true,
        },
        salary : {
          type: String,
          required: true,
        },
        qualifications : {
          type: String,
          required: true,
        },
          address : {
          type: String,
          required: true,
        },
          pic : {
          type: String,
          required: true,
        },
        role:{
          type: String,
          default: "Employee", 
          enum: ["Employee", "admin"] ,
        },
      });
      
      EmployeeSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next(); 
        this.password = await bcrypt.hash(this.password, 10);
        next();
      });
      
      const Employee = mongoose.model("Employee", EmployeeSchema);
      export default Employee;