# GitBook to PDF Converter

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

### 4. Create Directory Structure

```bash
gitbook-spider/
├── config.json
├── gitbookSpider.js
├── index.js
└── output/
```

### 5. Configure Project Files

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

2. Copy the contents of `gitbookSpider.js` and `index.js` to their respective files.

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

Modify `pdfConfig` in `config.json`:
```json
"pdfConfig": {
  "format": "A4",  // A4, Letter, Legal...
  "margin": {
    "top": "50px",
    "bottom": "50px",
    "left": "50px",
    "right": "50px"
  }
}
```

### Browser Settings

```json
"browserConfig": {
  "headless": false,  // true for no GUI
  "timeout": 60000    // in milliseconds
}
```

## Troubleshooting

1. **"page.waitForTimeout" Error**
   - Increase `timeout` value in `browserConfig`
   - Check internet connection

2. **"Cannot find elements" Error**
   - Verify selectors in `siteConfig`
   - Ensure URL is accessible

3. **"Failed to launch browser" Error**
   - Run `npx playwright install chromium` again
   - Check directory permissions

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Features

- Multiple GitBook URL support
- Customizable PDF output settings
- Progress tracking and error handling
- Browser automation with Playwright
- Configurable page selectors
- Automatic output directory creation

## Limitations

- Works only with public GitBook pages
- May not work with pages requiring authentication
- Respects website's robots.txt and terms of service

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Create an issue in the repository
3. Contact project maintainers

## FAQ

**Q: Can I convert password-protected GitBook pages?**
A: No, the tool currently only supports public pages.

**Q: Why does the conversion take so long?**
A: The tool waits for each page to load completely to ensure quality. Speed depends on internet connection and page complexity.

**Q: Can I convert multiple books at once?**
A: Yes, add multiple URLs to the `books` array in `config.json`.

## Security

- The tool runs in a controlled browser environment
- No data is stored or transmitted externally
- Local file output only

## Updates and Maintenance

Check regularly for updates:
```bash
npm update playwright
```

## Credits

Built with:
- [Playwright](https://playwright.dev/)
- [Node.js](https://nodejs.org/)