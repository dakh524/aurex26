import {
  correctTamilSentence,
  getTamilChanges,
} from "@/lib/tamilSpellChecker";

import {
  correctWithCerebras,
} from "@/lib/cerebras";

import {
  callGeminiWithFallback,
} from "@/lib/gemini";

type RequestBody = {
  text?: unknown;
  sentence?: unknown;
  clientApiKey?: unknown;
};

export async function POST(
  request: Request
) {
  try {
    const body =
      (await request.json()) as RequestBody;

    const textInput =
      typeof body.text === "string"
        ? body.text
        : typeof body.sentence === "string"
        ? body.sentence
        : "";

    const text = textInput.trim();
    const clientApiKey =
      typeof body.clientApiKey === "string"
        ? body.clientApiKey.trim()
        : "";

    if (!text) {
      return Response.json(
        {
          success: false,
          error: "Tamil text is required.",
        },
        {
          status: 400,
        }
      );
    }

    // 1. Try Gemini AI Spell Check first
    const geminiPrompt = `நீ ஒரு தமிழ் எழுத்துப் பிழை திருத்தும் உதவியாளர். 
தவறான வாக்கியத்தை சரி செய்து, சரியான தமிழ் வாக்கியத்தை மட்டும் கொடு. 
விளக்கம், மொழிபெயர்ப்பு அல்லது வேறு எதையும் கொடுக்காதே.

வாக்கியம்:
${text}`;

    try {
      const geminiResult = await callGeminiWithFallback(
        geminiPrompt,
        undefined,
        undefined,
        clientApiKey
      );

      if (geminiResult.success && geminiResult.text) {
        // Ensure result isn't the JSON fallback for inscription OCR
        const rawText = geminiResult.text.trim();
        if (!rawText.startsWith("{") && !rawText.startsWith("[")) {
          const correctedText = rawText
            .replace(/^```[\s\S]*?\n/, "")
            .replace(/\n```$/, "")
            .trim();

          if (correctedText) {
            const changes = getTamilChanges(text, correctedText);

            return Response.json({
              success: true,
              originalText: text,
              correctedText,
              corrected: correctedText,
              changes,
              source: "gemini",
            });
          }
        }
      }
    } catch (gErr) {
      console.warn("Gemini spellcheck fallback triggered:", gErr);
    }

    // 2. Try Cerebras AI Spell Check
    const cerebrasResult =
      await correctWithCerebras(text);

    if (cerebrasResult?.correctedText) {
      const correctedText =
        cerebrasResult.correctedText.trim();

      const changes = getTamilChanges(
        text,
        correctedText
      );

      return Response.json({
        success: true,
        originalText: text,
        correctedText,
        corrected: correctedText,
        changes,
        source: "cerebras",
      });
    }

    // 3. Fallback to Local Rule-based Tamil Spell Check
    const correctedText =
      correctTamilSentence(text);

    const changes = getTamilChanges(
      text,
      correctedText
    );

    return Response.json({
      success: true,
      originalText: text,
      correctedText,
      corrected: correctedText,
      changes,
      source: "local",
    });
  } catch (error) {
    console.error(
      "Spellcheck request failed:",
      error
    );

    return Response.json(
      {
        success: false,
        error: "Spellcheck request failed.",
      },
      {
        status: 500,
      }
    );
  }
}