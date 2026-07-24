const cheerio = require('cheerio');

function auditPage(html) {
  const $ = cheerio.load(html);

  $('script, style').remove();

  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content') || '';
  const h1Count = $('h1').length;
  const titleLength = title.length;

  const metaDescriptionLength = metaDescription.length;

  const h2Count = $("h2").length;

  const canonical =
    $('link[rel="canonical"]').length > 0;

  const viewport =
    $('meta[name="viewport"]').length > 0;

  const imagesMissingAlt = $('img').filter((_, element) => {
    const altText = $(element).attr('alt');
    return !altText || altText.trim() === '';
  }).length;

  const textContent = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = textContent ? textContent.split(/\s+/).length : 0;

  return {
  title,
  titleLength,

  metaDescription,
  metaDescriptionLength,

  h1Count,
  h2Count,

  canonical,
  viewport,

  imagesMissingAlt,
  wordCount,
};
}

module.exports = auditPage;
