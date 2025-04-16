import express from "express";
import { register, login, logout , VerifyEmail } from "../controllers/userController.js";  

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyEmail",VerifyEmail);


export default router;
