import { Request, Response } from "express";
import db from "../configs/db";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await db.query(`
      SELECT 
        a.idcampanha,
        a.nrocampanha,
        a.datainicio,
        a.datafim,
        b.idinstituicao,
        b.nome AS instituicao_nome,
        c.idreservatorio,
        c.nome AS reservatorio_nome,
        c.lat AS reservatorio_lat,
        c.lng AS reservatorio_lng
      FROM tbcampanha AS a
      LEFT JOIN tbinstituicao AS b 
        ON a.idinstituicao = b.idinstituicao
      LEFT JOIN tbreservatorio AS c 
        ON a.idreservatorio = c.idreservatorio
      ORDER BY c.nome, a.nrocampanha
    `);

    const data = result.rows.map((row: any) => ({
      idcampanha: row.idcampanha,
      instituicao: row.idinstituicao
        ? {
            idinstituicao: row.idinstituicao,
            nome: row.instituicao_nome,
          }
        : undefined,
      reservatorio: row.idreservatorio
        ? {
            idreservatorio: row.idreservatorio,
            nome: row.reservatorio_nome,
            lat: row.reservatorio_lat,
            lng: row.reservatorio_lng,
          }
        : undefined,
      nrocampanha: row.nrocampanha,
      datainicio: row.datainicio,
      datafim: row.datafim,
    }));

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Erro ao realizar a operação." });
  }
};
