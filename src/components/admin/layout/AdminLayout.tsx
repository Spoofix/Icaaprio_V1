import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNav from '../navigation/AdminNav';
import Organizations from '../pages/Organizations';
import Users from '../pages/Users';
import ApiKeys from '../pages/ApiKeys';
import ActivityLogs from '../pages/ActivityLogs';
import Analytics from '../pages/Analytics';
import AccessControl from '../pages/AccessControl';
import SystemHealth from '../pages/SystemHealth';
import Settings from '../pages/Settings';
import AdminDashboard from '../Dashboard';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0">
          <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Admin Dashboard
              </h1>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <AdminNav />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="organizations" element={<Organizations />} />
                  <Route path="users" element={<Users />} />
                  <Route path="api-keys" element={<ApiKeys />} />
                  <Route path="activity" element={<ActivityLogs />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="access" element={<AccessControl />} />
                  <Route path="health" element={<SystemHealth />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}