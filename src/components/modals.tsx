'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Modal,
  Badge,
  Button,
  Avatar,
  Input,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Spinner,
  Toast, // Assuming Toast component is available in ui.tsx
} from '@/components/ui'; // Assuming these components are exported from ui.tsx
import {
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  FileText,
  LayoutDashboard,
  Inbox,
  Search,
} from 'lucide-react';
import { useDemoToast } from '@/hooks/useApp';

interface EntityDetailModalProps {
  item: Record<string, unknown> | null;
  open: boolean;
  onClose: () => void;
  title: string;
}

export function EntityDetailModal({ item, open, onClose, title }: EntityDetailModalProps) {
  const { show: showToast } = useDemoToast();

  const formatValue = (key: string, value: unknown): React.ReactNode => {
    if (typeof value === 'string') {
      if (key.toLowerCase().includes('date') && !isNaN(new Date(value as string).getTime())) {
        return new Date(value).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }
      if (key.toLowerCase().includes('amount') || key.toLowerCase().includes('total')) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) return numValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      }
      if (key.toLowerCase().includes('url')) {
        return <a href={value} target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:underline">{value}</a>;
      }
    }
    if (typeof value === 'number') {
      if (key.toLowerCase().includes('amount') || key.toLowerCase().includes('total')) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      }
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return String(value);
  };

  const getStatusBadgeVariant = (status: string | unknown) => {
    switch (String(status).toLowerCase()) {
      case 'active':
      case 'approved':
      case 'paid':
      case 'resolved':
        return 'success';
      case 'pending_review':
      case 'in_review':
      case 'in progress':
      case 'open':
        return 'warning';
      case 'exception':
      case 'overdue':
      case 'high':
      case 'critical':
        return 'danger';
      case 'inactive':
      case 'dismissed':
        return 'info';
      default:
        return 'info';
    }
  };

  const handleAction = (action: string) => {
    showToast(`${title} item ${action.toLowerCase()}ed. (Demo action)`, 'info');
    onClose();
  };

  if (!item) return null;

  const statusValue = item.status || 'N/A';

  return (
    <Modal open={open} onClose={onClose} title={`Details: ${title}`}>
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <span className="text-zinc-600 font-medium">Status:</span>
          <Badge variant={getStatusBadgeVariant(statusValue)}>{String(statusValue).replace(/_/g, ' ')}</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {Object.entries(item).map(([key, value]) => {
            if (key === 'id' || key === 'userId' || key === 'clientId' || key === 'invoiceId' || key === 'status') {
              return null; // Skip internal IDs and status (handled by badge)
            }
            if (key === 'originalDocumentUrl' && !value) return null;

            return (
              <div key={key} className="flex flex-col">
                <span className="font-medium text-zinc-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="text-zinc-600">
                  {formatValue(key, value)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          {item.status !== 'approved' && ( // Example conditional actions
            <Button variant="success" onClick={() => handleAction('Approve')}>
              Approve
            </Button>
          )}
          {item.status !== 'dismissed' && item.status !== 'resolved' && (
             <Button variant="secondary" onClick={() => handleAction('Archive')}>
              Archive
            </Button>
          )}
          <Button variant="danger" onClick={() => handleAction('Delete')}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  variant?: 'danger' | 'info';
}

export function ConfirmModal({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  variant = 'info',
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="p-4 space-y-4">
        <p className="text-zinc-600 text-sm">{message}</p>
        <div className="flex justify-end gap-3 pt-2 border-t border-zinc-200">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: Array<{ label: string; href: string; icon?: React.ReactNode; description?: string }>;
}

export function CommandPalette({ open, onClose, items }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          onClose();
        } else if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredItems.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            router.push(filteredItems[selectedIndex].href);
            onClose();
          }
        }
      };

      document.addEventListener('keydown', down);
      inputRef.current?.focus();
      return () => document.removeEventListener('keydown', down);
    }
  }, [open, onClose, filteredItems, selectedIndex, router]);

  useEffect(() => {
    setFilteredItems(
      search === ''
        ? items
        : items.filter(item =>
            item.label.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase())
          )
    );
    setSelectedIndex(0); // Reset index on search change
  }, [search, items]);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} showCloseButton={false} className="max-w-xl p-0 shadow-lg">
      <Command shouldFilter={false} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-zinc-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        <div className="flex items-center border-b border-zinc-200 px-3" cmdk-input-wrapper="">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            ref={inputRef}
            placeholder="Search commands or navigate..."
            value={search}
            onValueChange={setSearch}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {filteredItems.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup heading="Suggestions">
              {filteredItems.map((item, index) => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className={React.useMemo(() => `flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1.5 text-sm transition-all focus:outline-none aria-selected:bg-zinc-100 ${index === selectedIndex ? 'bg-zinc-100' : ''}`, [index, selectedIndex])}
                  onMouseEnter={() => setSelectedIndex(index)} // Allow mouse hover to update selection
                >
                  {item.icon}
                  <div>
                    <span className="text-zinc-900 font-medium">{item.label}</span>
                    {item.description && <p className="text-zinc-600 text-xs">{item.description}</p>}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
      <Toast message={showToast.message} type={showToast.type} visible={showToast.visible} />
    </Modal>
  );
}