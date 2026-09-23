import { TAMIL_DICTIONARY } from './tamilDictionary';

const TAMIL_WORD_PATTERN = /^[\u0B80-\u0BFF]+$/;

// Common colloquial, typo, sandhi, and phonetic confusion mappings
export const COMMON_CORRECTIONS: Record<string, string> = {
  // ர / ற confusions
  "வரலாரு": "வரலாறு",
  "நன்ராக": "நன்றாக",
  "நன்ரி": "நன்றி",
  "சாரு": "சாறு",
  "கூரு": "கூறு",
  "ஆரு": "ஆறு",
  "சோரு": "சோறு",
  "கயிரு": "கயிறு",
  "காத்து": "காற்று",
  "மாற்றம்": "மாற்றம்",
  "ஏர்ப்பாடு": "ஏற்பாடு",

  // ல / ள / ழ confusions
  "மொளி": "மொழி",
  "தமிள்": "தமிழ்",
  "தமிழ்பாடம்": "தமிழ்ப் பாடம்",
  "வாழ்கை": "வாழ்க்கை",
  "வாழ்க்கை": "வாழ்க்கை",
  "மழை": "மழை",
  "வலைத்தளம்": "வலைத்தளம்",
  "பழம்": "பழம்",
  "பளம்": "பழம்",
  "வளைவு": "வளைவு",
  "களவெட்டு": "கல்வெட்டு",
  "கல்வேட்டு": "கல்வெட்டு",

  // ண / ந / ன confusions
  "தமிழ்னாடு": "தமிழ்நாடு",
  "கன்னாடி": "கண்ணாடி",
  "தண்ணீர்": "தண்ணீர்",
  "தன்னீர்": "தண்ணீர்",
  "கண்ணீர்": "கண்ணீர்",
  "அவன்": "அவன்",
  "மனிதன்": "மனிதன்",
  "மனிசன்": "மனிதன்",
  "மனம்": "மனம்",
  "மணம்": "மணம்",

  // குறில் / நெடில் & typo errors
  "பாள்ளி": "பள்ளி",
  "பாள்ளிக்கு": "பள்ளிக்கு",
  "பள்ளிகூடம்": "பள்ளிக்கூடம்",
  "பொகிறேன்": "போகிறேன்",
  "போகிரேன்": "போகிறேன்",
  "வருகிரது": "வருகிறது",
  "நிருவப்பட்டது": "நிறுவப்பட்டது",
  "நிருவனம்": "நிறுவனம்",
  "ஆராய்ச்சி": "ஆராய்ச்சி",
  "ஆராச்சி": "ஆராய்ச்சி",
  "அலவலகம்": "அலுவலகம்",
  "அலுவலகம்": "அலுவலகம்",
  "புத்தகம்": "புத்தகம்",
  "புத்தகங்கள்": "புத்தகங்கள்",
  "தவறுக்கள்": "தவறுகள்",
  "எழுத்துக்கள்": "எழுத்துகள்",
  "பொருட்கள்": "பொருள்கள்",

  // Colloquial to formal written Tamil
  "படிச்சேன்": "படித்தேன்",
  "படிச்சான்": "படித்தான்",
  "படிச்சா": "படித்தாள்",
  "வந்தேன்": "வந்தேன்",
  "வந்தான்": "வந்தான்",
  "சாப்புட்டேன்": "சாப்பிட்டேன்",
  "சாப்டேன்": "சாப்பிட்டேன்",
  "சாப்பிட்டான்": "சாப்பிட்டான்",
  "போய்ட்டேன்": "போய்விட்டேன்",
  "போயிட்டேன்": "போய்விட்டேன்",
  "போய்ட்டான்": "போய்விட்டான்",
  "செஞ்சேன்": "செய்தேன்",
  "செஞ்சான்": "செய்தான்",
  "செஞ்சு": "செய்து",
  "பாத்தேன்": "பார்த்தேன்",
  "பாத்தான்": "பார்த்தான்",
  "பாத்து": "பார்த்து",
  "கேட்டேன்": "கேட்டேன்",
  "சொன்னேன்": "சொன்னேன்",
  "சொன்னான்": "சொன்னான்",
  "தெரியல": "தெரியவில்லை",
  "வரல": "வரவில்லை",
  "முடியல": "முடியவில்லை",
  "போகல": "போகவில்லை",
  "இல்ல": "இல்லை",
  "இருக்குது": "இருக்கிறது",
  "இருக்கு": "உள்ளது",
  "கெடச்சது": "கிடைத்தது",
  "அவளோதான்": "அவ்வளவுதான்",
  "இவளோதான்": "இவ்வளவுதான்",
  "எவளோ": "எவ்வளவு",
  "சீக்கிரமா": "சீக்கிரமாக",

  // Sandhi phrase pairs
  "வரலாற்று சாசனம்": "வரலாற்றுச் சாசனம்",
  "அந்த பையன்": "அந்தப் பையன்",
  "இந்த புத்தகம்": "இந்தப் புத்தகம்",
  "எந்த ஊர்": "எந்த ஊர்",
  "தமிழ் பாடம்": "தமிழ்ப் பாடம்",
  "பள்ளி கூடம்": "பள்ளிக்கூடம்"
};

// Curated base Tamil lexicon with common verbs, nouns, pronouns, numbers, particles
const BASE_TAMIL_WORDS = [
  // Pronouns & Common Connectors
  "நான்", "நீ", "அவன்", "அவள்", "அவர்", "அவர்கள்", "நாம்", "நாங்கள்", "நீங்கள்",
  "அது", "அவை", "இது", "இவை", "எது", "எவை", "யார்", "என்ன", "எங்கே", "எப்போது",
  "ஏன்", "எப்படி", "எவ்வளவு", "மற்றும்", "ஆனால்", "அல்லது", "எனவே", "ஆகவே",
  "உடன்", "மூலம்", "கொண்டு", "பற்றி", "குறித்து", "வரை", "முதல்", "இருந்து",
  "உள்ள", "உள்ளது", "உள்ளன", "இருக்கிறது", "இருக்கின்றன", "இல்லை", "அல்ல",
  "வேண்டும்", "கூடாது", "முடியும்", "முடியாது", "ஆகும்", "ஆகிய", "போன்ற",

  // Common Verbs & Conjugations
  "படி", "படித்தான்", "படித்தாள்", "படித்தார்", "படித்தேன்", "படித்தோம்", "படித்தனர்",
  "படிக்கிறான்", "படிக்கிறாள்", "படிக்கிறார்", "படிக்கிறேன்", "படிக்கிறோம்",
  "படிப்பான்", "படிப்பாள்", "படிப்பார்", "படிப்பேன்", "படிப்போம்", "படிக்க",
  "எழுது", "எழுதினான்", "எழுதியது", "எழுதுகிறான்", "எழுதுவேன்", "எழுத",
  "போ", "போனான்", "போனாள்", "போனார்", "போனேன்", "போகிறான்", "போகிறேன்", "போவான்", "போவேன்",
  "வா", "வந்தான்", "வந்தாள்", "வந்தார்", "வந்தேன்", "வருகிறான்", "வருகிறாள்", "வருவான்", "வருவேன்",
  "செய்", "செய்தான்", "செய்தாள்", "செய்தார்", "செய்தேன்", "செய்கிறான்", "செய்வான்",
  "பார்", "பார்த்தான்", "பார்த்தாள்", "பார்த்தேன்", "பார்க்கிறான்", "பார்ப்பான்",
  "கேள்", "கேட்டான்", "கேட்டாள்", "கேட்டேன்", "கேட்கிறான்", "கேட்பான்",
  "சாப்பிடு", "சாப்பிட்டான்", "சாப்பிட்டேன்", "சாப்பிடுகிறான்", "சாப்பிடுவேன்",

  // Everyday Nouns & Academic Words
  "தமிழ்", "கல்வெட்டு", "சாசனம்", "வரலாறு", "ஆட்சி", "மன்னன்", "அரசன்", "அரசி",
  "கோயில்", "திருக்கோயில்", "ஆலயம்", "பள்ளி", "கல்லூரி", "பல்கலைக்கழகம்", "நூலகம்",
  "புத்தகம்", "ஏடு", "சுவடி", "ஆவணம்", "செப்பேடு", "நாடு", "நகரம்", "ஊர்", "கிராமம்",
  "தமிழ்நாடு", "சென்னை", "மதுரை", "தஞ்சாவூர்", "காஞ்சிபுரம்", "திருச்சி", "கோவை",
  "மொழி", "சொல்", "பொருள்", "வாக்கியம்", "இலக்கணம்", "இலக்கியம்", "கவிதை", "பாடல்",
  "உரை", "உரையிலமைந்த", "சொற்கள்", "வாக்கியப்", "பிழைகள்", "பிழை", "திருத்தி",
  "சரிபார்க்க", "சரிபார்க்கவும்", "சோதிக்க", "ஆராய்ச்சி", "அறிவியல்", "தொழில்நுட்பம்",
  "நிறுவப்பட்டது", "அமைக்கப்பட்டது", "கொடுக்கப்பட்டது", "பெறப்பட்டது", "உருவாக்கப்பட்டது",
  "மாணவன்", "மாணவி", "மாணவர்கள்", "ஆசிரியர்", "பேராசிரியர்", "மக்கள்", "நண்பன்",
  "தந்தை", "தாய்", "அண்ணன்", "தம்பி", "அக்கா", "தங்கை", "குடும்பம்", "வீடு"
];

let cachedDictionary: Set<string> | null = null;

export function loadTamilWords(): Set<string> {
  if (cachedDictionary) {
    return cachedDictionary;
  }

  const wordSet = new Set<string>([...BASE_TAMIL_WORDS]);

  // Merge full dictionary
  if (Array.isArray(TAMIL_DICTIONARY)) {
    for (const w of TAMIL_DICTIONARY) {
      if (typeof w === 'string' && w.trim()) {
        wordSet.add(w.trim());
      }
    }
  }

  cachedDictionary = wordSet;
  return cachedDictionary;
}

export function levenshteinDistance(first: string, second: string): number {
  const previousRow = Array.from({ length: second.length + 1 }, (_, index) => index);

  for (let row = 1; row <= first.length; row++) {
    const currentRow = [row];

    for (let column = 1; column <= second.length; column++) {
      const insertion = currentRow[column - 1] + 1;
      const deletion = previousRow[column] + 1;
      const substitution =
        previousRow[column - 1] + (first[row - 1] === second[column - 1] ? 0 : 1);

      currentRow.push(Math.min(insertion, deletion, substitution));
    }

    for (let column = 0; column < currentRow.length; column++) {
      previousRow[column] = currentRow[column];
    }
  }

  return previousRow[second.length];
}

export function similarityScore(first: string, second: string): number {
  const maximumLength = Math.max(first.length, second.length);
  if (maximumLength === 0) return 100;
  const distance = levenshteinDistance(first, second);
  return ((maximumLength - distance) / maximumLength) * 100;
}

/**
 * Intelligent single word suggestor using:
 * 1. Exact common mistakes map
 * 2. Phonetic sound swap (ர/ற, ல/ள/ழ, ண/ந/ன)
 * 3. Levenshtein fuzzy distance
 */
export function getBestSuggestion(word: string, dictionary: Set<string>): string {
  if (!word) return word;

  // 1. Direct dictionary match
  if (dictionary.has(word)) {
    return word;
  }

  // 2. Direct Common Corrections Lookup
  if (COMMON_CORRECTIONS[word]) {
    return COMMON_CORRECTIONS[word];
  }

  // 3. Phonetic confusion heuristics
  // Check if swapping ர -> ற or ற -> ர makes it a valid word
  if (word.includes('ர')) {
    const candidate = word.replace(/ர/g, 'ற');
    if (dictionary.has(candidate)) return candidate;
  }
  if (word.includes('ற')) {
    const candidate = word.replace(/ற/g, 'ர');
    if (dictionary.has(candidate)) return candidate;
  }

  // Check ழ / ள / ல
  if (word.includes('ள')) {
    const candidate = word.replace(/ள/g, 'ழ');
    if (dictionary.has(candidate)) return candidate;
  }
  if (word.includes('ல')) {
    const candidate = word.replace(/ல/g, 'ழ');
    if (dictionary.has(candidate)) return candidate;
  }

  // 4. Fuzzy search across dictionary
  let bestWord = word;
  let bestScore = 0;

  for (const dictWord of dictionary) {
    // Only check words with roughly similar length (+/- 2 characters)
    if (Math.abs(dictWord.length - word.length) <= 2) {
      const score = similarityScore(word, dictWord);
      if (score > bestScore) {
        bestWord = dictWord;
        bestScore = score;
      }
    }
  }

  // Suggest if 65% or greater similarity found
  return bestScore >= 65 ? bestWord : word;
}

/**
 * Corrects full sentences by evaluating phrase sandhi and individual words
 */
export function correctTamilSentence(sentence: string): string {
  if (!sentence) return '';

  let working = sentence;

  // Apply phrase-level sandhi / typo replacements first
  for (const [wrongPhrase, rightPhrase] of Object.entries(COMMON_CORRECTIONS)) {
    if (wrongPhrase.includes(' ') && working.includes(wrongPhrase)) {
      working = working.split(wrongPhrase).join(rightPhrase);
    }
  }

  const dictionary = loadTamilWords();
  const tokens = working.match(/[\u0B80-\u0BFF]+|[^\u0B80-\u0BFF]+/g) ?? [];

  return tokens
    .map((token) => {
      if (TAMIL_WORD_PATTERN.test(token)) {
        return getBestSuggestion(token, dictionary);
      }
      return token;
    })
    .join('');
}

export function getTamilChanges(
  original: string,
  corrected: string
): Array<{
  original: string;
  corrected: string;
}> {
  const originalWords = original.match(/[\u0B80-\u0BFF]+/g) ?? [];
  const correctedWords = corrected.match(/[\u0B80-\u0BFF]+/g) ?? [];

  const changes: Array<{
    original: string;
    corrected: string;
  }> = [];

  const wordCount = Math.min(originalWords.length, correctedWords.length);

  for (let index = 0; index < wordCount; index++) {
    if (originalWords[index] !== correctedWords[index]) {
      changes.push({
        original: originalWords[index],
        corrected: correctedWords[index],
      });
    }
  }

  return changes;
}

export interface CheckedToken {
  word: string;
  cleanWord: string;
  index: number;
  isCorrect: boolean;
  suggestions: string[];
}

export function checkText(text: string): CheckedToken[] {
  if (!text) return [];

  const dictionary = loadTamilWords();
  const rawTokens = text.split(/(\s+)/);
  let wordIndex = 0;

  return rawTokens.map((token) => {
    const cleanWord = token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '').trim();

    if (!cleanWord) {
      return {
        word: token,
        cleanWord: '',
        index: wordIndex,
        isCorrect: true,
        suggestions: [],
      };
    }

    const currentIdx = wordIndex++;
    
    // Check if word is directly valid in dictionary
    const isValid = dictionary.has(cleanWord);
    
    // Check if word has an explicit correction
    const hasCorrection = Boolean(COMMON_CORRECTIONS[cleanWord]);
    const bestSuggestion = getBestSuggestion(cleanWord, dictionary);

    const isCorrect = isValid && !hasCorrection;

    let suggestions: string[] = [];
    if (!isCorrect) {
      if (hasCorrection) {
        suggestions = [COMMON_CORRECTIONS[cleanWord]];
      } else if (bestSuggestion && bestSuggestion !== cleanWord) {
        suggestions = [bestSuggestion];
      }
    }

    return {
      word: token,
      cleanWord,
      index: currentIdx,
      isCorrect,
      suggestions,
    };
  });
}