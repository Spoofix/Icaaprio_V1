import { getRegulatorGuidance, getComparisonGuidance, getICAAPGuidance } from './regulatoryKnowledge';
import { calculateStressTest, analyzeCapitalAdequacy } from './calculationEngine';
import type { Regulator, InstitutionType, Topic } from './types';

export function generateResponse(query: string, institutionType: InstitutionType): string {
  const normalizedQuery = query.toLowerCase();
  
  // Handle greetings and introductions
  if (normalizedQuery.includes('hello') || normalizedQuery.includes('hi')) {
    return `Hello! I'm IRIS, your ICAAP specialist. I can help you with:

1. Regulatory Requirements (OSFI, BCFSA, FSRA)
2. Capital Planning & Assessment
3. Stress Testing Frameworks
4. Risk Management Guidelines

What would you like to learn about?`;
  }

  // Handle stress testing queries
  if (normalizedQuery.includes('stress test') || normalizedQuery.includes('scenario')) {
    return `Let me help you with stress testing. Here are the key components:

1. Regulatory Requirements:
   - Base case scenario
   - Moderate stress scenario (1-in-10 year event)
   - Severe stress scenario (1-in-25 year event)

2. Risk Areas to Consider:
   - Credit Risk (PD, LGD impacts)
   - Market Risk (interest rates, FX)
   - Liquidity Risk (funding costs)
   - Operational Risk

Would you like me to explain:
a) How to design scenarios?
b) How to calculate impacts?
c) Documentation requirements?`;
  }

  // Handle capital adequacy queries
  if (normalizedQuery.includes('capital') || normalizedQuery.includes('adequacy')) {
    return `Let's discuss capital adequacy assessment. Here's what you need to know:

1. Capital Components:
   - CET1 (Common Equity Tier 1)
   - Additional Tier 1
   - Tier 2 Capital

2. Key Considerations:
   - Minimum regulatory requirements
   - Internal capital targets
   - Management buffers
   - Stress scenario impacts

Would you like to:
a) Learn about calculation methods?
b) Understand buffer requirements?
c) Review documentation needs?`;
  }

  // Handle risk assessment queries
  if (normalizedQuery.includes('risk')) {
    const riskTypes = {
      credit: normalizedQuery.includes('credit'),
      market: normalizedQuery.includes('market'),
      operational: normalizedQuery.includes('operational'),
      liquidity: normalizedQuery.includes('liquidity')
    };

    if (riskTypes.credit) {
      return `For Credit Risk assessment in ICAAP:

1. Key Metrics:
   - Probability of Default (PD)
   - Loss Given Default (LGD)
   - Exposure at Default (EAD)

2. Analysis Required:
   - Portfolio quality trends
   - Concentration risk
   - Correlation factors
   - Stress scenarios

Would you like specific guidance on any of these areas?`;
    }

    if (riskTypes.market) {
      return `For Market Risk assessment in ICAAP:

1. Key Measures:
   - Value at Risk (VaR)
   - Earnings at Risk (EaR)
   - Economic Value of Equity (EVE)

2. Stress Considerations:
   - Interest rate shocks
   - FX rate changes
   - Equity price movements

Would you like to explore any specific aspect?`;
    }

    return `ICAAP requires comprehensive risk assessment. Key areas include:

1. Material Risks:
   - Credit Risk
   - Market Risk
   - Operational Risk
   - Liquidity Risk

2. Assessment Process:
   - Risk identification
   - Measurement methods
   - Control evaluation
   - Capital allocation

Which risk type would you like to explore?`;
  }

  // Handle regulatory comparison queries
  if (normalizedQuery.includes('compare') || normalizedQuery.includes('difference')) {
    if (normalizedQuery.includes('osfi') || normalizedQuery.includes('bcfsa') || normalizedQuery.includes('fsra')) {
      return getComparisonGuidance('regulatory');
    }
    return getComparisonGuidance('general');
  }

  // Handle documentation queries
  if (normalizedQuery.includes('document') || normalizedQuery.includes('report')) {
    return `For ICAAP documentation, you'll need:

1. Core Components:
   - Executive Summary
   - Risk Assessment
   - Capital Planning
   - Stress Testing Results

2. Supporting Materials:
   - Risk appetite statement
   - Methodology documentation
   - Model validation
   - Board approvals

Would you like a template or specific section guidance?`;
  }

  // Default response
  return `I'm here to help with all aspects of ICAAP. We can discuss:

1. Regulatory Requirements:
   - OSFI guidelines
   - Provincial regulations
   - Basel framework

2. Implementation:
   - Capital planning
   - Risk assessment
   - Stress testing
   - Documentation

What would you like to explore first?`;
}