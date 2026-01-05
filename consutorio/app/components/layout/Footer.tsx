"use client";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import AtendenteForm from "../atendent/AtendenteForm";

export default function AtendentePicker({
  onSelect,
  onClose,
  onAdd,
}: {
  onSelect: (att: any) => void;
  onClose: () => void;
  onAdd: (newAtt: any) => void;
}) {
  const [atendentes, setAtendentes] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const carregar = () => {
      const lista = localStorage.getItem("atendentes");
      setAtendentes(lista ? JSON.parse(lista) : []);
    };
    carregar();
    window.addEventListener("atendente-change", carregar);
    return () => window.removeEventListener("atendente-change", carregar);
  }, []);

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        {!showAddForm ? (
          <>
            <h2 className="text-xl font-bold text-center">Escolher Atendente</h2>
            {atendentes.length > 0 ? (
              atendentes.map((att) => (
                <div key={att.id} className="flex items-center gap-3 justify-between">
                  <button
                    onClick={() => {
                      localStorage.setItem("atendente", JSON.stringify(att));
                      window.dispatchEvent(new Event("atendente-change"));
                      onSelect(att);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 flex-1"
                  >
                    <img src={att.fotoUrl} className="w-12 h-12 rounded-full object-cover" />
                    <span>{att.nome}</span>
                  </button>
                  <button
                    onClick={() => {
                      const lista = atendentes.filter(a => a.id !== att.id);
                      localStorage.setItem("atendentes", JSON.stringify(lista));
                      window.dispatchEvent(new Event("atendente-change"));
                    }}
                    className="text-red-500 px-2 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum atendente cadastrado</p>
            )}
            <button onClick={() => setShowAddForm(true)} className="w-full bg-cyan-800 text-white py-2 rounded-lg">+ Adicionar novo atendente</button>
          </>
        ) : (
          <AtendenteForm
            onSave={(newAtt) => {
              const lista = [...atendentes, newAtt];
              localStorage.setItem("atendentes", JSON.stringify(lista));
              window.dispatchEvent(new Event("atendente-change"));
              onAdd(newAtt);
              onClose();
            }}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </div>
    </Modal>
  );
}
