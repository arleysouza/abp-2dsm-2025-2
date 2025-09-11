import express from "express";
import campanha from "./campanha.routes";
import instituicao from "./instituicao.routes";
import reservatorio from "./reservatorio.routes";
import sitio from "./sitio.routes";

const router = express.Router();

router.use("/instituicao", instituicao);
router.use("/reservatorio", reservatorio);
router.use("/sitio", sitio);
router.use("/campanha", campanha);

export default router;
