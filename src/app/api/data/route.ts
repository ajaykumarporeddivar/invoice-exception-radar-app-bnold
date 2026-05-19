import {
  MOCK_CLIENTS,
  MOCK_INVOICES,
  MOCK_EXCEPTIONS,
  STATS,
} from '@/lib/data';
import type { NextRequest } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(): Promise<Response> {
  return Response.json(
    {
      ok: true,
      data: {
        clients: MOCK_CLIENTS,
        invoices: MOCK_INVOICES,
        exceptions: MOCK_EXCEPTIONS,
        stats: STATS,
      },
      total: {
        clients: MOCK_CLIENTS.length,
        invoices: MOCK_INVOICES.length,
        exceptions: MOCK_EXCEPTIONS.length,
      },
    },
    {
      headers: CORS_HEADERS,
    },
  );
}

export async function POST(request: NextRequest): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    return Response.json(
      { ok: false, message: 'Invalid JSON body', error: (error as Error).message },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  return Response.json(
    { ok: true, message: 'Demo mode — data not persisted', received: body },
    {
      headers: CORS_HEADERS,
    },
  );
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 200, headers: CORS_HEADERS });
}