import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: process.env.URL || 'http://localhost:5176', // Use the URL from .env or default to local development URL
  credentials: true, // Allows credentials such as cookies and authorization headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Explicitly allow these HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

// Serve Static Files
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start Server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at port ${PORT}`);
});
