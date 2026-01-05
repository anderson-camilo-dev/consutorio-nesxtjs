"use client";

import FuncionarioCard from "./funcionariosCards";

interface ListaFuncionariosProps {
  funcionarios?: any[];
  onEdit: (f: any) => void;
  onDelete: (id: string) => void;
  onDetails: (f: any) => void;
}

export default function ListaFuncionarios({
  funcionarios,
  onEdit,
  onDelete,
  onDetails,
}: ListaFuncionariosProps) {
  return (
    <div className="space-y-4 max-w-xs  rounded-lg">
      {!funcionarios || funcionarios.length === 0 ? (
        <p className="text-gray-500">Nenhum funcionário cadastrado.</p>
      ) : (
        funcionarios.map((f) => (
          <FuncionarioCard
            key={f.id}
            funcionario={f}
            onEdit={onEdit}
            onDelete={onDelete}
            onDetails={onDetails}
          />
        ))
      )}
    </div>
  );
}
