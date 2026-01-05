"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useParams } from "next/navigation";

interface MedicoDetalhesProps {
  funcionarios: any[];
  eventos: any[];
}

export default function MedicoDetalhes({
  funcionarios,
  eventos,
}: MedicoDetalhesProps) {
  const params = useParams();
  const medicoId = params.id;

  const [medico, setMedico] = useState<any>(null);
  const [agendamentosMes, setAgendamentosMes] = useState(0);

  useEffect(() => {
    const encontrado = funcionarios.find((f) => f.id === medicoId);
    setMedico(encontrado);

    if (encontrado) {
      const agora = new Date();
      const mesAtual = agora.getMonth();
      const anoAtual = agora.getFullYear();

      const total = eventos.filter((ev) => {
        const data = new Date(ev.start);
        return (
          ev.medicoId === medicoId &&
          data.getMonth() === mesAtual &&
          data.getFullYear() === anoAtual
        );
      }).length;

      setAgendamentosMes(total);
    }
  }, [medicoId, funcionarios, eventos]);

  if (!medico) return <p>Médico não encontrado</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold text-cyan-700">{medico.nome}</h1>
      {medico.fotoUrl && (
        <img
          src={medico.fotoUrl}
          alt={medico.nome}
          className="w-32 h-32 rounded-full object-cover"
        />
      )}
      <p>
        <strong>Telefone:</strong> {medico.telefone}
      </p>
      <p>
        <strong>Cargo:</strong> {medico.cargo}
      </p>
      <p>
        <strong>Horário de trabalho:</strong> {medico.horarioInicio} -{" "}
        {medico.horarioFim}
      </p>
      <p>
        <strong>Agendamentos neste mês:</strong> {agendamentosMes}
      </p>
    </div>
  );
}
