"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AtendimentoChartProps {
  eventos?: any[];
}

export default function AtendimentoChart({
  eventos = [],
}: AtendimentoChartProps) {
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  // Dias do mês atual
  const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

  const atendimentosPorDia = Array(diasNoMes).fill(0);

  eventos.forEach((evento) => {
    const data = new Date(evento.start);

    if (
      data.getMonth() === mesAtual &&
      data.getFullYear() === anoAtual
    ) {
      const dia = data.getDate();
      atendimentosPorDia[dia - 1] += 1;
    }
  });

  const data = {
    labels: Array.from({ length: diasNoMes }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Atendimentos",
        data: atendimentosPorDia,
        fill: true,
        tension: 0.4, // 👈 efeito montanha-russa
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        pointRadius: 4,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
        grid: { color: "#E5E7EB" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Atendimentos por Dia
        </h2>
        <p className="text-sm text-gray-500">
          Evolução diária no mês atual
        </p>
      </div>

      <Line data={data} options={options} />
    </div>
  );
}
