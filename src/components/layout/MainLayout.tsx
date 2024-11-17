import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import TopNav from './TopNav';
import ICAAPAssistant from '../assistant/ICAAPAssistant';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <TopNav />
      <main className="pt-32"> {/* Increased padding-top to accommodate header + nav */}
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      <ICAAPAssistant />
    </div>
  );
}