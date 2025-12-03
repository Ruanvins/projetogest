import React, { useState } from "react";
import "../styles/ContasReceber.css";

/*
  Contas a Receber — mesma ideia do ContasPagar mas invertida para receitas.
  - Adicionar receita
  - Marcar como recebida
  - Remover
  - total de receitas pendentes
*/

const fromStorage = () => {
  try {
    const raw = localStorage.getItem("contasReceber");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const ContasReceber = () => {
  const [items, setItems] = useState(fromStorage);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const save = (next) => {
    setItems(next);
    localStorage.setItem("contasReceber", JSON.stringify(next));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !value) return;
    const newItem = {
      id: Date.now(),
      title,
      value: parseFloat(value),
      date: date || null,
      received: false,
    };
    const next = [newItem, ...items];
    save(next);
    setTitle("");
    setValue("");
    setDate("");
  };

  const toggleReceived = (id) => {
    const next = items.map((it) => (it.id === id ? { ...it, received: !it.received } : it));
    save(next);
  };

  const removeItem = (id) => {
    const next = items.filter((it) => it.id !== id);
    save(next);
  };

  const totalPending = items.reduce((s, it) => s + (it.received ? 0 : (it.value || 0)), 0);

  return (
    <div className="receber-container">
      <h2>Contas a Receber</h2>

      <form className="receber-form" onSubmit={handleAdd}>
        <input
          placeholder="Título (ex: Venda X)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Valor (ex: 500.00)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="receber-summary">
        <strong>Total a receber: R$ {totalPending.toFixed(2)}</strong>
      </div>

      <ul className="receber-list">
        {items.length === 0 && <li className="empty">Nenhuma receita registrada.</li>}
        {items.map((it) => (
          <li key={it.id} className={`receber-item ${it.received ? "received" : ""}`}>
            <div className="item-left">
              <h4>{it.title}</h4>
              <span className="value">R$ {Number(it.value).toFixed(2)}</span>
              {it.date && <span className="date">Data: {it.date}</span>}
            </div>

            <div className="item-actions">
              <button onClick={() => toggleReceived(it.id)}>
                {it.received ? "Desmarcar" : "Marcar como recebida"}
              </button>
              <button className="btn-delete" onClick={() => removeItem(it.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContasReceber;
