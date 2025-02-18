const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

class GitBookPDFSpider {
  constructor({browser, page, config}) {
    this._browser = browser;
    this._mainPage = page;
    this._config = config;
  }

  static async create(configPath) {
    try {
      // Load config
      const configFile = await fs.readFile(configPath, 'utf8');
      const config = JSON.parse(configFile);

      // Create output directory if it doesn't exist
      await fs.mkdir(config.outputDir, { recursive: true });

      // Initialize browser
      const browser = await chromium.launch(config.browserConfig);
      const page = await browser.newPage();

      return new GitBookPDFSpider({
        browser,
        page,
        config
      });
    } catch (error) {
      console.error('Error creating spider:', error);
      throw error;
    }
  }

  async processBooks() {
    try {
      const { books } = this._config;
      
      for (const book of books) {
        console.log(`\nProcessing book: ${book.url}`);
        try {
          await this._processBook(book);
        } catch (error) {
          console.error(`Error processing book ${book.url}:`, error);
        }
      }

      console.log('\nAll books processed successfully!');
    } finally {
      if (this._browser) {
        await this._browser.close();
      }
    }
  }

  async _processBook(book) {
    await this._openMainPage(book.url);
    await this._mainPage.waitForTimeout(5000);

    const content = await this._mainPage.content();
    console.log(`Page content length for ${book.title}:`, content.length);

    const outputPath = path.join(this._config.outputDir, `${book.title}.pdf`);
    await this._mainPage.pdf({
      path: outputPath,
      ...this._config.pdfConfig
    });

    console.log(`PDF created: ${outputPath}`);
  }

  async _openMainPage(url) {
    console.log('Opening URL:', url);
    try {
      const response = await this._mainPage.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });
      
      if (!response.ok()) {
        throw new Error(`Failed to load ${url}: ${response.status()} ${response.statusText()}`);
      }
      
      await this._mainPage.waitForLoadState('domcontentloaded');
      console.log('Page loaded successfully');
    } catch (error) {
      console.error('Error during page load:', error);
      throw error;
    }
  }
}

module.exports = GitBookPDFSpider;