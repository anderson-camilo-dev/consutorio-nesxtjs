"use client";

interface FuncionarioCardProps {
  funcionario: any;
  onEdit: (f: any) => void;
  onDelete: (id: string) => void;
  onDetails: (f: any) => void;
}

export default function FuncionarioCard({ funcionario, onEdit, onDelete, onDetails }: FuncionarioCardProps) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
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
        <h3 className="font-semibold text-lg text-gray-800">{funcionario.nome}</h3>
        <p className="text-gray-600">{funcionario.telefone}</p>
        <p className="text-gray-500 text-sm">{funcionario.cargo}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onDetails(funcionario)}
          className="text-blue-600 hover:text-blue-800"
        >
          🔍
        </button>
        <button
          onClick={() => onEdit(funcionario)}
          className="text-yellow-500 hover:text-yellow-700"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(funcionario.id)}
          className="text-red-500 hover:text-red-700"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
