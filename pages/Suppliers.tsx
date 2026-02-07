
import React, { useState, useMemo } from 'react';
import { 
  Truck, 
  Plus, 
  Search, 
  X, 
  Check, 
  Edit2, 
  Trash2, 
  AlertTriangle,
  Mail,
  Phone,
  Tag,
  ExternalLink
} from 'lucide-react';
import { useBranding } from '../App';
import { Supplier } from '../types';

const initialSuppliers: Supplier[] = [
  { id: '1', name: 'Samsung Brasil LTDA', contact: 'comercial@samsung.com.br', category: 'Eletrônicos' },
  { id: '2', name: 'Apple Inc Operations', contact: 'supply@apple.com', category: 'Eletrônicos' },
  { id: '3', name: 'TexBrasil Têxtil', contact: 'vendas@texbrasil.com.br', category: 'Vestuário' },
  { id: '4', name: 'LG Eletrônicos SP', contact: 'contato@lg.com.br', category: 'Eletrônicos' },
  { id: '5', name: 'Logitech Solutions', contact: 'support@logitech.com', category: 'Acessórios' },
];

const Suppliers: React.FC = () => {
  const { branding } = useBranding();
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // States de Seleção
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);

  // Filtro de Busca
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [suppliers, searchTerm]);

  // Handlers
  const openAddModal = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  const openEditModal = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const openDeleteModal = (supplier: Supplier) => {
    setSupplierToDelete(supplier);
    setIsDeleteModalOpen(true);
  };

  const handleSaveSupplier = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const supplierData: Supplier = {
      id: editingSupplier?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      contact: formData.get('contact') as string,
      category: formData.get('category') as string,
    };

    if (editingSupplier) {
      setSuppliers(prev => prev.map(s => s.id === editingSupplier.id ? supplierData : s));
    } else {
      setSuppliers(prev => [supplierData, ...prev]);
    }

    setIsModalOpen(false);
  };

  const executeDelete = () => {
    if (supplierToDelete) {
      setSuppliers(prev => prev.filter(s => s.id !== supplierToDelete.id));
      setIsDeleteModalOpen(false);
      setSupplierToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Fornecedores</h2>
          <p className="text-gray-500">Mantenha o registro de todos os seus parceiros comerciais.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-2.5 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 active:scale-[0.98] transition-all bg-primary"
          style={{ backgroundColor: branding.primaryColor }}
        >
          <Plus size={20} />
          Novo Fornecedor
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
           <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, contato ou categoria..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredSuppliers.length > 0 ? filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="bg-gray-50/50 border border-gray-200 rounded-2xl p-5 hover:border-primary/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  <Truck size={24} className="text-primary" style={{ color: branding.primaryColor }} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openEditModal(supplier)}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-white rounded-lg transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => openDeleteModal(supplier)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{supplier.name}</h3>
              <div className="flex items-center gap-1.5 mb-4">
                <Tag size={12} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{supplier.category}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200/60">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span className="truncate">{supplier.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <span>(11) 98888-7777</span> {/* Placeholder for phone */}
                </div>
              </div>

              <button className="w-full mt-6 py-2 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-all text-xs flex items-center justify-center gap-2">
                Ver Ficha Completa
                <ExternalLink size={12} />
              </button>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center text-gray-400">
              Nenhum fornecedor encontrado.
            </div>
          )}
        </div>
      </div>

      {/* Modal Adicionar/Editar Fornecedor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {editingSupplier ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveSupplier} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                <input 
                  name="name" 
                  defaultValue={editingSupplier?.name}
                  required
                  placeholder="Ex: Fornecedor de Peças Inc"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contato Principal (E-mail)</label>
                <input 
                  name="contact" 
                  type="email"
                  defaultValue={editingSupplier?.contact}
                  required
                  placeholder="vendas@fornecedor.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria de Fornecimento</label>
                <select 
                  name="category"
                  defaultValue={editingSupplier?.category || 'Eletrônicos'}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Vestuário">Vestuário</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Limpeza">Limpeza</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Outros">Outros</option>
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
                  {editingSupplier ? 'Salvar Alterações' : 'Confirmar Cadastro'}
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excluir Fornecedor</h3>
            <p className="text-gray-500 mb-6">
              Você tem certeza que deseja excluir <span className="font-bold text-gray-800">"{supplierToDelete?.name}"</span>? 
              Isso pode afetar o vínculo com produtos existentes.
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
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
