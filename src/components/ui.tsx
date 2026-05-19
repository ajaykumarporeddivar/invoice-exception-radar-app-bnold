'use client';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Loader2,
  ChevronDown,
  ChevronUp,
  Minus,
  AlertTriangle,
  CircleHelp,
  CheckCircle,
  XCircle,
  Info,
  ArrowRight,
  X,
  Plus,
  Inbox,
  LayoutDashboard,
  FileText,
  Ban,
  UploadCloud,
} from 'lucide-react';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className,
  href,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg';

  const variantClasses = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-900 border border-zinc-200',
    outline: 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 focus-visible:ring-zinc-900',
    ghost: 'hover:bg-zinc-100 text-zinc-900 focus-visible:ring-zinc-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  const content = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </>
  );

  const Component = href ? 'a' : 'button';

  return (
    <Component
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      onClick={onClick}
      disabled={disabled || loading}
      {...(href ? { href, role: 'button' } : { type: 'button' })}
      {...(props as any)}
    >
      {content}
    </Component>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('bg-white border border-zinc-200 rounded-xl shadow-sm', className)}>{children}</div>;
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn('text-lg font-semibold leading-none tracking-tight text-zinc-900', className)}>{children}</h3>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium';
  const variantClasses = {
    default: 'bg-zinc-100 text-zinc-700 border border-zinc-200',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-600 border border-amber-200',
    error: 'bg-red-50 text-red-600 border border-red-200',
    info: 'bg-blue-50 text-blue-600 border border-blue-200',
    purple: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
  };

  return <span className={cn(baseClasses, variantClasses[variant], className)}>{children}</span>;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className, id, type = 'text', ...props }: InputProps) {
  const inputId = id || React.useId();
  return (
    <div className="relative">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-zinc-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pl-10' : '',
            error ? 'border-red-500 focus-visible:ring-red-500' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn('h-5 w-5 animate-spin text-zinc-500', className)} />;
}

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-teal-500',
  ];
  const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
  const bgColor = colors[charCode % colors.length];

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full font-semibold text-white uppercase',
        bgColor,
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  sparkline?: number[];
  className?: string;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, sparkline, className }: StatCardProps) {
  const changeColor = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-zinc-500',
  };

  const ChangeIcon =
    changeType === 'up' ? ChevronUp : changeType === 'down' ? ChevronDown : Minus;

  const renderSparkline = (data: number[]) => {
    if (data.length < 2) return null;

    const width = 40;
    const height = 20;
    const padding = 2; // Minimal padding to avoid clipping at edges

    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);

    // Handle case where all values are the same to avoid division by zero
    const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

    const points = data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
        const y = height - ((val - minVal) / range) * (height - 2 * padding) - padding;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="ml-2">
        <polyline
          fill="none"
          stroke="#6366f1" // A subtle indigo color
          strokeWidth="1.5"
          points={points}
        />
      </svg>
    );
  };

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-start justify-between">
        <CardTitle className="!p-0 text-sm font-medium text-zinc-500">{title}</CardTitle>
        {icon && <div className="text-zinc-400">{icon}</div>}
      </div>
      <div className="mt-2 text-3xl font-bold text-zinc-900">{value}</div>
      {change && (
        <div className="mt-2 flex items-center justify-between text-sm">
          <div className={cn('flex items-center font-medium', changeColor[changeType])}>
            <ChangeIcon className="h-4 w-4 mr-0.5" />
            {change}
          </div>
          {sparkline && sparkline.length > 1 && renderSparkline(sparkline)}
        </div>
      )}
    </Card>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-xl animate-slideup',
          sizeClasses[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h3 id="modal-title" className="text-xl font-semibold text-zinc-900">
            {title}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="!p-1.5 h-auto">
            <X className="h-5 w-5 text-zinc-500 hover:text-zinc-900" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6">
      <div className="p-3 rounded-xl bg-zinc-100 text-zinc-500 mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-2">{title}</h3>
      <p className="text-zinc-600 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

interface TableColumn<T> {
  key: keyof T | 'actions';
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Array<TableColumn<T>>;
  data: T[];
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T extends { id: string }>({ columns, data, onRowClick, className }: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white', className)}>
      <table className="min-w-full divide-y divide-zinc-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-zinc-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 text-center">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  'hover:bg-zinc-50 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-zinc-800"
                  >
                    {column.render ? column.render(row) : (row[column.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}