
import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  PieChart, 
  Download, 
  FileText, 
  Calendar,
  ChevronDown,
  Loader2,
  CheckCircle2,
  X,
  FileSearch,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useBranding } from '../App';

const turnoverData = [
  { name: 'Semana 1', valor: 45000 },
  { name: 'Semana 2', valor: 52000 },
  { name: 'Semana 3', valor: 48000 },
  { name: 'Semana 4', valor: 61000 },
];

const categoryData = [
  { name: 'Eletrônicos', value: 55 },
  { name: 'Acessórios', value: 25 },
  { name: 'Vestuário', value: 15 },
  { name: 'Outros', value: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Reports: React.FC = () => {
  const { branding } = useBranding();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerateAnnualReport = () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulando o progresso de geração do relatório (Processamento pesado de dados)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccessModal(true);
      clearInterval(interval);
    }, 3500);
  };

  const handleDownload = () => {
    // Simulação de download de arquivo PDF
    const content = "Relatório de Fechamento Anual - Simulação de Dados";
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fechamento_anual_${new Date().getFullYear()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowSuccessModal(false);
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Relatórios de Desempenho</h2>
          <p className="text-gray-500">Analise profundamente as métricas do seu estoque e vendas.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium cursor-pointer hover:bg-gray-50 transition-all">
            <Calendar size={18} />
            Outubro 2023
            <ChevronDown size={14} />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: branding.primaryColor }}>
            <Download size={18} />
            Exportar Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ReportKPI title="Ticket Médio" value="R$ 482,00" change="+12.5%" isPositive={true} />
        <ReportKPI title="Giro de Estoque" value="4.2x" change="+0.8x" isPositive={true} />
        <ReportKPI title="Custo de Operação" value="R$ 12.450" change="-4.2%" isPositive={true} />
        <ReportKPI title="Taxa de Ruptura" value="2.1%" change="+0.5%" isPositive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Vendas x Período</h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded uppercase">Crescimento 8%</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="valor" stroke={branding.primaryColor} strokeWidth={4} dot={{r: 6, fill: branding.primaryColor, strokeWidth: 3, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Composition Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Composição do Estoque</h3>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            </div>
          </div>
          <div className="h-72 flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 w-full sm:w-auto">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between sm:justify-start gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-xs font-semibold text-gray-600 truncate">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Annual Report Block */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
        <div className="z-10 relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ color: branding.primaryColor, borderColor: branding.primaryColor }}>
              Premium Feature
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Relatório de Fechamento Anual</h3>
          <p className="text-gray-400 max-w-lg">
            Um documento analítico completo com todas as entradas, saídas, prejuízos, lucros e curva ABC de produtos do ano vigente.
            Ideal para auditorias e planejamento orçamentário.
          </p>
          <button 
            onClick={handleGenerateAnnualReport}
            disabled={isGenerating}
            className="mt-6 flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processando Dados...
              </>
            ) : (
              <>
                <FileText size={20} />
                Gerar Documento Anual
              </>
            )}
          </button>
        </div>
        <div className="relative z-10 p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 shrink-0 group-hover:scale-110 transition-transform duration-500">
          <FileSearch size={80} className="text-white/20" />
        </div>
        
        {/* Animated Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-primary/20"></div>
      </div>

      {/* Modal de Carregamento / Progresso */}
      {isGenerating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48" cy="48" r="40"
                  stroke="currentColor" strokeWidth="8" fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="48" cy="48" r="40"
                  stroke="currentColor" strokeWidth="8" fill="transparent"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * progress) / 100}
                  className="text-primary transition-all duration-300 ease-out"
                  style={{ color: branding.primaryColor }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-gray-800">
                {progress}%
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compilando Relatório</h3>
            <p className="text-gray-500 text-sm">
              Estamos consolidando milhares de registros de estoque e movimentações financeiras...
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 py-2 rounded-lg">
              <AlertCircle size={14} />
              Não feche esta aba durante o processo
            </div>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-emerald-500 p-8 flex flex-col items-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold">Relatório Concluído!</h3>
              <p className="text-white/80 text-sm text-center mt-2">
                O arquivo PDF do Fechamento Anual foi gerado com sucesso e está pronto para exportação.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <FileText className="text-red-500" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">fechamento_anual_2023.pdf</p>
                    <p className="text-xs text-gray-500">12.4 MB • Gerado agora</p>
                  </div>
                </div>
                <button 
                  onClick={handleDownload}
                  className="p-2 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-200 transition-colors"
                >
                  <Download size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="py-3 px-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Fechar
                </button>
                <button 
                  onClick={handleDownload}
                  className="py-3 px-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <Download size={18} />
                  Baixar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ReportKPI: React.FC<{ title: string; value: string; change: string; isPositive: boolean }> = ({ title, value, change, isPositive }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm group hover:border-primary/50 transition-all">
    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-black text-gray-900">{value}</span>
      <span className={`text-xs font-bold mb-1 flex items-center gap-0.5 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
        {isPositive ? <TrendingUp size={12} /> : <TrendingUp className="rotate-180" size={12} />}
        {change}
      </span>
    </div>
  </div>
);

export default Reports;
