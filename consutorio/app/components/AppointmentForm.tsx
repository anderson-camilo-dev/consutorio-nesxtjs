"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

interface AppointmentFormProps {
  slotInfo?: {
    date?: Date;
    initialStart?: Date;
    initialEnd?: Date;
  };
  medicos?: any[]; // médicos disponíveis
  onSave: (event: any) => void;
  onCancel: () => void;
}

export default function AppointmentForm({
  slotInfo = {},
  medicos = [],
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

  // Horas cheias para select
  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0") + ":00"
  );

  const horaParaMinutos = (hora: string) => {
    const [h, m] = hora.trim().split(":").map(Number);
    return h * 60 + m;
  };

  useEffect(() => {
    if (!horaInicio || !horaFim) {
      setMedicosDisponiveis([]);
      setMedicoSelecionado("");
      return;
    }

    const startMin = horaParaMinutos(horaInicio);
    const endMin = horaParaMinutos(horaFim);

    const disp = medicos.filter((med: any) => {
      if (
        typeof med.horarioInicio !== "string" ||
        typeof med.horarioFim !== "string" ||
        !med.horarioInicio.includes(":") ||
        !med.horarioFim.includes(":")
      ) {
        return false;
      }

      const medStart = horaParaMinutos(med.horarioInicio);
      const medEnd = horaParaMinutos(med.horarioFim);

      return medStart <= startMin && medEnd >= endMin;
    });

    setMedicosDisponiveis(disp);
    if (disp.length === 1) setMedicoSelecionado(disp[0].id);
    else setMedicoSelecionado("");
  }, [horaInicio, horaFim, medicos]);

  const salvar = () => {
    if (!nome.trim() || !horaInicio || !horaFim) {
      alert("Preencha todos os campos!");
      return;
    }

    if (medicosDisponiveis.length === 0) {
      alert("Não há médicos disponíveis nesse horário!");
      return;
    }

    if (medicosDisponiveis.length > 1 && !medicoSelecionado) {
      alert("Escolha um dos médicos disponíveis!");
      return;
    }

    const [hI] = horaInicio.split(":");
    const [hF] = horaFim.split(":");

    const start = new Date(date);
    start.setHours(parseInt(hI), 0);

    const end = new Date(date);
    end.setHours(parseInt(hF), 0);

    onSave({
      title: nome,
      start,
      end,
      status,
      medicoId: medicoSelecionado || medicosDisponiveis[0].id,
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
              <option key={h} value={h}>
                {h}
              </option>
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
              <option key={h} value={h}>
                {h}
              </option>
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

      {medicosDisponiveis.length > 1 && (
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
      )}

      {medicosDisponiveis.length === 0 && horaInicio && horaFim && (
        <p className="text-red-500 text-sm">
          Sem médico disponível nesse horário.
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
          disabled={!nome.trim() || !horaInicio || !horaFim}
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
