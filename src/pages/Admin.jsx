import React, { useState, useEffect } from "react";

const diasSemana = [
  "domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"
];

const Admin = () => {
  const [opcoes, setOpcoes] = useState({});
  const [diaSelecionado, setDiaSelecionado] = useState(diasSemana[new Date().getDay()]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    precoMini: "21,00",
    precoMedia: "23,00",
    precoGrande: "25,00"
  });

  const [bebidas, setBebidas] = useState([]);
  const [novaBebida, setNovaBebida] = useState({ nome: "", preco: "" });

  const [aviso, setAviso] = useState("");

  // Carrega dados salvos
  useEffect(() => {
    const localCardapio = localStorage.getItem("cardapio");
    const bebidasSalvas = localStorage.getItem("bebidas");
    const avisoSalvo = localStorage.getItem("aviso");

    if (localCardapio) setOpcoes(JSON.parse(localCardapio));
    else {
      const vazio = {};
      diasSemana.forEach((dia) => (vazio[dia] = []));
      setOpcoes(vazio);
    }

    if (bebidasSalvas) setBebidas(JSON.parse(bebidasSalvas));
    if (avisoSalvo) setAviso(avisoSalvo);
  }, []);

  // Salva cardápio
  useEffect(() => {
    localStorage.setItem("cardapio", JSON.stringify(opcoes));
  }, [opcoes]);

  // Cardápio
  const adicionarOpcao = () => {
    const nova = {
      nome: form.nome,
      descricao: form.descricao,
      tamanhos: {
        mini: form.precoMini,
        media: form.precoMedia,
        grande: form.precoGrande
      }
    };

    const atualizado = {
      ...opcoes,
      [diaSelecionado]: [...(opcoes[diaSelecionado] || []), nova]
    };
    setOpcoes(atualizado);
    setForm({ nome: "", descricao: "", precoMini: "21,00", precoMedia: "23,00", precoGrande: "25,00" });
  };

  const removerOpcao = (index) => {
    const atualizado = {
      ...opcoes,
      [diaSelecionado]: opcoes[diaSelecionado].filter((_, i) => i !== index)
    };
    setOpcoes(atualizado);
  };

  // Bebidas
  const adicionarBebida = () => {
    if (!novaBebida.nome || !novaBebida.preco) return;

    const nova = {
      id: Date.now().toString(),
      nome: novaBebida.nome,
      preco: novaBebida.preco
    };

    const atualizadas = [...bebidas, nova];
    setBebidas(atualizadas);
    localStorage.setItem("bebidas", JSON.stringify(atualizadas));
    setNovaBebida({ nome: "", preco: "" });
  };

  const removerBebida = (id) => {
    const atualizadas = bebidas.filter((b) => b.id !== id);
    setBebidas(atualizadas);
    localStorage.setItem("bebidas", JSON.stringify(atualizadas));
  };

  // Aviso
  const salvarAviso = () => {
    localStorage.setItem("aviso", aviso);
  };

  const removerAviso = () => {
    setAviso("");
    localStorage.removeItem("aviso");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Painel Admin</h1>

      {/* Cardápio */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="font-bold text-lg mb-2">Cardápio</h2>

        <select
          className="border p-2 mb-2 w-full"
          value={diaSelecionado}
          onChange={(e) => setDiaSelecionado(e.target.value)}
        >
          {diasSemana.map((dia) => (
            <option key={dia} value={dia}>
              {dia.charAt(0).toUpperCase() + dia.slice(1)}
            </option>
          ))}
        </select>

        <input
          className="border p-2 mb-2 w-full"
          placeholder="Nome da opção"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        />
        <div className="flex gap-2 mb-2">
          <input
            className="border p-2 w-full"
            placeholder="Mini"
            value={form.precoMini}
            onChange={(e) => setForm({ ...form, precoMini: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Média"
            value={form.precoMedia}
            onChange={(e) => setForm({ ...form, precoMedia: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Grande"
            value={form.precoGrande}
            onChange={(e) => setForm({ ...form, precoGrande: e.target.value })}
          />
        </div>
        <button
          onClick={adicionarOpcao}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          ➕ Adicionar Opção
        </button>

        <ul className="mt-4 space-y-2">
          {(opcoes[diaSelecionado] || []).map((opcao, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 rounded flex justify-between items-start"
            >
              <div>
                <strong>{opcao.nome}</strong>
                <p className="text-sm">{opcao.descricao}</p>
                <p className="text-xs mt-1">
                  Mini: R${opcao.tamanhos.mini} | Média: R${opcao.tamanhos.media} | Grande: R${opcao.tamanhos.grande}
                </p>
              </div>
              <button
                className="text-red-600 text-sm"
                onClick={() => removerOpcao(index)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bebidas */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="font-bold text-lg mb-2">Bebidas</h2>

        <input
          className="border p-2 mb-2 w-full"
          placeholder="Nome da bebida"
          value={novaBebida.nome}
          onChange={(e) => setNovaBebida({ ...novaBebida, nome: e.target.value })}
        />
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Preço"
          type="number"
          value={novaBebida.preco}
          onChange={(e) => setNovaBebida({ ...novaBebida, preco: e.target.value })}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
          onClick={adicionarBebida}
        >
          Adicionar Bebida
        </button>

        <ul className="space-y-2">
          {bebidas.map((bebida) => (
            <li
              key={bebida.id}
              className="bg-gray-100 p-3 rounded flex justify-between items-center"
            >
              <span>{bebida.nome} - R${bebida.preco}</span>
              <button
                className="text-red-500 text-sm"
                onClick={() => removerBebida(bebida.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Aviso */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="font-bold text-lg mb-2">Aviso do Dia</h2>
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="Digite o aviso (ex: hoje não teremos entrega)..."
          value={aviso}
          onChange={(e) => setAviso(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={salvarAviso}
            className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
          >
            Salvar Aviso
          </button>
          <button
            onClick={removerAviso}
            className="bg-red-600 text-white px-4 py-2 rounded w-full"
          >
            Remover Aviso
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
