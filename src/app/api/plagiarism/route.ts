import { NextResponse } from 'next/server';
import { checkTamilPlagiarism } from '@/lib/plagiarism';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, clientApiKey } = body;

    if (!text || !text.trim()) {
      return NextResponse.json(
        { success: false, error: 'Text is required for plagiarism check' },
        { status: 400 }
      );
    }

    const result = await checkTamilPlagiarism(text, clientApiKey);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API /api/plagiarism error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
