'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, Avatar, Badge } from '@/components/ui';
import {
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  User,
  ExternalLink,
} from 'lucide-react';
import { DemoUser } from '@/lib/types';
import { DEMO_USER } from '@/lib/data';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface AppSidebarProps {
  items: NavItem[];
  projectName: string;
}

export function AppSidebar({ items, projectName }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-zinc-900 text-zinc-100 flex flex-col pt-9"> {/* pt-9 to offset demo banner */}
      <div className="flex items-center h-16 px-4 border-b border-zinc-700">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
          <span className="text-zinc-400">⚡</span> {projectName}
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white',
              pathname.startsWith(item.href) && 'bg-zinc-700 text-white'
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        {/* Placeholder for locked roadmap features */}
        <div className="mt-8 pt-4 border-t border-zinc-700">
          <div className="text-xs text-zinc-400 font-semibold uppercase mb-2">Roadmap</div>
          <div className="space-y-1">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 cursor-not-allowed">
              <span className="opacity-50">🤖</span>
              <span className="opacity-50">Approval Automation</span>
              <Badge variant="warning" className="ml-auto text-xs px-2 py-0.5">Locked</Badge>
            </div>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 cursor-not-allowed">
              <span className="opacity-50">⚙️</span>
              <span className="opacity-50">Triage Automation</span>
              <Badge variant="warning" className="ml-auto text-xs px-2 py-0.5">Locked</Badge>
            </div>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 cursor-not-allowed">
              <span className="opacity-50">📈</span>
              <span className="opacity-50">Reporting Automation</span>
              <Badge variant="warning" className="ml-auto text-xs px-2 py-0.5">Locked</Badge>
            </div>
          </div>
          <Button variant="primary" size="sm" className="w-full mt-4 text-xs font-semibold py-1.5" onClick={() => alert('Upgrade to unlock full roadmap!')}>
            <ExternalLink size={14} className="mr-1" /> Unlock Full Roadmap
          </Button>
        </div>
      </nav>
      <div className="px-4 py-4 border-t border-zinc-700">
        <div className="flex items-center gap-3 mb-4">
          <Avatar src={DEMO_USER.avatar} alt={DEMO_USER.name} />
          <div className="flex-1">
            <div className="font-semibold text-white">{DEMO_USER.name}</div>
            <div className="text-xs text-zinc-400">{DEMO_USER.role}</div>
          </div>
          <Link href="/dashboard/settings" className="text-zinc-400 hover:text-white transition-colors">
            <Settings size={18} />
          </Link>
        </div>
        <Button variant="ghost" className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-700">
          <LogOut size={16} className="mr-3" /> Log Out
        </Button>
      </div>
    </div>
  );
}

interface AppHeaderProps {
  title: string;
  user: DemoUser;
}

export function AppHeader({ title, user }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between ml-64 shadow-sm pt-9"> {/* pt-9 to offset demo banner */}
      <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">{title}</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={20} className="text-zinc-600" />
          <Badge variant="danger" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs p-0">3</Badge>
        </Button>
        <Link href="/dashboard/settings">
          <Avatar src={user.avatar} alt={user.name} size="sm" />
        </Link>
      </div>
    </header>
  );
}