import { NextResponse } from 'next/server';
import { fetchWikipediaSummary } from '@/lib/wikipedia';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entityName = searchParams.get('entity');

  if (!entityName) {
    return NextResponse.json({ found: false, error: 'Entity name is required' }, { status: 400 });
  }

  const result = await fetchWikipediaSummary(entityName);
  return NextResponse.json(result);
}
