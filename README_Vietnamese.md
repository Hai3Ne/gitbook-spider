# GitBook to PDF Converter

Tool để chuyển đổi nội dung từ các trang GitBook thành file PDF. Hỗ trợ nhiều URLs và tùy chỉnh output.

## Yêu cầu hệ thống

- Node.js version 14.0.0 trở lên
- NPM (Node Package Manager)
- Dung lượng đĩa trống tối thiểu 500MB (cho Playwright và chromium)
- Kết nối internet ổn định

## Cài đặt

### 1. Cài đặt Node.js và NPM

1. Truy cập [Node.js official website](https://nodejs.org)
2. Tải và cài đặt phiên bản LTS (Long Term Support)
3. Kiểm tra cài đặt:
```bash
node --version
npm --version
```

### 2. Tạo project

```bash
# Tạo thư mục project
mkdir gitbook-spider
cd gitbook-spider

# Khởi tạo project Node.js
npm init -y
```

### 3. Cài đặt dependencies

```bash
# Cài đặt Playwright
npm install playwright

# Cài đặt Playwright browsers
npx playwright install chromium
```

### 4. Tạo cấu trúc thư mục

```bash
gitbook-spider/
├── config.json
├── gitbookSpider.js
├── index.js
└── output/
```

### 5. Copy các file code

1. Tạo file `config.json`:
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

2. Copy nội dung của `gitbookSpider.js` và `index.js` vào các file tương ứng.

## Cách sử dụng

### 1. Thêm URLs vào config

Mở file `config.json` và thêm URLs vào mảng `books`:
```json
"books": [
  {
    "url": "https://www.w3schools.com/",
        "title": "w3schools"
  }
]
```

### 2. Chạy chương trình

```bash
node index.js
```

Files PDF sẽ được tạo trong thư mục `output/`.

## Tùy chỉnh

### Thay đổi định dạng PDF

Trong `config.json`, điều chỉnh `pdfConfig`:
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

### Thay đổi thời gian chờ

```json
"browserConfig": {
  "headless": false,
  "timeout": 60000  // Đơn vị: milliseconds
}
```

## Xử lý lỗi thường gặp

1. **Lỗi "page.waitForTimeout"**
   - Tăng giá trị `timeout` trong `browserConfig`
   - Kiểm tra kết nối internet

2. **Lỗi "Cannot find elements"**
   - Kiểm tra lại các selectors trong `siteConfig`
   - Đảm bảo URL có thể truy cập được

3. **Lỗi "Failed to launch browser"**
   - Chạy lại lệnh `npx playwright install chromium`
   - Kiểm tra quyền truy cập thư mục

## Đóng góp

Nếu bạn muốn đóng góp cho project:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi (`git commit -m 'Add amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## License

Project này được phân phối dưới giấy phép MIT. Xem `LICENSE` để biết thêm thông tin.

## Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, vui lòng tạo issue trong repository hoặc liên hệ trực tiếp.

## Lưu ý

- Tool này chỉ hoạt động với các trang GitBook public
- Một số trang có thể yêu cầu đăng nhập sẽ không hoạt động
- Tôn trọng robots.txt và điều khoản sử dụng của trang web