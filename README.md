# 🏛️ Aurex - Tamil Heritage, Epigraphy, Learning & AI Platform

> **Aurex** (Aurex26) is a next-generation web application designed to preserve, analyze, and teach Tamil language, epigraphy (stone inscriptions / கல்வெட்டு), literature, and script evolution. Powered by Next.js 16 (Turbopack), AI via Google Gemini, Tesseract.js OCR, Sharp image processing, and rich offline/online datasets.

---

## 🛠️ How We Built This Application

Aurex was architected using modern web engineering principles, prioritizing visual excellence, performance, offline resilience, and AI integration.

### Architecture Overview
- **Next.js 16 (App Router + Turbopack)**: Hybrid rendering model using Static Site Generation (SSG) for static learning pages and Server-Side Rendering (SSR) / API Routes for AI & OCR processing.
- **Client & Server Component Separation**: Interactive UI modules run efficiently as React Client Components, while heavy AI routines, OCR calls, and image pre-processing execute securely in Node.js server routes.
- **Offline-First Resilience**: Critical utilities (such as the Tamil Spell Checker, Phonetic Transliteration, and Thirukkural dataset) function completely offline using local JSON/TS datasets.
- **Automatic AI Fallback Pipeline**: AI calls use a multi-key and multi-model fallback strategy (`gemini-3.6-flash` -> `gemini-3.5-flash-lite` -> `gemini-2.5-flash` -> `gemini-1.5-flash` -> Local Epigraphic Heuristic Generator) to ensure zero downtime.

---

## 💻 Tech Stack & Libraries

| Layer | Technology / Library | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js `16.3.6` | Production React framework with Turbopack bundler |
| **UI Library** | React `19.2.8` | Component-driven UI architecture |
| **Language** | TypeScript `5.x` | Type-safe application logic across client and server |
| **Styling** | TailwindCSS `v4` | Utility-first styling with modern glassmorphism & responsive dark theme |
| **AI Engine** | Google Gemini AI (`@google/generative-ai`) | Multimodal LLM for inscription deciphering, grammar analysis, and chatbot |
| **OCR Engine** | Tesseract.js `7.0.0` | Client/Server optical character recognition for Tamil script extraction |
| **Image Processing** | Sharp `0.33.5` | Contrast normalization, thresholding, and binarization for stone inscriptions |
| **Database & Auth** | Supabase (`@supabase/supabase-js`) | Cloud database for leaderboard, user progress, and settings |
| **Icons** | Lucide React (`lucide-react`) | Modern SVG icon kit |
| **Speech (TTS)** | Web Speech API (`speakTamilText`) | Native browser synthesis for Tamil audio pronunciation |

---

## 📊 Datasets Used in Aurex

All datasets are structured under [`src/data/`](file:///c:/Users/mrdhi/OneDrive/Desktop/our%20codes/aurex%20prototype%20-%20Copy/src/data) for instant access and zero-latency performance:

1. **`thirukkuralData.ts`**: Complete Thirukkural dataset containing all 1,330 couplets across 133 chapters (அதிகாரங்கள்), categorized by 3 Books (அறத்துப்பால், பொருட்பால், இன்பத்துப்பால்), with Tamil explanations (Mu. Varadarajan, Solomon Pappaiah, Karunanidhi) and English translations.
2. **`inscriptions.json`**: Historical Tamil epigraphs and stone inscriptions spanning the Pallava, Chola, Pandya, and Chera dynasties, containing high-res imagery, site locations, script evolution metadata, transliteration, and historical summaries.
3. **`tamilAlphabet.json`**: Complete Tamil Phonetics & Script Dataset (247 letters: 12 Vowels/உயிர், 18 Consonants/மெய், 216 Combined/உயிர்மெய், 1 Ayutha Ezhuthu/ஆயுத எழுத்து), detailed with articulation mouth diagrams, stroke guides, and audio phonemes.
4. **`tamilWordEvolution.ts`**: Etymological evolution records tracing Tamil vocabulary across historical scripts (Tamil-Brahmi/தமிழி ➔ Vatteluttu/வட்டெழுத்து ➔ Grantha ➔ Modern Tamil).
5. **`tamilPronunciation.ts`**: Audio pronunciation dataset with phonemes, mouth position indicators, common articulation errors, and speech practice drills.
6. **`typingContent.ts`**: Tamil keyboard tutoring dataset containing speed drills, daily challenge words, and finger placement coordinates for 99-key Tamil layouts.
7. **`languageResources.json`**: Academic repository of manuscripts, eBooks, research papers, video lectures, and learning guides.
8. **`tamil_dictionary.json` & `flashcards.json`**: Dictionary wordlist for instant offline spell checking and flashcard vocabulary exercises.

---

## 🤖 AI Assistant: "Aurex Chatbot"

The **Aurex AI Assistant** ([`src/components/AurexChatbot.tsx`](file:///c:/Users/mrdhi/OneDrive/Desktop/our%20codes/aurex%20prototype%20-%20Copy/src/components/AurexChatbot.tsx)) is an embedded interactive copilot designed to guide users through Tamil heritage, epigraphy, and learning modules.

### Key Capabilities:
- 🏛️ **Epigraphy & Inscription Tutor**: Answers questions about Tamil-Brahmi, Vatteluttu, Chola/Pallava stone inscriptions, and historical sites.
- ✍️ **Grammar & Spellcheck Assistant**: Explains Tamil grammar rules (இலக்கணம்), Sandhi rules (புணர்ச்சி), and spelling corrections.
- 🗣️ **Voice Output (Text-to-Speech)**: Integrated with `speakTamilText()` so users can listen to responses read in natural Tamil pronunciation.
- 🌐 **Bilingual Support**: Dynamic language switching between Tamil (தமிழ்) and English based on user preference.
- 🔑 **Custom API Key Modal**: Users can configure their own Google Gemini API Key via an intuitive UI modal (`ApiKeyModal.tsx`) or utilize system fallback keys securely.

---

## 🚀 Key Modules & Application Pages

- 🗿 **Kalvettu OCR & Analysis (`/kalvettu`)**: Upload stone inscription images, enhance image contrast via Sharp, extract ancient script via Tesseract OCR, and generate deep historical reports via Gemini AI.
- ✏️ **Tamil Spell Checker (`/spellcheck`)**: Hybrid spell checker offering offline dictionary lookups paired with Gemini AI contextual sentence analysis.
- 🎮 **Gamified Learning Hub (`/games`)**:
  - **Kural Hunt**: Interactive Thirukkural word puzzle with audio hints.
  - **Era Challenge**: Timeline quiz identifying dynasty epigraphs.
  - **Word Journey**: Etymological evolution matching game.
  - **Letter Match**: Script & sound recognition puzzle.
- 📖 **Language & History Hub (`/learn`, `/history`)**: Interactive Tamil Alphabet Learner, Script Evolution explorer, Pronunciation practice, and Tamil Keyboard Typing Tutor.
- 📄 **Plagiarism & Similarity Detector (`/plagiarism`)**: Academic text similarity and original source checker for Tamil literature.
- ⚙️ **Admin Dashboard (`/admin/dashboard`)**: System metrics, API key management, and service health check.

---

## ⚙️ Getting Started & Installation

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GEMINI_API_KEY="AIzaSyYourGeminiApiKeyHere"
GEMINI_API_KEYS="AIzaSyKey1,AIzaSyKey2"
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-url.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm start
```

---

## 📜 License
Developed for Tamil Epigraphy, Literature, and Heritage Preservation.
