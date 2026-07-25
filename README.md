# Page Pulse

Page Pulse is a full-stack web application that audits a webpage and generates a concise SEO and accessibility report.

The application accepts any valid HTTP/HTTPS URL, fetches the webpage, analyses its HTML on the server, and returns useful metrics such as page title, response time, heading counts, metadata, image accessibility, and approximate word count.

This project was developed as part of the **Digital Heroes Software Development Internship Qualification Task**.

---

## Live Demo

Frontend

https://page-pulse-8bebmb2np-ishan-2237.vercel.app/

Backend API

https://page-pulse-backend-2ypj.onrender.com/

GitHub Repository

https://github.com/ishan-1405/page-pulse

---

## Features

- Audit any publicly accessible webpage
- Measure HTTP response time
- Return HTTP status code
- Extract page title
- Calculate title length
- Extract meta description
- Calculate meta description length
- Count H1 and H2 headings
- Detect Canonical tag
- Detect Viewport meta tag
- Count images missing ALT text
- Estimate page word count
- Handle invalid URLs gracefully
- Handle request timeouts
- Handle non-HTML responses
- Responsive React frontend
- Unit tests using Jest

---

## Tech Stack

### Frontend

- React
- Vite
- CSS3

### Backend

- Node.js
- Express.js
- Axios
- Cheerio

### Testing

- Jest

### Deployment

- Vercel
- Render

---

## Project Structure

```
page-pulse
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── parsers
│   ├── services
│   ├── tests
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

Clone the repository.

```bash
git clone https://github.com/ishan-1405/page-pulse.git
```

Move into the project.

```bash
cd page-pulse
```

---

### Backend

```bash
cd backend
npm install
npm start
```

The backend starts on:

```
http://localhost:3000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on:

```
http://localhost:5173
```

---

## API Contract

### Endpoint

```
POST /audit
```

### Request

```json
{
  "url": "https://example.com"
}
```

### Successful Response

```json
{
  "statusCode": 200,
  "responseTime": 742,
  "title": "Example Domain",
  "titleLength": 14,
  "metaDescription": "",
  "metaDescriptionLength": 0,
  "h1Count": 1,
  "h2Count": 0,
  "canonical": false,
  "viewport": false,
  "imagesMissingAlt": 0,
  "wordCount": 17
}
```

### Error Response

```json
{
  "error": "Please provide a valid HTTP or HTTPS URL."
}
```

---

## Running Tests

Install backend dependencies.

```bash
cd backend
npm install
```

Run the test suite.

```bash
npm test
```

Current tests cover:

- Parsing a valid HTML page
- Missing metadata handling
- Images missing ALT text detection

---

## Design Decisions

### 1. Modular backend architecture

The backend is divided into three independent modules:

- URL validation
- Page fetching
- HTML parsing

Each module has a single responsibility, making the code easier to understand, test, and maintain.

---

### 2. Server-side HTML parsing

HTML parsing is performed entirely on the backend using Cheerio.

This keeps the frontend lightweight and makes it easier to expose the parser through a single API endpoint.

---

### 3. Graceful error handling

The application returns meaningful error responses instead of crashing when handling:

- Invalid URLs
- Network failures
- Request timeouts
- Non-HTML responses

This provides a better user experience and makes the API predictable for clients.

---

## Future Improvements

Given additional development time, the following features could be added:

- Lighthouse performance analysis
- SEO scoring
- Accessibility scoring
- Broken link detection
- Open Graph metadata analysis
- PDF report export
- Audit history
- Authentication
- Rate limiting
- Docker support

---

## Testing

The parsing logic is tested using Jest.

The current test suite verifies:

- Successful HTML parsing
- Handling pages with missing metadata
- Detection of images without ALT attributes

---

## Author

**Ishan Tripathi**

GitHub

https://github.com/ishan-1405

---

## Digital Heroes Training Task

Built for Digital Heroes Training Task

https://digitalheroesco.com
