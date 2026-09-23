const fs = require('fs');
const path = require('path');

// 1. Uyir Vowels (12)
const uyirList = [
  { letter: "அ", transliteration: "a", example: "அம்மா (Amma - Mother)" },
  { letter: "ஆ", transliteration: "aa", example: "ஆடு (Aadu - Goat)" },
  { letter: "இ", transliteration: "i", example: "இலை (Ilai - Leaf)" },
  { letter: "ஈ", transliteration: "ee", example: "ஈட்டி (Eetti - Spear)" },
  { letter: "உ", transliteration: "u", example: "உரல் (Ural - Mortar)" },
  { letter: "ஊ", transliteration: "oo", example: "ஊஞ்சல் (Oonjal - Swing)" },
  { letter: "எ", transliteration: "e", example: "எலி (Eli - Rat)" },
  { letter: "ஏ", transliteration: "ae", example: "ஏணி (Aeni - Ladder)" },
  { letter: "ஐ", transliteration: "ai", example: "ஐவர் (Aivar - Five people)" },
  { letter: "ஒ", transliteration: "o", example: "ஒட்டகம் (Ottagam - Camel)" },
  { letter: "ஓ", transliteration: "oo", example: "ஓடம் (Odam - Boat)" },
  { letter: "ஔ", transliteration: "au", example: "ஔவையார் (Avvaiyar - Poet)" }
];

// 2. Ayutham (1)
const ayuthamList = [
  { letter: "ஃ", transliteration: "ak", example: "எஃகு (Ehgu - Steel)" }
];

// 3. Mei Consonants (18)
const meiList = [
  { letter: "க்", base: "க", seriesName: "க வர்க்கம்", transliteration: "k", example: "கொக்கு (Kokku - Crane)" },
  { letter: "ங்", base: "ங", seriesName: "ங வர்க்கம்", transliteration: "ng", example: "சிங்கம் (Singam - Lion)" },
  { letter: "ச்", base: "ச", seriesName: "ச வர்க்கம்", transliteration: "ch", example: "பச்சை (Pachai - Green)" },
  { letter: "ஞ்", base: "ஞ", seriesName: "ஞ வர்க்கம்", transliteration: "nj", example: "மஞ்சள் (Manjal - Turmeric)" },
  { letter: "ட்", base: "ட", seriesName: "ட வர்க்கம்", transliteration: "t", example: "பட்டம் (Pattam - Kite)" },
  { letter: "ண்", base: "ண", seriesName: "ண வர்க்கம்", transliteration: "n", example: "கண் (Kann - Eye)" },
  { letter: "த்", base: "த", seriesName: "த வர்க்கம்", transliteration: "th", example: "புத்தகம் (Puthagam - Book)" },
  { letter: "ந்", base: "ந", seriesName: "ந வர்க்கம்", transliteration: "n", example: "நண்டு (Nandu - Crab)" },
  { letter: "ப்", base: "ப", seriesName: "ப வர்க்கம்", transliteration: "p", example: "கப்பல் (Kappal - Ship)" },
  { letter: "ம்", base: "ம", seriesName: "ம வர்க்கம்", transliteration: "m", example: "மரம் (Maram - Tree)" },
  { letter: "ய்", base: "ய", seriesName: "ய வர்க்கம்", transliteration: "y", example: "நாய் (Naay - Dog)" },
  { letter: "ர்", base: "ர", seriesName: "ர வர்க்கம்", transliteration: "r", example: "தேர் (Thaer - Chariot)" },
  { letter: "ல்", base: "ல", seriesName: "ல வர்க்கம்", transliteration: "l", example: "பால் (Paal - Milk)" },
  { letter: "வ்", base: "வ", seriesName: "வ வர்க்கம்", transliteration: "v", example: "செவ்வாய் (Sevvai - Tuesday)" },
  { letter: "ழ்", base: "ழ", seriesName: "ழ வர்க்கம்", transliteration: "zha", example: "தமிழ் (Tamil - Language)" },
  { letter: "ள்", base: "ள", seriesName: "ள வர்க்கம்", transliteration: "lh", example: "வாள் (Vaal - Sword)" },
  { letter: "ற்", base: "ற", seriesName: "ற வர்க்கம்", transliteration: "rr", example: "காற்று (Kaatru - Wind)" },
  { letter: "ன்", base: "ன", seriesName: "ன வர்க்கம்", transliteration: "nn", example: "மீன் (Meen - Fish)" }
];

// Vowel signs mapping for 18 consonants x 12 vowels = 216 uyirmei letters
const uyirMeiCombinations = {
  "க": ["க", "கா", "கி", "கீ", "கு", "கூ", "கெ", "கே", "கை", "கொ", "கோ", "கௌ"],
  "ங": ["ங", "ஙா", "ஙி", "ஙீ", "ஙு", "ஙூ", "ஙெ", "ஙே", "ஙை", "ஙொ", "ஙோ", "ஙௌ"],
  "ச": ["ச", "சா", "சி", "சீ", "சு", "சூ", "செ", "சே", "சை", "சொ", "சோ", "சௌ"],
  "ஞ": ["ஞ", "ஞா", "ஞி", "ஞீ", "ஞு", "ஞூ", "ஞெ", "ஞே", "ஞை", "ஞொ", "ஞோ", "ஞௌ"],
  "ட": ["ட", "டா", "டி", "டீ", "டு", "டூ", "டெ", "டே", "டை", "டொ", "டோ", "டௌ"],
  "ண": ["ண", "ணா", "ணி", "ணீ", "ணு", "ணூ", "ணெ", "ணே", "ணை", "ணொ", "ணோ", "ணௌ"],
  "த": ["த", "தா", "தி", "தீ", "து", "தூ", "தெ", "தே", "தை", "தொ", "தோ", "தௌ"],
  "ந": ["ந", "நா", "நி", "நீ", "நு", "நூ", "நெ", "நே", "நை", "நொ", "நோ", "நௌ"],
  "ப": ["ப", "பா", "பி", "பீ", "பு", "பூ", "பெ", "பே", "பை", "பொ", "போ", "பௌ"],
  "ம": ["ம", "மா", "மி", "மீ", "மு", "மூ", "மெ", "மே", "மை", "மொ", "மோ", "மௌ"],
  "ய": ["ய", "யா", "யி", "யீ", "யு", "யூ", "யெ", "யே", "யை", "யொ", "யோ", "யௌ"],
  "ர": ["ர", "ரா", "ரி", "ரீ", "ரு", "ரூ", "ரெ", "ரே", "ரை", "ரொ", "ரோ", "ரௌ"],
  "ல": ["ல", "லா", "லி", "லீ", "லு", "லூ", "லெ", "லே", "லை", "லொ", "லோ", "லௌ"],
  "வ": ["வ", "வா", "வி", "வீ", "வு", "வூ", "வெ", "வே", "வை", "வொ", "வோ", "வௌ"],
  "ழ": ["ழ", "ழா", "ழி", "ழீ", "ழு", "ழூ", "ழெ", "ழே", "ழை", "ழொ", "ழோ", "ழௌ"],
  "ள": ["ள", "ளா", "ளி", "ளீ", "ளு", "ளூ", "ளெ", "ளே", "ளை", "ளொ", "ளோ", "ளௌ"],
  "ற": ["ற", "றா", "றி", "றீ", "று", "றூ", "றெ", "றே", "றை", "றொ", "றோ", "றௌ"],
  "ன": ["ன", "னா", "னி", "னீ", "னு", "னூ", "னெ", "னே", "னை", "னொ", "னோ", "னௌ"]
};

const vowelTranslits = ["a", "aa", "i", "ee", "u", "oo", "e", "ae", "ai", "o", "oo", "au"];

const result = [];
let idCount = 1;

// 1. Push Uyir (12)
uyirList.forEach(u => {
  result.push({
    id: `u${idCount++}`,
    letter: u.letter,
    type: "uyir",
    transliteration: u.transliteration,
    example: u.example
  });
});

// 2. Push Ayutham (1)
ayuthamList.forEach(a => {
  result.push({
    id: "ayutham1",
    letter: a.letter,
    type: "ayutham",
    transliteration: a.transliteration,
    example: a.example
  });
});

// 3. Push Mei (18)
idCount = 1;
meiList.forEach(m => {
  result.push({
    id: `m${idCount++}`,
    letter: m.letter,
    type: "mei",
    series: m.seriesName,
    transliteration: m.transliteration,
    example: m.example
  });
});

// 4. Push Uyirmei (216)
idCount = 1;
meiList.forEach(m => {
  const baseLetter = m.base;
  const letters = uyirMeiCombinations[baseLetter];
  letters.forEach((l, vIdx) => {
    const vTrans = vowelTranslits[vIdx];
    const trans = m.transliteration + vTrans;
    result.push({
      id: `um${idCount++}`,
      letter: l,
      type: "uyirmei",
      series: m.seriesName,
      baseConsonant: m.letter,
      transliteration: trans,
      example: `${l} - ${m.seriesName} (${trans})`
    });
  });
});

console.log("Total letters generated:", result.length);
const outputPath = path.join(__dirname, '..', 'src', 'data', 'tamilAlphabet.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
console.log("Written to:", outputPath);
