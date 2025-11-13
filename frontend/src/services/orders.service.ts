import { api } from './api';

export interface OrderItem {
  productId: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Order {
  id: string;
  buyerId: string;
  farmerId: string;
  estado: 'PENDIENTE' | 'NEGOCIACION' | 'ACEPTADO' | 'RECHAZADO' | 'CONFIRMADO';
  total: number;
  direccionEntrega?: string;
  contacto?: string;
  items: Array<OrderItem & { product: { id: string; nombre: string } }>;
  buyer: { id: string; nombre: string; email: string };
  farmer: { id: string; nombre: string; email: string };
}

export const ordersService = {
  create: async (data: {
    farmerId: string;
    items: OrderItem[];
    direccionEntrega?: string;
    contacto?: string;
  }): Promise<{ success: boolean; data: Order }> => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  getAll: async (role?: string): Promise<{ success: boolean; data: Order[] }> => {
    const response = await api.get('/orders', { params: { role } });
    return response.data;
  },

  getById: async (id: string): Promise<{ success: boolean; data: Order }> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, estado: string): Promise<{ success: boolean; data: Order }> => {
    const response = await api.patch(`/orders/${id}/status`, { estado });
    return response.data;
  },
};

