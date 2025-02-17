const express = require('express');
const path = require('path');
const GitBookPDFSpider = require('./services/pdfSpider');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Cấu hình mặc định
const defaultConfig = {
    browserConfig: {
        headless: true
    },
    pdfConfig: {
        format: 'A4',
        margin: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm'
        }
    }
};

app.post('/convert', async (req, res) => {
    const { url, title, outputFolder } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    if (!outputFolder) {
        return res.status(400).json({ error: 'Output folder is required' });
    }

    try {
        // Kiểm tra và tạo thư mục output nếu chưa tồn tại
        await fs.mkdir(outputFolder, { recursive: true });

        // Tạo cấu hình với thư mục output tùy chỉnh
        const tempConfig = {
            ...defaultConfig,
            outputDir: outputFolder,
            books: [{
                url,
                title: title || `document-${Date.now()}`
            }]
        };

        // Lưu cấu hình tạm thời
        const tempConfigPath = path.join(__dirname, `temp-config-${Date.now()}.json`);
        await fs.writeFile(tempConfigPath, JSON.stringify(tempConfig));

        // Tạo và chạy spider
        const spider = await GitBookPDFSpider.create(tempConfigPath);
        await spider.processBooks();

        // Xóa file cấu hình tạm thời
        await fs.unlink(tempConfigPath);

        // Tạo đường dẫn file PDF
        const pdfPath = path.join(outputFolder, `${tempConfig.books[0].title}.pdf`);

        res.json({ 
            success: true, 
            message: 'PDF created successfully',
            filePath: pdfPath
        });

    } catch (error) {
        console.error('Conversion error:', error);
        res.status(500).json({ 
            error: 'Failed to convert to PDF',
            details: error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});