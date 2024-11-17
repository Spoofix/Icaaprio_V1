export interface Company {
  id: string;
  name: string;
  type: 'bank' | 'credit_union' | 'investment_firm';
  regulatoryBody: string;
  size: 'small' | 'medium' | 'large';
  address: Address;
  contacts: Contact[];
  settings: CompanySettings;
  subscription: Subscription;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Contact {
  name: string;
  position: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface CompanySettings {
  reviewProcess: {
    requires2ndLine: boolean;
    requires3rdLine: boolean;
    requiresBoard: boolean;
    requiresExternal: boolean;
  };
  notifications: {
    email: boolean;
    inApp: boolean;
    reviewReminders: boolean;
    deadlineAlerts: boolean;
  };
  branding: {
    logo?: string;
    colors: {
      primary: string;
      secondary: string;
    };
  };
}

export interface Subscription {
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'cancelled';
  startDate: string;
  endDate: string;
  features: string[];
  limits: {
    users: number;
    storage: number;
    icaaps: number;
  };
}