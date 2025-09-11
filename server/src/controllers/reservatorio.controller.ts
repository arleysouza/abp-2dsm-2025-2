import { Request, Response } from "express";
import db from "../configs/db";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await db.query("SELECT * FROM tbreservatorio ORDER BY nome");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Erro ao realizar a operação." });
  }
};
