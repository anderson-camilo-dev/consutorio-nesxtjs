"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AtendimentoChartProps {
  eventos?: any[];
}

export default function AtendimentoChart({
  eventos = [],
}: AtendimentoChartProps) {
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();

  const atendimentosPorMedico: Record<string, number> = {};

  eventos.forEach((evento) => {
    const data = new Date(evento.start);
    if (
      data.getMonth() === mesAtual &&
      data.getFullYear() === anoAtual
    ) {
      const medico = evento.medicoId || "Sem médico";
      atendimentosPorMedico[medico] =
        (atendimentosPorMedico[medico] || 0) + 1;
    }
  });

  const data = {
    labels: Object.keys(atendimentosPorMedico),
    datasets: [
      {
        label: "Atendimentos no mês",
        data: Object.values(atendimentosPorMedico),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Atendimentos por Médico (Mês Atual)",
          },
        },
        scales: {
          y: { beginAtZero: true},
        },
      }}
    />
  );
}
