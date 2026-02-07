
import React from 'react';
import { useBranding } from '../App';
import { 
  Package, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  Smartphone, 
  Layers, 
  ChevronRight,
  Globe,
  Check,
  Zap,
  Palette,
  Layout,
  MessageCircle
} from 'lucide-react';

const Landing: React.FC = () => {
  const { branding, setIsLoginPage } = useBranding();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans scroll-smooth">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="text-3xl">{branding.logo}</span>
              <span className="font-black text-xl tracking-tight text-gray-900">{branding.companyName}</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
              <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">Funcionalidades</button>
              <button onClick={() => scrollToSection('whitelabel')} className="hover:text-primary transition-colors">White-Label</button>
              <button onClick={() => scrollToSection('plans')} className="hover:text-primary transition-colors">Planos</button>
            </nav>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsLoginPage(true)}
                className="text-sm font-bold text-gray-700 hover:text-primary px-4 py-2 transition-all"
              >
                Entrar
              </button>
              <button 
                onClick={() => setIsLoginPage(true)}
                className="hidden sm:flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                style={{ backgroundColor: branding.primaryColor }}
              >
                Começar Agora
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-bold mb-6" style={{ color: branding.primaryColor }}>
                <Layers size={14} />
                NOVA VERSÃO 2.0 DISPONÍVEL
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
                Domine seu estoque, <span className="text-primary" style={{ color: branding.primaryColor }}>escale</span> seu negócio.
              </h1>
              <p className="text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
                A plataforma definitiva de gestão para PMEs. Controle produtos, movimentações e clientes em um único lugar, com interface profissional e 100% personalizável.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => setIsLoginPage(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all text-lg"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  Ver Demonstração
                </button>
                <div className="flex items-center gap-2 text-gray-400 font-medium">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  Sem cartão de crédito necessário
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-700" style={{ backgroundColor: branding.primaryColor + '33' }}></div>
              <div className="relative bg-white p-2 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
                <div className="bg-gray-100 rounded-2xl p-4 overflow-hidden">
                   <div className="grid grid-cols-3 gap-2 mb-4">
                     <div className="h-20 bg-white rounded-xl shadow-sm animate-pulse"></div>
                     <div className="h-20 bg-white rounded-xl shadow-sm animate-pulse delay-75"></div>
                     <div className="h-20 bg-white rounded-xl shadow-sm animate-pulse delay-150"></div>
                   </div>
                   <div className="h-48 bg-white rounded-xl shadow-sm p-4 space-y-3">
                     <div className="h-2 w-1/3 bg-gray-100 rounded"></div>
                     <div className="h-2 w-full bg-gray-50 rounded"></div>
                     <div className="h-2 w-full bg-gray-50 rounded"></div>
                     <div className="h-32 bg-gray-50 rounded-lg flex items-end justify-between p-2">
                       <div className="w-4 bg-primary/40 rounded-t h-1/2"></div>
                       <div className="w-4 bg-primary/60 rounded-t h-3/4"></div>
                       <div className="w-4 bg-primary rounded-t h-1/3"></div>
                       <div className="w-4 bg-primary/80 rounded-t h-full"></div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -mr-32 -mt-32"></div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Tudo o que você precisa</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Ferramentas profissionais desenhadas para simplificar a rotina da sua empresa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Package size={28} />}
              title="Gestão de Produtos"
              desc="Cadastre SKUs, categorias e controle o estoque mínimo com alertas automáticos."
            />
            <FeatureCard 
              icon={<Smartphone size={28} />}
              title="Acesso Mobile"
              desc="Interface totalmente responsiva. Gerencie seu negócio de qualquer lugar."
            />
            <FeatureCard 
              icon={<BarChart3 size={28} />}
              title="Relatórios"
              desc="Visualize movimentações e saúde financeira em tempo real com gráficos intuitivos."
            />
            <FeatureCard 
              icon={<ShieldCheck size={28} />}
              title="Segurança"
              desc="Seus dados protegidos com as melhores práticas de criptografia e backup."
            />
          </div>
        </div>
      </section>

      {/* White-Label Section */}
      <section id="whitelabel" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                    <Palette size={32} className="text-primary mb-4" style={{ color: branding.primaryColor }} />
                    <h4 className="font-bold text-gray-900">Cores Custom</h4>
                    <p className="text-xs text-gray-500">Altere a paleta do sistema em segundos.</p>
                  </div>
                  <div className="bg-gray-900 p-6 rounded-3xl text-white flex flex-col items-center text-center shadow-xl">
                    <Layout size={32} className="text-primary mb-4" style={{ color: branding.primaryColor }} />
                    <h4 className="font-bold">Logotipo Próprio</h4>
                    <p className="text-xs text-gray-400">Sua marca no topo e em todos os relatórios.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center shadow-xl">
                    <Globe size={32} className="text-emerald-500 mb-4" />
                    <h4 className="font-bold text-gray-900">Domínio Único</h4>
                    <p className="text-xs text-gray-500">Use seu próprio endereço (ex: sistema.suaempresa.com).</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                    <Zap size={32} className="text-amber-500 mb-4" />
                    <h4 className="font-bold text-gray-900">Multitenant</h4>
                    <p className="text-xs text-gray-500">Escalabilidade para gerenciar múltiplos clientes.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Seu SaaS, <span className="text-primary" style={{ color: branding.primaryColor }}>sua marca</span>.
              </h2>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                Este template foi construído pensando em agências e desenvolvedores que desejam oferecer uma solução de estoque premium sem o custo de desenvolvimento do zero.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Personalização total de identidade visual",
                  "Relatórios exportáveis com seu logo",
                  "Infraestrutura pronta para multi-empresas",
                  "Painel de configurações administrativas"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Planos que crescem com você</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Compra 100% via WhatsApp. Escolha seu plano e fale com um consultor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard 
              title="Essencial" 
              price="R$ 97" 
              features={["Até 500 produtos", "1 Usuário Admin", "Relatórios Básicos", "Suporte via E-mail"]} 
            />
            <PricingCard 
              title="Profissional" 
              price="R$ 197" 
              highlight={true}
              features={["Produtos Ilimitados", "5 Usuários", "Relatórios Avançados", "White-Label Básico", "Suporte Prioritário"]} 
            />
            <PricingCard 
              title="Enterprise" 
              price="Custom" 
              features={["Multi-Empresas", "Usuários Ilimitados", "White-Label Completo", "API de Integração", "Gerente de Conta"]} 
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-primary/10 blur-[150px] pointer-events-none"></div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{branding.logo}</span>
            <span className="font-bold text-gray-900 tracking-tight">{branding.companyName}</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">Funcionalidades</button>
            <button onClick={() => scrollToSection('whitelabel')} className="hover:text-primary transition-colors">White-Label</button>
            <button onClick={() => scrollToSection('plans')} className="hover:text-primary transition-colors">Planos</button>
          </div>

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {branding.companyName}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => {
  const { branding } = useBranding();
  return (
    <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300" style={{ color: branding.primaryColor }}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

const PricingCard: React.FC<{ title: string; price: string; features: string[]; highlight?: boolean }> = ({ title, price, features, highlight }) => {
  const { branding } = useBranding();
  
  const handlePurchase = () => {
    const phoneNumber = "5511999999999"; // Substituir pelo número real
    const message = encodeURIComponent(`Olá! Gostaria de realizar a compra do plano ${title} do ${branding.companyName}. Poderia me enviar os detalhes de pagamento?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className={`p-8 rounded-[2.5rem] border transition-all ${
      highlight 
      ? 'bg-white text-gray-900 border-primary shadow-2xl scale-105' 
      : 'bg-white/5 text-white border-white/10 hover:border-white/20'
    }`}
    style={highlight ? { borderColor: branding.primaryColor } : {}}>
      {highlight && (
        <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full mb-6 inline-block" style={{ backgroundColor: branding.primaryColor }}>
          Mais Popular
        </span>
      )}
      <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-gray-900' : 'text-white'}`}>{title}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-black">{price}</span>
        {price !== "Custom" && <span className={`text-sm ${highlight ? 'text-gray-500' : 'text-gray-400'}`}>/mês</span>}
      </div>
      <ul className="space-y-4 mb-10">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm font-medium">
            <Check size={16} className={highlight ? "text-emerald-500" : "text-primary"} style={!highlight ? { color: branding.primaryColor } : {}} />
            <span className={highlight ? "text-gray-600" : "text-gray-400"}>{f}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={handlePurchase}
        className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
          highlight 
          ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:opacity-90' 
          : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        style={highlight ? { backgroundColor: branding.primaryColor } : {}}
      >
        <MessageCircle size={20} />
        Comprar no WhatsApp
      </button>
    </div>
  );
};

export default Landing;
