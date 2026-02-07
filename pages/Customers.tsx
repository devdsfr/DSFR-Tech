
import React, { useState, useMemo } from 'react';
import { 
  UserPlus, 
  Mail, 
  Phone, 
  ShoppingBag, 
  Search, 
  X, 
  Check, 
  Edit2, 
  Trash2, 
  AlertTriangle,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { useBranding } from '../App';
import { Customer } from '../types';

const initialCustomers: Customer[] = [
  { id: '1', name: 'João Oliveira', email: 'joao.o@gmail.com', phone: '(11) 98765-4321', status: 'ACTIVE', lastPurchase: '2023-11-10' },
  { id: '2', name: 'Maria Santos', email: 'm.santos@outlook.com', phone: '(21) 99887-7665', status: 'ACTIVE', lastPurchase: '2023-11-15' },
  { id: '3', name: 'Pedro Henrique', email: 'pedro_h@uol.com.br', phone: '(31) 97766-5544', status: 'INACTIVE', lastPurchase: '2023-08-20' },
  { id: '4', name: 'Lucas Ferreira', email: 'lucas.fer@empresa.com', phone: '(11) 95544-3322', status: 'ACTIVE', lastPurchase: '2023-11-01' },
];

const Customers: React.FC = () => {
  const { branding } = useBranding();
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Estados de Seleção
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  // Filtro de Busca
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
    );
  }, [customers, searchTerm]);

  // Handlers
  const openAddModal = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const openDeleteModal = (customer: Customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const handleSaveCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const customerData: Customer = {
      id: editingCustomer?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      status: formData.get('status') as 'ACTIVE' | 'INACTIVE',
      lastPurchase: editingCustomer?.lastPurchase || new Date().toISOString().split('T')[0],
    };

    if (editingCustomer) {
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? customerData : c));
    } else {
      setCustomers(prev => [customerData, ...prev]);
    }

    setIsModalOpen(false);
  };

  const executeDelete = () => {
    if (customerToDelete) {
      setCustomers(prev => prev.filter(c => c.id !== customerToDelete.id));
      setIsDeleteModalOpen(false);
      setCustomerToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Clientes</h2>
          <p className="text-gray-500">Visualize e gerencie sua base de compradores.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-2.5 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 active:scale-[0.98] transition-all bg-primary"
          style={{ backgroundColor: branding.primaryColor }}
        >
          <UserPlus size={20} />
          Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, e-mail ou telefone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y divide-gray-100">
          {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
            <div key={customer.id} className="p-6 hover:bg-gray-50/80 transition-all flex flex-col h-full group relative">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-sm transition-all group-hover:scale-110"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {customer.name.charAt(0)}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    customer.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {customer.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openEditModal(customer)}
                      className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(customer)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{customer.name}</h3>
              
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail size={14} className="shrink-0 text-gray-400" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone size={14} className="shrink-0 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>Última compra: {customer.lastPurchase ? new Date(customer.lastPurchase).toLocaleDateString('pt-br') : 'N/A'}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              Nenhum cliente encontrado para sua busca.
            </div>
          )}
        </div>
      </div>

      {/* Modal Adicionar/Editar Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {editingCustomer ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input 
                  name="name" 
                  defaultValue={editingCustomer?.name}
                  required
                  placeholder="Ex: João da Silva"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input 
                    name="email" 
                    type="email"
                    defaultValue={editingCustomer?.email}
                    required
                    placeholder="joao@email.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                  <input 
                    name="phone" 
                    defaultValue={editingCustomer?.phone}
                    required
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status do Cadastro</label>
                <select 
                  name="status"
                  defaultValue={editingCustomer?.status || 'ACTIVE'}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="ACTIVE">Ativo (Acesso Liberado)</option>
                  <option value="INACTIVE">Inativo (Bloqueado)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-8 py-2.5 text-white font-bold rounded-xl shadow-lg bg-primary hover:opacity-90 transition-all"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <Check size={18} />
                  {editingCustomer ? 'Salvar Alterações' : 'Cadastrar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirmar Exclusão</h3>
            <p className="text-gray-500 mb-6">
              Você está prestes a excluir o cadastro de <span className="font-bold text-gray-800">"{customerToDelete?.name}"</span>. 
              Esta ação removerá o histórico visível.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={executeDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
              >
                Excluir Cadastro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
