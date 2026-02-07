
import React, { useState } from 'react';
import { 
  Save, 
  Palette, 
  Globe, 
  Shield, 
  User, 
  Users, 
  Lock, 
  ShieldAlert, 
  Clock, 
  Check, 
  X, 
  UserPlus, 
  Key,
  Eye,
  History,
  AlertTriangle
} from 'lucide-react';
import { useBranding } from '../App';

type SettingTab = 'visual' | 'users' | 'security';

interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
}

const Settings: React.FC = () => {
  const { branding, setBranding } = useBranding();
  const [localBranding, setLocalBranding] = useState(branding);
  const [activeTab, setActiveTab] = useState<SettingTab>('visual');

  // User Management State
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    { id: 1, name: 'Admin Usuário', email: 'admin@empresa.com', role: 'Administrador', lastLogin: 'Hoje, 10:45' },
    { id: 2, name: 'Carlos Silva', email: 'carlos@empresa.com', role: 'Operador', lastLogin: 'Ontem, 16:20' },
    { id: 3, name: 'Ana Paula', email: 'ana@empresa.com', role: 'Leitor', lastLogin: '12 Nov, 09:15' },
  ]);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<SystemUser | null>(null);

  const colors = [
    { name: 'Azul Corporativo', value: '#3b82f6' },
    { name: 'Verde Moderno', value: '#10b981' },
    { name: 'Roxo Premium', value: '#8b5cf6' },
    { name: 'Laranja Dinâmico', value: '#f97316' },
    { name: 'Vermelho Intenso', value: '#ef4444' },
    { name: 'Preto Elegante', value: '#1f2937' },
  ];

  const handleSaveVisual = () => {
    setBranding(localBranding);
    alert('Identidade visual atualizada com sucesso!');
  };

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser: SystemUser = {
      id: Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      lastLogin: 'Nunca',
    };
    setSystemUsers(prev => [...prev, newUser]);
    setIsUserModalOpen(false);
  };

  const confirmDeleteUser = (user: SystemUser) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const executeDeleteUser = () => {
    if (userToDelete) {
      setSystemUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleResetPassword = (email: string) => {
    alert(`Um link de redefinição de senha foi enviado para ${email}`);
  };

  return (
    <div className="max-w-5xl space-y-8 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h2>
        <p className="text-gray-500">Gerencie a identidade visual, acessos e segurança da plataforma.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('visual')}
            className={`px-6 py-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'visual' ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-gray-800'
            }`}
            style={activeTab === 'visual' ? { color: branding.primaryColor, borderColor: branding.primaryColor } : {}}
          >
            <Palette size={18} />
            Identidade Visual
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'users' ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-gray-800'
            }`}
            style={activeTab === 'users' ? { color: branding.primaryColor, borderColor: branding.primaryColor } : {}}
          >
            <Users size={18} />
            Usuários e Permissões
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-6 py-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'security' ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-gray-800'
            }`}
            style={activeTab === 'security' ? { color: branding.primaryColor, borderColor: branding.primaryColor } : {}}
          >
            <Shield size={18} />
            Segurança
          </button>
        </div>

        <div className="p-4 md:p-8">
          {/* Visual Identity Content */}
          {activeTab === 'visual' && (
            <div className="space-y-10 animate-fadeIn">
              <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Globe size={16} className="text-gray-400" />
                    Dados da Empresa
                  </h3>
                  <p className="text-xs text-gray-500">Nome e ícone que aparecem no sistema.</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome da Empresa</label>
                    <input 
                      type="text" 
                      value={localBranding.companyName}
                      onChange={(e) => setLocalBranding({...localBranding, companyName: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Emoji do Logo</label>
                    <div className="flex flex-wrap gap-4">
                       {['📦', '🏢', '🏗️', '🛒', '🏭', '🚢', '💼', '📦'].map((emoji, idx) => (
                         <button 
                           key={idx}
                           onClick={() => setLocalBranding({...localBranding, logo: emoji})}
                           className={`w-12 h-12 text-2xl flex items-center justify-center rounded-xl border transition-all ${
                             localBranding.logo === emoji ? 'bg-primary/10 border-primary shadow-sm' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                           }`}
                           style={localBranding.logo === emoji ? { borderColor: branding.primaryColor, backgroundColor: branding.primaryColor + '1A' } : {}}
                         >
                           {emoji}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-gray-100" />

              <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Palette size={16} className="text-gray-400" />
                    Paleta de Cores
                  </h3>
                  <p className="text-xs text-gray-500">Escolha a cor principal para botões e destaques.</p>
                </div>
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setLocalBranding({...localBranding, primaryColor: color.value})}
                        className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                          localBranding.primaryColor === color.value 
                            ? 'bg-white border-primary shadow-sm ring-1 ring-primary' 
                            : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                        }`}
                        style={localBranding.primaryColor === color.value ? { borderColor: branding.primaryColor, boxShadow: `0 0 0 1px ${branding.primaryColor}` } : {}}
                      >
                        <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: color.value }}></div>
                        <span className="text-xs font-bold text-gray-700">{color.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <label className="text-sm font-bold text-gray-600">Cor Customizada:</label>
                    <input 
                      type="color" 
                      value={localBranding.primaryColor}
                      onChange={(e) => setLocalBranding({...localBranding, primaryColor: e.target.value})}
                      className="w-12 h-8 p-0 border-none bg-transparent cursor-pointer rounded overflow-hidden"
                    />
                    <code className="text-xs font-mono bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">{localBranding.primaryColor}</code>
                  </div>
                </div>
              </section>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                <button 
                  onClick={handleSaveVisual}
                  className="flex items-center gap-2 px-8 py-3 text-white font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all bg-primary"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <Save size={18} />
                  Salvar Alterações Visuais
                </button>
              </div>
            </div>
          )}

          {/* Users & Permissions Content */}
          {activeTab === 'users' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900">Gerenciamento de Time</h3>
                  <p className="text-sm text-gray-500">Convide colaboradores e defina seus níveis de acesso.</p>
                </div>
                <button 
                  onClick={() => setIsUserModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 text-white font-bold rounded-xl shadow-lg transition-all bg-primary"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <UserPlus size={18} />
                  Novo Usuário
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3">Usuário</th>
                      <th className="px-4 py-3">Papel / Função</th>
                      <th className="px-4 py-3">Último Acesso</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {systemUsers.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold" style={{ color: branding.primaryColor, backgroundColor: branding.primaryColor + '1A' }}>
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{u.name}</p>
                              <p className="text-xs text-gray-500">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs text-gray-500 font-medium">{u.lastLogin}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5 text-emerald-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-xs font-bold uppercase">Ativo</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button 
                            onClick={() => handleResetPassword(u.email)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors" 
                            title="Redefinir Senha"
                          >
                            <Key size={16} />
                          </button>
                          <button 
                            onClick={() => confirmDeleteUser(u)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors" 
                            title="Remover Acesso"
                          >
                            <X size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security Content */}
          {activeTab === 'security' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 2FA Card */}
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Lock className="text-primary" size={24} style={{ color: branding.primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Autenticação em Dois Fatores (2FA)</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Adicione uma camada extra de segurança à sua conta exigindo um código de verificação no login.
                    </p>
                  </div>
                </div>

                {/* Session Timeout */}
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Clock className="text-primary" size={24} style={{ color: branding.primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Expiração de Sessão</h4>
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary">
                      <option>Após 30 minutos de inatividade</option>
                      <option>Após 1 hora de inatividade</option>
                      <option>Sempre manter logado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Audit Logs Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <History size={18} className="text-gray-400" />
                    Log de Atividades de Segurança
                  </h3>
                  <button className="text-xs font-bold text-primary hover:underline" style={{ color: branding.primaryColor }}>
                    Ver Log Completo
                  </button>
                </div>
                
                <div className="space-y-3">
                  <SecurityLogRow 
                    icon={<Check size={14} className="text-emerald-500" />}
                    action="Login bem sucedido"
                    user="admin@empresa.com"
                    time="Agora mesmo"
                    ip="192.168.0.1"
                  />
                  <SecurityLogRow 
                    icon={<Eye size={14} className="text-blue-500" />}
                    action="Relatório anual gerado"
                    user="ana@empresa.com"
                    time="15 min atrás"
                    ip="172.16.254.1"
                  />
                  <SecurityLogRow 
                    icon={<ShieldAlert size={14} className="text-amber-500" />}
                    action="Tentativa de acesso negada"
                    user="desconhecido@mail.com"
                    time="2 horas atrás"
                    ip="45.18.2.99"
                  />
                </div>
              </div>

              <div className="p-6 bg-red-50 rounded-2xl border border-red-100 border-dashed flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-red-500 shadow-sm">
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-900">Zona de Perigo</h4>
                    <p className="text-sm text-red-700">Encerrar todas as sessões ativas e forçar a troca de senha de todos os usuários.</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Todas as sessões foram encerradas.')}
                  className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-200"
                >
                  Resetar Segurança
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Novo Usuário</h3>
              <button onClick={() => setIsUserModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input 
                  name="name" 
                  required
                  placeholder="Ex: João Silva"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Corporativo</label>
                <input 
                  name="email" 
                  type="email"
                  required
                  placeholder="joao@empresa.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Papel / Nível de Acesso</label>
                <select 
                  name="role"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="Administrador">Administrador (Acesso Total)</option>
                  <option value="Operador">Operador (Estoque e Clientes)</option>
                  <option value="Leitor">Leitor (Apenas Visualização)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
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
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Remover Acesso</h3>
            <p className="text-gray-500 mb-6">
              Você tem certeza que deseja remover o acesso de <span className="font-bold text-gray-800">"{userToDelete?.name}"</span>? 
              O usuário não poderá mais realizar login.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={executeDeleteUser}
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

const SecurityLogRow: React.FC<{ icon: React.ReactNode; action: string; user: string; time: string; ip: string }> = ({ icon, action, user, time, ip }) => (
  <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-all">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{action}</p>
        <p className="text-xs text-gray-500">{user}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-bold text-gray-400">{time}</p>
      <p className="text-[10px] text-gray-400 font-mono">{ip}</p>
    </div>
  </div>
);

export default Settings;
