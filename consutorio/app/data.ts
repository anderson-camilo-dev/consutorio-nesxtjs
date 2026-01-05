// data.ts
export interface Medico {
  id: string;
  nome: string;
  telefone: string;
  cargo: string;
  fotoUrl?: string;
  horarioInicio: string;
  horarioFim: string;
}

export interface Evento {
  id: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  medicoId: string;
  status: "Confirmado" | "Pendente";
}

// Dados iniciais
export let medicos: Medico[] = [
  {
    id: "1",
    nome: "Dr. João Silva",
    telefone: "(11) 99999-1111",
    cargo: "Cardiologista",
    fotoUrl: "",
    horarioInicio: "08:00",
    horarioFim: "16:00",
  },
  {
    id: "2",
    nome: "Dra. Maria Souza",
    telefone: "(11) 98888-2222",
    cargo: "Clínica Geral",
    fotoUrl: "",
    horarioInicio: "09:00",
    horarioFim: "17:00",
  },
];

export let eventos: Evento[] = [
  {
    id: "101",
    title: "Paciente A",
    start: new Date().toISOString(),
    end: new Date(new Date().getTime() + 30 * 60 * 1000).toISOString(),
    medicoId: "1",
    status: "Confirmado",
  },
];
