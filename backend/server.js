import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";
import express from "express";
import authRouter from "./routers/auth-router.js";
import { errorMiddleware } from "./middleware/error-middleware.js";
const app = express();

dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "POST, GET, PUT, PATCH, HEAD, DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.static("storage"));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use(errorMiddleware);

const port = 5000;
connectDB();
app.listen(port, () => {
  console.log(`server runnning on port ${port}`);
});
