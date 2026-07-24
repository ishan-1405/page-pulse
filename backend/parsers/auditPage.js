const cheerio = require('cheerio');

function auditPage(html) {
  const $ = cheerio.load(html);

  $('script, style').remove();

  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content') || '';
  const h1Count = $('h1').length;

  const imagesMissingAltText = $('img').filter((_, element) => {
    const altText = $(element).attr('alt');
    return !altText || altText.trim() === '';
  }).length;

  const textContent = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = textContent ? textContent.split(/\s+/).length : 0;

  return {
    title,
    metaDescription,
    h1Count,
    imagesMissingAltText,
    wordCount,
  };
}

module.exports = auditPage;
