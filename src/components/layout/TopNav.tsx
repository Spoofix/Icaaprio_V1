import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Users } from 'lucide-react';

export default function TopNav() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'My ICAAPs', href: '/icaap', icon: FileText },
    { name: 'Collaborators', href: '/collaborators', icon: Users }
  ];

  return (
    <div className="fixed w-full top-16 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-4 h-14 items-center">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-4 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}