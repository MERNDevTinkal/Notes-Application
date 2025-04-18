import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/Database.js";
import userRouter from "./routes/userRouter.js";
import noteRouter from "./routes/noteRouter.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "https://notes-application-2-vv1k.onrender.com", 
  credentials: true,
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);

//  Static files path 
const _dirname = path.resolve();
const clientPath = path.join(_dirname, "client", "dist");
app.use(express.static(clientPath));

app.get("*", (_, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
