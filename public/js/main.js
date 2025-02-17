class PDFConverter {
    constructor() {
        this.form = document.getElementById('convertForm');
        this.convertBtn = document.getElementById('convertBtn');
        this.loading = document.getElementById('loading');
        this.status = document.getElementById('status');
        this.folderPathDisplay = document.getElementById('selectedFolder');
        
        this.initialize();
    }

    initialize() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Khởi tạo folder picker
        document.getElementById('folderPicker').addEventListener('click', async () => {
            try {
                const dirHandle = await window.showDirectoryPicker();
                const path = dirHandle.name;
                this.folderPathDisplay.textContent = `Thư mục đã chọn: ${path}`;
                this.folderPathDisplay.dataset.path = path;
                localStorage.setItem('lastUsedFolder', path);
            } catch (err) {
                console.error('Lỗi khi chọn thư mục:', err);
            }
        });

        // Khôi phục thư mục đã chọn trước đó
        const lastUsedFolder = localStorage.getItem('lastUsedFolder');
        if (lastUsedFolder) {
            this.folderPathDisplay.textContent = `Thư mục đã chọn: ${lastUsedFolder}`;
            this.folderPathDisplay.dataset.path = lastUsedFolder;
        }
    }

    showLoading() {
        this.loading.style.display = 'block';
        this.convertBtn.disabled = true;
    }

    hideLoading() {
        this.loading.style.display = 'none';
        this.convertBtn.disabled = false;
    }

    resetStatus() {
        this.status.className = 'status';
        this.status.textContent = '';
    }

    showSuccess(message) {
        this.status.className = 'status success';
        this.status.textContent = message;
    }

    showError(message) {
        this.status.className = 'status error';
        this.status.textContent = `Lỗi: ${message}`;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const outputFolder = this.folderPathDisplay.dataset.path;
        if (!outputFolder) {
            this.showError('Vui lòng chọn thư mục lưu PDF');
            return;
        }

        this.resetStatus();
        this.showLoading();

        try {
            const formData = {
                url: document.getElementById('url').value,
                title: document.getElementById('title').value,
                outputFolder: outputFolder
            };

            const response = await this.convertToPDF(formData);
            const data = await response.json();

            if (response.ok) {
                this.showSuccess(`PDF đã được tạo thành công và lưu tại: ${data.filePath}`);
            } else {
                throw new Error(data.error || 'Có lỗi xảy ra');
            }
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    async convertToPDF(formData) {
        return fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PDFConverter();
});