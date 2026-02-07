
import React, { useState, createContext, useContext } from 'react';
import { Page, Branding } from './types';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Stock from './pages/Stock';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Branding Context for White-Labeling
interface BrandingContextType {
  branding: Branding;
  setBranding: (b: Branding) => void;
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  isLoginPage: boolean;
  setIsLoginPage: (v: boolean) => void;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) throw new Error('useBranding must be used within BrandingProvider');
  return context;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [branding, setBranding] = useState<Branding>({
    companyName: 'StockMaster Pro',
    logo: '📦',
    primaryColor: '#3b82f6', // blue-500
  });

  const renderContent = () => {
    switch (currentPage) {
      case Page.DASHBOARD: return <Dashboard />;
      case Page.PRODUCTS: return <Products />;
      case Page.STOCK: return <Stock />;
      case Page.CUSTOMERS: return <Customers />;
      case Page.SUPPLIERS: return <Suppliers />;
      case Page.REPORTS: return <Reports />;
      case Page.SETTINGS: return <Settings />;
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <BrandingContext.Provider value={{ 
        branding, setBranding, currentPage, setCurrentPage, 
        isLoggedIn, setIsLoggedIn, isLoginPage, setIsLoginPage 
      }}>
        {isLoginPage ? <Login /> : <Landing />}
      </BrandingContext.Provider>
    );
  }

  return (
    <BrandingContext.Provider value={{ 
      branding, setBranding, currentPage, setCurrentPage, 
      isLoggedIn, setIsLoggedIn, isLoginPage, setIsLoginPage 
    }}>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto animate-fadeIn">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
      
      {/* Dynamic Style Injection for Whitelabeling */}
      <style>{`
        :root {
          --primary-color: ${branding.primaryColor};
        }
        .text-primary { color: var(--primary-color); }
        .bg-primary { background-color: var(--primary-color); }
        .border-primary { border-color: var(--primary-color); }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </BrandingContext.Provider>
  );
};

export default App;
