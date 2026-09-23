import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return new NextResponse('Text parameter is required', { status: 400 });
  }

  try {
    const cleanText = text.trim();
    
    // Primary: Google Translate TTS endpoint with proper Browser User-Agent header
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ta&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
    
    const res = await fetch(googleTtsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'audio/mpeg, audio/*;q=0.9, */*;q=0.8',
        'Referer': 'https://translate.google.com/'
      }
    });

    if (res.ok) {
      const audioBuffer = await res.arrayBuffer();
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // Secondary fallback TTS endpoint
    const voiceUrl = `https://api.dictionaryapi.dev/media/pronunciations/en/${encodeURIComponent(cleanText)}-us.mp3`;
    const fallbackRes = await fetch(voiceUrl);
    if (fallbackRes.ok) {
      const audioBuffer = await fallbackRes.arrayBuffer();
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    return new NextResponse('Failed to fetch audio from TTS provider', { status: 502 });
  } catch (error: any) {
    console.error('TTS API Route error:', error);
    return new NextResponse('Internal server error during TTS generation', { status: 500 });
  }
}
