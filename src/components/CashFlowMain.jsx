import React, { useEffect, useState, useMemo } from "react";
import { Search, Trash2, PlusCircle, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FormularioLancamento from "./FormularioLancamento";
import CardLancamento from "./CardLancamento";
import toast from "react-hot-toast";

const CashFlowMain = () => {
  const [tipoAtivo, setTipoAtivo] = useState("Entrada");
  const [busca, setBusca] = useState("");

  const [lista, setLista] = useState(() => {
    const salvos = localStorage.getItem("@cashflow:dados");
    return salvos ? JSON.parse(salvos) : [];
  });

  // Efeito para salvar automaticamente sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("@cashflow:dados", JSON.stringify(lista));
  }, [lista]);


  const listaFiltrada = useMemo(() => {
    return lista
      .filter((item) => {
        if (!busca) return true;
        const termo = busca.toLowerCase();
        // Busca profunda em múltiplos campos
        return (
          item.categoria?.toLowerCase().includes(termo) ||
          item.metodo?.toLowerCase().includes(termo) ||
          item.conta?.toLowerCase().includes(termo) ||
          String(item.valor).includes(termo)
        );
      })
      .sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [lista, busca]);

  //  LÓGICA DE CÁLCULO DE SALDO 
  const totais = useMemo(() => {
    return lista.reduce((acc, item) => {
      if (item.tipo === "Entrada") acc.entradas += item.valor;
      if (item.tipo === "Saída") acc.saidas += item.valor;
      if (item.tipo === "Investimento") acc.investido += item.valor;
      return acc;
    }, { entradas: 0, saidas: 0, investido: 0 });
  }, [lista]);

  const handleDeletar = (id) => {
    setLista(prev => prev.filter(item => item.id !== id));
    toast.success("Lançamento removido!");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            CashFlow Lab
          </h1>
          <p className="text-neutral-500 text-sm">Engenharia de Fluxo de Caixa</p>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-purple-500 transition-colors" />
          <input
            type="text"
            placeholder="Pesquisar lógica..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="bg-[#161616] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all w-64"
          />
        </div>
      </header>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Coluna Esquerda: Formulário e Filtros */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
            <div className="flex gap-2 mb-6">
              {["Entrada", "Saída", "Investimento"].map(t => (
                <button
                  key={t}
                  onClick={() => setTipoAtivo(t)}
                  className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${tipoAtivo === t ? 'bg-purple-600 text-white' : 'bg-white/5 text-neutral-500 hover:bg-white/10'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <FormularioLancamento
              tipoSelecionado={tipoAtivo}
              aoConfirmar={(novo) => setLista([novo, ...lista])}
            />
          </div>
        </div>

        {/* Coluna Direita: Lista e Cards */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-center lg:justify-start">
            {listaFiltrada.length > 0 ? (
              <CardLancamento lancamento={listaFiltrada[0]} />
            ) : (
              <div className="w-full h-40 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-neutral-600 italic">
                Aguardando dados para processamento...
              </div>
            )}
          </div>

          {/* Tabela de Lançamentos */}
          <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">Histórico de Operações</h2>
            </div>
            <div className="overflow-y-auto max-h-[400px]">
              <AnimatePresence mode="popLayout">
                {listaFiltrada.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-4 hover:bg-white/[0.02] border-b border-white/5 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${item.tipo === 'Entrada' ? 'bg-green-500/10 text-green-500' : item.tipo === 'Saída' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                        {item.tipo === 'Entrada' ? <TrendingUp size={16} /> : item.tipo === 'Saída' ? <TrendingDown size={16} /> : <PiggyBank size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.categoria}</p>
                        <p className="text-[10px] text-neutral-500">{item.dataDisplay} • {item.conta}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-bold ${item.tipo === 'Entrada' ? 'text-green-500' : 'text-neutral-200'}`}>
                        {item.tipo === 'Saída' ? '-' : '+'} R$ {item.valor.toLocaleString('pt-BR')}
                      </span>
                      <button
                        onClick={() => handleDeletar(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-neutral-600 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowMain;