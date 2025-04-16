import NotesModel from "../models/notes.js";

export const createnote = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userId = req.user.userId; 

    const note = new NotesModel({ title, description, userId });
    await note.save();

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.log("Error in createnote", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllnote = async (req, res) => {
  try {
    const userId = req.user.userId; 

    const notes = await NotesModel.find({ userId }); 

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.log("Error in getAllnote", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updatenote = async (req, res) => {
  try {
    const noteId = req.params.noteId.trim();
    const { title, description } = req.body;
    const userId = req.user.userId; 

    const note = await NotesModel.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found ",
      });
    }

    note.title = title || note.title;
    note.description = description || note.description;

    await note.save();

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    console.log("Error in updating note", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deletenote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user.userId; 

    const note = await NotesModel.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting note", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
