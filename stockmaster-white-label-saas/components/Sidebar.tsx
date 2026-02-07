
import React from 'react';
import { useBranding } from '../App';
import { Page } from '../types';
import { 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  Users, 
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  TrendingUp,
  Truck
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, branding, setIsLoggedIn } = useBranding();

  const navItems = [
    { id: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: Page.PRODUCTS, label: 'Produtos', icon: Package },
    { id: Page.STOCK, label: 'Movimentações', icon: ArrowLeftRight },
    { id: Page.CUSTOMERS, label: 'Clientes', icon: Users },
    { id: Page.SUPPLIERS, label: 'Fornecedores', icon: Truck },
    { id: Page.REPORTS, label: 'Relatórios', icon: TrendingUp },
    { id: Page.SETTINGS, label: 'Configurações', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <span className="text-3xl">{branding.logo}</span>
        <h1 className="font-bold text-xl text-gray-800 leading-tight">{branding.companyName}</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                isActive 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
