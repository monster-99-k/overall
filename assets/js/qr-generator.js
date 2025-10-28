// QR 코드 생성기 스크립트

// DOM 요소
const qrData = document.getElementById('qrData');
const qrImage = document.getElementById('qrImage');
const generateQrBtn = document.getElementById('generateQrBtn');
const downloadQrBtn = document.getElementById('downloadQrBtn');
const sizeButtons = document.querySelectorAll('.size-btn');

let currentSize = '300x300';

// 크기 선택 버튼 이벤트
sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSize = btn.getAttribute('data-size');
        if (qrData.value) {
            generateQRCode();
        }
    });
});

// QR 코드 생성 함수
function generateQRCode() {
    const data = qrData.value.trim();
    
    if (!data) {
        showNotification('내용을 입력해주세요!');
        return;
    }
    
    // URL 인코딩
    const encodedData = encodeURIComponent(data);
    
    // QR 코드 API URL
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${currentSize}&data=${encodedData}`;
    
    // placeholder 숨기기
    const placeholder = document.getElementById('qrPlaceholder');
    if (placeholder) placeholder.style.display = 'none';
    
    // 로딩 표시
    qrImage.style.display = 'block';
    qrImage.style.opacity = '0.5';
    
    // 이미지 로드 핸들러
    qrImage.onload = () => {
        qrImage.style.opacity = '1';
        // 다운로드 버튼 활성화
        downloadQrBtn.disabled = false;
        downloadQrBtn.style.opacity = '1';
        downloadQrBtn.style.cursor = 'pointer';
        showNotification('QR 코드가 생성되었습니다!');
    };
    
    qrImage.onerror = () => {
        showNotification('QR 코드 생성에 실패했습니다. 다시 시도해주세요.');
        if (placeholder) placeholder.style.display = 'block';
        qrImage.style.display = 'none';
    };
    
    // 이미지 생성
    qrImage.src = qrUrl;
    qrImage.crossOrigin = 'anonymous';
}

// QR 코드 생성 버튼
generateQrBtn.addEventListener('click', generateQRCode);

// 다운로드 기능
downloadQrBtn.addEventListener('click', () => {
    if (!qrImage.src || qrImage.src === '' || !qrImage.style.display || qrImage.style.display === 'none') {
        showNotification('먼저 QR 코드를 생성해주세요!');
        return;
    }
    
    // 직접 다운로드 (서버에서 이미지를 가져와 다운로드)
    fetch(qrImage.src)
        .then(res => res.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `qrcode-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showNotification('QR 코드가 다운로드되었습니다!');
        })
        .catch(err => {
            console.error('다운로드 실패:', err);
            showNotification('다운로드 중 오류가 발생했습니다.');
        });
});

// Enter 키로 생성
qrData.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        generateQRCode();
    }
});

// 초기 설정: 다운로드 버튼 비활성화
downloadQrBtn.disabled = true;
downloadQrBtn.style.opacity = '0.5';
downloadQrBtn.style.cursor = 'not-allowed';

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

