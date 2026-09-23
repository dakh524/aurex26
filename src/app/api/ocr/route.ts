import { NextResponse } from 'next/server';
import { preprocessImage } from '@/lib/preprocess';
import { runOCR } from '@/lib/ocr';

export async function POST(req: Request) {
  try {
    // 1. Extract multipart form data
    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;

    // 2. Validate input
    if (!imageFile) {
      return NextResponse.json({ success: false, error: 'No image provided.' }, { status: 400 });
    }
    
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'Invalid file type. Please upload a JPG or PNG.' }, { status: 400 });
    }

    if (imageFile.size === 0) {
      return NextResponse.json({ success: false, error: 'Uploaded file is empty.' }, { status: 400 });
    }

    // 3. Convert File to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Preprocess the image using Sharp
    const processedBuffer = await preprocessImage(buffer);

    // 5. Run Tesseract OCR on the processed image
    const ocrText = await runOCR(processedBuffer);

    // 6. Return the extracted text
    return NextResponse.json({
      success: true,
      ocr_text: ocrText
    });

  } catch (error: any) {
    console.error('[OCR API Error]', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process the inscription image.' },
      { status: 500 }
    );
  }
}
