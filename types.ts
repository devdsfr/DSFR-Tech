
export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  PRODUCTS = 'PRODUCTS',
  STOCK = 'STOCK',
  CUSTOMERS = 'CUSTOMERS',
  SUPPLIERS = 'SUPPLIERS',
  REPORTS = 'REPORTS',
  SETTINGS = 'SETTINGS'
}

export interface Branding {
  companyName: string;
  logo: string;
  primaryColor: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  supplier: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'ENTRY' | 'EXIT' | 'ADJUSTMENT';
  quantity: number;
  date: string;
  user: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastPurchase?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  category: string;
}
