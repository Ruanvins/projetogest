import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import "../styles/ContasPagar.css";

const ContasPagar = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Aqui você define o usuário logado (pode vir do login/localStorage)
  const usuarioId = 1;

  // Carrega as contas do backend
  const fetchContas = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/contas-pagar/usuario/${usuarioId}`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      alert("Não foi possível carregar as contas.");
    }
  };

  useEffect(() => {
    fetchContas();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !value) return;

    const newItem = {
      titulo: title,
      valor: parseFloat(value),
      vencimento: dueDate || null,
      paga: false,
      usuario: { id: usuarioId }
    };

    try {
      const res = await fetch("http://localhost:8080/api/contas-pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
      });
      if (!res.ok) throw new Error("Erro ao salvar conta");

      const saved = await res.json();
      setItems([saved, ...items]);
      setTitle("");
      setValue("");
      setDueDate("");
    } catch (err) {
      console.error(err);
      alert("Não foi possível salvar a conta.");
    }
  };

  const togglePaid = async (id) => {
    const item = items.find(it => it.id === id);
    if (!item) return;

    const updated = { ...item, paga: !item.paga };

    try {
      const res = await fetch(`http://localhost:8080/api/contas-pagar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (!res.ok) throw new Error("Erro ao atualizar conta");

      setItems(items.map(it => it.id === id ? updated : it));
    } catch (err) {
      console.error(err);
      alert("Não foi possível atualizar a conta.");
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/contas-pagar/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Erro ao deletar conta");

      setItems(items.filter(it => it.id !== id));
    } catch (err) {
      console.error(err);
      alert("Não foi possível deletar a conta.");
    }
  };

  const total = items.reduce((s, it) => s + (it.paga ? 0 : (it.valor || 0)), 0);
  const paidCount = items.filter(item => item.paga).length;
  const pendingCount = items.length - paidCount;

  return (
    <div className="pagar-container">
      <nav className="pagar-nav">
        <Link to="/inicio" className="nav-back">Voltar ao Início</Link>
        <h1>Contas a Pagar</h1>
        <div className="nav-stats">
          <span className="stat pending">{pendingCount} pendentes</span>
          <span className="stat paid">{paidCount} pagas</span>
        </div>
      </nav>

      <div className="pagar-card">
        <div className="financial-summary">
          <div className="summary-card total">
            <span className="summary-label">Total Pendente</span>
            <span className="summary-value">R$ {total.toFixed(2)}</span>
          </div>
          <div className="summary-card pending">
            <span className="summary-label">A Pagar</span>
            <span className="summary-value">{pendingCount}</span>
          </div>
          <div className="summary-card completed">
            <span className="summary-label">Pagas</span>
            <span className="summary-value">{paidCount}</span>
          </div>
        </div>

        <div className="form-section">
          <form className="pagar-form modern-form" onSubmit={handleAdd}>
            <div className="form-body">
              <input 
                className="modern-input" 
                placeholder="Qual é a conta?" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
              <input
                type="number"
                step="0.01"
                min="0"
                className="modern-input"
                placeholder="0,00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <input
                type="date"
                className="modern-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary-gradient" disabled={!title || !value}>
                Adicionar Conta
              </button>
              <button type="button" className="btn-secondary" onClick={() => {
                setTitle(''); setValue(''); setDueDate('');
              }}>
                Limpar
              </button>
            </div>
          </form>
        </div>

        <div className="pagar-list-container">
          <h3>Minhas Contas ({items.length})</h3>
          {items.length === 0 ? (
            <p>Nenhuma conta cadastrada.</p>
          ) : (
            <ul className="pagar-list">
              {items.map(item => (
                <li key={item.id} className={`pagar-item ${item.paga ? "paid" : "pending"}`}>
                  <div className="item-main">
                    <div className="item-info">
                      <h4 className="item-title">{item.titulo}</h4>
                      <div className="item-meta">
                        <span className="item-value">R$ {item.valor.toFixed(2)}</span>
                        {item.vencimento && (
                          <span className="item-date">
                            {new Date(item.vencimento).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => togglePaid(item.id)}>
                      {item.paga ? "Desfazer" : "Marcar Paga"}
                    </button>
                    <button onClick={() => removeItem(item.id)}>Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContasPagar;