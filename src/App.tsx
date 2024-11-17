import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import ICAAPList from './components/icaap/ICAAPList';
import ICAAPEditor from './components/icaap/ICAAPEditor';
import ReviewProcess from './components/review/ReviewProcess';
import CompanyProfile from './components/profile/CompanyProfile';
import UserProfile from './components/profile/UserProfile';
import CollaboratorManagement from './components/collaborators/CollaboratorManagement';
import ErrorFallback from './components/common/ErrorFallback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 3,
      refetchOnWindowFocus: false,
      useErrorBoundary: true
    },
    mutations: {
      useErrorBoundary: true
    }
  }
});

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/icaap">
                  <Route index element={<ICAAPList />} />
                  <Route path="new" element={<ICAAPEditor />} />
                  <Route path=":id" element={<ICAAPEditor />} />
                  <Route path=":id/review" element={<ReviewProcess />} />
                </Route>
                <Route path="/profile">
                  <Route path="company" element={<CompanyProfile />} />
                  <Route path="user" element={<UserProfile />} />
                </Route>
                <Route path="/collaborators" element={<CollaboratorManagement />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;