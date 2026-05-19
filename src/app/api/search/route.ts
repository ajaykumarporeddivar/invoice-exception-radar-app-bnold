import { MOCK_INVOICES, MOCK_EXCEPTIONS, MOCK_CLIENTS } from '@/lib/data';
import type { NextRequest } from 'next/server';
import type { Exception, Invoice, Client } from '@/lib/types';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
};

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('q')?.toLowerCase() || '';
  const type = searchParams.get('type')?.toLowerCase(); // Optional: 'invoices', 'exceptions', 'clients'

  let results: (Exception | Invoice | Client)[] = [];

  if (!q) {
    // If query is empty, return first 5 items, prioritizing exceptions and invoices
    if (type === 'exceptions') {
      results = MOCK_EXCEPTIONS.slice(0, 5);
    } else if (type === 'invoices') {
      results = MOCK_INVOICES.slice(0, 5);
    } else if (type === 'clients') {
      results = MOCK_CLIENTS.slice(0, 5);
    } else {
      // Default for empty query and no specific type
      results = [
        ...MOCK_EXCEPTIONS.slice(0, 3), // Get a few exceptions
        ...MOCK_INVOICES.slice(0, 2), // Get a few invoices
      ];
    }
  } else {
    // Search logic for non-empty query
    const searchInExceptions = (item: Exception): boolean => {
      return (
        item.invoiceNumber.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.clientName.toLowerCase().includes(q)
      );
    };

    const searchInInvoices = (item: Invoice): boolean => {
      return (
        item.invoiceNumber.toLowerCase().includes(q) ||
        item.vendorName.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.clientName.toLowerCase().includes(q)
      );
    };

    const searchInClients = (item: Client): boolean => {
      return (
        item.name.toLowerCase().includes(q) ||
        (item.contactName && item.contactName.toLowerCase().includes(q)) ||
        (item.contactEmail && item.contactEmail.toLowerCase().includes(q))
      );
    };

    if (!type || type === 'exceptions') {
      results.push(...MOCK_EXCEPTIONS.filter(searchInExceptions));
    }
    if (!type || type === 'invoices') {
      results.push(...MOCK_INVOICES.filter(searchInInvoices));
    }
    if (!type || type === 'clients') {
      results.push(...MOCK_CLIENTS.filter(searchInClients));
    }

    // Deduplicate results if searching across multiple types might yield same item (e.g., by ID if types allowed)
    // For now, since types are distinct, we just combine and slice.
  }

  // Limit results to a maximum of 20
  const finalResults = results.slice(0, 20);

  return Response.json(
    {
      ok: true,
      data: {
        results: finalResults,
        total: finalResults.length,
        query: q,
      },
    },
    {
      headers: CORS_HEADERS,
    },
  );
}