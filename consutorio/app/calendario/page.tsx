"use client";

import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Modal from "../components/Modal";
import AtendentePicker from "../components/atendent/AtendentePicker";
import CalendarioAtendimentos from "../components/CalendarioAtendimento";
import MiniCalendario from "../components/MiniCalendario";
import ListaFuncionarios from "../components/funcionarios/ListaFuncionarios";
import FuncionarioForm from "../components/funcionarios/FuncionariosForm";
import AppointmentForm from "../components/AppointmentForm";
import AtendimentoChart from "../components/AtendimentoChart";

export default function Home() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [dataAtual, setDataAtual] = useState(new Date());

  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [mostrarModalFunc, setMostrarModalFunc] = useState(false);
  const [funcionarioParaEditar, setFuncionarioParaEditar] = useState<any>(null);
  const [mostrarDetalhesFunc, setMostrarDetalhesFunc] = useState(false);
  const [funcionarioDetalhes, setFuncionarioDetalhes] = useState<any>(null);

  const [mostrarModalAgendamento, setMostrarModalAgendamento] = useState(false);

  // Modal Picker inicial (login ou trocar atendente)
  const [showPickerInicial, setShowPickerInicial] = useState(false);

  useEffect(() => {
    // Se não houver atendente logado, abre Picker
    const att = localStorage.getItem("atendente");
    if (!att) setShowPickerInicial(true);
  }, []);

  // Funções funcionários
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

  // Funções agendamento
  const salvarAgendamento = (evento: any) => {
    setEventos((prev) => [...prev, evento]);
    setMostrarModalAgendamento(false);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white/95 p-6 space-y-6">
        <div className="max-w-7xl mx-auto grid grid-cols-7 ">
          <div className="col-span-2 pt-14 space-y-6">
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
              className="bg-cyan-800 text-white px-5 py-2 rounded-lg shadow hover:bg-cyan-600 transition"
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

        {/* Modal funcionário */}
        {mostrarModalFunc && (
          <Modal onClose={() => setMostrarModalFunc(false)}>
            <FuncionarioForm
              onSave={salvarFuncionario}
              onCancel={() => setMostrarModalFunc(false)}
              funcionarioToEdit={funcionarioParaEditar}
            />
          </Modal>
        )}

        {/* Modal agendamento */}
        {mostrarModalAgendamento && (
          <Modal onClose={() => setMostrarModalAgendamento(false)}>
            <AppointmentForm
              medicos={funcionarios}
              onSave={salvarAgendamento}
              onCancel={() => setMostrarModalAgendamento(false)}
            />
          </Modal>
        )}

        {/* Modal detalhes funcionário */}
        {mostrarDetalhesFunc && funcionarioDetalhes && (
          <Modal onClose={() => setMostrarDetalhesFunc(false)}>
            <div className="space-y-4 text-gray-800">
              <h2 className="text-2xl font-bold text-center">{funcionarioDetalhes.nome}</h2>
              <p><strong>Telefone:</strong> {funcionarioDetalhes.telefone}</p>
              <p><strong>Cargo:</strong> {funcionarioDetalhes.cargo}</p>
              <p>
                <strong>Plantão:</strong> {funcionarioDetalhes.horarioInicio} - {funcionarioDetalhes.horarioFim}
              </p>
              {funcionarioDetalhes.fotoUrl && (
                <img src={funcionarioDetalhes.fotoUrl} className="w-32 h-32 rounded-full object-cover mx-auto" alt={funcionarioDetalhes.nome} />
              )}
            </div>
          </Modal>
        )}

        <div className="max-w-7xl mx-auto rounded-lg my-6">
          <AtendimentoChart eventos={eventos} />
        </div>
      </main>

      {/* Picker inicial */}
      {showPickerInicial && (
        <AtendentePicker
          onSelect={(att) => setShowPickerInicial(false)}
          onClose={() => setShowPickerInicial(false)}
          onAdd={() => {}}
        />
      )}
    </>
  );
}
