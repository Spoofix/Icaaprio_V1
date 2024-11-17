export const mockBusinessData = {
  ratingDistribution: [
    { rating: 'AAA', exposure: 1000000000, count: 50 },
    { rating: 'AA', exposure: 2500000000, count: 150 },
    { rating: 'A', exposure: 5000000000, count: 250 },
    { rating: 'BBB', exposure: 7500000000, count: 350 },
    { rating: 'BB', exposure: 4000000000, count: 200 },
    { rating: 'B', exposure: 2000000000, count: 100 },
    { rating: 'CCC', exposure: 1000000000, count: 50 }
  ],
  productDistribution: [
    { name: 'Term Loans', value: 15000000000 },
    { name: 'Lines of Credit', value: 5000000000 },
    { name: 'Equipment Finance', value: 3000000000 },
    { name: 'Commercial Mortgage', value: 2000000000 }
  ],
  sectorConcentration: [
    { name: 'Manufacturing', value: 8000000000, percentage: 32 },
    { name: 'Real Estate', value: 5000000000, percentage: 20 },
    { name: 'Retail', value: 4000000000, percentage: 16 },
    { name: 'Technology', value: 3000000000, percentage: 12 },
    { name: 'Healthcare', value: 2500000000, percentage: 10 },
    { name: 'Others', value: 2500000000, percentage: 10 }
  ],
  nameConcentration: [
    { name: 'Top 1', value: 2000000000, percentage: 8 },
    { name: 'Top 2', value: 1500000000, percentage: 6 },
    { name: 'Top 3', value: 1000000000, percentage: 4 },
    { name: 'Top 4', value: 800000000, percentage: 3.2 },
    { name: 'Top 5', value: 700000000, percentage: 2.8 },
    { name: 'Others', value: 19000000000, percentage: 76 }
  ],
  geographicDistribution: [
    { name: 'Ontario', value: 10000000000, percentage: 40 },
    { name: 'British Columbia', value: 5000000000, percentage: 20 },
    { name: 'Quebec', value: 3750000000, percentage: 15 },
    { name: 'Alberta', value: 2500000000, percentage: 10 },
    { name: 'Manitoba', value: 1250000000, percentage: 5 },
    { name: 'Other Provinces', value: 2500000000, percentage: 10 }
  ]
};

export const mockRetailData = {
  creditScoreDistribution: [
    { range: '800+', exposure: 5000000000, count: 100 },
    { range: '750-799', exposure: 7500000000, count: 150 },
    { range: '700-749', exposure: 6000000000, count: 120 },
    { range: '650-699', exposure: 4000000000, count: 80 },
    { range: '600-649', exposure: 2500000000, count: 50 },
    { range: '<600', exposure: 1000000000, count: 20 }
  ],
  productDistribution: [
    { name: 'Mortgages', value: 20000000000 },
    { name: 'Personal Loans', value: 3000000000 },
    { name: 'Credit Cards', value: 2000000000 },
    { name: 'Lines of Credit', value: 1000000000 }
  ],
  rateTypeDistribution: [
    { name: 'Fixed Rate', value: 15000000000, percentage: 60 },
    { name: 'Variable Rate', value: 7500000000, percentage: 30 },
    { name: 'Mixed Rate', value: 2500000000, percentage: 10 }
  ],
  nameConcentration: [
    { name: 'Top 1', value: 500000000, percentage: 2 },
    { name: 'Top 2', value: 400000000, percentage: 1.6 },
    { name: 'Top 3', value: 300000000, percentage: 1.2 },
    { name: 'Top 4', value: 200000000, percentage: 0.8 },
    { name: 'Top 5', value: 100000000, percentage: 0.4 },
    { name: 'Others', value: 23500000000, percentage: 94 }
  ],
  geographicDistribution: [
    { name: 'Ontario', value: 8750000000, percentage: 35 },
    { name: 'British Columbia', value: 6250000000, percentage: 25 },
    { name: 'Quebec', value: 5000000000, percentage: 20 },
    { name: 'Alberta', value: 2500000000, percentage: 10 },
    { name: 'Other Provinces', value: 2500000000, percentage: 10 }
  ]
};

export const mockCREData = {
  propertyTypeDistribution: [
    { name: 'Office', value: 3500000000, percentage: 35 },
    { name: 'Retail', value: 2500000000, percentage: 25 },
    { name: 'Industrial', value: 2000000000, percentage: 20 },
    { name: 'Multifamily', value: 1500000000, percentage: 15 },
    { name: 'Mixed-Use', value: 500000000, percentage: 5 }
  ],
  ltvDistribution: [
    { range: '<50%', value: 2000000000, count: 150 },
    { range: '50-60%', value: 3000000000, count: 200 },
    { range: '60-70%', value: 3500000000, count: 250 },
    { range: '70-75%', value: 1000000000, count: 100 },
    { range: '>75%', value: 500000000, count: 50 }
  ],
  ratingDistribution: [
    { rating: 'AAA', value: 1000000000, count: 50 },
    { rating: 'AA', value: 2000000000, count: 100 },
    { rating: 'A', value: 3000000000, count: 150 },
    { rating: 'BBB', value: 2500000000, count: 125 },
    { rating: 'BB', value: 1000000000, count: 50 },
    { rating: 'B', value: 500000000, count: 25 }
  ],
  geographicDistribution: [
    { name: 'Ontario', value: 4000000000, percentage: 40 },
    { name: 'British Columbia', value: 2500000000, percentage: 25 },
    { name: 'Quebec', value: 2000000000, percentage: 20 },
    { name: 'Alberta', value: 1000000000, percentage: 10 },
    { name: 'Other Provinces', value: 500000000, percentage: 5 }
  ]
};