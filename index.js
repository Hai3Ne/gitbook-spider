const GitBookPDFSpider = require('./gitbookSpider');
const path = require('path');

async function main() {
  const configPath = path.join(__dirname, 'config.json');
  
  try {
    const spider = await GitBookPDFSpider.create(configPath);
    await spider.processBooks();
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

main();