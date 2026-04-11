import fs from 'fs';

function extractReviews() {
  try {
    const html = fs.readFileSync('maps.html', 'utf-8');
    // Find strings that are longer than 50 characters and contain Romanian words
    const matches = html.match(/"([^"\\]+)"/g);
    if (matches) {
      const reviews = matches
        .map(m => m.slice(1, -1))
        .filter(m => m.length > 50 && (m.includes('recomand') || m.includes('profesional') || m.includes('medic') || m.includes('clinica') || m.includes('experienta') || m.includes('multumesc')))
        .filter(m => !m.includes('<') && !m.includes('{') && !m.includes('function'));
      
      console.log(reviews.slice(0, 20).join('\n---\n'));
    }
  } catch (e) {
    console.error(e);
  }
}

extractReviews();
