"use client";

import { useState, useEffect } from "react";

interface FuncionarioFormProps {
  onSave: (funcionario: any) => void;
  onCancel: () => void;
  funcionarioToEdit?: any;
}

export default function FuncionarioForm({
  onSave,
  onCancel,
  funcionarioToEdit,
}: FuncionarioFormProps) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");

  // Array de horas cheias "HH:00"
  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0") + ":00"
  );

  useEffect(() => {
    if (funcionarioToEdit) {
      setNome(funcionarioToEdit.nome);
      setTelefone(funcionarioToEdit.telefone);
      setCargo(funcionarioToEdit.cargo);
      setFotoUrl(funcionarioToEdit.fotoUrl);
      setHorarioInicio(funcionarioToEdit.horarioInicio || "");
      setHorarioFim(funcionarioToEdit.horarioFim || "");
    }
  }, [funcionarioToEdit]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoUrl(URL.createObjectURL(file));
    }
  };

  const formatTelefone = (value: string) => {
    const numeros = value.replace(/\D/g, "");
    const part1 = numeros.slice(0, 2);
    const part2 = numeros.slice(2, 7);
    const part3 = numeros.slice(7, 11);
    return part3
      ? `(${part1}) ${part2}-${part3}`
      : part2
      ? `(${part1}) ${part2}`
      : part1
      ? `(${part1}`
      : "";
  };

  const handleTelefoneChange = (e: any) => {
    setTelefone(formatTelefone(e.target.value));
  };

  const salvarFuncionario = () => {
    if (
      !nome.trim() ||
      !telefone.trim() ||
      !cargo.trim() ||
      !horarioInicio ||
      !horarioFim
    )
      return;

    onSave({
      id: funcionarioToEdit ? funcionarioToEdit.id : `${Date.now()}`,
      nome,
      telefone,
      cargo,
      fotoUrl,
      horarioInicio,
      horarioFim,
    });
  };

  return (
    <div className="space-y-4 text-cyan-700">
      <h2 className="text-2xl font-bold text-center text-gray-700">
        {funcionarioToEdit ? "Editar Funcionário" : "Cadastrar Funcionário"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          className="mt-1"
        />
        {fotoUrl && (
          <img
            src={fotoUrl}
            alt="Foto do funcionário"
            className="mt-2 w-28 h-28 object-cover rounded-full border"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border p-2 rounded-lg focus:ring-indigo-400"
          placeholder="Nome completo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="tel"
          value={telefone}
          onChange={handleTelefoneChange}
          className="w-full border p-2 rounded-lg focus:ring-indigo-400"
          placeholder="(XX) XXXXX-XXXX"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cargo</label>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full border p-2 rounded-lg focus:ring-indigo-400"
          placeholder="Ex: Médico(a), Doutor(a)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Início do Plantão
          </label>
          <select
            value={horarioInicio}
            onChange={(e) => setHorarioInicio(e.target.value)}
            className="w-full border p-2 rounded-lg focus:ring-indigo-400"
          >
            <option value="">Selecione</option>
            {horas.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fim do Plantão
          </label>
          <select
            value={horarioFim}
            onChange={(e) => setHorarioFim(e.target.value)}
            className="w-full border p-2 rounded-lg focus:ring-indigo-400"
          >
            <option value="">Selecione</option>
            {horas.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={salvarFuncionario}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Salvar
        </button>

        <button
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
