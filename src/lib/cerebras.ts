type CerebrasResult = {
  correctedText: string;
  source: "cerebras";
};

const MODEL_NAME = "gpt-oss-120b";

const SYSTEM_PROMPT =
  "நீ ஒரு தமிழ் எழுத்துப் பிழை திருத்தும் உதவியாளர். " +
  "தவறான வாக்கியத்தை சரி செய்து, சரியான தமிழ் வாக்கியத்தை மட்டும் கொடு. " +
  "விளக்கம், மொழிபெயர்ப்பு அல்லது வேறு எதையும் கொடுக்காதே.";

function getApiKeys(): string[] {
  const value = process.env.CEREBRAS_API_KEYS || "";

  return value
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);
}

function cleanModelOutput(value: string): string {
  return value
    .replace(/^```[\s\S]*?\n/, "")
    .replace(/\n```$/, "")
    .trim();
}

export async function correctWithCerebras(
  text: string
): Promise<CerebrasResult | null> {
  const apiKeys = getApiKeys();

  if (apiKeys.length === 0) {
    console.warn(
      "CEREBRAS_API_KEYS is not configured."
    );

    return null;
  }

  for (const apiKey of apiKeys) {
    try {
      const response = await fetch(
        "https://api.cerebras.ai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: MODEL_NAME,
            temperature: 0.2,
            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT,
              },
              {
                role: "user",
                content: text,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        console.warn(
          `Cerebras key failed with status ${response.status}.`
        );

        continue;
      }

      const data = await response.json();

      const result =
        data?.choices?.[0]?.message?.content;

      if (
        typeof result !== "string" ||
        !result.trim()
      ) {
        continue;
      }

      return {
        correctedText: cleanModelOutput(result),
        source: "cerebras",
      };
    } catch (error) {
      console.warn(
        "Cerebras request failed; trying next key.",
        error
      );
    }
  }

  return null;
}