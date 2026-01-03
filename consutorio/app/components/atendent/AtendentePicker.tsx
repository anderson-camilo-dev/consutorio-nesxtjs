"use client";
import { useState } from "react";
import Modal from "../Modal";
import AtendenteForm from "./AtendenteForm";

export default function AtendentePicker({
  atendentes,
  onSelect,
  onClose,
  onAdd,
}: {
  atendentes: any[];
  onSelect: (att: any) => void;
  onClose: () => void;
  onAdd: (newAtt: any) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        {!showAddForm && (
          <>
            <h2 className="text-xl font-bold text-center">Escolher Atendente</h2>

            {atendentes.length > 0 ? (
              atendentes.map((att) => (
                <button
                  key={att.id}
                  onClick={() => onSelect(att)}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <img
                    src={att.fotoUrl}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span>{att.nome}</span>
                </button>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Nenhum atendente cadastrado
              </p>
            )}

            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-cyan-800 text-white py-2 rounded-lg"
            >
              + Adicionar novo atendente
            </button>
          </>
        )}

        {showAddForm && (
          <AtendenteForm
            onSave={(newAtt) => {
              onAdd(newAtt);
              onSelect(newAtt);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </div>
    </Modal>
  );
}
