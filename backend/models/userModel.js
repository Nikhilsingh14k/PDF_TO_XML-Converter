import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    pdfFile: { type: String, required: true },
    pdfFileName: { type: String, required: true }, 
    pdfVector: { type: [Number], required: true }, 
    xmlOutput: { type: String, required: true } 
  },
  { timestamps: true } 
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    history: { type: [historySchema], default: [] } 
  },
  { timestamps: true } 
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
