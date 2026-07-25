const auditPage = require("../parsers/auditPage");

test("parses a valid HTML page correctly", () => {
  const html = `
    <html>
      <head>
        <title>Example Domain</title>
        <meta name="description" content="This is a test page">
      </head>
      <body>
        <h1>Welcome</h1>
        <img src="image.jpg" alt="Example Image">
        <p>Hello world. This is some sample text.</p>
      </body>
    </html>
  `;

  const report = auditPage(html);

  expect(report.title).toBe("Example Domain");
  expect(report.metaDescription).toBe("This is a test page");
  expect(report.h1Count).toBe(1);
  expect(report.imagesMissingAlt).toBe(0);
  expect(report.wordCount).toBeGreaterThan(0);
});

test("handles missing metadata gracefully", () => {
  const html = `
    <html>
      <body>
        <p>This page has no title, no meta description, and no headings.</p>
      </body>
    </html>
  `;

  const report = auditPage(html);

  expect(report.title).toBe("");
  expect(report.metaDescription).toBe("");
  expect(report.h1Count).toBe(0);
  expect(report.imagesMissingAlt).toBe(0);
});

test("counts images missing alt text correctly", () => {
  const html = `
    <html>
      <body>
        <img src="one.jpg">
        <img src="two.jpg" alt="">
        <img src="three.jpg" alt="Valid Alt">
      </body>
    </html>
  `;

  const report = auditPage(html);

  expect(report.imagesMissingAlt).toBe(2);
});