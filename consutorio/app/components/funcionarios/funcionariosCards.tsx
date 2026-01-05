"use client";

import { useRouter } from "next/navigation";

interface FuncionarioCardProps {
  funcionario: any;
  onEdit: (f: any) => void;
  onDelete: (id: string) => void;
}

export default function FuncionarioCard({
  funcionario,
  onEdit,
  onDelete,
}: FuncionarioCardProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow">
      {funcionario.fotoUrl ? (
        <img
          src={funcionario.fotoUrl}
          alt={funcionario.nome}
          className="w-16 h-16 object-cover rounded-full"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
      )}

      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800">
          {funcionario.nome}
        </h3>
        <p className="text-gray-600">{funcionario.telefone}</p>
        <p className="text-gray-500 text-sm">{funcionario.cargo}</p>
      </div>

      <div className="flex gap-2">
        {/* Botão lupa → leva para página do médico */}
        <button
          onClick={() => router.push(`/medicos/${funcionario.id}`)}
          className="text-cyan-800 hover:text-cyan-700"
          title="Ver detalhes"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Botão editar */}
        <button
          onClick={() => onEdit(funcionario)}
          className="text-cyan-800 hover:text-cyan-700"
          title="Editar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        {/* Botão deletar */}
        <button
          onClick={() => onDelete(funcionario.id)}
          className="text-cyan-800 hover:text-cyan-700"
          title="Excluir"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
