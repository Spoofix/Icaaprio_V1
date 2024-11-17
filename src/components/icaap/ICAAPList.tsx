import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Search, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import type { ICAAPDocument } from '../../types/icaap';

export default function ICAAPList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const icaaps: ICAAPDocument[] = [
    {
      id: '1',
      title: 'ICAAP 2024',
      year: 2024,
      status: 'draft',
      version: 1,
      createdAt: '2024-03-01',
      updatedAt: '2024-03-15',
      createdBy: 'user1',
      currentReviewers: [],
      reviewHistory: [],
      collaborators: [
        { userId: 'user2', role: 'editor', addedAt: '2024-03-01', addedBy: 'user1' },
        { userId: 'user3', role: 'viewer', addedAt: '2024-03-01', addedBy: 'user1' }
      ],
      content: {
        executiveSummary: 'Draft version of 2024 ICAAP assessment',
        materialRisks: [],
        stressTests: [],
        capitalPlanning: {
          currentCapital: 1000000000,
          projectedCapital: 1200000000,
          capitalRequirement: 800000000,
          buffers: [],
          contingencyPlans: []
        },
        riskAppetite: {
          statements: [],
          limits: [],
          monitoring: ''
        },
        governanceFramework: {
          roles: [],
          committees: [],
          policies: [],
          procedures: []
        },
        attachments: []
      }
    },
    {
      id: '2',
      title: 'ICAAP 2023',
      year: 2023,
      status: 'approved',
      version: 2,
      createdAt: '2023-03-01',
      updatedAt: '2023-12-20',
      createdBy: 'user1',
      currentReviewers: [],
      reviewHistory: [
        {
          id: 'review1',
          role: '2nd_line',
          userId: 'user4',
          status: 'approved',
          comments: 'Approved with minor recommendations',
          timestamp: '2023-12-15'
        }
      ],
      collaborators: [],
      content: {
        executiveSummary: 'Final approved version of 2023 ICAAP assessment',
        materialRisks: [],
        stressTests: [],
        capitalPlanning: {
          currentCapital: 900000000,
          projectedCapital: 1100000000,
          capitalRequirement: 750000000,
          buffers: [],
          contingencyPlans: []
        },
        riskAppetite: {
          statements: [],
          limits: [],
          monitoring: ''
        },
        governanceFramework: {
          roles: [],
          committees: [],
          policies: [],
          procedures: []
        },
        attachments: []
      }
    }
  ];

  const filteredICAAPSs = icaaps.filter(icaap => 
    icaap.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewICAAPClick = () => {
    navigate('/icaap/new');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My ICAAPs</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track your ICAAP assessments
          </p>
        </div>
        <button
          onClick={handleNewICAAPClick}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New ICAAP Assessment
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ICAAPs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredICAAPSs.map((icaap) => (
            <div
              key={icaap.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
              onClick={() => navigate(`/icaap/${icaap.id}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {icaap.title}
                  </h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Last updated: {new Date(icaap.updatedAt).toLocaleDateString()}
                    </div>
                    {icaap.collaborators.length > 0 && (
                      <div>
                        {icaap.collaborators.length} collaborators
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center ${
                    icaap.status === 'approved'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {icaap.status === 'approved' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {icaap.status.charAt(0).toUpperCase() + icaap.status.slice(1)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              {icaap.status === 'draft' && (
                <div className="mt-4 flex space-x-4">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-2 bg-blue-600 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      40% complete - Continue your assessment
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/icaap/${icaap.id}/edit`);
                    }}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                  >
                    Continue Assessment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}