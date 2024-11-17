import React from 'react';
import { Sun, Moon, Settings, ChevronDown, LogOut } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';
import { Menu } from '@headlessui/react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <div className="flex items-center space-x-4">
            <div className="text-right mr-4">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.company?.name || 'Demo Bank'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user?.firstName} {user?.lastName}
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5 text-gray-900" />
              )}
            </button>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Settings className="w-5 h-5" />
                <ChevronDown className="w-4 h-4 ml-1" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/profile/company"
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      Company Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/profile/user"
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      User Profile
                    </a>
                  )}
                </Menu.Item>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}