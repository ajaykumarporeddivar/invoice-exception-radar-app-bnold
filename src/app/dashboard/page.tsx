'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { STATS, MOCK_EXCEPTIONS, RECENT_ACTIVITY, DEMO_USER, CHART_DATA, SPARKLINE_DATA } from '@/lib/data';
import { formatDate, formatCurrency } from '@/lib/utils';
import { StatCard, Card, CardHeader, CardTitle, CardContent, Badge, Avatar, Table, Button, Input } from '@/components/ui';
import { BarChart, Sparkline } from '@/components/charts';
import { AppHeader } from '@/components/layout';
import { Search, Download, PlusCircle } from 'lucide-react';
import { Exception } from '@/lib/types'; // Assuming types are in lib/types.ts

// Helper for dynamic badge colors
const getStatusBadgeVariant = (status: Exception['status']) => {
  switch (status) {
    case 'resolved':
      return 'success';
    case 'open':
    case 'in_review':
      return 'amber';
    case 'dismissed':
      return 'secondary';
    default:
      return 'default';
  }
};

const getSeverityBadgeVariant = (severity: Exception['severity']) => {
  switch (severity) {
    case 'critical':
    case 'high':
      return 'danger';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
    default:
      return 'default';
  }
};

export default function DashboardPage() {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => {
        setToastMsg(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const handleQuickAction = (action: string) => {
    setToastMsg(`${action} action triggered successfully!`);
  };

  const filteredExceptions = useMemo(() => {
    if (!searchQuery) {
      return MOCK_EXCEPTIONS;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return MOCK_EXCEPTIONS.filter(
      (exception) =>
        exception.invoiceNumber.toLowerCase().includes(lowerCaseQuery) ||
        exception.vendorName.toLowerCase().includes(lowerCaseQuery) ||
        exception.clientName.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery, MOCK_EXCEPTIONS]);

  const handleExportCSV = () => {
    const headers = [
      'Invoice Number',
      'Client',
      'Vendor',
      'Type',
      'Severity',
      'Status',
      'Due Date',
      'Amount',
      'Description',
    ];
    const csvContent =
      headers.join(',') +
      '\n' +
      filteredExceptions
        .map((e) =>
          [
            e.invoiceNumber,
            e.clientName,
            e.vendorName,
            e.type,
            e.severity,
            e.status,
            formatDate(e.createdAt),
            e.amount,
            e.description.replace(/,/g, ';').replace(/\n/g, ' '), // Basic CSV sanitization
          ].join(',')
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `exceptions_export_${formatDate(new Date(), { format: 'YYYY-MM-DD' })}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setToastMsg('Exceptions exported to CSV!');
    }
  };

  return (
    <>
      <AppHeader
        title="Dashboard"
        subtitle={`Good morning, ${DEMO_USER.name}`}
        actions={
          <Button size="sm" href="/dashboard/intake" icon={<PlusCircle size={16} />}>
            New Exception
          </Button>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          title="Total Exceptions"
          value={STATS.totalExceptions}
          change={STATS.totalExceptionsGrowth}
          sparkline={<Sparkline data={SPARKLINE_DATA.totalExceptions} color="emerald" />}
        />
        <StatCard
          title="High Priority Open"
          value={STATS.highPriorityOpen}
          change={STATS.highPriorityOpenGrowth}
          sparkline={<Sparkline data={SPARKLINE_DATA.highPriorityExceptions} color="rose" />}
        />
        <StatCard
          title="Overdue Exceptions"
          value={STATS.overdueExceptions}
          change={STATS.overdueExceptionsGrowth}
          sparkline={<Sparkline data={SPARKLINE_DATA.overdueExceptions} color="amber" />}
        />
        <StatCard
          title="Avg Resolution Time"
          value={STATS.avgResolutionTime}
          change={STATS.avgResolutionTimeGrowth}
          sparkline={<Sparkline data={SPARKLINE_DATA.avgResolutionTime} color="blue" />}
        />
      </div>

      {/* Chart + Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Exception Overview</CardTitle>
            <p className="text-zinc-600 text-sm mt-1">Last 12 weeks</p>
          </CardHeader>
          <CardContent>
            <BarChart
              labels={CHART_DATA.labels}
              data={[
                { label: 'New Exceptions', values: CHART_DATA.weekly, color: 'rgb(39 39 42)' }, // zinc-900
                { label: 'Resolved', values: CHART_DATA.resolved, color: 'rgb(5 150 105)' }, // emerald-600
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_ACTIVITY.map((activity, index) => (
              <div key={activity.id} className="flex items-center gap-3 py-2 border-b border-zinc-100 last:border-0">
                <Avatar src={DEMO_USER.avatar} alt={DEMO_USER.name} size="sm" />
                <div className="flex-1">
                  <p className="text-sm text-zinc-700">
                    <span className="font-medium">{activity.username}</span> {activity.action}{' '}
                    <span className="text-zinc-500">{activity.details}</span>
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">{formatDate(activity.timestamp, { relative: true })}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Data Table */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Exceptions</CardTitle>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search exceptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={16} />}
              className="w-64"
            />
            <Button variant="secondary" onClick={handleExportCSV} icon={<Download size={16} />}>
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            headers={[
              'Invoice #',
              'Client',
              'Vendor',
              'Type',
              'Severity',
              'Status',
              'Due Date',
              'Amount',
            ]}
            rows={filteredExceptions.map((exception) => ({
              id: exception.id,
              data: [
                exception.invoiceNumber,
                exception.clientName,
                exception.vendorName,
                <Badge key={`${exception.id}-type`} variant="secondary">{exception.type.replace(/_/g, ' ')}</Badge>,
                <Badge key={`${exception.id}-severity`} variant={getSeverityBadgeVariant(exception.severity)}>
                  {exception.severity}
                </Badge>,
                <Badge key={`${exception.id}-status`} variant={getStatusBadgeVariant(exception.status)}>
                  {exception.status.replace(/_/g, ' ')}
                </Badge>,
                formatDate(exception.dueDate),
                formatCurrency(exception.amount),
              ],
            }))}
            onRowClick={(id) => setSelectedRowId(id)}
            selectedRowId={selectedRowId}
            emptyMessage="No exceptions found."
          />
          <div className="mt-4 text-sm text-zinc-500">
            Showing {filteredExceptions.length} of {MOCK_EXCEPTIONS.length} results
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <Button onClick={() => handleQuickAction('Add New Exception')} variant="secondary" icon={<PlusCircle size={16} />}>
          Add New Exception
        </Button>
        <Button onClick={() => handleQuickAction('Resolve Selected')} variant="secondary">
          Resolve Selected
        </Button>
        <Button onClick={() => handleQuickAction('Generate Report')} variant="secondary" icon={<Download size={16} />}>
          Generate Report
        </Button>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm transition-all duration-300">
          {toastMsg}
        </div>
      )}
    </>
  );
}