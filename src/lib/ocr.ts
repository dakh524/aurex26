import { createWorker } from 'tesseract.js';

export interface OCROptions {
  langPath?: string; // Optional local path or custom CDN
}

/**
 * Executes Tesseract.js OCR engine for Tamil language ('tam')
 * 
 * @param imageInput Buffer of the preprocessed image
 * @param options Optional configuration
 * @returns Raw Tamil text extracted from the inscription
 */
export async function runOCR(
  imageInput: Buffer | string,
  options?: OCROptions
): Promise<string> {
  let worker: any = null;
  try {
    // We use the best available Tamil trained data from projectnaptha
    const langPath = options?.langPath || 'https://tessdata.projectnaptha.com/4.00_best';

    // Initialize Tesseract worker for Tamil ('tam')
    worker = await createWorker('tam', 1, {
      langPath: langPath,
      logger: (m) => {
        if (m.status) {
          console.log(`[Tesseract OCR] ${m.status}: ${Math.round((m.progress || 0) * 100)}%`);
        }
      },
    });

    // Run recognition on the provided image buffer or URL
    const recognitionResult = await worker.recognize(imageInput);
    
    // Properly terminate the worker to prevent memory leaks
    await worker.terminate();
    worker = null;

    // Extract and trim the raw text
    const rawText = recognitionResult?.data?.text ? recognitionResult.data.text.trim() : '';
    return rawText;
  } catch (error: any) {
    console.error('[Tesseract OCR Failure]', error);
    
    // Ensure worker is terminated even if an error occurs
    if (worker) {
      try {
        await worker.terminate();
      } catch (e) {
        // Ignore termination error
      }
    }

    throw new Error(`Tamil OCR processing failed: ${error?.message || 'Unknown error.'}`);
  }
}
