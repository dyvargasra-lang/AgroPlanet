import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/buyer/ProductsPage';
import { ProductDetailPage } from '../pages/buyer/ProductDetailPage';
import { OrdersPage } from '../pages/buyer/OrdersPage';
import { FarmerProductsPage } from '../pages/farmer/FarmerProductsPage';
import { FarmerOrdersPage } from '../pages/farmer/FarmerOrdersPage';
import { ChatPage } from '../pages/chat/ChatPage';
import { MapPage } from '../pages/map/MapPage';
import { CheckoutPage } from '../pages/checkout/CheckoutPage';
import { AdminPage } from '../pages/admin/AdminPage';
import { Layout } from '../components/Layout';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const RoleRoute = ({ children, roles }: { children: React.ReactNode; roles: string[] }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!user || !roles.includes(user.rol)) return <Navigate to="/" />;
  return <>{children}</>;
};

export const routes = (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    >
      <Route index element={<HomePage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="products/:id" element={<ProductDetailPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route
        path="farmer/products"
        element={
          <RoleRoute roles={['FARMER', 'ADMIN']}>
            <FarmerProductsPage />
          </RoleRoute>
        }
      />
      <Route
        path="farmer/orders"
        element={
          <RoleRoute roles={['FARMER', 'ADMIN']}>
            <FarmerOrdersPage />
          </RoleRoute>
        }
      />
      <Route path="chat" element={<ChatPage />} />
      <Route path="map" element={<MapPage />} />
      <Route
        path="admin"
        element={
          <RoleRoute roles={['ADMIN']}>
            <AdminPage />
          </RoleRoute>
        }
      />
    </Route>
  </Routes>
);

