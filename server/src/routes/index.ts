import express from "express";
import furnas from "./furnas";

const router = express.Router();

router.use("/furnas", furnas);

export default router;
