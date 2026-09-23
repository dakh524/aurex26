const fs = require('fs');
const path = require('path');

// Manually parse .env.local for test execution
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...vals] = trimmed.split('=');
      process.env[key.trim()] = vals.join('=').trim();
    }
  });
}

const { checkTamilSpelling } = require('../src/lib/cerebras.ts');

async function testCerebras() {
  console.log("--- Testing Cerebras API Multi-Key Fallback ---");
  const testSentence = "நாளைக்கு நான் பாள்ளிக்கு பொகிறேன்"; // Incorrect Tamil sentence
  
  console.log("Input Sentence:", testSentence);
  const result = await checkTamilSpelling(testSentence);
  console.log("Cerebras API Result:", JSON.stringify(result, null, 2));
}

testCerebras();
