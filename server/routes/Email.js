import express from "express";
import SendEmail from "../utils/OtpEmail.js";

const emailRouter = express.Router();

emailRouter.post("/send-otp", SendEmail);

export default emailRouter;