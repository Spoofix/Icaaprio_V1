import React from 'react';
import { Building2, Mail, Phone, MapPin, Save } from 'lucide-react';
import type { Company } from '../../types/company';

export default function CompanyProfile() {
  const company: Company = {
    id: '1',
    name: 'Example Bank',
    type: 'bank',
    regulatoryBody: 'OSFI',
    size: 'medium',
    address: {
      street: '123 Financial St',
      city: 'Toronto',
      state: 'ON',
      postalCode: 'M5J 2T3',
      country: 'Canada'
    },
    contacts: [
      {
        name: 'John Smith',
        position: 'Chief Risk Officer',
        email: 'john.smith@example.com',
        phone: '+1 (416) 555-0123',
        isPrimary: true
      }
    ],
    settings: {
      reviewProcess: {
        requires2ndLine: true,
        requires3rdLine: true,
        requiresBoard: true,
        requiresExternal: true
      },
      notifications: {
        email: true,
        inApp: true,
        reviewReminders: true,
        deadlineAlerts: true
      },
      branding: {
        colors: {
          primary: '#3B82F6',
          secondary: '#1E40AF'
        }
      }
    },
    subscription: {
      plan: 'professional',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      features: ['advanced_analytics', 'unlimited_storage', 'priority_support'],
      limits: {
        users: 50,
        storage: 100,
        icaaps: 10
      }
    },
    createdAt: '2024-01-01'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Company Profile</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Name
              </label>
              <input
                type="text"
                defaultValue={company.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Type
              </label>
              <select
                defaultValue={company.type}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="bank">Bank</option>
                <option value="credit_union">Credit Union</option>
                <option value="investment_firm">Investment Firm</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Regulatory Body
              </label>
              <input
                type="text"
                defaultValue={company.regulatoryBody}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Address
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Street
              </label>
              <input
                type="text"
                defaultValue={company.address.street}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  City
                </label>
                <input
                  type="text"
                  defaultValue={company.address.city}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  State/Province
                </label>
                <input
                  type="text"
                  defaultValue={company.address.state}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Postal Code
                </label>
                <input
                  type="text"
                  defaultValue={company.address.postalCode}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country
                </label>
                <input
                  type="text"
                  defaultValue={company.address.country}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}