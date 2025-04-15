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

    const note = new NotesModel({ title, description });
    await note.save();

    return res.status(201).json({
      success: true,
      message: "note created",
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
    const notes = await NotesModel.find();
    // console.log(notes);
    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.log("Error in getAllnotes", error);
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

    const note = await NotesModel.findByIdAndUpdate(
      noteId,
      { title, description },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "note Updated Successfully",
      note,
    });
  } catch (error) {
    console.log("Error in update notesID", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const deletenote = async (req, res) => {
  try {
    const noteID = req.params.noteId;

    const note = await NotesModel.findByIdAndDelete(noteID); 

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "note deleted",
    });

  } catch (error) {
    console.log("Error in delete note", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
