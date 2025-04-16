import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",  
    required: true,
  },
}, { timestamps: true });  

const NotesModel = mongoose.model("note", noteSchema);
export default NotesModel;
