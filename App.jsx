import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BoardProvider } from './context/BoardContext';
import Login from './components/Login';
import Board from './components/Board';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BoardProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            } />
          </Routes>
        </BoardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}