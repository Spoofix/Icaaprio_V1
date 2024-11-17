import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, FileText, Users
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'My ICAAPs', href: '/icaap', icon: FileText },
    { name: 'Collaborators', href: '/collaborators', icon: Users }
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-16">
      <nav className="mt-5 px-2 space-y-1">
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
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}