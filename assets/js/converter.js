// WebP JPG/PNG 변환기 스크립트

const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const selectedFiles = document.getElementById('selectedFiles');
const fileList = document.getElementById('fileList');
const formatButtons = document.querySelectorAll('.format-btn');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');
const conversionResults = document.getElementById('conversionResults');
const resultList = document.getElementById('resultList');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const downloadZipBtn = document.getElementById('downloadZipBtn');

let selectedFilesList = [];
let convertedImages = [];
let selectedFormat = 'jpg';

// 파일 선택 버튼 트리거
uploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFiles);

// AVIF 지원 여부 확인
let avifSupported = false;
const img = new Image();
img.onload = () => { avifSupported = true; };
img.onerror = () => { avifSupported = false; };
try {
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAAAuaXBvYwAAAAAEcHJlc2UAAAAEaXNwbGF5AAAAB0xpcHBsAAAAAAABKG1wcgAAAABAASQAAAAAACgAAAACAAABRgAAABMAAAACaXNwYQAAAAQAAAAB6GlhZgAAAABEAAABAAUAGwARABAAAGg5AAAGAB0AAcAAAAAAAAAFkAAAJgAAABhoW1kaWEAAAAAZGVhdmluZmFtaW5nAAAAsGlsc3AAAAAAAAAAcGl0aQAAAAIAKgAAAAx0ZXh0AAAAAElDcmVhdGVkIEJ5IEF2MQ==';
} catch(e) {
    avifSupported = false;
}

// 드래그 앤 드롭
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
});

// 형식 선택
formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        formatButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedFormat = btn.dataset.format;
    });
});

// 파일 처리
function handleFiles(e) {
    const files = Array.from(e.target.files);
    handleFileSelection(files);
}

function handleFileSelection(files) {
    // WebP와 AVIF 파일 필터링
    const supportedFiles = files.filter(file => {
        return file.type === 'image/webp' || file.type === 'image/avif';
    });
    
    if (supportedFiles.length === 0) {
        showNotification('WebP 또는 AVIF 파일만 지원됩니다!');
        return;
    }
    
    // 파일 타입 체크
    for (let file of supportedFiles) {
        if (!file.type.match(/^image\/(webp|avif)$/)) {
            showNotification(`${file.name}은(는) 지원되지 않는 형식입니다.`);
            return;
        }
    }
    
    selectedFilesList = supportedFiles;
    displaySelectedFiles();
    convertBtn.disabled = false;
    conversionResults.style.display = 'none';
    convertedImages = [];
}

function displaySelectedFiles() {
    fileList.innerHTML = '';
    
    selectedFilesList.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-name">${file.name}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
        `;
        fileList.appendChild(fileItem);
    });
    
    selectedFiles.style.display = 'block';
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// 변환 버튼
convertBtn.addEventListener('click', async () => {
    if (selectedFilesList.length === 0) {
        showNotification('파일을 선택해주세요!');
        return;
    }
    
    convertBtn.disabled = true;
    convertBtn.textContent = '변환 중...';
    
    try {
        convertedImages = [];
        
        for (let i = 0; i < selectedFilesList.length; i++) {
            const file = selectedFilesList[i];
            await convertFile(file, i);
        }
        
        displayResults();
        showNotification('변환이 완료되었습니다!');
        
    } catch (error) {
        console.error('변환 에러:', error);
        showNotification('변환 중 오류가 발생했습니다.');
    } finally {
        convertBtn.disabled = false;
        convertBtn.textContent = '변환하기';
    }
});

// 파일 변환
async function convertFile(file, index) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                let mimeType = 'image/jpeg';
                let extension = 'jpg';
                
                if (selectedFormat === 'png') {
                    mimeType = 'image/png';
                    extension = 'png';
                }
                
                canvas.toBlob((blob) => {
                    // 파일 확장자 제거 (webp, avif 모두)
                    const originalName = file.name.replace(/\.(webp|avif)$/i, '');
                    const filename = `${originalName}.${extension}`;
                    
                    convertedImages.push({
                        filename: filename,
                        blob: blob,
                        url: URL.createObjectURL(blob)
                    });
                    
                    resolve();
                }, mimeType, 0.95);
            };
            
            img.onerror = () => {
                console.error('이미지 로드 실패:', file.name);
                showNotification(`${file.name} 파일 로드에 실패했습니다. 브라우저가 해당 형식을 지원하지 않을 수 있습니다.`);
                resolve();
            };
            
            img.src = e.target.result;
        };
        
        reader.onerror = () => {
            console.error('파일 읽기 실패:', file.name);
            resolve();
        };
        
        reader.readAsDataURL(file);
    });
}

// 결과 표시
function displayResults() {
    resultList.innerHTML = '';
    
    convertedImages.forEach((image, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div class="result-image">
                <img src="${image.url}" alt="${image.filename}">
            </div>
            <div class="result-info">
                <p class="result-filename">${image.filename}</p>
                <a href="${image.url}" download="${image.filename}" class="download-link">다운로드</a>
            </div>
        `;
        resultList.appendChild(resultItem);
    });
    
    conversionResults.style.display = 'block';
}

// 모두 다운로드
downloadAllBtn.addEventListener('click', () => {
    convertedImages.forEach(image => {
        const link = document.createElement('a');
        link.href = image.url;
        link.download = image.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 간격을 두고 다운로드
        setTimeout(() => {}, 100);
    });
    
    showNotification('다운로드가 시작되었습니다!');
});

// ZIP 다운로드 (JSZip 사용)
downloadZipBtn.addEventListener('click', async () => {
    if (typeof JSZip === 'undefined') {
        // JSZip이 없으면 개별 다운로드
        downloadAllBtn.click();
        return;
    }
    
    try {
        const zip = new JSZip();
        
        for (let image of convertedImages) {
            const arrayBuffer = await image.blob.arrayBuffer();
            zip.file(image.filename, arrayBuffer);
        }
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'converted_images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        showNotification('ZIP 파일 다운로드가 시작되었습니다!');
    } catch (error) {
        console.error('ZIP 생성 에러:', error);
        showNotification('ZIP 생성 중 오류가 발생했습니다.');
    }
});

// 초기화 버튼
resetBtn.addEventListener('click', () => {
    selectedFilesList = [];
    convertedImages = [];
    fileInput.value = '';
    fileList.innerHTML = '';
    resultList.innerHTML = '';
    
    selectedFiles.style.display = 'none';
    conversionResults.style.display = 'none';
    convertBtn.disabled = true;
    
    showNotification('초기화되었습니다!');
});

// 알림 표시 함수
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

