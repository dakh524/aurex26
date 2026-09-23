const { searchWikipediaTitle, fetchWikipediaSummary } = require('../src/lib/wikipedia.ts');

async function runTest() {
  console.log("--- Testing Wikipedia OpenSearch API Fix ---");
  
  const testEntities = [
    "kamatchi amman",
    "Kamakshi Amman Temple",
    "Historical period",
    "Pallava dynasty",
    "Kailasanathar Temple, Kanchipuram"
  ];

  for (const entity of testEntities) {
    const titleEn = await searchWikipediaTitle(entity, 'en');
    const summary = await fetchWikipediaSummary(entity);
    console.log(`\nQuery: "${entity}"`);
    console.log(`OpenSearch Matched Title: "${titleEn}"`);
    console.log(`Summary Found: ${summary.found} ${summary.found ? `-> Title: "${summary.title}"` : ''}`);
  }
}

runTest();
