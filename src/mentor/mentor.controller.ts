import express from "express";
export const Router = express.Router();

import { Router as MentorClassController } from "./class/mentor.class.controller";

Router.get("/", async (request, response) => {
    response.json({ message: "success" });
});

Router.use("/class",MentorClassController);