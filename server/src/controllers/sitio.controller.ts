import { Request, Response } from "express";
import db from "../configs/db";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await db.query(`
      SELECT 
        a.idsitio,
        a.nome AS sitio_nome,
        a.lat AS sitio_lat,
        a.lng AS sitio_lng,
        a.descricao,
        b.idreservatorio,
        b.nome AS reservatorio_nome,
        b.lat AS reservatorio_lat,
        b.lng AS reservatorio_lng
      FROM tbsitio AS a
      LEFT JOIN tbreservatorio AS b 
        ON a.idreservatorio = b.idreservatorio
      ORDER BY a.nome
    `);

    // transforma o resultado em array de objetos formatados
    const data = result.rows.map((row: any) => ({
      idsitio: row.idsitio,
      reservatorio: row.idreservatorio
        ? {
            idreservatorio: row.idreservatorio,
            nome: row.reservatorio_nome,
            lat: row.reservatorio_lat,
            lng: row.reservatorio_lng,
          }
        : undefined,
      nome: row.sitio_nome,
      lat: row.sitio_lat,
      lng: row.sitio_lng,
      descricao: row.descricao,
    }));

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Erro ao realizar a operação." });
  }
};
