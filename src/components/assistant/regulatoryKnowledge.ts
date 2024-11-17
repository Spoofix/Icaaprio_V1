import { Regulator, RegulationType, InstitutionType } from './types';

export const regulatoryGuidelines: Record<Regulator, RegulationType> = {
  OSFI: {
    name: 'Office of the Superintendent of Financial Institutions',
    guidelines: {
      ICAAP: 'E-19 ICAAP for Deposit-Taking Institutions',
      capital: 'Capital Adequacy Requirements (CAR)',
      stress: 'E-18 Stress Testing',
    },
    applicableTo: ['banks', 'federal_credit_unions', 'credit_unions', 'trust_companies'],
    keyRequirements: [
      'Comprehensive capital planning process',
      'Forward-looking stress testing',
      'Risk appetite framework',
      'Board and senior management oversight'
    ]
  },
  BCFSA: {
    name: 'BC Financial Services Authority',
    guidelines: {
      ICAAP: 'Capital Requirements for BC Credit Unions',
      capital: 'Capital Adequacy Framework',
      stress: 'Stress Testing Guideline'
    },
    applicableTo: ['banks', 'federal_credit_unions', 'credit_unions', 'trust_companies'],
    keyRequirements: [
      'Risk-based capital assessment',
      'Supervisory capital targets',
      'Stress testing framework',
      'Capital conservation buffer'
    ]
  },
  FSRA: {
    name: 'Financial Services Regulatory Authority of Ontario',
    guidelines: {
      ICAAP: 'Capital Adequacy Guideline for Credit Unions/Caisses Populaires',
      capital: 'Capital and Lending Limits',
      stress: 'Stress Testing Requirements'
    },
    applicableTo: ['banks', 'federal_credit_unions', 'credit_unions', 'trust_companies'],
    keyRequirements: [
      'Capital adequacy assessment',
      'Risk management framework',
      'Capital planning process',
      'Stress testing requirements'
    ]
  },
  CUDGC: {
    name: 'Credit Union Deposit Guarantee Corporation',
    guidelines: {
      ICAAP: 'Standards of Sound Business Practice',
      capital: 'Capital Requirements',
      stress: 'Stress Testing Guidelines'
    },
    applicableTo: ['banks', 'federal_credit_unions', 'credit_unions', 'trust_companies'],
    keyRequirements: [
      'Minimum capital requirements',
      'Internal capital targets',
      'Risk assessment process',
      'Capital management'
    ]
  }
};

export const getRegulatorGuidance = (
  regulator: Regulator,
  topic: string,
  institutionType: InstitutionType
): string => {
  const guidance = regulatoryGuidelines[regulator];
  
  switch (topic.toLowerCase()) {
    case 'icaap':
      return `${guidance.name} (${regulator}) ICAAP guidance includes:

1. Key Requirements:
   - ${guidance.guidelines.ICAAP}
   - ${guidance.keyRequirements.join('\n   - ')}

2. Implementation Guidelines:
   - Regular review and updates
   - Comprehensive documentation
   - Board and management oversight
   - Risk-based approach
   - Forward-looking assessment

3. Best Practices:
   - Integration with strategic planning
   - Clear risk appetite statements
   - Robust stress testing framework
   - Regular validation and review

Would you like me to explain any of these aspects in more detail?`;

    case 'capital':
      return `${regulator}'s capital framework includes:

1. Capital Structure:
   - Based on ${guidance.guidelines.capital}
   - Risk-weighted approach
   - Capital buffers and conservation
   - Internal capital targets

2. Assessment Process:
   - Risk sensitivity analysis
   - Forward-looking projections
   - Stress scenario impacts
   - Capital allocation methods

3. Monitoring and Reporting:
   - Regular capital adequacy assessment
   - Trigger frameworks
   - Escalation procedures
   - Board reporting requirements

Which aspect would you like to explore further?`;

    case 'stress':
      return `${regulator}'s stress testing framework (${guidance.guidelines.stress}) covers:

1. Framework Components:
   - Multiple scenario analysis
   - Forward-looking approach
   - Integration with risk management
   - Capital impact assessment

2. Implementation Guidelines:
   - Scenario development
   - Severity calibration
   - Management actions
   - Results interpretation

3. Best Practices:
   - Regular framework review
   - Model validation
   - Documentation standards
   - Board engagement

Would you like me to explain how to implement these requirements?`;

    default:
      return `${guidance.name} provides comprehensive guidance for all institutions. Key areas include:

1. ${guidance.keyRequirements.join('\n2. ')}

3. Implementation Considerations:
   - Proportional application based on size and complexity
   - Risk-based approach
   - Regular review and updates
   - Board and management oversight

Which aspect would you like to learn more about?`;
  }
};

export const getComparisonGuidance = (topic: string): string => {
  switch (topic.toLowerCase()) {
    case 'capital':
      return `Capital requirements across regulators share common principles:

1. Core Requirements:
   - Risk-based capital framework
   - Minimum capital ratios
   - Capital conservation buffers
   - Internal capital targets

2. Key Differences:
   - Calculation methodologies
   - Buffer requirements
   - Reporting frequencies
   - Implementation timelines

3. Common Elements:
   - Risk sensitivity
   - Forward-looking approach
   - Regular review process
   - Board oversight

Would you like me to explain specific requirements in detail?`;

    case 'stress':
      return `Stress testing frameworks across regulators emphasize:

1. Common Elements:
   - Multiple scenarios
   - Forward-looking approach
   - Capital adequacy assessment
   - Management actions

2. Framework Components:
   - Scenario development
   - Risk assessment
   - Impact analysis
   - Results reporting

3. Best Practices:
   - Regular updates
   - Model validation
   - Documentation
   - Board engagement

Which aspects would you like to explore further?`;

    default:
      return `Regulatory frameworks share these common principles:

1. Risk-Based Approach:
   - Comprehensive risk assessment
   - Forward-looking perspective
   - Regular review and updates

2. Governance:
   - Board oversight
   - Management responsibility
   - Clear policies and procedures
   - Documentation requirements

3. Implementation:
   - Proportional application
   - Regular validation
   - Continuous improvement
   - Stakeholder engagement

Would you like to understand specific requirements in detail?`;
  }
};