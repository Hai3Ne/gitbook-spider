const { chromium, devices } = require('playwright');

const SITE_CONFIG = {
  chapterLinksElmSelector: 'nav a',  // Điều chỉnh selector cho links
  bodySelector: 'main',
  bookContentSelector: 'main',
  headerSelector: 'header',
  navNextSelector: 'nav',
  sideBarSelector: 'aside'
};

class MultiGitBookPDFSpider {
  constructor({browser, page, pageConfig}) {
    this._browser = browser;
    this._mainPage = page;
    this._pageConfig = pageConfig;
  }

  static async create() {
    const browser = await chromium.launch({ 
      headless: false,
      timeout: 60000 // Tăng timeout lên 60 giây
    });
    const page = await browser.newPage();
    return new MultiGitBookPDFSpider({browser, page, pageConfig: {}});
  }

  async processMultipleBooks(books) {
    try {
      for (const book of books) {
        console.log(`\nProcessing book: ${book.url}`);
        try {
          await this._processBook(book);
        } catch (error) {
          console.error(`Error processing book ${book.url}:`, error);
        }
      }
    } finally {
      // Đảm bảo browser được đóng sau khi hoàn thành
      if (this._browser) {
        await this._browser.close();
      }
    }
  }

  async _processBook(book) {
    await this._openMainPage(book.url);
    await this._mainPage.waitForTimeout(5000); // Đợi 5 giây cho trang load

    const content = await this._mainPage.content();
    console.log('Page content length:', content.length);

    // Lưu trực tiếp trang hiện tại thành PDF
    await this._mainPage.pdf({
      path: `${book.title || 'output'}.pdf`,
      format: 'A4',
      margin: {
        top: '50px',
        bottom: '50px',
        left: '50px',
        right: '50px'
      }
    });
  }

  async _openMainPage(url) {
    console.log('Opening URL:', url);
    try {
      const response = await this._mainPage.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000 // 30 giây timeout cho navigation
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

// Sử dụng
const books = [
  {
    url: 'https://docs.twgamesdev.com/uhfps/guides/managing-inputs',
    title: 'ManagingInputs'
  }
];

(async () => {
  let spider = null;
  try {
    spider = await MultiGitBookPDFSpider.create();
    await spider.processMultipleBooks(books);
    console.log('Process completed successfully');
  } catch (error) {
    console.error('Process failed:', error);
  } finally {
    if (spider && spider._browser) {
      await spider._browser.close();
    }
  }
})();