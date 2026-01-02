"use client";

import { useState } from "react";
import Modal from "./components/Modal";
import CalendarioAtendimentos from "./components/CalendarioAtendimento";
import MiniCalendario from "./components/MiniCalendario";
import ListaFuncionarios from "./components/funcionarios/ListaFuncionarios";
import FuncionarioForm from "./components/funcionarios/FuncionariosForm";
import AppointmentForm from "./components/AppointmentForm"; // importe o form de tarefa
import AtendimentoChart from "./components/AtendimentoChart";

export default function Home() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [dataAtual, setDataAtual] = useState(new Date());

  const [funcionarios, setFuncionarios] = useState<any[]>([]);

  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [atendenteSelecionado, setAtendenteSelecionado] = useState<any>(null);

  // modal funcionário
  const [mostrarModalFunc, setMostrarModalFunc] = useState(false);
  const [funcionarioParaEditar, setFuncionarioParaEditar] = useState<any>(null);
  const [mostrarDetalhesFunc, setMostrarDetalhesFunc] = useState(false);
  const [funcionarioDetalhes, setFuncionarioDetalhes] = useState<any>(null);

  // modal agendamento
  const [mostrarModalAgendamento, setMostrarModalAgendamento] = useState(false);

  // salvar / editar funcionário
  const salvarFuncionario = (func: any) => {
    setFuncionarios((prev) => {
      const existe = prev.find((f) => f.id === func.id);
      if (existe) return prev.map((f) => (f.id === func.id ? func : f));
      return [...prev, func];
    });
    setMostrarModalFunc(false);
    setFuncionarioParaEditar(null);
  };

  const editarFuncionario = (func: any) => {
    setFuncionarioParaEditar(func);
    setMostrarModalFunc(true);
  };

  const excluirFuncionario = (id: string) => {
    setFuncionarios((prev) => prev.filter((f) => f.id !== id));
  };

  const verDetalhesFuncionario = (func: any) => {
    setFuncionarioDetalhes(func);
    setMostrarDetalhesFunc(true);
  };

  // salvar agendamento
  const salvarAgendamento = (evento: any) => {
    setEventos((prev) => [...prev, evento]);
    setMostrarModalAgendamento(false);
  };

  return (
    <main className="min-h-screen bg-white/95 p-6 space-y-6">
      <div className="max-w-7xl mx-auto grid grid-cols-7 gap-6">
        <div className="col-span-2 space-y-6">
          <MiniCalendario
            eventos={eventos}
            selectedDate={dataAtual}
            onChangeMonth={setDataAtual}
            onSelectDate={(d) => setDataAtual(d)}
          />

          <section>
            <h2 className="text-2xl text-cyan-700 font-bold mb-4">
              Funcionários Cadastrados
            </h2>
            <ListaFuncionarios
              funcionarios={funcionarios}
              onEdit={editarFuncionario}
              onDelete={excluirFuncionario}
              onDetails={verDetalhesFuncionario}
            />
          </section>

          <button
            onClick={() => {
              setFuncionarioParaEditar(null);
              setMostrarModalFunc(true);
            }}
            className="bg-cyan-900 text-white px-5 py-2 rounded-lg shadow hover:bg-cyan-600 transition"
          >
            + Cadastrar Funcionário
          </button>

          
        </div>

        <div className="col-span-5">
          <CalendarioAtendimentos
            eventos={eventos}
            setEventos={setEventos}
            dataAtual={dataAtual}
            setDataAtual={setDataAtual}
            medicos={funcionarios}
          />
        </div>
      </div>

      {/* Modal para cadastrar/editar funcionário */}
      {mostrarModalFunc && (
        <Modal onClose={() => setMostrarModalFunc(false)}>
          <FuncionarioForm
            onSave={salvarFuncionario}
            onCancel={() => setMostrarModalFunc(false)}
            funcionarioToEdit={funcionarioParaEditar}
          />
        </Modal>
      )}

      {/* Modal de criar tarefa */}
      {mostrarModalAgendamento && (
        <Modal onClose={() => setMostrarModalAgendamento(false)}>
          <AppointmentForm
            medicos={funcionarios}
            onSave={salvarAgendamento}
            onCancel={() => setMostrarModalAgendamento(false)}
          />
        </Modal>
      )}

      {/* Modal de detalhes do funcionário */}
      {mostrarDetalhesFunc && funcionarioDetalhes && (
        <Modal onClose={() => setMostrarDetalhesFunc(false)}>
          <div className="space-y-4 text-gray-800">
            <h2 className="text-2xl font-bold text-center">
              {funcionarioDetalhes.nome}
            </h2>
            <p><strong>Telefone:</strong> {funcionarioDetalhes.telefone}</p>
            <p><strong>Cargo:</strong> {funcionarioDetalhes.cargo}</p>
            <p>
              <strong>Plantão:</strong> {funcionarioDetalhes.horarioInicio} -{" "}
              {funcionarioDetalhes.horarioFim}
            </p>
            {funcionarioDetalhes.fotoUrl && (
              <img
                src={funcionarioDetalhes.fotoUrl}
                className="w-32 h-32 rounded-full object-cover mx-auto"
                alt={funcionarioDetalhes.nome}
              />
            )}
          </div>
        </Modal>
      )}

      <div className="bg-white p-4 max-w-7xl h-170 mx-auto rounded-lg shadow my-6">
  <AtendimentoChart eventos={eventos} />
</div>

    </main>
  );
}
