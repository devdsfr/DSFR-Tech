
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Download,
  AlertCircle,
  X,
  Check,
  AlertTriangle
} from 'lucide-react';
import { useBranding } from '../App';
import { Product } from '../types';

const initialProducts: Product[] = [
  { id: '1', name: 'Smartphone Galaxy S23', sku: 'EL-10293', category: 'Eletrônicos', supplier: 'Samsung LTDA', costPrice: 3200, salePrice: 4599, stock: 15, minStock: 5 },
  { id: '2', name: 'MacBook Air M2', sku: 'EL-88211', category: 'Eletrônicos', supplier: 'Apple Inc', costPrice: 7500, salePrice: 10999, stock: 4, minStock: 3 },
  { id: '3', name: 'Camiseta Básica Algodão', sku: 'VS-00129', category: 'Vestuário', supplier: 'TexBrasil', costPrice: 25, salePrice: 59.9, stock: 120, minStock: 20 },
  { id: '4', name: 'Monitor LG 29 Ultrawide', sku: 'EL-00921', category: 'Eletrônicos', supplier: 'LG Eletrônicos', costPrice: 1100, salePrice: 1699, stock: 2, minStock: 5 },
  { id: '5', name: 'Mouse Gamer RGB', sku: 'AC-77621', category: 'Acessórios', supplier: 'Logitech', costPrice: 120, salePrice: 249, stock: 45, minStock: 10 },
];

const Products: React.FC = () => {
  const { branding } = useBranding();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  
  // Modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Estado de Item Selecionado
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Categorias únicas para o filtro
  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return ['Todas', ...Array.from(new Set(cats))];
  }, [products]);

  // Lógica de Filtro e Busca
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'Todas' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  // --- Handlers de Ação ---

  const confirmDelete = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = () => {
    if (productToDelete) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleExport = () => {
    const headers = ['ID', 'Nome', 'SKU', 'Categoria', 'Preço Custo', 'Preço Venda', 'Estoque'];
    const csvContent = [
      headers.join(','),
      ...filteredProducts.map(p => `${p.id},${p.name},${p.sku},${p.category},${p.costPrice},${p.salePrice},${p.stock}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'produtos_estoque.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData: Product = {
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      category: formData.get('category') as string,
      supplier: formData.get('supplier') as string || 'Não informado',
      costPrice: Number(formData.get('costPrice')),
      salePrice: Number(formData.get('salePrice')),
      stock: Number(formData.get('stock')),
      minStock: Number(formData.get('minStock')),
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts(prev => [productData, ...prev]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Produtos</h2>
          <p className="text-gray-500">Cadastre e controle os itens do seu catálogo.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium"
          >
            <Download size={18} />
            Exportar
          </button>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-2.5 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 active:scale-[0.98] transition-all bg-primary"
            style={{ backgroundColor: branding.primaryColor }}
          >
            <Plus size={20} />
            Novo Produto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Filters bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Preço (Venda)</th>
                <th className="px-6 py-4 text-center">Estoque</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">{product.name}</span>
                      <span className="text-xs text-gray-400 uppercase tracking-tight">{product.sku}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.salePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`font-bold ${product.stock <= product.minStock ? 'text-red-500' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                      {product.stock <= product.minStock && (
                        <AlertCircle size={14} className="text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      product.stock > product.minStock 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : product.stock === 0 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-orange-100 text-orange-700'
                    }`}>
                      {product.stock > product.minStock ? 'Em Estoque' : product.stock === 0 ? 'Indisponível' : 'Estoque Baixo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => confirmDelete(product)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Nenhum produto encontrado com os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Mostrando {filteredProducts.length} de {products.length} resultados</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-50 border border-gray-200 rounded text-sm disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 bg-primary text-white rounded text-sm font-medium" style={{ backgroundColor: branding.primaryColor }}>1</button>
            <button className="px-3 py-1 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50">Próximo</button>
          </div>
        </div>
      </div>

      {/* Modal Adicionar/Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                  <input 
                    name="name" 
                    defaultValue={editingProduct?.name}
                    required
                    placeholder="Ex: Teclado Mecânico RGB"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input 
                    name="sku" 
                    defaultValue={editingProduct?.sku}
                    required
                    placeholder="Ex: TC-12345"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <input 
                    name="category" 
                    defaultValue={editingProduct?.category}
                    required
                    placeholder="Ex: Acessórios"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço de Custo (R$)</label>
                  <input 
                    name="costPrice" 
                    type="number" 
                    step="0.01"
                    defaultValue={editingProduct?.costPrice}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço de Venda (R$)</label>
                  <input 
                    name="salePrice" 
                    type="number" 
                    step="0.01"
                    defaultValue={editingProduct?.salePrice}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Inicial</label>
                  <input 
                    name="stock" 
                    type="number" 
                    defaultValue={editingProduct?.stock}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Mínimo</label>
                  <input 
                    name="minStock" 
                    type="number" 
                    defaultValue={editingProduct?.minStock}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
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
                  {editingProduct ? 'Salvar Alterações' : 'Cadastrar Produto'}
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
              Você está prestes a excluir o produto <span className="font-bold text-gray-800">"{productToDelete?.name}"</span>. 
              Esta ação não pode ser desfeita.
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
                Excluir Produto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
