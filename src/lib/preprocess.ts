import sharp from 'sharp';

/**
 * Preprocesses an image buffer using Sharp to improve OCR accuracy.
 * Specifically designed for ancient stone inscriptions where text contrast is low.
 * 
 * 1. Grayscale: Removes color noise.
 * 2. Normalize/Contrast: Maximizes the contrast spread.
 * 3. Thresholding (Binarization): Converts to pure black & white for Tesseract.
 * 
 * @param imageBuffer Original image buffer from the upload
 * @returns Preprocessed image buffer ready for Tesseract.js
 */
export async function preprocessImage(imageBuffer: Buffer): Promise<Buffer> {
  try {
    const processedBuffer = await sharp(imageBuffer)
      .grayscale() // Remove color information
      .normalize() // Stretch contrast to cover full dynamic range
      .threshold(128, { grayscale: false }) // Binarize: pixels > 128 become white, else black
      .toBuffer();

    return processedBuffer;
  } catch (error) {
    console.error('Image preprocessing failed. Falling back to original image.', error);
    // If preprocessing fails for any reason (e.g., unsupported format), return original
    return imageBuffer;
  }
}
