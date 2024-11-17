import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info } from 'lucide-react';
import { DistributionChart } from '../charts/DistributionChart';
import { PropertyTypeDistribution } from '../charts/PropertyTypeDistribution';
import { GeographicMap } from '../charts/GeographicMap';
import { LTVAnalysis } from './collateral/LTVAnalysis';
import { mockCREData } from '../../../data/mockData';

export default function CREAnalysis() {
  const [activeDistribution, setActiveDistribution] = useState<'exposure' | 'count'>('exposure');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const getRatingData = () => {
    return mockCREData.ratingDistribution.map(item => ({
      name: item.rating,
      value: activeDistribution === 'exposure' ? item.value : item.count
    }));
  };

  const totalValue = mockCREData.propertyTypeDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DistributionChart
          data={getRatingData()}
          portfolioType="cre"
          activeDistribution={activeDistribution}
          setActiveDistribution={setActiveDistribution}
        />

        <PropertyTypeDistribution
          data={mockCREData.propertyTypeDistribution}
          totalValue={totalValue}
        />

        <GeographicMap
          data={mockCREData.geographicDistribution}
          onProvinceSelect={setSelectedProvince}
          selectedProvince={selectedProvince}
        />

        <LTVAnalysis />
      </div>
    </div>
  );
}