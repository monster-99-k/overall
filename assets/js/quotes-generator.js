// 랜덤 명언 생성기 스크립트

// DOM 요소
const quoteTypeBtns = document.querySelectorAll('.quote-type-btn');
const generateQuoteBtn = document.getElementById('generateQuoteBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const copyQuoteBtn = document.getElementById('copyQuoteBtn');
const shareQuoteBtn = document.getElementById('shareQuoteBtn');
const quoteDetails = document.getElementById('quoteDetails');

let currentType = 'advice';
let currentQuote = '';

// 명언 종류 선택
quoteTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        quoteTypeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.getAttribute('data-type');
        generateQuoteBtn.click(); // 자동으로 명언 생성
    });
});

// 명언 생성 함수
async function generateQuote() {
    try {
        // 로딩 표시
        loadingSpinner.style.display = 'inline';
        generateQuoteBtn.disabled = true;
        
        let url, response, data;
        
        if (currentType === 'advice') {
            // 한국어 명언 API
            url = 'https://korean-advice-open-api.vercel.app/api/advice';
            response = await fetch(url);
            
            if (!response.ok) throw new Error('API 요청 실패');
            
            data = await response.json();
            
            // API 응답 형식 확인 (여러 가능성)
            let quoteTextValue = data.advice || data.message || data.content || JSON.stringify(data);
            
            if (quoteTextValue) {
                quoteText.textContent = quoteTextValue;
                
                // 작성자 정보
                const author = data.author || data.writer || data.by || '';
                quoteAuthor.textContent = author || '';
                quoteAuthor.style.display = author ? 'block' : 'none';
                
                // 추가 정보 표시
                displayQuoteDetails(data, 'advice');
                
                currentQuote = quoteTextValue;
            } else {
                throw new Error('명언을 가져올 수 없습니다');
            }
        } else {
            // 행복 명언 API - 여러 시도
            try {
                url = 'https://api.sobabear.com/happiness/random-quote';
                response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                
                if (!response.ok) throw new Error('API 요청 실패');
                
                data = await response.json();
                console.log('행복 명언 API 전체 응답:', JSON.stringify(data, null, 2));
                
                // API 응답 구조: { message, statusCode, data: { id, content, author, description, link } }
                let quoteTextValue = '';
                let quoteAuthorValue = '';
                
                // data 객체 안의 content 확인
                if (data.data && data.data.content) {
                    quoteTextValue = data.data.content;
                    quoteAuthorValue = data.data.author || '';
                } 
                // 다른 가능한 구조들도 확인
                else if (data.content) {
                    quoteTextValue = data.content;
                    quoteAuthorValue = data.author || '';
                }
                else if (data.data) {
                    // data 객체에서 직접 찾기
                    quoteTextValue = data.data.text || data.data.message || data.data.quotes;
                    quoteAuthorValue = data.data.author || '';
                }
                else if (data.text) {
                    quoteTextValue = data.text;
                    quoteAuthorValue = data.author || '';
                }
                else if (data.message && data.message !== 'Quote fetched successfully') {
                    quoteTextValue = data.message;
                    quoteAuthorValue = data.author || '';
                }
                else {
                    // 재귀적으로 찾기
                    function findQuoteText(obj, depth = 0) {
                        if (depth > 5) return null;
                        
                        if (typeof obj === 'string' && obj && obj !== 'Quote fetched successfully' && obj.length > 10) {
                            return obj;
                        }
                        
                        if (typeof obj !== 'object' || obj === null) return null;
                        
                        // 가능한 필드들
                        const possibleFields = ['quote', 'text', 'content', 'message', 'advice', 'happiness', 'quotes'];
                        
                        for (let field of possibleFields) {
                            if (obj[field]) {
                                if (typeof obj[field] === 'string' && obj[field] !== 'Quote fetched successfully') {
                                    return obj[field];
                                } else if (typeof obj[field] === 'object') {
                                    const result = findQuoteText(obj[field], depth + 1);
                                    if (result) return result;
                                }
                            }
                        }
                        
                        return null;
                    }
                    
                    quoteTextValue = findQuoteText(data);
                    quoteAuthorValue = data.author || data.writer || data.by || '';
                }
                
                if (quoteTextValue && quoteTextValue !== 'Quote fetched successfully') {
                    quoteText.textContent = quoteTextValue;
                    quoteAuthor.textContent = quoteAuthorValue;
                    quoteAuthor.style.display = quoteAuthorValue ? 'block' : 'none';
                    
                    // 추가 정보 표시 (전체 데이터 전달)
                    displayQuoteDetails(data.data || data, 'happiness');
                    
                    currentQuote = quoteTextValue;
                } else {
                    throw new Error('명언 데이터를 찾을 수 없습니다');
                }
            } catch (apiError) {
                console.error('행복 명언 API 에러:', apiError);
                throw apiError;
            }
        }
        
        // 에니메이션 효과
        quoteText.style.opacity = '0';
        setTimeout(() => {
            quoteText.style.opacity = '1';
        }, 300);
        
        showNotification('새로운 명언이 생성되었습니다!');
        
    } catch (error) {
        console.error('Error:', error);
        console.error('API Response:', data);
        
        // 대체 명언 표시
        const fallbackQuotes = currentType === 'advice' ? [
            '오늘 하루를 소중하게 살아가세요.',
            '작은 변화가 큰 차이를 만듭니다.',
            '도전은 기회의 다른 이름입니다.',
            '네가 원하는 것을 얻으려면 먼저 이미 그것을 가지고 있다고 느껴야 한다.',
            '성공은 준비된 사람에게 찾아옵니다.'
        ] : [
            '행복은 선택입니다.',
            '작은 순간들의 합이 인생입니다.',
            '오늘도 좋은 하루 보내세요.',
            '웃음은 최고의 약입니다.',
            '긍정적인 마음가짐이 모든 것을 바꿉니다.',
            '하루하루가 새로운 기회입니다.',
            '자신을 사랑하는 것이 행복의 시작입니다.',
            '작은 것에 감사하는 마음이 행복을 만듭니다.',
            '미소는 가장 아름다운 메이크업입니다.',
            '행복한 사람은 항상 미래가 있습니다.'
        ];
        
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        quoteText.textContent = randomQuote;
        quoteAuthor.textContent = '';
        quoteAuthor.style.display = 'none';
        currentQuote = randomQuote;
        
        // 상세 정보 숨기기
        if (quoteDetails) {
            quoteDetails.style.display = 'none';
        }
        
        showNotification('API 연결에 문제가 있어 기본 명언을 표시합니다.');
    } finally {
        loadingSpinner.style.display = 'none';
        generateQuoteBtn.disabled = false;
    }
}

// 명언 생성 버튼
generateQuoteBtn.addEventListener('click', generateQuote);

// 명언 복사 기능
copyQuoteBtn.addEventListener('click', () => {
    const textToCopy = currentQuote || quoteText.textContent;
    
    if (!textToCopy || textToCopy === '버튼을 클릭하여 명언을 생성하세요') {
        showNotification('먼저 명언을 생성해주세요!');
        return;
    }
    
    // 클립보드에 복사
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('명언이 클립보드에 복사되었습니다!');
        });
    } else {
        // 구형 브라우저 지원
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('명언이 클립보드에 복사되었습니다!');
    }
});

// 공유 기능
shareQuoteBtn.addEventListener('click', async () => {
    const textToShare = currentQuote || quoteText.textContent;
    
    if (!textToShare || textToShare === '버튼을 클릭하여 명언을 생성하세요') {
        showNotification('먼저 명언을 생성해주세요!');
        return;
    }
    
    // Web Share API 사용 (지원되는 경우)
    if (navigator.share) {
        try {
            await navigator.share({
                title: '랜덤 명언',
                text: textToShare
            });
            showNotification('명언이 공유되었습니다!');
        } catch (err) {
            console.log('공유 취소됨');
        }
    } else {
        // Web Share API가 지원되지 않는 경우 복사로 대체
        copyQuoteBtn.click();
    }
});

// 명언 상세 정보 표시 함수
function displayQuoteDetails(data, type) {
    if (!quoteDetails) return;
    
    let detailsHTML = '';
    
    // 카테고리/분류
    if (data.category || data.topic || data.type) {
        const category = data.category || data.topic || data.type;
        detailsHTML += `<div class="detail-item"><span class="detail-label">분류:</span> <span class="detail-value">${category}</span></div>`;
    }
    
    // 태그
    if (data.tags && Array.isArray(data.tags)) {
        detailsHTML += `<div class="detail-item"><span class="detail-label">태그:</span> <span class="detail-value">${data.tags.join(', ')}</span></div>`;
    }
    
    // 설명
    if (data.explanation || data.description) {
        detailsHTML += `<div class="detail-item full-width"><span class="detail-label">설명:</span> <span class="detail-value">${data.explanation || data.description}</span></div>`;
    }
    
    // 출처
    if (data.source || data.url) {
        detailsHTML += `<div class="detail-item"><span class="detail-label">출처:</span> <span class="detail-value">${data.source || data.url}</span></div>`;
    }
    
    // 언어
    if (data.language) {
        detailsHTML += `<div class="detail-item"><span class="detail-label">언어:</span> <span class="detail-value">${data.language}</span></div>`;
    }
    
    quoteDetails.innerHTML = detailsHTML;
    quoteDetails.style.display = detailsHTML ? 'block' : 'none';
}

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

// 페이지 로드 시 첫 명언 자동 생성
window.addEventListener('DOMContentLoaded', () => {
    generateQuote();
});

