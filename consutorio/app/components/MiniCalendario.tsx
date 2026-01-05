"use client";

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";

interface MiniCalendarioProps {
  eventos: any[];
  selectedDate: Date;
  onChangeMonth: (newDate: Date) => void;
  onSelectDate: (date: Date) => void;
}

export default function MiniCalendario({
  eventos,
  selectedDate,
  onChangeMonth,
  onSelectDate,
}: MiniCalendarioProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);

  const daysInMonth = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const eventsByDay: Record<string, boolean> = {};
  eventos.forEach((ev) => {
    const key = format(ev.start, "yyyy-MM-dd");
    eventsByDay[key] = true;
  });

  // Navegar meses
  const nextMonth = () => onChangeMonth(addMonths(selectedDate, 1));
  const prevMonth = () => onChangeMonth(addMonths(selectedDate, -1));

  return (
    <div className="w-full max-w-xs p-4 shadow-md bg-white rounded-lg ">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={prevMonth}
          className="text-cyan-800 hover:text-cyan-700 font-bold"
        >
          {"<"}
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {format(monthStart, "MMMM yyyy", { locale: ptBR })}
        </h2>
        <button
          onClick={nextMonth}
          className="text-cyan-800 hover:text-cyan-700 font-bold"
        >
          {">"}
        </button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 text-xs text-center font-medium text-gray-500">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* Dias do mês */}
      <div className="grid grid-cols-7 gap-1 mt-2 text-sm text-center">
        {daysInMonth.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const hasEvent = eventsByDay[key];
          const isToday = isSameDay(day, new Date());

          return (
            <button
              onClick={() => onSelectDate(day)}
              key={key}
              className={`
                relative p-2 rounded-lg transition
                ${
                  isToday
                    ? "bg-cyan-800 text-white"
                    : "hover:bg-indigo-100 bg-zinc-100 text-gray-800"
                }
              `}
            >
              {format(day, "d")}

              {/* ponto no dia com evento */}
              {hasEvent && (
                <span className="absolute -bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
