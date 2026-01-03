"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

interface AppointmentFormProps {
  slotInfo?: {
    date?: Date;
    initialStart?: Date;
    initialEnd?: Date;
  };
  medicos?: any[];
  eventos?: any[];
  onSave: (event: any) => void;
  onCancel: () => void;
}

export default function AppointmentForm({
  slotInfo = {},
  medicos = [],
  eventos = [],
  onSave,
  onCancel,
}: AppointmentFormProps) {
  const { date = new Date(), initialStart, initialEnd } = slotInfo;

  const defaultStartTime = initialStart
    ? format(initialStart, "HH:00")
    : "";
  const defaultEndTime = initialEnd ? format(initialEnd, "HH:00") : "";

  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [horaInicio, setHoraInicio] = useState(defaultStartTime);
  const [horaFim, setHoraFim] = useState(defaultEndTime);

  const [medicosDisponiveis, setMedicosDisponiveis] = useState<any[]>([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState("");

  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0") + ":00"
  );

  const horaParaMinutos = (hora: string) => {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  };

  // 🔹 Checa se o médico já tem algum atendimento no horário
  const medicoTemConflito = (medicoId: string, start: Date, end: Date) => {
    return eventos.some((ev) => {
      if (ev.medicoId !== medicoId) return false;

      const evStart = new Date(ev.start);
      const evEnd = new Date(ev.end);

      const mesmoDia =
        evStart.getFullYear() === start.getFullYear() &&
        evStart.getMonth() === start.getMonth() &&
        evStart.getDate() === start.getDate();

      if (!mesmoDia) return false;

      // verifica sobreposição
      return start < evEnd && end > evStart;
    });
  };

  // 🔹 Calcula médicos disponíveis
  useEffect(() => {
    if (!horaInicio || !horaFim) {
      setMedicosDisponiveis([]);
      setMedicoSelecionado("");
      return;
    }

    const start = new Date(date);
    const end = new Date(date);
    const [hI] = horaInicio.split(":");
    const [hF] = horaFim.split(":");
    start.setHours(Number(hI), 0, 0, 0);
    end.setHours(Number(hF), 0, 0, 0);

    // filtra apenas os médicos livres no horário
    const disponiveis = medicos.filter((med: any) => {
      if (!med.horarioInicio || !med.horarioFim) return false;

      const medStart = horaParaMinutos(med.horarioInicio);
      const medEnd = horaParaMinutos(med.horarioFim);
      const startMin = horaParaMinutos(horaInicio);
      const endMin = horaParaMinutos(horaFim);

      // fora do horário de trabalho do médico
      if (medStart > startMin || medEnd < endMin) return false;

      // já tem atendimento nesse horário? bloqueia só para ele
      if (medicoTemConflito(med.id, start, end)) return false;

      return true;
    });

    setMedicosDisponiveis(disponiveis);

    // se só tiver um médico livre, seleciona automaticamente
    if (disponiveis.length === 1) {
      setMedicoSelecionado(disponiveis[0].id);
    } else {
      setMedicoSelecionado("");
    }
  }, [horaInicio, horaFim, medicos, eventos, date]);

  const salvar = () => {
    if (!nome.trim() || !horaInicio || !horaFim) {
      alert("Preencha todos os campos!");
      return;
    }

    if (medicosDisponiveis.length === 0) {
      alert("Nenhum médico disponível nesse horário.");
      return;
    }

    if (medicosDisponiveis.length > 1 && !medicoSelecionado) {
      alert("Escolha um médico disponível.");
      return;
    }

    const medicoFinal =
      medicosDisponiveis.find((m) => m.id === medicoSelecionado) ||
      medicosDisponiveis[0];

    const start = new Date(date);
    const end = new Date(date);
    start.setHours(Number(horaInicio.split(":")[0]), 0, 0, 0);
    end.setHours(Number(horaFim.split(":")[0]), 0, 0, 0);

    onSave({
      title: nome,
      start,
      end,
      status,
      medicoId: medicoFinal.id,
      medicoNome: medicoFinal.nome,
    });
  };

  return (
    <div className="space-y-4 text-cyan-700 p-4">
      <h2 className="text-xl font-bold text-center">Agendar Atendimento</h2>
      <p className="text-sm text-center text-gray-600">
        {format(date, "dd/MM/yyyy")}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label>Início</label>
          <select
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            {horas.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Fim</label>
          <select
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            {horas.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>

      <input
        type="text"
        placeholder="Nome do paciente"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option>Pendente</option>
        <option>Confirmado</option>
      </select>

      
        <select
          value={medicoSelecionado}
          onChange={(e) => setMedicoSelecionado(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Escolha um médico</option>
          {medicosDisponiveis.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome}
            </option>
          ))}
        </select>
      

      {medicosDisponiveis.length === 0 && horaInicio && horaFim && (
        <p className="text-red-500 text-sm">
          Nenhum médico disponível nesse horário.
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={salvar}
          className={`px-4 py-2 rounded text-white ${
            nome.trim() && horaInicio && horaFim
              ? "bg-indigo-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Salvar
        </button>
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancelar
        </button>
      </div>
    </div>
  );
}
