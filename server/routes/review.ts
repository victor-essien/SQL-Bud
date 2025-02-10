import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { any, z } from "zod";
import multer from "multer";
import fs from "fs";
import path from "path";

dotenv.config();

const router = express.Router();
// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });
const api_key = process.env.API_KEY;
import { GoogleGenerativeAI } from "@google/generative-ai";
if (!api_key) {
  throw new Error("API_KEY is not defined in the environment variables.");
}
// Initialize the GenerativeAI instance
const genAI = new GoogleGenerativeAI(api_key);

interface GenerativePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

function fileToGenerativePart(path: string, mimeType: string): GenerativePart {
  return {
    inlineData: {
      data: fs.readFileSync(path).toString("base64"),
      mimeType,
    },
  };
}

router.post("/analyze", upload.single("image"), async (req, res) => {
  console.log("Request received");
  if (!req.file) {
    res.status(400).json({ error: "No Image uploaded." });
    return;
  }
  try {
    const imagePath = req.file.path;
    const imagePart = fileToGenerativePart(imagePath, req.file.mimetype);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Fix this SQL code and provide feedback on best practices and performance optimizations IF needed .";
    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();
    // Clean up uploaded image
    fs.unlinkSync(imagePath);
    res.json({ description: responseText });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "File analysis failed." });
  }
});

export default router;
