import { Router } from "express";
import { getAll } from "../controllers/instituicao.controller";

const router = Router();

router.get("/all", getAll);

export default router;
