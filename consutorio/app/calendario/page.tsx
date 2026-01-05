"use client";

import { useState, useEffect } from "react";


import AtendentePicker from "../components/atendent/AtendentePicker";
import CalendarioAtendimentos from "../components/CalendarioAtendimento";
import MiniCalendario from "../components/MiniCalendario";
import ListaFuncionarios from "../components/funcionarios/ListaFuncionarios";
import FuncionarioForm from "../components/funcionarios/FuncionariosForm";
import Modal from "../components/Modal";
import AppointmentForm from "../components/AppointmentForm";
import AtendimentoChart from "../components/AtendimentoChart";


export default function Home() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [dataAtual, setDataAtual] = useState(new Date());

  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [mostrarModalFunc, setMostrarModalFunc] = useState(false);
  const [funcionarioParaEditar, setFuncionarioParaEditar] = useState<any>(null);

  const [mostrarModalAgendamento, setMostrarModalAgendamento] = useState(false);

  const [showPickerInicial, setShowPickerInicial] = useState(false);

  // 🔹 Carrega dados do localStorage na inicialização
  useEffect(() => {
    const dadosFunc = JSON.parse(localStorage.getItem("funcionarios") || "[]");
    const eventosSalvos = JSON.parse(localStorage.getItem("eventos") || "[]");

    setFuncionarios(dadosFunc);
    setEventos(eventosSalvos);

    const att = localStorage.getItem("atendente");
    if (!att) setShowPickerInicial(true);
  }, []);

  // Funções funcionários
  const salvarFuncionario = (func: any) => {
    setFuncionarios((prev) => {
      const existe = prev.find((f) => f.id === func.id);
      let novos;
      if (existe) {
        novos = prev.map((f) => (f.id === func.id ? func : f));
      } else {
        novos = [...prev, func];
      }
      localStorage.setItem("funcionarios", JSON.stringify(novos));
      return novos;
    });
    setMostrarModalFunc(false);
    setFuncionarioParaEditar(null);
  };

  const editarFuncionario = (func: any) => {
    setFuncionarioParaEditar(func);
    setMostrarModalFunc(true);
  };

  const excluirFuncionario = (id: string) => {
    const novosFuncionarios = funcionarios.filter((f) => f.id !== id);
    setFuncionarios(novosFuncionarios);
    localStorage.setItem("funcionarios", JSON.stringify(novosFuncionarios));
  };

  // Funções agendamento
  const salvarAgendamento = (evento: any) => {
    const novosEventos = [...eventos, evento];
    setEventos(novosEventos);
    localStorage.setItem("eventos", JSON.stringify(novosEventos));
    setMostrarModalAgendamento(false);
  };

  return (
    <>
      

      <main className="min-h-screen bg-white/95 p-6 space-y-6">
        <div className="max-w-7xl mx-auto grid grid-cols-7">
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

        <div className="max-w-7xl mx-auto rounded-lg my-6">
          <AtendimentoChart eventos={eventos} />
        </div>
      </main>

      {showPickerInicial && (
        <AtendentePicker
          onSelect={() => setShowPickerInicial(false)}
          onClose={() => setShowPickerInicial(false)}
          onAdd={() => {}}
        />
      )}
    </>
  );
}
