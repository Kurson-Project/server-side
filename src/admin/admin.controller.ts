import express from "express";
import { adminMentorGets, adminMentorRouter } from "./mentor/admin.mentor.controller";

export const adminRouter = express.Router();

adminRouter.use("/mentor",adminMentorRouter)
adminRouter.use("/mentors",adminMentorGets)