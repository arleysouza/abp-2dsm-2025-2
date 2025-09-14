import { useSima } from "../hooks/useSima";
import SimaTable from "../components/SimaTable";

const SimaPage = () => {
  const { data, loading, error } = useSima(1, 20);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Lista de Registros SIMA</h1>
      {data && <SimaTable data={data.data} />}
      <p>
        Página {data?.page} de {data?.totalPages} ({data?.total} registros)
      </p>
    </div>
  );
};

export default SimaPage;
