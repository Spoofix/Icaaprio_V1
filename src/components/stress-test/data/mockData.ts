export const mockBusinessData = {
  ratingDistribution: [
    { rating: 'AAA', count: 50, exposure: 2000000000 },
    { rating: 'AA', count: 150, exposure: 3500000000 },
    { rating: 'A', count: 300, exposure: 4500000000 },
    { rating: 'BBB', count: 400, exposure: 2800000000 },
    { rating: 'BB', count: 200, exposure: 1200000000 },
    { rating: 'B', count: 100, exposure: 400000000 },
    { rating: 'CCC', count: 20, exposure: 50000000 }
  ],
  productDistribution: [
    { name: 'Term Loans', value: 8000000000 },
    { name: 'Revolving Credit', value: 4000000000 },
    { name: 'Equipment Finance', value: 1500000000 },
    { name: 'Commercial Mortgage', value: 950000000 }
  ],
  sectorConcentration: [
    { name: 'Real Estate', value: 5000000000, percentage: 25 },
    { name: 'Manufacturing', value: 4000000000, percentage: 20 },
    { name: 'Retail Trade', value: 3000000000, percentage: 15 },
    { name: 'Agriculture', value: 2000000000, percentage: 10 },
    { name: 'Healthcare', value: 2000000000, percentage: 10 },
    { name: 'Technology', value: 1500000000, percentage: 7.5 },
    { name: 'Transportation', value: 1500000000, percentage: 7.5 },
    { name: 'Other', value: 1000000000, percentage: 5 }
  ],
  nameConcentration: [
    { name: 'Company A', value: 2000000000, percentage: 10 },
    { name: 'Company B', value: 1500000000, percentage: 7.5 },
    { name: 'Company C', value: 1000000000, percentage: 5 },
    { name: 'Company D', value: 800000000, percentage: 4 },
    { name: 'Company E', value: 700000000, percentage: 3.5 },
    { name: 'Others', value: 14000000000, percentage: 70 }
  ],
  geographicDistribution: [
    { name: 'Ontario', value: 8000000000, percentage: 40 },
    { name: 'British Columbia', value: 4000000000, percentage: 20 },
    { name: 'Quebec', value: 3000000000, percentage: 15 },
    { name: 'Alberta', value: 2000000000, percentage: 10 },
    { name: 'Manitoba', value: 1000000000, percentage: 5 },
    { name: 'Saskatchewan', value: 1000000000, percentage: 5 },
    { name: 'Nova Scotia', value: 500000000, percentage: 2.5 },
    { name: 'Other Provinces', value: 500000000, percentage: 2.5 }
  ]
};

export const mockRetailData = {
  creditScoreDistribution: [
    { range: '800+', count: 2000, exposure: 3500000000 },
    { range: '750-799', count: 3500, exposure: 4200000000 },
    { range: '700-749', count: 4000, exposure: 2800000000 },
    { range: '650-699', count: 2500, exposure: 1000000000 },
    { range: '600-649', count: 1500, exposure: 400000000 },
    { range: '<600', count: 500, exposure: 115000000 }
  ],
  productDistribution: [
    { name: 'Mortgages', value: 6500000000 },
    { name: 'Personal Loans', value: 2500000000 },
    { name: 'Credit Cards', value: 1500000000 },
    { name: 'Auto Loans', value: 1200000000 },
    { name: 'Lines of Credit', value: 800000000 }
  ],
  geographicDistribution: [
    { name: 'Ontario', value: 5000000000, percentage: 35 },
    { name: 'British Columbia', value: 3000000000, percentage: 25 },
    { name: 'Quebec', value: 2500000000, percentage: 20 },
    { name: 'Alberta', value: 1500000000, percentage: 10 },
    { name: 'Manitoba', value: 500000000, percentage: 5 },
    { name: 'Other Provinces', value: 500000000, percentage: 5 }
  ],
  nameConcentration: [] // Not applicable for retail portfolio
};