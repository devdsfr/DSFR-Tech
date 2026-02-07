
import React, { useState } from 'react';
import { useBranding } from '../App';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const { branding, setIsLoggedIn, setIsLoginPage } = useBranding();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4 relative">
      {/* Botão Voltar */}
      <button 
        onClick={() => setIsLoginPage(false)}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-semibold"
      >
        <ArrowLeft size={20} />
        Voltar para o site
      </button>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        <div className="p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-50 shadow-inner text-5xl mb-4 border border-gray-100">
              {branding.logo}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{branding.companyName}</h1>
            <p className="text-gray-500 mt-1">Acesse sua conta para gerenciar seu estoque</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-gray-600">Lembrar de mim</span>
              </label>
              <button type="button" className="text-primary font-semibold hover:underline" style={{ color: branding.primaryColor }}>
                Esqueceu a senha?
              </button>
            </div>

            <button 
              type="submit"
              className="w-full py-3 px-4 flex items-center justify-center gap-2 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 active:scale-[0.98] transition-all bg-primary"
              style={{ backgroundColor: branding.primaryColor }}
            >
              <LogIn size={20} />
              Entrar no Sistema
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Ainda não tem acesso? <span className="text-primary font-bold cursor-pointer hover:underline" style={{ color: branding.primaryColor }}>Fale com o suporte</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
