import React from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

export default function CardLancamento({ lancamento }) {
    if (!lancamento) return null;

    // Formatação de Moeda
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(lancamento.valor || 0);

    const idCurto = lancamento.id?.toString().slice(-6) || "------";

    const dataFormatada = (() => {
        const d = lancamento.dataDisplay || lancamento.data;
        if (!d) return "";
        if (d.includes("/")) return d;

        const partes = d.split("-");

        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}`;
        }

        return d;
    })();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-[400px] aspect-[1.8/1] rounded-3xl p-6 overflow-hidden bg-[#111] border border-white/10 shadow-2xl"
        >
            {/* Glow de Fundo */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 blur-[60px] rounded-full" />

            <div className="h-full flex flex-col justify-between relative z-10">

                {/* HEADER */}
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-purple-400">
                        <Wallet size={24} />
                    </div>

                    <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-[0.2em]">
                        {lancamento.tipo || "Registro"}
                    </span>
                </div>

                {/* CONTEÚDO */}
                <div>
                    <p className="text-neutral-400 text-xs font-medium mb-1 truncate">
                        {lancamento.categoria || "Sem categoria"}
                    </p>

                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        {valorFormatado}
                    </h2>
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-end">
                    <p className="text-[10px] text-neutral-500 font-mono italic">
                        ID: {idCurto}
                    </p>

                    <p className="text-xs text-neutral-400 font-bold">
                        {dataFormatada}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}