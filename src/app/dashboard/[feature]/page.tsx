'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate, formatCurrency } from '@/lib/utils'
// ⚠ Import ONLY the MOCK arrays defined in your SPEC CONTRACT Entity Reference Table:
import { MOCK_INVOICES, MOCK_CLIENTS, MOCK_EXCEPTIONS } from '@/lib/data'
import { Search, Plus, Download, Eye, ArrowRight } from 'lucide-react'
import type { Invoice, Exception } from '@/lib/types' // Import types for better strictness

export default function FeaturePage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [severityFilter, setSeverityFilter] = useState('')
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null) // Used for highlighting selected row/card

  // ── Feature 1: Invoice & Exception Intake (/dashboard/intake) ──────────────────────
  if (slug === 'intake') {
    const items = MOCK_INVOICES.filter(i =>
      (!search || i.invoiceNumber.toLowerCase().includes(search.toLowerCase()) || i.vendorName.toLowerCase().includes(search.toLowerCase())) &&
      (!statusFilter || i.status === statusFilter)
    )

    // For simplicity, this example only shows listing recent items. A full intake form would be a modal or separate page.
    return (
      <div className="space-y-6">
        <AppHeader
          title="Invoice & Exception Intake"
          subtitle={`${items.length} recently added invoices`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />Add New Invoice</Button>}
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search invoices by number or vendor..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="exception">Exception</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Invoice #</th>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Vendor</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Added On</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}
                    className={`hover:bg-zinc-50 cursor-pointer transition-colors ${selectedItemId === item.id ? 'bg-indigo-50' : ''}`}
                  >
                    <td className="px-6 py-3 font-medium text-zinc-900">{item.invoiceNumber}</td>
                    <td className="px-6 py-3 text-zinc-500">{item.clientName}</td>
                    <td className="px-6 py-3 text-zinc-700">{item.vendorName}</td>
                    <td className="px-6 py-3 text-zinc-700">{formatCurrency(item.amount, item.currency)}</td>
                    <td className="px-6 py-3 text-zinc-500">{formatDate(item.dueDate)}</td>
                    <td className="px-6 py-3">
                      <Badge variant={item.status === 'approved' || item.status === 'paid' ? 'success' : item.status === 'pending_review' ? 'warning' : 'error'}>
                        {item.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-3">
                      <button className="text-zinc-400 hover:text-zinc-700 p-1"><Eye size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {items.length} of {MOCK_INVOICES.length} invoices
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 2: Exception Management Dashboard (/dashboard/dashboard) ──────────────────────
  if (slug === 'dashboard') {
    const filteredExceptions = MOCK_EXCEPTIONS.filter(item =>
      (!search || item.invoiceNumber.toLowerCase().includes(search.toLowerCase()) || item.clientName.toLowerCase().includes(search.toLowerCase())) &&
      (!statusFilter || item.status === statusFilter) &&
      (!severityFilter || item.severity === severityFilter)
    )

    // Helper to get invoice details for display (not performance critical for mock data)
    const getInvoiceDetails = (invoiceId: string): Invoice | undefined => MOCK_INVOICES.find(inv => inv.id === invoiceId);

    return (
      <div className="space-y-6">
        <AppHeader
          title="Exception Management Dashboard"
          subtitle={`${filteredExceptions.length} outstanding exceptions`}
          actions={<Button size="sm" variant="outline"><Download size={14} className="mr-1" />Export Exceptions</Button>}
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search exceptions by invoice or client..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Severities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Invoice #</th>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Severity</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredExceptions.map(item => {
                  const invoice = getInvoiceDetails(item.invoiceId)
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}
                      className={`hover:bg-zinc-50 cursor-pointer transition-colors ${selectedItemId === item.id ? 'bg-indigo-50' : ''}`}
                    >
                      <td className="px-6 py-3 font-medium text-zinc-900">{item.invoiceNumber}</td>
                      <td className="px-6 py-3 text-zinc-500">{item.clientName}</td>
                      <td className="px-6 py-3 text-zinc-700">{item.type.replace(/_/g, ' ')}</td>
                      <td className="px-6 py-3">
                        <Badge variant={item.severity === 'high' || item.severity === 'critical' ? 'error' : item.severity === 'medium' ? 'warning' : 'info'}>
                          {item.severity}
                        </Badge>
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant={item.status === 'open' ? 'warning' : item.status === 'resolved' ? 'success' : 'info'}>
                          {item.status.replace(/_/g, ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-3 text-zinc-400 text-xs">{invoice?.dueDate ? formatDate(invoice.dueDate) : 'N/A'}</td>
                      <td className="px-6 py-3 text-zinc-700">{invoice?.amount ? formatCurrency(invoice.amount, invoice.currency) : 'N/A'}</td>
                      <td className="px-6 py-3">
                        <button className="text-zinc-400 hover:text-zinc-700 p-1"><Eye size={14} /></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {filteredExceptions.length} of {MOCK_EXCEPTIONS.length} exceptions
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 3: Exception Reports (/dashboard/reports) ──────────────────────
  if (slug === 'reports') {
    const filteredReports = MOCK_EXCEPTIONS.filter(item =>
      (!search || item.invoiceNumber.toLowerCase().includes(search.toLowerCase()) || item.clientName.toLowerCase().includes(search.toLowerCase())) &&
      (!statusFilter || item.status === statusFilter) &&
      (!severityFilter || item.severity === severityFilter)
    )

    return (
      <div className="space-y-6">
        <AppHeader
          title="Exception Reports"
          subtitle={`${filteredReports.length} records available for reporting`}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download size={14} className="mr-1" />Export Reports</Button>
              <Button size="sm"><Plus size={14} className="mr-1" />New Report</Button>
            </div>
          }
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Severities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Invoice #</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Severity</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredReports.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50 cursor-pointer" onClick={() => setSelectedItemId(item.id)}>
                    <td className="px-6 py-3 font-medium text-zinc-900">{item.clientName}</td>
                    <td className="px-6 py-3 text-zinc-500">{item.invoiceNumber}</td>
                    <td className="px-6 py-3 text-zinc-700">{item.type.replace(/_/g, ' ')}</td>
                    <td className="px-6 py-3">
                      <Badge variant={item.severity === 'high' || item.severity === 'critical' ? 'error' : item.severity === 'medium' ? 'warning' : 'info'}>
                        {item.severity}
                      </Badge>
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant={item.status === 'open' ? 'warning' : item.status === 'resolved' ? 'success' : 'info'}>
                        {item.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{formatDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {filteredReports.length} of {MOCK_EXCEPTIONS.length} reports
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Default: feature hub ──────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <AppHeader title="Features" subtitle="Select a feature to get started" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { slug: 'intake', name: 'Invoice & Exception Intake', description: 'Quickly capture new invoices and flag exceptions for review.', count