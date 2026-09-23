export async function searchWikipediaTitle(query: string, lang: string = 'en'): Promise<string | null> {
  try {
    const url = `https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=1&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return null;
    
    const data = await res.json();
    // OpenSearch format: [query, [titles], [descriptions], [urls]]
    if (Array.isArray(data) && data[1] && data[1].length > 0 && data[1][0]) {
      return data[1][0]; // Return closest real matching article title
    }
    return null;
  } catch (err) {
    console.error(`Wikipedia OpenSearch error (${lang}):`, err);
    return null;
  }
}

export async function fetchWikipediaSummary(entityName: string) {
  try {
    let cleanQuery = entityName ? entityName.trim() : '';
    if (!cleanQuery) return { found: false };

    // Query aliases & disambiguation mapping
    const aliases: Record<string, string> = {
      'kamatchi': 'Kamakshi Amman Temple',
      'kamakshi': 'Kamakshi Amman Temple',
      'kanchi': 'Kanchipuram',
      'palava': 'Pallava dynasty',
      'pallava': 'Pallava dynasty',
      'chola': 'Chola dynasty',
      'pandya': 'Pandya dynasty',
      'utiramerur': 'Uthiramerur',
      'uthiramerur': 'Uthiramerur',
      'brihadeeswarar': 'Brihadisvara Temple, Thanjavur',
      'airavatesvara': 'Airavatesvara temple',
    };

    const normalizedKey = cleanQuery.toLowerCase().trim();
    if (aliases[normalizedKey]) {
      cleanQuery = aliases[normalizedKey];
    }

    // 1. Try English OpenSearch first
    let matchedTitle = await searchWikipediaTitle(cleanQuery, 'en');
    let lang = 'en';

    // Disambiguation check: If query was kamatchi/temple and matched a film producer or non-heritage page, append 'Temple'
    if (matchedTitle && (matchedTitle.toLowerCase().includes('producer') || matchedTitle.toLowerCase().includes('suresh'))) {
      const retryTitle = await searchWikipediaTitle(`${cleanQuery} Temple`, 'en');
      if (retryTitle) matchedTitle = retryTitle;
    }

    // 2. If English search fails, try Tamil OpenSearch
    if (!matchedTitle) {
      matchedTitle = await searchWikipediaTitle(cleanQuery, 'ta');
      lang = 'ta';
    }

    // 3. Fallback: if OpenSearch didn't find anything, try direct query name
    const targetTitle = matchedTitle || cleanQuery;

    // Fetch summary for targetTitle
    let response = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`);
    
    // If not found in primary lang, try Tamil rest_v1 fallback
    if (!response.ok && lang === 'en') {
      response = await fetch(`https://ta.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanQuery)}`);
    }

    if (response.ok) {
      const data = await response.json();
      return {
        found: true,
        title: data.title,
        extract: data.extract,
        thumbnail_url: data.thumbnail?.source || null,
        page_url: data.content_urls?.desktop?.page || null,
        searchedQuery: cleanQuery,
        matchedTitle: targetTitle
      };
    } else {
      return { found: false };
    }
  } catch (error) {
    console.error('Wikipedia fetch error:', error);
    return { found: false };
  }
}
