// 도장 만들기 스크립트 - HTML 렌더링 방식

const stampText = document.getElementById('stampText');
const shapeBtns = document.querySelectorAll('.shape-btn');
const fontSelect = document.getElementById('fontSelect');
const sizeRange = document.getElementById('sizeRange');
const sizeValue = document.getElementById('sizeValue');
const textColor = document.getElementById('textColor');
const borderRange = document.getElementById('borderRange');
const borderValue = document.getElementById('borderValue');
const borderColor = document.getElementById('borderColor');
const showInCheckbox = document.getElementById('showIn');
const stampOutput = document.getElementById('stampOutput');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');

let currentShape = 'circle';
let currentSize = 200;
let currentBorder = 5;

// 도장 모양 선택
shapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        shapeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentShape = btn.dataset.shape;
        generateStamp();
    });
});

// 크기 조절
sizeRange.addEventListener('input', (e) => {
    currentSize = parseInt(e.target.value);
    sizeValue.textContent = `${currentSize}px`;
    generateStamp();
});

// 테두리 조절
borderRange.addEventListener('input', (e) => {
    currentBorder = parseInt(e.target.value);
    borderValue.textContent = `${currentBorder}px`;
    generateStamp();
});

// 색상 변경
textColor.addEventListener('input', generateStamp);
borderColor.addEventListener('input', generateStamp);

// "인" 자 표시 옵션
showInCheckbox.addEventListener('change', generateStamp);

// 글꼴 변경
fontSelect.addEventListener('change', generateStamp);

// PNG 다운로드
if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
        try {
            const canvas = await html2canvas(stampOutput, {
                backgroundColor: null,
                scale: 3,
                logging: false
            });
            const link = document.createElement('a');
            link.download = `stamp_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (e) {
            console.error(e);
            showNotification('PNG 저장에 실패했습니다.');
        }
    });
}

// 텍스트 입력
stampText.addEventListener('input', () => {
    if (stampText.value.length > 10) {
        stampText.value = stampText.value.substring(0, 10);
    }
    generateStamp();
});

// 도장 만들기 버튼
generateBtn.addEventListener('click', generateStamp);

// 생성 후 다운로드 버튼 표시
generateBtn.addEventListener('click', () => {
    if (downloadBtn) downloadBtn.style.display = 'inline-block';
});

// 다운로드 기능 제거 (요청에 따라 캔버스/캡처 로직 삭제)

// 초기화 버튼
resetBtn.addEventListener('click', () => {
    stampText.value = '';
    shapeBtns[0].click();
    sizeRange.value = 200;
    sizeValue.textContent = '200px';
    borderRange.value = 5;
    borderValue.textContent = '5px';
    textColor.value = '#FF0000';
    borderColor.value = '#FF0000';
    fontSelect.value = 'Noto Sans KR';
    currentSize = 200;
    currentBorder = 5;
    generateStamp();
    showNotification('초기화되었습니다!');
});

// 도장 생성 함수 - HTML/CSS로 렌더링
function generateStamp() {
    let text = stampText.value || '인';
    
    // 사각형 도장이고 "인" 자 표시 옵션이 켜져있으면 글자 뒤에 "인" 추가
    if (currentShape === 'square' && text && showInCheckbox.checked) {
        text = text + '인';
    }
    
    // 내부 여백 계산
    const padding = Math.floor(currentSize * 0.15);
    
    // 도장 외부 스타일 (배경 없음, 테두리와 border-radius만)
    stampOutput.style.padding = `${padding}px`;
    stampOutput.style.border = `${currentBorder}px solid ${borderColor.value}`;
    stampOutput.style.display = 'inline-block';
    stampOutput.style.position = 'relative';
    stampOutput.style.boxSizing = 'border-box';
    
    // 모양에 따라 설정
    if (currentShape === 'circle') {
        // 원형: 자동 크기 (고정 크기 제거)
        stampOutput.style.width = 'auto';
        stampOutput.style.height = 'auto';
        stampOutput.style.borderRadius = '50%';
    } else {
        // 사각형: 고정 크기
        stampOutput.style.width = `${currentSize}px`;
        stampOutput.style.height = `${currentSize}px`;
        stampOutput.style.borderRadius = '10px';
    }
    
    // 내부 텍스트 영역
    // 자동 높이: 고정 높이를 제거하고 내부 padding만 적용
    const availableSize = currentSize - (padding * 2) - (currentBorder * 2);
    
    // 글자 크기 계산
    let fontSize;
    let textToDisplay = '';
    
    // 사각형 도장과 원형 도장의 배치를 다르게 처리
    if (currentShape === 'square') {
        // 사각형 도장: 가로로 나열
        if (text.length === 1) {
            fontSize = Math.floor(availableSize * 0.7);
            textToDisplay = text;
        } else if (text.length === 2) {
            fontSize = Math.floor(availableSize / 2);
            textToDisplay = `${text[0]}${text[1]}`;
        } else if (text.length === 3) {
            fontSize = Math.floor(availableSize / 3);
            textToDisplay = `${text[0]}${text[1]}${text[2]}`;
        } else if (text.length === 4) {
            // 2개씩 2줄 (가독성을 위해 크게)
            fontSize = Math.floor(availableSize / 2.2);
            textToDisplay = `<div>${text[0]}${text[1]}</div><div>${text[2]}${text[3]}</div>`;
        } else if (text.length === 5) {
            // 2개씩 배치 (마지막 줄 1개)
            fontSize = Math.floor(availableSize / 2.6);
            let html = '';
            for (let i = 0; i < text.length; i += 2) {
                html += `<div>${text[i]}${i+1 < text.length ? text[i+1] : ''}</div>`;
            }
            textToDisplay = html;
        } else if (text.length === 6) {
            // 2개씩 3줄
            fontSize = Math.floor(availableSize / 3);
            let html = '';
            for (let i = 0; i < text.length; i += 2) {
                html += `<div>${text[i]}${text[i+1]}</div>`;
            }
            textToDisplay = html;
        } else if (text.length === 7) {
            // 7자: 더 크게
            fontSize = Math.floor(availableSize / 3);
            textToDisplay = `<div>${text[0]}${text[1]}${text[2]}${text[3]}</div><div>${text[4]}${text[5]}${text[6]}</div>`;
        } else if (text.length === 8) {
            // 4개씩 2줄
            fontSize = Math.floor(availableSize / 3.2);
            textToDisplay = `<div>${text[0]}${text[1]}${text[2]}${text[3]}</div><div>${text[4]}${text[5]}${text[6]}${text[7]}</div>`;
        } else {
            fontSize = Math.floor(availableSize / text.length);
            // 기본적으로 2개씩 배치
            let html = '';
            for (let i = 0; i < text.length; i += 2) {
                html += `<div>${text[i]}${i+1 < text.length ? text[i+1] : ''}</div>`;
            }
            textToDisplay = html;
        }
    } else {
        // 원형 도장: 세로로 배치
        if (text.length === 1) {
            fontSize = Math.floor(availableSize * 0.7);
            textToDisplay = text;
        } else if (text.length === 2) {
            fontSize = Math.floor(availableSize / 2.5);
            textToDisplay = `${text[0]}<br>${text[1]}`;
        } else if (text.length === 3) {
            fontSize = Math.floor(availableSize / 3.5);
            textToDisplay = `${text[0]}<br>${text[1]}<br>${text[2]}`;
        } else if (text.length === 4) {
            fontSize = Math.floor(availableSize / 2.2);
            textToDisplay = `<div>${text[0]}${text[1]}</div><div>${text[2]}${text[3]}</div>`;
        } else if (text.length === 6) {
            // 6자: 크게
            fontSize = Math.floor(availableSize / 2.4);
            // 2개씩 배치 유지
            let html = '';
            for (let i = 0; i < text.length; i += 2) {
                html += `<div>${text[i]}${i+1 < text.length ? text[i+1] : ''}</div>`;
            }
            textToDisplay = html;
        } else if (text.length === 7 || text.length === 8) {
            // 7~8자: 더 크게
            fontSize = Math.floor(availableSize / 2.2);
            // 2개씩 배치 유지
            let html = '';
            for (let i = 0; i < text.length; i += 2) {
                html += `<div>${text[i]}${i+1 < text.length ? text[i+1] : ''}</div>`;
            }
            textToDisplay = html;
        } else {
            fontSize = Math.floor(availableSize / text.length);
            // 기본적으로 2개씩 배치
            let html = '';
            for (let i = 0; i < text.length; i += 2) {
                html += `<div>${text[i]}${i+1 < text.length ? text[i+1] : ''}</div>`;
            }
            textToDisplay = html;
        }
    }
    
    // 텍스트 스타일 설정 (내부에 padding 적용)
    // 기존 내용 제거
    stampOutput.innerHTML = '';
    
    const textWrapper = document.createElement('div');
    textWrapper.style.display = 'inline-flex';
    textWrapper.style.flexDirection = 'column';
    textWrapper.style.alignItems = 'center';
    textWrapper.style.justifyContent = 'center';
    textWrapper.style.color = textColor.value;
    textWrapper.style.fontSize = `${fontSize}px`;
    textWrapper.style.fontWeight = 'bold';
    textWrapper.style.fontFamily = fontSelect.value;
    textWrapper.style.lineHeight = '1.2';
    textWrapper.style.textAlign = 'center';
    textWrapper.style.boxSizing = 'border-box';
    textWrapper.innerHTML = textToDisplay;
    
    stampOutput.appendChild(textWrapper);
}

// 페이지 로드 시 초기 도장 생성
generateStamp();

// 알림 표시
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}
