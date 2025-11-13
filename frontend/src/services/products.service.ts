import { api } from './api';

export interface Product {
  id: string;
  nombre: string;
  descripcion?: string;
  categoria: string;
  precio: number;
  cantidad: number;
  imagenUrl?: string;
  activo: boolean;
  farmer: {
    id: string;
    nombre: string;
    profile?: {
      ubicacion?: string;
    };
  };
}

export interface ProductFilters {
  search?: string;
  categoria?: string;
  min?: string;
  max?: string;
  ubicacion?: string;
}

export const productsService = {
  getAll: async (filters?: ProductFilters): Promise<{ success: boolean; data: Product[] }> => {
    const response = await api.get('/products', { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<{ success: boolean; data: Product }> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: Omit<Product, 'id' | 'farmer' | 'activo'>): Promise<{ success: boolean; data: Product }> => {
    const response = await api.post('/products', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Product>): Promise<{ success: boolean; data: Product }> => {
    const response = await api.patch(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};

