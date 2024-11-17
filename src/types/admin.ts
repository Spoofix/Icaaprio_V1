export interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'cancelled';
  createdAt: string;
  seats: number;
  usedSeats: number;
  apiKeys: ApiKey[];
  features: Feature[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  organizationId: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  organizationId: string;
  createdAt: string;
  lastUsed: string;
  status: 'active' | 'revoked';
  permissions: string[];
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  requiresPlan: 'free' | 'pro' | 'enterprise';
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface ApiUsage {
  endpoint: string;
  count: number;
  errors: number;
  latency: number;
  timestamp: string;
}