import { useState } from "react";
import styled from "styled-components";
import { useSima } from "../hooks/useSima"; // hook de dados SIMA
import { useEstacao } from "../hooks/useEstacao"; // hook de estações

// Container principal da página
const PageContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 1.5rem;
  background-color: #f3f4f6;
`;

// Título
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
`;

// Tabela
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 0.85rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  white-space: nowrap;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }
`;

// Paginação
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#2563eb")};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#9ca3af" : "#1d4ed8")};
  }
`;

// Filtros (container do select e datas)
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

// Select estilizado
const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #111827;
  font-size: 1rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &:focus {
    outline: none;
    border-color: #1d4ed8;
    box-shadow: 0 0 0 2px rgba(29, 78, 216, 0.3);
  }
`;

// Campo de data estilizado
const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #111827;
  font-size: 1rem;
  cursor: pointer;
`;

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${dd}/${mm}/${yy} ${hh}:${min}`;
};

function SimaPage() {
  const [page, setPage] = useState(1);
  const [idestacao, setIdestacao] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");

  const { data: estacoes, loading: loadingEstacoes, error: erroEstacoes } = useEstacao();
  const { data, loading, error } = useSima(page, 10, idestacao || "32445");

  // encontra a estação selecionada
  const estacaoSelecionada = estacoes.find((e) => e.idestacao === (idestacao || "32445"));
  const tituloEstacao = estacaoSelecionada ? ` - ${estacaoSelecionada.rotulo}` : "";

  // define os limites de data
  const minDate = estacaoSelecionada?.inicio ? estacaoSelecionada.inicio.split("T")[0] : "";
  const maxDate = estacaoSelecionada?.fim ? estacaoSelecionada.fim.split("T")[0] : "";

  return (
    <PageContainer>
      <Title>SIMA{tituloEstacao}</Title>

      <FilterContainer>
        {/* Seleção de estação */}
        {loadingEstacoes && <p>Carregando estações...</p>}
        {erroEstacoes && <p style={{ color: "red" }}>{erroEstacoes}</p>}
        {!loadingEstacoes && estacoes.length > 0 && (
          <label>
            Estação:{" "}
            <Select
              value={idestacao}
              onChange={(e) => {
                setIdestacao(e.target.value);
                setPage(1);
                setDataInicio("");
                setDataFim("");
              }}
            >
              <option value="">Selecione a estação</option>
              {estacoes.map((est) => (
                <option key={est.idestacao} value={est.idestacao}>
                  {est.rotulo}
                </option>
              ))}
            </Select>
          </label>
        )}

        {/* Seleção de intervalo de datas */}
        {estacaoSelecionada && (
          <>
            <label>
              Data início:{" "}
              <DateInput
                type="date"
                min={minDate}
                max={maxDate || undefined}
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </label>
            <label>
              Data fim:{" "}
              <DateInput
                type="date"
                min={minDate}
                max={maxDate || undefined}
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </label>
          </>
        )}
      </FilterContainer>

      {loading && <p>Carregando registros...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && data && (
        <>
          <Table>
            <thead>
              <tr>
                <Th>Data/Hora</Th>
                <Th>regno</Th>
                <Th>nofsamples</Th>
                <Th>proamag</Th>
                <Th>dirvt</Th>
                <Th>intensvt</Th>
                <Th>u_vel</Th>
                <Th>v_vel</Th>
                <Th>tempag1</Th>
                <Th>tempag2</Th>
                <Th>tempag3</Th>
                <Th>tempag4</Th>
                <Th>tempar</Th>
                <Th>ur</Th>
                <Th>tempar_r</Th>
                <Th>pressatm</Th>
                <Th>radincid</Th>
                <Th>radrefl</Th>
                <Th>bateria</Th>
                <Th>precipitacao</Th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((row) => (
                <Tr key={row.idsima}>
                  <Td>{formatDateTime(row.datahora)}</Td>
                  <Td>{row.regno ?? "-"}</Td>
                  <Td>{row.nofsamples ?? "-"}</Td>
                  <Td>{row.proamag ?? "-"}</Td>
                  <Td>{row.dirvt ?? "-"}</Td>
                  <Td>{row.intensvt ?? "-"}</Td>
                  <Td>{row.u_vel ?? "-"}</Td>
                  <Td>{row.v_vel ?? "-"}</Td>
                  <Td>{row.tempag1 ?? "-"}</Td>
                  <Td>{row.tempag2 ?? "-"}</Td>
                  <Td>{row.tempag3 ?? "-"}</Td>
                  <Td>{row.tempag4 ?? "-"}</Td>
                  <Td>{row.tempar ?? "-"}</Td>
                  <Td>{row.ur ?? "-"}</Td>
                  <Td>{row.tempar_r ?? "-"}</Td>
                  <Td>{row.pressatm ?? "-"}</Td>
                  <Td>{row.radincid ?? "-"}</Td>
                  <Td>{row.radrefl ?? "-"}</Td>
                  <Td>{row.bateria ?? "-"}</Td>
                  <Td>{row.precipitacao ?? "-"}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Anterior
            </Button>
            <span>
              Página {page} de {data.totalPages}
            </span>
            <Button disabled={page === data.totalPages} onClick={() => setPage(page + 1)}>
              Próxima
            </Button>
          </Pagination>
        </>
      )}
    </PageContainer>
  );
}

export default SimaPage;
