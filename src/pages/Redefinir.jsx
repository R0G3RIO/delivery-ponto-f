// src/pages/Redefinir.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Redefinir() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const pinSalvo = localStorage.getItem("pinAdmin");
    if (pin === pinSalvo) {
      localStorage.setItem("senhaAdmin", novaSenha);
      alert("Senha redefinida com sucesso!");
      navigate("/admin");
    } else {
      alert("PIN incorreto!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Redefinir Senha do Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Digite o PIN de segurança"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Redefinir Senha
        </button>
      </form>
    </div>
  );
}
