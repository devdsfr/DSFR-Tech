
import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, 
  ArrowUp, 
  ArrowDown, 
  Calendar,
  History,
  FileText,
  Plus,
  Minus,
  X,
  Check,
  Package,
  User,
  Info
} from 'lucide-react';
import { useBranding } from '../App';
import { StockMovement, Product } from '../types';

// Simulando a lista de produtos para seleção nos modais
const availableProducts: Product[] = [
  { id: '1', name: 'Smartphone Galaxy S23', sku: 'EL-10293', category: 'Eletrônicos', supplier: 'Samsung LTDA', costPrice: 3200, salePrice: 4599, stock: 15, minStock: 5 },
  { id: '2', name: 'MacBook Air M2', sku: 'EL-88211', category: 'Eletrônicos', supplier: 'Apple Inc', costPrice: 7500, salePrice: 10999, stock: 4, minStock: 3 },
  { id: '3', name: 'Camiseta Básica Algodão', sku: 'VS-00129', category: 'Vestuário', supplier: 'TexBrasil', costPrice: 25, salePrice: 59.9, stock: 120, minStock: 20 },
  { id: '4', name: 'Monitor LG 29 Ultrawide', sku: 'EL-00921', category: 'Eletrônicos', supplier: 'LG Eletrônicos', costPrice: 1100, salePrice: 1699, stock: 2, minStock: 5 },
  { id: '5', name: 'Mouse Gamer RGB', sku: 'AC-77621', category: 'Acessórios', supplier: 'Logitech', costPrice: 120, salePrice: 249, stock: 45, minStock: 10 },
];

const initialMovements: StockMovement[] = [
  { id: 'm1', productId: '1', productName: 'Smartphone Galaxy S23', type: 'ENTRY', quantity: 10, date: '2023-11-15T10:30:00', user: 'Carlos Silva' },
  { id: 'm2', productId: '3', productName: 'Camiseta Básica Algodão', type: 'EXIT', quantity: 45, date: '2023-11-14T15:20:00', user: 'Ana Paula' },
  { id: 'm3', productId: '4', productName: 'Monitor LG 29 Ultrawide', type: 'EXIT', quantity: 1, date: '2023-11-14T09:12:00', user: 'Admin' },
  { id: 'm4', productId: '5', productName: 'Mouse Gamer RGB', type: 'ADJUSTMENT', quantity: -2, date: '2023-11-13T18:45:00', user: 'Sistemas' },
  { id: 'm5', productId: '2', productName: 'MacBook Air M2', type: 'ENTRY', quantity: 2, date: '2023-11-12T11:00:00', user: 'Carlos Silva' },
];

const Stock: React.FC = () => {
  const { branding } = useBranding();
  const [movements, setMovements] = useState<StockMovement[]>(initialMovements);
  const [isOpModalOpen, setIsOpModalOpen] = useState(false);
  const [opType, setOpType] = useState<'ENTRY' | 'EXIT'>('ENTRY');
  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);

  // Stats
  const stats = useMemo(() => {
    const entries = movements.filter(m => m.type === 'ENTRY').reduce((acc, curr) => acc + curr.quantity, 0);
    const exits = movements.filter(m => m.type === 'EXIT').reduce((acc, curr) => acc + Math.abs(curr.quantity), 0);
    return { entries, exits, total: movements.length };
  }, [movements]);

  const handleOpenOp = (type: 'ENTRY' | 'EXIT') => {
    setOpType(type);
    setIsOpModalOpen(true);
  };

  const handleSaveMovement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productId = formData.get('productId') as string;
    const product = availableProducts.find(p => p.id === productId);
    const qty = Number(formData.get('quantity'));

    const newMovement: StockMovement = {
      id: `m${Date.now()}`,
      productId,
      productName: product?.name || 'Produto Desconhecido',
      type: opType,
      quantity: opType === 'ENTRY' ? qty : -qty,
      date: new Date().toISOString(),
      user: 'Admin Usuário',
    };

    setMovements(prev => [newMovement, ...prev]);
    setIsOpModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Movimentações de Estoque</h2>
          <p className="text-gray-500">Histórico completo de entradas, saídas e ajustes.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleOpenOp('ENTRY')}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <ArrowUp size={20} />
            Entrada
          </button>
          <button 
            onClick={() => handleOpenOp('EXIT')}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <ArrowDown size={20} />
            Saída
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ArrowUp size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Entradas do Período</p>
            <p className="text-xl font-bold text-gray-900">{stats.entries} Itens</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <ArrowDown size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Saídas do Período</p>
            <p className="text-xl font-bold text-gray-900">{stats.exits} Itens</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <History size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total de Registros</p>
            <p className="text-xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <History size={18} className="text-gray-400" />
            Atividades Recentes
          </h3>
          <div className="flex items-center gap-2">
             <Calendar size={16} className="text-gray-400" />
             <span className="text-sm font-medium text-gray-600">Filtro: Todos os Registros</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Data/Hora</th>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4 text-center">Qtd</th>
                <th className="px-6 py-4">Operador</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {movements.map((move) => (
                <tr key={move.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {new Date(move.date).toLocaleDateString('pt-br')}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">
                      {new Date(move.date).toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-800">{move.productName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full w-fit ${
                      move.type === 'ENTRY' ? 'text-emerald-700 bg-emerald-100' :
                      move.type === 'EXIT' ? 'text-red-700 bg-red-100' :
                      'text-blue-700 bg-blue-100'
                    }`}>
                      {move.type === 'ENTRY' ? <ArrowUp size={12} /> : 
                       move.type === 'EXIT' ? <ArrowDown size={12} /> : 
                       <ArrowRightLeft size={12} />}
                      {move.type === 'ENTRY' ? 'Entrada' : move.type === 'EXIT' ? 'Saída' : 'Ajuste'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-black ${
                      move.quantity > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {move.quantity > 0 ? '+' : ''}{move.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium">{move.user}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedMovement(move)}
                      className="text-gray-400 hover:text-primary p-2 transition-colors"
                    >
                      <FileText size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Entrada/Saída */}
      {isOpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className={`px-6 py-4 border-b flex items-center justify-between ${
              opType === 'ENTRY' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'
            }`}>
              <h3 className={`text-lg font-bold ${opType === 'ENTRY' ? 'text-emerald-800' : 'text-red-800'}`}>
                {opType === 'ENTRY' ? 'Registrar Entrada de Estoque' : 'Registrar Saída de Estoque'}
              </h3>
              <button onClick={() => setIsOpModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveMovement} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
                <select 
                  name="productId" 
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                >
                  <option value="">Selecione um produto...</option>
                  {availableProducts.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Saldo: {p.stock})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                  <div className="relative">
                    {opType === 'ENTRY' ? (
                      <Plus className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                    ) : (
                      <Minus className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                    )}
                    <input 
                      name="quantity" 
                      type="number" 
                      min="1"
                      required
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motivo / Tipo</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none">
                    {opType === 'ENTRY' ? (
                      <>
                        <option>Compra de Fornecedor</option>
                        <option>Devolução de Cliente</option>
                        <option>Ajuste de Inventário</option>
                      </>
                    ) : (
                      <>
                        <option>Venda Direta</option>
                        <option>Consumo Interno</option>
                        <option>Avaria / Perda</option>
                        <option>Devolução ao Fornecedor</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsOpModalOpen(false)}
                  className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className={`flex items-center gap-2 px-8 py-2.5 text-white font-bold rounded-xl shadow-lg transition-all ${
                    opType === 'ENTRY' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  <Check size={18} />
                  Confirmar {opType === 'ENTRY' ? 'Entrada' : 'Saída'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes da Movimentação */}
      {selectedMovement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-primary text-white flex items-center justify-between" style={{ backgroundColor: branding.primaryColor }}>
              <div>
                <h3 className="text-xl font-bold">Detalhes do Registro</h3>
                <p className="text-white/80 text-xs mt-1">ID da Operação: {selectedMovement.id}</p>
              </div>
              <button onClick={() => setSelectedMovement(null)} className="hover:bg-white/20 p-2 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Package size={24} className="text-primary" style={{ color: branding.primaryColor }} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Produto</p>
                  <h4 className="font-bold text-gray-800">{selectedMovement.productName}</h4>
                  <p className="text-xs text-gray-500">ID Ref: {selectedMovement.productId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Tipo de Operação</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedMovement.type === 'ENTRY' ? 'bg-emerald-500' : 
                        selectedMovement.type === 'EXIT' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="text-sm font-bold text-gray-700">
                        {selectedMovement.type === 'ENTRY' ? 'Entrada' : 
                         selectedMovement.type === 'EXIT' ? 'Saída' : 'Ajuste'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Quantidade</p>
                    <p className={`text-lg font-black mt-1 ${
                      selectedMovement.quantity > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {selectedMovement.quantity} unidades
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Data e Hora</p>
                    <div className="flex items-center gap-2 mt-1 text-gray-700">
                      <Calendar size={14} />
                      <span className="text-sm font-medium">
                        {new Date(selectedMovement.date).toLocaleString('pt-br')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Operador Responsável</p>
                    <div className="flex items-center gap-2 mt-1 text-gray-700">
                      <User size={14} />
                      <span className="text-sm font-medium">{selectedMovement.user}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 text-blue-700 rounded-xl flex items-start gap-3">
                <Info size={18} className="shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  Esta movimentação foi registrada via sistema administrativo. O saldo do estoque foi atualizado automaticamente no momento do salvamento.
                </p>
              </div>

              <button 
                onClick={() => setSelectedMovement(null)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
