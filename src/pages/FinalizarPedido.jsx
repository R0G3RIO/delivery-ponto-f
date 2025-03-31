import { useState } from "react";

export default function FinalizarPedido({ pedido, onFinalizar }) {
  const [tipoEntrega, setTipoEntrega] = useState("retirada");
  const [endereco, setEndereco] = useState("");

  const handleFinalizar = () => {
    const dadosPedido = {
      ...pedido,
      tipoEntrega,
      endereco: tipoEntrega === "entrega" ? endereco : null,
    };
    onFinalizar(dadosPedido);
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Finalizar Pedido</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Tipo de Entrega:</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="entrega"
              value="retirada"
              checked={tipoEntrega === "retirada"}
              onChange={() => setTipoEntrega("retirada")}
            />
            <span className="ml-2">Retirar no local</span>
          </label>
          <label>
            <input
              type="radio"
              name="entrega"
              value="entrega"
              checked={tipoEntrega === "entrega"}
              onChange={() => setTipoEntrega("entrega")}
            />
            <span className="ml-2">Entrega</span>
          </label>
        </div>
      </div>

      {tipoEntrega === "entrega" && (
        <div className="mb-4">
          <label className="block font-semibold mb-2">Endereço para entrega:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Rua, número, bairro..."
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      <button
        onClick={handleFinalizar}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
