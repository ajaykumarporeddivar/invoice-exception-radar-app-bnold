export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type ExceptionType = 'missing_approval' | 'amount_mismatch' | 'vendor_mismatch' | 'duplicate' | 'payment_risk' | 'invalid_coding' | 'untimely_submission';
export type ExceptionStatus = 'open' | 'in_review' | 'resolved' | 'dismissed';
export type InvoiceStatus = 'pending' | 'approved' | 'rejected' | 'paid' | 'overdue';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  avatar: string;
  joinedAt: string; // YYYY-MM-DD
}

export interface Client {
  id: string;
  userId: string;
  name: string;
  contactName: string;
  contactEmail: string;
  industry: string;
  status: 'active' | 'inactive' | 'on_hold';
  createdAt: string; // YYYY-MM-DD
}

export interface Invoice {
  id: string;
  clientId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  paymentDate?: string; // YYYY-MM-DD
  vendorName: string;
  description: string;
  exceptionsCount: number;
  createdAt: string; // ISO 8601 datetime
}

export interface Exception {
  id: string;
  invoiceId: string;
  clientId: string;
  type: ExceptionType;
  status: ExceptionStatus;
  severity: Severity;
  description: string;
  assignedTo: string; // User ID or role
  createdAt: string; // ISO 8601 datetime
  resolvedAt?: string; // ISO 8601 datetime
  notes: string[];
}

export interface ActivityItem {
  id: string;
  userId: string;
  type: 'invoice_created' | 'exception_flagged' | 'exception_resolved' | 'invoice_approved' | 'report_generated';
  description: string;
  timestamp: string; // ISO 8601 datetime
  relatedId: string; // ID of the invoice or exception
}

export interface StatSparklineData {
  name: string;
  value: number;
}

export interface ChartDataItem {
  name: string;
  value: number;
  color?: string;
}

export type ChartData = ChartDataItem[];

export interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
  data: StatSparklineData[];
}