import express from "express";
import furnas from "./furnas";
import sima from "./sima";

const router = express.Router();

router.use("/furnas", furnas);
router.use("/sima", sima);

export default router;
