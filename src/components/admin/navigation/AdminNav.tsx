import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, Users, Key, Activity, Settings, BarChart3, 
  Shield, Database 
} from 'lucide-react';

const navigation = [
  { name: 'Organizations', href: '/admin/organizations', icon: Building2 },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'API Keys', href: '/admin/api-keys', icon: Key },
  { name: 'Activity Logs', href: '/admin/activity', icon: Activity },
  { name: 'Usage Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Access Control', href: '/admin/access', icon: Shield },
  { name: 'System Health', href: '/admin/health', icon: Database },
  { name: 'Settings', href: '/admin/settings', icon: Settings }
];

export default function AdminNav() {
  const location = useLocation();

  return (
    <nav className="space-y-1">
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
  );
}