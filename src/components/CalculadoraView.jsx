import React, { useState } from 'react';
import { Calculator, DollarSign, Users, TrendingUp, Sparkles } from 'lucide-react';

export default function CalculadoraView() {
  // Valores iniciando zerados por padrão
  const [viewsPerVideo, setViewsPerVideo] = useState(0);
  const [rpm, setRpm] = useState(0.80); // RPM padrão gringo de referência
  const [videosPerMonth, setVideosPerMonth] = useState(0);
  const [dolarRate, setDolarRate] = useState(5.50);

  // Cálculos matemáticos
  const totalViews = viewsPerVideo * videosPerMonth;
  const qualifiedViews = totalViews * 0.90; // Estimativa de 90% qualificadas (+5s)
  const earningsPerVideoUsd = (viewsPerVideo / 1000) * rpm;
  const totalEarningsUsd = (qualifiedViews / 1000) * rpm;
  const totalEarningsBrl = totalEarningsUsd * dolarRate;
  const halfBrl = totalEarningsBrl / 2;

  return (
    <div className="flex-1 bg-[#080b11] h-screen overflow-y-auto p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#1e2638] pb-6">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Calculadora de RPM & Divisão Duo</h1>
        <p className="text-xs text-slate-400 mt-1">
          Simule o faturamento mensal das contas e a divisão automática de 50% para cada sócio
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
        {/* Sliders de Entrada */}
        <div className="bg-[#0f141f] border border-[#1e2638] rounded-2xl p-6 space-y-6">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Calculator size={18} className="text-slate-300" />
            <span>Parâmetros de Simulação</span>
          </h2>

          {/* Slider 1: Views por Vídeo */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Média de Visualizações por Vídeo:</span>
              <span className="text-white font-bold font-mono">{viewsPerVideo.toLocaleString()} views</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={viewsPerVideo}
              onChange={(e) => setViewsPerVideo(parseInt(e.target.value))}
              className="w-full h-2 bg-[#182032] rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>0</span>
              <span>1 Milhão</span>
              <span>2 Milhões</span>
            </div>
          </div>

          {/* Slider 2: Vídeos Postados no Mês */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Quantidade de Vídeos por Mês:</span>
              <span className="text-white font-bold font-mono">{videosPerMonth} vídeos</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="1"
              value={videosPerMonth}
              onChange={(e) => setVideosPerMonth(parseInt(e.target.value))}
              className="w-full h-2 bg-[#182032] rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>0 (Zerado)</span>
              <span>30 (1/dia)</span>
              <span>60 (2/dia)</span>
              <span>90 (3/dia)</span>
            </div>
          </div>

          {/* Slider 3: RPM Estimado */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">RPM Médio do Nicho (por 1k views):</span>
              <span className="text-emerald-400 font-bold font-mono">US$ {rpm.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.20"
              max="2.50"
              step="0.05"
              value={rpm}
              onChange={(e) => setRpm(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#182032] rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>$0.20 (Brasil)</span>
              <span>$0.80 (Média Gringa)</span>
              <span>$2.50 (EUA Alto)</span>
            </div>
          </div>

          {/* Cotação do Dólar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1e2638] text-xs">
            <span className="text-slate-400">Cotação do Dólar (R$):</span>
            <input
              type="number"
              value={dolarRate}
              onChange={(e) => setDolarRate(parseFloat(e.target.value) || 5.50)}
              className="w-24 bg-[#121927] border border-[#1e2638] rounded-lg px-2.5 py-1 text-right text-xs text-white font-mono focus:outline-none focus:border-slate-500"
            />
          </div>
        </div>

        {/* Card de Resultados */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#0f141f] to-[#121927] border border-[#1e2638] rounded-2xl p-6 space-y-6 shadow-xl">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <span>Projeção de Faturamento Mensal</span>
            </h2>

            {/* Total Geral */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">Faturamento Bruto Estimado:</span>
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                US$ {totalEarningsUsd.toFixed(2)}
              </div>
              <div className="text-sm font-bold text-emerald-400 font-mono">
                R$ {totalEarningsBrl.toFixed(2)}
              </div>
            </div>

            {/* Divisão Duo 50/50 */}
            <div className="p-4 rounded-xl bg-[#080b11] border border-[#1e2638] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-slate-300" />
                  <span className="font-semibold text-slate-200">Divisão Duo (50% cada)</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Líquido</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 bg-[#0f141f] rounded-lg border border-[#1e2638]/70">
                  <div className="text-[10px] text-slate-500">Pedro Henrique</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">R$ {halfBrl.toFixed(2)}</div>
                </div>

                <div className="p-2.5 bg-[#0f141f] rounded-lg border border-[#1e2638]/70">
                  <div className="text-[10px] text-slate-500">Parceiro</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">R$ {halfBrl.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed">
              * Estimativa com retenção qualificada de 90% dos vídeos com duração superior a 60 segundos. Repasses creditados todo dia 15 no PayPal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
