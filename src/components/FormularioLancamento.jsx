import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FormularioLancamento({ tipoSelecionado, aoConfirmar }) {
    // Inicializa a data com o dia atual formatado
    const dataHoje = new Date().toLocaleDateString('pt-BR');

    const [valor, setValor] = useState("");
    const [data, setData] = useState(dataHoje); // Inicia com hoje
    const [categoria, setCategoria] = useState("");
    const [erro, setErro] = useState(false);

    // Máscara de Data 
    const handleDataChange = (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 8) v = v.slice(0, 8);
        if (v.length > 4) v = v.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
        else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
        setData(v);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!valor || !data || !categoria) {
            setErro(true);
            setTimeout(() => setErro(false), 500);
            return;
        }

        const valorNumerico = parseFloat(valor.replace(/[^\d,]/g, "").replace(",", "."));

        aoConfirmar({
            id: Date.now(),
            tipo: tipoSelecionado,
            valor: valorNumerico,
            dataDisplay: data,
            data: data.split('/').reverse().join('-'),
            categoria: categoria
        });

        setValor("");
        setCategoria("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Categoria / Empresa</label>
                <input
                    list="categorias-sugeridas"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Digite ou selecione..."
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl h-12 px-4 text-sm text-white focus:border-purple-500 outline-none transition-all shadow-inner"
                />
                <datalist id="categorias-sugeridas">
                    <option value="Alimentação" />
                    <option value="Lazer" />
                    <option value="Contas Fixas" />
                    <option value="Transporte" />
                    <option value="Serviços Prestados" />
                    <option value="Investimentos" />
                </datalist>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs text-neutral-500 uppercase font-bold">Valor</label>
                    <input
                        type="text"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="R$ 0,00"
                        className="w-full bg-[#121212] border border-zinc-800 rounded-xl h-12 px-4 text-sm text-white focus:border-purple-500 outline-none transition-all"
                    />
                </div>
                <div className="space-y-3 ">
                    <label className="text-xs text-neutral-500 uppercase font-bold">Data de Registro</label>
                    <input
                        type="text"
                        value={data}
                        onChange={handleDataChange}
                        className="w-full bg-[#121212] border border-zinc-800 rounded-xl h-12 px-4 text-sm text-white focus:border-purple-500 outline-none transition-all"
                    />
                </div>
            </div>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                animate={erro ? { x: [-10, 10, -10, 10, 0] } : {}}
                className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all mt-4 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
            >
                Confirmar {tipoSelecionado}
            </motion.button>
        </form>
    );
}