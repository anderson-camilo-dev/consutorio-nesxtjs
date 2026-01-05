"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import Modal from "./Modal";
import AppointmentForm from "./AppointmentForm";

const locales = { "pt-BR": ptBR };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarioProps {
  medicos: any[];
  eventos: any[];
  setEventos: React.Dispatch<React.SetStateAction<any[]>>;
  dataAtual: Date;
  setDataAtual: (d: Date) => void;
}

export default function CalendarioAtendimentos({
  medicos,
  eventos,
  setEventos,
  dataAtual,
  setDataAtual,
}: CalendarioProps) {
  const [visualizacaoAtual, setVisualizacaoAtual] = useState<View>("month");
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
  const [slotSelecionado, setSlotSelecionado] = useState<any>(null);
  const [eventoSelecionado, setEventoSelecionado] = useState<any>(null);

  // 🔹 Carrega eventos do localStorage ao montar
  useEffect(() => {
    const eventosSalvos = JSON.parse(localStorage.getItem("eventos") || "[]");
    const eventosConvertidos = eventosSalvos.map((e: any) => {
      const start = new Date(e.start);
      const end = new Date(e.end);
      return {
        ...e,
        start: isNaN(start.getTime()) ? new Date() : start,
        end: isNaN(end.getTime()) ? new Date() : end,
      };
    });
    if (eventosConvertidos.length > 0) setEventos(eventosConvertidos);
  }, [setEventos]);

  // Navegação e visualização
  const aoNavegar = useCallback((novaData: Date) => setDataAtual(novaData), [setDataAtual]);
  const aoTrocarVisualizacao = useCallback(
    (novaVis: View) => setVisualizacaoAtual(novaVis),
    []
  );

  const aoSelecionarSlot = useCallback((slotInfo: any) => {
    setSlotSelecionado({
      date: slotInfo.start,
      initialStart: slotInfo.start,
      initialEnd: slotInfo.end,
    });
    setMostrarModalCriar(true);
  }, []);

  // Adiciona evento e salva no localStorage
  const adicionarEvento = (evento: any) => {
    const novoEvento = { ...evento, id: Date.now().toString() };
    const novosEventos = [...eventos, novoEvento];
    setEventos(novosEventos);
    localStorage.setItem("eventos", JSON.stringify(novosEventos));
    setMostrarModalCriar(false);
  };

  const excluirEvento = (eventoId: string) => {
    const novosEventos = eventos.filter((e) => e.id !== eventoId);
    setEventos(novosEventos);
    localStorage.setItem("eventos", JSON.stringify(novosEventos));
    setEventoSelecionado(null);
  };

  // Adiciona bolinha vermelha se tiver médico no dia
  const dayPropGetter = (date: Date) => {
    const temMedico = medicos.some((med) => {
      if (!med.dataInicio || !med.dataFim) return false;
      const inicio = new Date(med.dataInicio);
      const fim = new Date(med.dataFim);
      return isWithinInterval(date, { start: inicio, end: fim });
    });

    return {
      style: { position: "relative" },
      className: temMedico ? "tem-medico" : "",
    };
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          📅 Agenda de Atendimentos
        </h1>
        <button
          onClick={() => {
            setSlotSelecionado({ date: new Date() });
            setMostrarModalCriar(true);
          }}
          className="bg-cyan-800 text-white/90 px-5 py-2 rounded-lg shadow hover:bg-cyan-600 transition"
        >
          + Novo Atendimento
        </button>
      </div>

      <div className="bg-white/70 text-black/50 rounded-lg shadow-md p-4 h-[700px]">
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          date={dataAtual}
          onNavigate={aoNavegar}
          view={visualizacaoAtual}
          onView={aoTrocarVisualizacao}
          selectable
          onSelectSlot={aoSelecionarSlot}
          onSelectEvent={(event) => setEventoSelecionado(event)}
          views={["month", "week", "day", "agenda"]}
          culture="pt-BR"
          dayPropGetter={dayPropGetter}
          messages={{
            date: "Data",
            time: "Hora",
            event: "Atendimento",
            allDay: "Dia inteiro",
            week: "Semana",
            day: "Dia",
            month: "Mês",
            previous: "Anterior",
            next: "Próximo",
            today: "Hoje",
            agenda: "Agenda",
            noEventsInRange: "Nenhum atendimento",
          }}
          components={{
            event: ({ event }: any) => (
              <div
                className={`px-2 py-1 rounded w-full text-sm font-medium font-sans
                ${event.status === "Confirmado"
                  ? "bg-blue-500/70 text-white/70"
                  : "bg-blue-300 text-black/60"
                }`}
              >
                <div className="leading-tight">
                  <span className="block font-semibold">{event.title}</span>
                  {event.medicoNome && (
                    <span
                      className={`text-xs ${event.status === "Confirmado" ? "text-white/80" : "text-black/80"}`}
                    >
                      Dr(a). {event.medicoNome}
                    </span>
                  )}
                </div>
              </div>
            ),
          }}
        />
      </div>

      {mostrarModalCriar && slotSelecionado && (
        <Modal onClose={() => setMostrarModalCriar(false)}>
          <AppointmentForm
            slotInfo={slotSelecionado}
            medicos={medicos}
            eventos={eventos}
            onSave={adicionarEvento}
            onCancel={() => setMostrarModalCriar(false)}
          />
        </Modal>
      )}

      {eventoSelecionado && (
        <Modal onClose={() => setEventoSelecionado(null)}>
          <div className="space-y-6 text-black/80">
            <h2 className="text-xl font-bold text-center">📋 Detalhes do Atendimento</h2>

            <p>
              <strong>Paciente:</strong> {eventoSelecionado.title}
            </p>
            <p>
              <strong>Data:</strong> {format(new Date(eventoSelecionado.start), "dd/MM/yyyy")}
            </p>
            <p>
              <strong>Horário:</strong>{" "}
              {format(new Date(eventoSelecionado.start), "HH:mm")} -{" "}
              {format(new Date(eventoSelecionado.end), "HH:mm")}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => excluirEvento(eventoSelecionado.id)}
                className="flex-1 bg-cyan-800 hover:bg-cyan-700 text-white py-2 rounded-lg"
              >
                Excluir
              </button>
              <button
                onClick={() => setEventoSelecionado(null)}
                className="flex-1 bg-gray-300 py-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </Modal>
      )}

      <style jsx>{`
        .tem-medico::after {
          content: "";
          width: 8px;
          height: 8px;
          background-color: red;
          border-radius: 50%;
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </>
  );
}
