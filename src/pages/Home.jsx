import React, { useState, useEffect } from "react";
import banner from "../assets/banner-cardapio.png";
import "../index.css";

const enderecoLocal = "Rua David Marcassa Lopes, 540 - Pinhal";
const telefone = "11956477885";

const hoje = new Date();
const diaSemana = [
  "domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"
][hoje.getDay()];

export default function Home() {
  const [opcoes, setOpcoes] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [aviso, setAviso] = useState("");
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [bebidaSelecionada, setBebidaSelecionada] = useState(null);
  const [tamanho, setTamanho] = useState("Mini");
  const [tipoEntrega, setTipoEntrega] = useState("retirada");
  const [endereco, setEndereco] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [mostrarResumo, setMostrarResumo] = useState(false);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("cardapio") || "{}");
    const bebidasSalvas = JSON.parse(localStorage.getItem("bebidas") || "[]");
    const avisoSalvo = localStorage.getItem("aviso") || "";

    setOpcoes(dados[diaSemana] || []);
    setBebidas(bebidasSalvas);
    setAviso(avisoSalvo);
  }, []);

  const selecionarOpcao = (index) => {
    setOpcaoSelecionada(index);
    setTamanho("Mini");
    setTipoEntrega("retirada");
    setEndereco("");
    setQuantidade(1);
    setNomeCliente("");
    setTelefoneCliente("");
    setBebidaSelecionada(null);
    setMostrarResumo(false);
  };

  const calcularTotal = () => {
    const opcao = opcoes[opcaoSelecionada];
    const precoMarmita = parseFloat(opcao?.tamanhos[tamanho.toLowerCase()] || 0);
    const precoBebida = bebidaSelecionada ? parseFloat(bebidas.find(b => b.id === bebidaSelecionada)?.preco || 0) : 0;
    return (precoMarmita + precoBebida) * quantidade;
  };

  const finalizarPedido = () => {
    if (!nomeCliente || !telefoneCliente) {
      alert("Por favor, preencha o nome e telefone do cliente.");
      return;
    }

    const opcao = opcoes[opcaoSelecionada];
    const precoMarmita = parseFloat(opcao?.tamanhos[tamanho.toLowerCase()] || 0);
    const precoBebida = bebidaSelecionada ? parseFloat(bebidas.find(b => b.id === bebidaSelecionada)?.preco || 0) : 0;

    const valorTotal = (precoMarmita + precoBebida) * quantidade;
    const enderecoFinal = tipoEntrega === "entrega" ? endereco : "Retirada no local";
    const bebidaTexto = bebidaSelecionada
      ? `🥤 *Bebida:* ${bebidas.find(b => b.id === bebidaSelecionada)?.nome} (R$ ${precoBebida.toFixed(2)})\n`
      : "";

    const mensagem = `
🍽 *Pedido de Marmita - ${nomeCliente}*
📞 *Telefone:* ${telefoneCliente}
📅 *Dia:* ${diaSemana.toUpperCase()}
🍱 *${opcao.nome}*
📝 ${opcao.descricao}

📦 *Tamanho:* ${tamanho}
🔢 *Quantidade:* ${quantidade}
${bebidaTexto}🚚 *Entrega:* ${enderecoFinal}
💰 *Total:* R$ ${valorTotal.toFixed(2)}
`;

    const url = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-neutral-50 min-h-screen">
      <img src={banner} alt="Banner" className="rounded-xl mb-4 mx-auto max-h-40 object-contain" />

      {aviso && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 mb-4 rounded">
          ⚠️ <strong>Aviso:</strong> {aviso}
        </div>
      )}

      {opcoes.length === 0 ? (
        <p className="text-center text-gray-500 mb-6">
          Nenhuma opção cadastrada para hoje ({diaSemana}).
        </p>
      ) : (
        opcoes.map((opcao, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => selecionarOpcao(index)}
              className="w-full bg-neutral-900 text-white text-left p-4 rounded-xl shadow hover:bg-neutral-800"
            >
              <strong className="text-orange-400 block text-lg mb-1">{opcao.nome}</strong>
              <span>{opcao.descricao}</span>
            </button>

            {opcaoSelecionada === index && !mostrarResumo && (
              <div className="bg-white border rounded-xl mt-2 p-4 space-y-4">
                <div>
                  <label className="font-bold block mb-1">Nome do Cliente:</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Digite seu nome"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Telefone do Cliente:</label>
                  <input
                    type="tel"
                    className="w-full border p-2 rounded"
                    placeholder="Digite seu telefone"
                    value={telefoneCliente}
                    onChange={(e) => setTelefoneCliente(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Tamanho da Marmita:</label>
                  <div className="space-x-4">
                    {["Mini", "Media", "Grande"].map((tam) => (
                      <label key={tam}>
                        <input
                          type="radio"
                          name="tamanho"
                          value={tam}
                          checked={tamanho === tam}
                          onChange={(e) => setTamanho(e.target.value)}
                        /> {tam} - R$ {opcao.tamanhos[tam.toLowerCase()]}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-bold block mb-1">Entrega ou Retirada:</label>
                  <div className="space-x-4">
                    {["retirada", "entrega"].map((tipo) => (
                      <label key={tipo}>
                        <input
                          type="radio"
                          name="tipoEntrega"
                          value={tipo}
                          checked={tipoEntrega === tipo}
                          onChange={(e) => setTipoEntrega(e.target.value)}
                        /> {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                      </label>
                    ))}
                  </div>
                  {tipoEntrega === "entrega" && (
                    <input
                      type="text"
                      className="mt-2 w-full border rounded p-2"
                      placeholder="Digite seu endereço"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                    />
                  )}
                </div>

                {bebidas.length > 0 && (
                  <div>
                    <label className="font-bold block mb-1">Deseja adicionar uma bebida?</label>
                    <select
                      className="w-full border p-2 rounded"
                      value={bebidaSelecionada || ""}
                      onChange={(e) => setBebidaSelecionada(e.target.value || null)}
                    >
                      <option value="">Nenhuma</option>
                      {bebidas.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.nome} - R$ {b.preco}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="font-bold block mb-1">Quantidade:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                    className="border p-2 w-20"
                  />
                </div>

                <button
                  onClick={() => {
                    if (!nomeCliente || !telefoneCliente) {
                      alert("Preencha o nome e telefone do cliente.");
                      return;
                    }
                    setMostrarResumo(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                  Ver Resumo do Pedido
                </button>
              </div>
            )}

            {opcaoSelecionada === index && mostrarResumo && (
              <div className="bg-green-50 border border-green-600 rounded-xl mt-2 p-4 space-y-4 text-sm">
                <p><strong>Cliente:</strong> {nomeCliente}</p>
                <p><strong>Telefone:</strong> {telefoneCliente}</p>
                <p><strong>Opção:</strong> {opcao.nome}</p>
                <p><strong>Descrição:</strong> {opcao.descricao}</p>
                <p><strong>Tamanho:</strong> {tamanho}</p>
                <p><strong>Quantidade:</strong> {quantidade}</p>
                {bebidaSelecionada && (
                  <p><strong>Bebida:</strong> {bebidas.find(b => b.id === bebidaSelecionada)?.nome}</p>
                )}
                {tipoEntrega === "entrega" && (
                  <p><strong>Endereço:</strong> {endereco}</p>
                )}
                <p><strong>Total:</strong> R$ {calcularTotal().toFixed(2)}</p>

                <div className="flex gap-2">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded w-full"
                    onClick={() => setMostrarResumo(false)}
                  >
                    Editar Pedido
                  </button>
                  <button
                    onClick={finalizarPedido}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                  >
                    Enviar via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      <div className="text-center mt-8 text-sm text-gray-600">
        <p className="font-bold text-orange-600">
          P: R$21,00 &nbsp;&nbsp; M: R$23,00 &nbsp;&nbsp; G: R$25,00
        </p>
        <p className="italic">Todas as opções acompanham salada</p>
        <div className="mt-2">
          <p>📍 {enderecoLocal}</p>
          <p>📦 DELIVERY E RETIRADA</p>
          <p>📞 (11) 95647-7885</p>
          <p className="text-xs">*Cobramos taxa de entrega</p>
        </div>
      </div>
    </div>
  );
}
