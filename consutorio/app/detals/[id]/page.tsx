"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function DetailsPage() {
  const params = useParams();
  const router = useRouter();
  const funcionarioId = params.id;

  const [funcionario, setFuncionario] = useState<any>(null);
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    // 🔹 Buscar dados do localStorage (ou substitua por fetch/Context)
    const dadosFunc = JSON.parse(localStorage.getItem("funcionarios") || "[]");
    const eventosSalvos = JSON.parse(localStorage.getItem("eventos") || "[]");

    const func = dadosFunc.find((f: any) => f.id === funcionarioId);
    setFuncionario(func || null);
    setEventos(eventosSalvos);
  }, [funcionarioId]);

  if (!funcionario) return <p className="p-6">Funcionário não encontrado</p>;

  const tarefasDoMes = eventos.filter(
    (e) =>
      e.medicoId === funcionario.id &&
      new Date(e.start).getMonth() === new Date().getMonth() &&
      new Date(e.start).getFullYear() === new Date().getFullYear()
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 text-cyan-800 hover:text-cyan-700"
      >
        ← Voltar
      </button>

      <h1 className="text-3xl font-bold mb-4">{funcionario.nome}</h1>

      <p>
        <strong>Telefone:</strong> {funcionario.telefone}
      </p>
      <p>
        <strong>Cargo:</strong> {funcionario.cargo}
      </p>
      <p>
        <strong>Plantão:</strong> {funcionario.horarioInicio} - {funcionario.horarioFim}
      </p>

      {funcionario.fotoUrl && (
        <img
          src={funcionario.fotoUrl}
          alt={funcionario.nome}
          className="w-32 h-32 rounded-full object-cover my-4"
        />
      )}

      <div>
        <strong>Tarefas neste mês:</strong>
        {tarefasDoMes.length === 0 ? (
          <p className="text-gray-500 mt-2">Nenhuma tarefa agendada neste mês.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {tarefasDoMes.map((tarefa) => (
              <li key={tarefa.id} className="border rounded-lg p-3 bg-gray-50">
                <p>
                  <strong>Data:</strong> {format(new Date(tarefa.start), "dd/MM/yyyy")}
                </p>
                <p>
                  <strong>Horário:</strong>{" "}
                  {format(new Date(tarefa.start), "HH:mm")} - {format(new Date(tarefa.end), "HH:mm")}
                </p>
                {tarefa.title && (
                  <p>
                    <strong>Paciente:</strong> {tarefa.title}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
