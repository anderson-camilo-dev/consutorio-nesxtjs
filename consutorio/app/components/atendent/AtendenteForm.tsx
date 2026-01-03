"use client";

import { useState } from "react";

interface AtendenteFormProps {
  onSave: (atendente: any) => void;
  onCancel: () => void;
}

export default function AtendenteForm({ onSave, onCancel }: AtendenteFormProps) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFotoUrl(URL.createObjectURL(file));
  };

  const formatTelefone = (value: string) => {
    const numeros = value.replace(/\D/g, "");
    const ddd = numeros.slice(0, 2);
    const parte1 = numeros.slice(2, 7);
    const parte2 = numeros.slice(7, 11);
    if (parte2) return `(${ddd}) ${parte1}-${parte2}`;
    if (parte1) return `(${ddd}) ${parte1}`;
    if (ddd) return `(${ddd}`;
    return "";
  };

  const salvar = () => {
    if (!nome.trim() || !telefone.trim() || !fotoUrl) return;
    onSave({ id: Date.now().toString(), nome, telefone, fotoUrl });
  };

  return (
    <div className="space-y-4 p-4 w-full max-w-sm">
      <h3 className="text-lg font-semibold text-center text-gray-700">Cadastrar Atendente</h3>

      <div className="flex items-center gap-4">
        {fotoUrl && <img src={fotoUrl} alt="Prévia" className="w-24 h-24 object-cover rounded-full border" />}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
          <input type="file" accept="image/*" onChange={handleFotoChange} className="w-full cursor-pointer text-white hover:bg-cyan-600 rounded px-2 py-1 bg-cyan-900"/>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Nome</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full border p-2 rounded" placeholder="Digite o nome do atendente"/>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
        <input type="tel" value={telefone} onChange={(e) => setTelefone(formatTelefone(e.target.value))} className="w-full border p-2 rounded" placeholder="(XX) XXXXX-XXXX"/>
      </div>

      <div className="flex gap-3">
        <button onClick={salvar} className="flex-1 bg-cyan-800 text-white py-2 rounded-lg hover:bg-cyan-700 transition">Salvar</button>
        <button onClick={onCancel} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition">Cancelar</button>
      </div>
    </div>
  );
}
