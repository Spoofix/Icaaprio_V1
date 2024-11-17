export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
  companyId: string;
  company?: {
    name: string;
    type: 'bank' | 'credit_union' | 'investment_firm';
  };
  department?: string;
  position?: string;
  phone?: string;
  lastLogin?: string;
  createdAt: string;
}

export type UserRole = 
  | 'admin'
  | 'risk_manager'
  | 'risk_analyst'
  | 'reviewer_2nd_line'
  | 'reviewer_3rd_line'
  | 'board_member'
  | 'regulator'
  | 'external_auditor';

export type Permission =
  | 'create_icaap'
  | 'edit_icaap'
  | 'review_icaap'
  | 'approve_icaap'
  | 'manage_users'
  | 'manage_company'
  | 'view_reports'
  | 'manage_collaborators';