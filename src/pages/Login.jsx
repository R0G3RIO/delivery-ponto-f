// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const senhaExistente = localStorage.getItem("senhaAdmin");

  const [senha, setSenha] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!senhaExistente) {
      // Cadastra nova senha e PIN
      if (!senha || !pin) return alert("Preencha todos os campos");
      localStorage.setItem("senhaAdmin", senha);
      localStorage.setItem("pinAdmin", pin);
      alert("Senha cadastrada com sucesso!");
      navigate("/admin");
    } else {
      // Login com senha existente
      const senhaSalva = localStorage.getItem("senhaAdmin");
      if (senha === senhaSalva) {
        navigate("/admin");
      } else {
        alert("Senha incorreta!");
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {senhaExistente ? "Login do Admin" : "Cadastrar Senha do Admin"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {!senhaExistente && (
          <input
            type="password"
            placeholder="Digite um PIN de segurança"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {senhaExistente ? "Entrar" : "Cadastrar"}
        </button>
        {senhaExistente && (
          <Link
            to="/redefinir"
            className="block text-sm text-center text-blue-600 mt-2"
          >
            Esqueceu a senha?
          </Link>
        )}
      </form>
    </div>
  );
}
