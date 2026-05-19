'use client';

import { AppSidebar } from '@/components/layout';
import {
  Inbox,
  LayoutDashboard,
  FileText,
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <Inbox size={16} />, label: 'Intake', href: '/dashboard/intake' },
  { icon: <LayoutDashboard size={16} />, label: 'Dashboard', href: '/dashboard/dashboard' },
  { icon: <FileText size={16} />, label: 'Reports', href: '/dashboard/reports' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AppSidebar items={navItems} projectName="Invoice Exception Radar" />
      <div className="flex-1 ml-64 flex flex-col min-h-full">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}