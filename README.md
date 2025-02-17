# Web to PDF Converter

A Node.js tool for converting GitBook documentation pages into PDF files. Supports multiple URLs and customizable output settings.

## System Requirements

- Node.js version 14.0.0 or higher
- NPM (Node Package Manager)
- Minimum 500MB free disk space (for Playwright and Chromium)
- Stable internet connection

## Installation

### 1. Install Node.js and NPM

1. Visit [Node.js official website](https://nodejs.org)
2. Download and install the LTS (Long Term Support) version
3. Verify installation:
```bash
node --version
npm --version
```

### 2. Create Project

```bash
# Create project directory
mkdir gitbook-spider 
cd gitbook-spider

# Initialize Node.js project
npm init -y 
```

### 3. Install Dependencies

```bash
# Install Playwright
npm install playwright

# Install Playwright browsers
npx playwright install chromium
```

### 4. Configure Project Files

Create and set up the following files:

1. `config.json` - Configuration settings:
```json
{
  "siteConfig": {
    "chapterLinksElmSelector": "nav a",
    "bodySelector": "main",
    "bookContentSelector": "main",
    "headerSelector": "header",
    "navNextSelector": "nav",
    "sideBarSelector": "aside"
  },
  "browserConfig": {
    "headless": false,
    "timeout": 60000
  },
  "pdfConfig": {
    "format": "A4",
    "margin": {
      "top": "50px",
      "bottom": "50px",
      "left": "50px",
      "right": "50px"
    }
  },
  "books": [
    {
      "url": "https://your-gitbook-url.com",
      "title": "YourBookTitle"
    }
  ],
  "outputDir": "./output"
}
```

2. Copy the contents of `pdfSpider.js` and `index.js` to their respective files.

## Usage

### 1. Add URLs to Configuration

Update the `books` array in `config.json`:
```json
"books": [
  {
      "url": "https://www.w3schools.com/",
      "title": "w3schools"
  }
]
```

### 2. Run the Program

```bash
node index.js
```

PDF files will be generated in the `output/` directory.

## Customization

### PDF Format Settings

Modify `Config` in `config.json`:
```json
"Config": {
  "format": "A4",  // A4, Letter, Legal...
  "margin": {
    "top": "50px",
    "bottom": "50px",
    "left": "50px",
    "right": "50px"
  }
}
```

## Browser Settings

```json
"browserConfig": {
  "headless": false,  // true for no GUI
  "timeout": 60000    // in milliseconds
}
```