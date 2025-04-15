import express from "express";
import { createnote, deletenote, getAllnote, updatenote } from "../controllers/noteController.js";
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router();

router.route("/").post(isAuthenticated , createnote).get(getAllnote) ;
router.route("/:noteId").put( isAuthenticated , updatenote).delete(isAuthenticated , deletenote) ;


export default router;


