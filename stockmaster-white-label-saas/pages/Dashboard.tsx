
import React from 'react';
import { 
  Package, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  DollarSign,
  ShoppingCart
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { useBranding } from '../App';

const dataMovimentacao = [
  { name: 'Jan', entradas: 400, saídas: 240 },
  { name: 'Fev', entradas: 300, saídas: 139 },
  { name: 'Mar', entradas: 200, saídas: 980 },
  { name: 'Abr', entradas: 278, saídas: 390 },
  { name: 'Mai', entradas: 189, saídas: 480 },
  { name: 'Jun', entradas: 239, saídas: 380 },
  { name: 'Jul', entradas: 349, saídas: 430 },
];

const dataCategorias = [
  { name: 'Eletrônicos', total: 400 },
  { name: 'Vestuário', total: 300 },
  { name: 'Alimentos', total: 200 },
  { name: 'Limpeza', total: 120 },
  { name: 'Higiene', total: 150 },
];

const Dashboard: React.FC = () => {
  const { branding } = useBranding();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Visão Geral</h2>
          <p className="text-gray-500">Acompanhe os principais indicadores do seu negócio hoje.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <span>Período:</span>
          <span className="font-semibold text-gray-900">Últimos 30 dias</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total de Produtos" 
          value="1,248" 
          change="+12%" 
          isPositive={true} 
          icon={<Package size={24} />} 
          color="blue"
        />
        <StatCard 
          title="Valor em Estoque" 
          value="R$ 45.280" 
          change="+5.4%" 
          isPositive={true} 
          icon={<DollarSign size={24} />} 
          color="green"
        />
        <StatCard 
          title="Saídas Mensais" 
          value="842" 
          change="-2.1%" 
          isPositive={false} 
          icon={<ArrowDownRight size={24} />} 
          color="purple"
        />
        <StatCard 
          title="Estoque Crítico" 
          value="14 Itens" 
          change="Ação necessária" 
          isPositive={null} 
          icon={<AlertTriangle size={24} />} 
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Movimentação de Estoque</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataMovimentacao}>
                  <defs>
                    <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={branding.primaryColor} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={branding.primaryColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area type="monotone" dataKey="entradas" stroke={branding.primaryColor} fillOpacity={1} fill="url(#colorEntradas)" strokeWidth={3} />
                  <Area type="monotone" dataKey="saídas" stroke="#94a3b8" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Vendas por Categoria</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataCategorias}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="total" fill={branding.primaryColor} radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar for Alerts/Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
              Estoque Crítico
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-bold">Urgente</span>
            </h3>
            <div className="space-y-4">
              <CriticalItem name="Smartphone X1" sku="EL-001" stock={2} min={10} />
              <CriticalItem name="Fone Bluetooth Pro" sku="EL-045" stock={0} min={5} />
              <CriticalItem name="Monitor Curvo 27'" sku="EL-092" stock={1} min={4} />
              <button className="w-full mt-4 py-2.5 text-sm font-semibold text-primary bg-primary/5 hover:bg-primary/10 rounded-xl transition-all">
                Ver Todos os Alertas
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Relatórios em PDF</h3>
              <p className="text-gray-400 text-sm mb-6">Gere um fechamento mensal completo em um clique.</p>
              <button className="bg-white text-gray-900 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center gap-2">
                Exportar agora
                <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean | null; icon: React.ReactNode; color: string }> = ({ title, value, change, isPositive, icon, color }) => {
  const colors: any = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-emerald-600 bg-emerald-50',
    purple: 'text-purple-600 bg-purple-50',
    red: 'text-red-600 bg-red-50',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${colors[color]}`}>
          {icon}
        </div>
        {isPositive !== null && (
          <div className={`flex items-center text-sm font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {change}
          </div>
        )}
        {isPositive === null && (
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider">{change}</div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

const CriticalItem: React.FC<{ name: string; sku: string; stock: number; min: number }> = ({ name, sku, stock, min }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
    <div>
      <h4 className="text-sm font-bold text-gray-800">{name}</h4>
      <p className="text-xs text-gray-500">{sku}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-red-600">{stock} uni.</p>
      <p className="text-[10px] text-gray-400 font-medium">Mín: {min}</p>
    </div>
  </div>
);

const TrendingUp = (props: any) => <ShoppingCart {...props} />;

export default Dashboard;
