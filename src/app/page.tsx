import Link from 'next/link';
import { Inter } from 'next/font/google';
import {
  ArrowRight,
  Inbox,
  LayoutDashboard,
  FileText,
  UploadCloud,
  Target,
  Lock,
  Star,
  ShieldCheck,
  Globe,
  Gauge,
  BarChart2,
  List,
  MessageSquare,
  Zap,
  Workflow,
  Key,
  Database,
  CreditCard,
  LineChart,
  Users,
} from 'lucide-react';
import { cn } from '@/components/ui';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Invoice Exception Radar — Eliminate Invoice Exception Hunts. Fast.',
  description:
    'Invoice Exception Radar provides a focused platform for fractional finance teams to quickly ingest messy invoice data, identify and prioritize critical exceptions, and generate client-ready reports for swift resolution before month-end.',
};

export default function LandingPage() {
  return (
    <div className={cn('flex min-h-screen flex-col', inter.className)}>
      {/* Navbar */}
      <nav className="fixed top-10 left-0 right-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-100 py-4 px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-indigo-600" />
            <span className="text-xl font-bold text-zinc-900 tracking-tight">Invoice Exception Radar</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="#features" className="text-zinc-600 hover:text-zinc-900 font-medium">
              Features
            </Link>
            <Link href="#pricing" className="text-zinc-600 hover:text-zinc-900 font-medium">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700 transition-colors duration-200"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
            AI-Powered Finance Automation
          </span>
          <h1 className="mt-6 font-black text-5xl md:text-7xl tracking-tight leading-none text-white">
            Eliminate Invoice Exception Hunts. Fast.
          </h1>
          <p className="mt-4 text-zinc-400 text-xl md:text-2xl max-w-2xl mx-auto">
            Invoice Exception Radar streamlines messy invoice data, identifies critical exceptions, and generates
            client-ready reports for swift month-end closes.
          </p>
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-white text-zinc-900 font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span>Start Free Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 border border-zinc-600 text-zinc-300 rounded-xl px-8 py-4 hover:bg-zinc-800 transition-colors duration-200"
            >
              <span>See It Live</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Hero Visual - CSS-only UI mockup */}
        <div className="relative w-full max-w-4xl mx-auto mt-16 p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700 shadow-2xl overflow-hidden">
          <div className="absolute top-4 left-4 flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="h-4 w-32 rounded-full bg-zinc-700" />
            <div className="h-4 w-24 rounded-full bg-zinc-700" />
          </div>
          <div className="mt-8 flex space-x-4">
            <div className="w-1/4">
              <div className="h-24 rounded-lg bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-indigo-300 text-sm font-medium animate-pulse">
                AI Agent Active
              </div>
              <div className="mt-4 h-12 rounded-md bg-zinc-700/50" />
              <div className="mt-2 h-12 rounded-md bg-zinc-700/50" />
              <div className="mt-2 h-12 rounded-md bg-zinc-700/50" />
            </div>
            <div className="w-3/4 space-y-4">
              <div className="h-6 w-full rounded-md bg-zinc-700/50 flex items-center p-2">
                <div className="h-3 w-24 rounded-full bg-zinc-600" />
                <div className="ml-auto h-3 w-16 rounded-full bg-zinc-600" />
              </div>
              <div className="bg-zinc-700/30 rounded-lg p-4 space-y-2">
                <div className="h-4 w-full rounded-full bg-zinc-600" />
                <div className="h-4 w-11/12 rounded-full bg-zinc-600" />
                <div className="h-4 w-5/6 rounded-full bg-zinc-600" />
              </div>
              <div className="flex justify-between items-end h-32 mt-4">
                <div className="w-1/6 h-full bg-emerald-500/50 rounded-md" style={{ height: '80%' }} />
                <div className="w-1/6 h-full bg-indigo-500/50 rounded-md" style={{ height: '60%' }} />
                <div className="w-1/6 h-full bg-amber-500/50 rounded-md animate-pulse" style={{ height: '95%' }} />
                <div className="w-1/6 h-full bg-red-500/50 rounded-md" style={{ height: '70%' }} />
                <div className="w-1/6 h-full bg-emerald-500/50 rounded-md" style={{ height: '40%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-zinc-800/30 border-y border-zinc-700/50 py-8">
        <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-black text-4xl text-white">10,000+</p>
            <p className="text-zinc-400 text-sm">Finance Teams</p>
          </div>
          <div>
            <p className="font-black text-4xl text-white">99.9%</p>
            <p className="text-zinc-400 text-sm">Uptime Guarantee</p>
          </div>
          <div>
            <p className="font-black text-4xl text-white">₹50M+</p>
            <p className="text-zinc-400 text-sm">Invoices Processed</p>
          </div>
          <div>
            <p className="font-black text-4xl text-white">4.9<Star className="inline-block h-5 w-5 fill-amber-400 text-amber-400 ml-1 -mt-1" /></p>
            <p className="text-zinc-400 text-sm">Customer Rating</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-zinc-900 font-black text-4xl text-center tracking-tight">
            The 3 essential workflows for flawless month-end closes
          </h2>
          <p className="text-zinc-600 mt-3 text-lg text-center max-w-2xl mx-auto">
            Stop wasting hours sifting through messy data. Invoice Exception Radar automates the painful parts so you can
            focus on strategic finance.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-indigo-100 p-3">
                <UploadCloud className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 tracking-tight">Invoice & Exception Intake</h3>
              <p className="mt-2 text-zinc-600">
                Fractional finance teams cannot quickly turn messy intake into a clean working queue.
              </p>
              <p className="mt-4 text-zinc-500 text-sm">
                Easily import or manually enter invoice data, and our system automatically identifies potential exceptions,
                organizing them into a structured, review-ready queue.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-indigo-100 p-3">
                <LayoutDashboard className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 tracking-tight">Exception Management Dashboard</h3>
              <p className="mt-2 text-zinc-600">
                Lack a single dashboard to prioritize high-value work and see what needs action now.
              </p>
              <p className="mt-4 text-zinc-500 text-sm">
                Gain a unified view of all outstanding exceptions, their severity, and due dates, empowering you to
                prioritize and act on critical items before month-end.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-indigo-100 p-3">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 tracking-tight">Client-Ready Reporting</h3>
              <p className="mt-2 text-zinc-600">
                Need exportable outputs that prove ROI without manual reporting or spreadsheet cleanup.
              </p>
              <p className="mt-4 text-zinc-500 text-sm">
                Generate professional, exportable reports on identified and resolved exceptions, eliminating manual
                spreadsheet work and clearly demonstrating your value to clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locked Roadmap Section */}
      <section className="bg-zinc-950 text-white py-20 px-6 md:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-white font-black text-4xl tracking-tight">Unlock the full roadmap in one click</h2>
          <p className="mt-3 text-zinc-400 text-lg max-w-2xl mx-auto">
            Expand your capabilities with advanced automation, team collaboration, and deeper insights once you&apos;re
            ready to scale.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-left">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <h3 className="text-lg font-semibold text-white">Approval Automation</h3>
              </div>
              <p className="mt-2 text-zinc-400 text-sm">
                Streamline approvals with automated workflows for different exception types.
              </p>
              <p className="mt-4 text-sm text-zinc-500">Tier: Professional+ • Available after upgrade</p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-left">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <h3 className="text-lg font-semibold text-white">Triage Automation</h3>
              </div>
              <p className="mt-2 text-zinc-400 text-sm">
                AI-powered routing and assignment of exceptions to the right team member.
              </p>
              <p className="mt-4 text-sm text-zinc-500">Tier: Professional+ • Available after upgrade</p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-left">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <h3 className="text-lg font-semibold text-white">Advanced Reporting</h3>
              </div>
              <p className="mt-2 text-zinc-400 text-sm">
                Deep-dive analytics and benchmark reports for continuous process improvement.
              </p>
              <p className="mt-4 text-sm text-zinc-500">Tier: Professional+ • Available after upgrade</p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-left">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <h3 className="text-lg font-semibold text-white">Team Roles & Permissions</h3>
              </div>
              <p className="mt-2 text-zinc-400 text-sm">
                Granular control over team access and capabilities for larger finance agencies.
              </p>
              <p className="mt-4 text-sm text-zinc-500">Tier: Enterprise • Available after upgrade</p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-left">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <h3 className="text-lg font-semibold text-white">Real-Time Database Persistence</h3>
              </div>
              <p className="mt-2 text-zinc-400 text-sm">
                Move beyond mock data to secure, persistent storage and real-time updates.
              </p>
              <p className="mt-4 text-sm text-zinc-500">Tier: Professional+ • Available after upgrade</p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-left">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <h3 className="text-lg font-semibold text-white">Integrated Billing & Entitlements</h3>
              </div>
              <p className="mt-2 text-zinc-400 text-sm">
                Seamless management of subscriptions and feature access based on your plan.
              </p>
              <p className="mt-4 text-sm text-zinc-500">Tier: Professional+ • Available after upgrade</p>
            </div>
          </div>

          <div className="mt-16">
            <Link
              href="#pricing"
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white font-bold rounded-xl px-8 py-4 shadow-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <span>Unlock full roadmap</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-zinc-50 py-24 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-zinc-900 font-black text-4xl text-center tracking-tight">
            How Invoice Exception Radar Works
          </h2>
          <p className="text-zinc-600 mt-3 text-lg text-center max-w-2xl mx-auto">
            Our intelligent workflow takes you from messy intake to resolution and reporting in just three simple steps.
          </p>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            {/* Step 1 */}
            <div className="flex-1 text-center md:text-left">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold mx-auto md:mx-0">
                1
              </div>
              <h3 className="mt-4 text-xl font-bold text-zinc-900 tracking-tight">Ingest & Identify</h3>
              <p className="mt-2 text-zinc-600">
                Connect your data sources or manually input invoices. Our AI instantly scans and flags missing approvals,
                discrepancies, and payment risks.
              </p>
            </div>

            <ArrowRight className="h-10 w-10 text-zinc-400 hidden md:block" />

            {/* Step 2 */}
            <div className="flex-1 text-center md:text-left">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold mx-auto md:mx-0">
                2
              </div>
              <h3 className="mt-4 text-xl font-bold text-zinc-900 tracking-tight">Prioritize & Resolve</h3>
              <p className="mt-2 text-zinc-600">
                Manage all exceptions from a single, intuitive dashboard. Prioritize high-severity items and track
                resolution status with ease.
              </p>
            </div>

            <ArrowRight className="h-10 w-10 text-zinc-400 hidden md:block" />

            {/* Step 3 */}
            <div className="flex-1 text-center md:text-left">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold mx-auto md:mx-0">
                3
              </div>
              <h3 className="mt-4 text-xl font-bold text-zinc-900 tracking-tight">Report & Prove</h3>
              <p className="mt-2 text-zinc-600">
                Generate professional, client-ready reports showing identified issues, resolutions, and the time/cost
                savings achieved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-24 px-6 md:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-zinc-900 font-black text-4xl tracking-tight">Simple, transparent pricing</h2>
          <p className="text-zinc-600 mt-3 text-lg max-w-2xl mx-auto">
            Find the perfect plan for your fractional finance team, from solo practitioners to growing agencies.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Free Tier */}
            <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">Pilot</h3>
              <p className="mt-4 text-zinc-600">Perfect for solopreneurs exploring automation.</p>
              <p className="mt-6 text-5xl font-black text-zinc-900">₹0<span className="text-xl font-medium text-zinc-500">/mo</span></p>
              <ul className="mt-8 space-y-4 text-zinc-600 flex-grow">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>1 Client</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>5 Invoices/month</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>3 active Exceptions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>Basic Intake & Dashboard</span>
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="mt-10 block w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-bold rounded-lg px-8 py-3 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Tier - Highlighted */}
            <div className="bg-zinc-900 text-white rounded-xl shadow-lg p-8 flex flex-col scale-105 ring-2 ring-indigo-500 z-10">
              <p className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</p>
              <h3 className="text-2xl font-bold tracking-tight">Professional</h3>
              <p className="mt-4 text-zinc-300">For growing fractional finance teams up to 5 clients.</p>
              <p className="mt-6 text-5xl font-black">₹8,200<span className="text-xl font-medium text-zinc-400">/mo</span></p>
              <ul className="mt-8 space-y-4 text-zinc-200 flex-grow">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span>5 Clients</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text