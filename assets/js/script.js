// DOM 요소들
const textInput = document.getElementById('textInput');
const totalChars = document.getElementById('totalChars');
const charsNoSpace = document.getElementById('charsNoSpace');
const wordCount = document.getElementById('wordCount');
const lineCount = document.getElementById('lineCount');
const includeSpaces = document.getElementById('includeSpaces');
const includeNewlines = document.getElementById('includeNewlines');
const clearBtn = document.getElementById('clearBtn');
const duplicateWords = document.getElementById('duplicateWords');

// 중복 단어 찾기 함수 (부분 문자열 매칭 포함)
function findDuplicateWords(text) {
    if (!text.trim()) {
        return [];
    }
    
    // 텍스트를 단어로 분리 (한글, 영어, 숫자 포함)
    const words = text.toLowerCase()
        .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거 (한글, 영어, 숫자만 유지)
        .split(/\s+/)
        .filter(word => word.length > 1); // 1글자 단어 제외
    
    // 단어 빈도 계산
    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // 부분 문자열 매칭을 통한 중복 그룹 찾기
    const duplicateGroups = [];
    const processedWords = new Set();
    
    // 모든 단어 쌍을 비교하여 부분 문자열 관계 찾기
    const wordList = Object.keys(wordCount);
    for (let i = 0; i < wordList.length; i++) {
        const word1 = wordList[i];
        if (processedWords.has(word1)) continue;
        
        const group = [word1];
        const groupCount = wordCount[word1];
        
        for (let j = i + 1; j < wordList.length; j++) {
            const word2 = wordList[j];
            if (processedWords.has(word2)) continue;
            
            // 부분 문자열 관계 확인
            if (word1.includes(word2) || word2.includes(word1)) {
                group.push(word2);
                processedWords.add(word2);
            }
        }
        
        // 그룹에 2개 이상의 단어가 있거나, 같은 단어가 2번 이상 등장한 경우
        if (group.length > 1 || groupCount > 1) {
            const totalCount = group.reduce((sum, word) => sum + wordCount[word], 0);
            duplicateGroups.push({
                words: group,
                totalCount: totalCount,
                mainWord: group[0] // 가장 짧은 단어를 대표 단어로
            });
        }
        
        processedWords.add(word1);
    }
    
    // 정확히 일치하는 중복도 추가
    const exactDuplicates = Object.entries(wordCount)
        .filter(([word, count]) => count > 1)
        .map(([word, count]) => ({
            words: [word],
            totalCount: count,
            mainWord: word
        }));
    
    // 모든 중복을 합치고 정렬
    const allDuplicates = [...duplicateGroups, ...exactDuplicates];
    
    // 중복 제거 (같은 단어가 여러 그룹에 포함된 경우)
    const uniqueDuplicates = [];
    const seenWords = new Set();
    
    allDuplicates.forEach(duplicate => {
        const isNew = duplicate.words.some(word => !seenWords.has(word));
        if (isNew) {
            duplicate.words.forEach(word => seenWords.add(word));
            uniqueDuplicates.push(duplicate);
        }
    });
    
    return uniqueDuplicates.sort((a, b) => b.totalCount - a.totalCount);
}

// 중복 단어 표시 함수
function displayDuplicateWords(duplicates) {
    if (duplicates.length === 0) {
        duplicateWords.innerHTML = '<p class="no-duplicates">중복된 단어가 없습니다.</p>';
        return;
    }
    
    const duplicateList = duplicates.map(duplicate => {
        const wordList = duplicate.words.join(', ');
        return `
            <div class="duplicate-item">
                <div class="duplicate-word-group">
                    <span class="duplicate-word">${duplicate.mainWord}</span>
                    <span class="duplicate-words-list">(${wordList})</span>
                </div>
                <span class="duplicate-count">${duplicate.totalCount}회</span>
            </div>
        `;
    }).join('');
    
    duplicateWords.innerHTML = duplicateList;
}

// 글자수 계산 함수
function calculateStats() {
    const text = textInput.value;
    
    // 총 글자수 (공백 포함)
    const total = text.length;
    
    // 공백 제외 글자수
    const noSpaces = text.replace(/\s/g, '').length;
    
    // 단어수 계산 (공백으로 구분)
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    // 줄수 계산
    const lines = text === '' ? 0 : text.split('\n').length;
    
    // 중복 단어 찾기 및 표시
    const duplicates = findDuplicateWords(text);
    displayDuplicateWords(duplicates);
    
    // 결과 업데이트 (애니메이션 없이 바로 업데이트)
    totalChars.textContent = total;
    charsNoSpace.textContent = noSpaces;
    wordCount.textContent = words;
    lineCount.textContent = lines;
    
    console.log('계산 결과:', { total, noSpaces, words, lines, duplicates }); // 디버깅용
}

// 이벤트 리스너들
textInput.addEventListener('input', calculateStats);
textInput.addEventListener('paste', calculateStats);
textInput.addEventListener('keyup', calculateStats);

// 텍스트 지우기 버튼
clearBtn.addEventListener('click', () => {
    textInput.value = '';
    calculateStats();
    textInput.focus();
});

// 체크박스 이벤트 (향후 확장용)
includeSpaces.addEventListener('change', calculateStats);
includeNewlines.addEventListener('change', calculateStats);

// 키보드 단축키
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter로 텍스트 지우기
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        clearBtn.click();
    }
});

// 텍스트 영역 자동 크기 조절
textInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 400) + 'px';
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('페이지 로드됨'); // 디버깅용
    calculateStats();
    textInput.focus();
    
    // 로컬 스토리지에서 이전 텍스트 복원 (선택사항)
    const savedText = localStorage.getItem('letterCounterText');
    if (savedText) {
        textInput.value = savedText;
        calculateStats();
    }
});

// 텍스트 자동 저장 (5초마다)
let saveTimeout;
textInput.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        localStorage.setItem('letterCounterText', textInput.value);
    }, 5000);
});

// 복사 기능 추가
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('클립보드에 복사되었습니다!');
        });
    } else {
        // 구형 브라우저 지원
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('클립보드에 복사되었습니다!');
    }
}

// 알림 표시 함수
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// 알림 애니메이션 CSS 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 우클릭 메뉴에 복사 옵션 추가
textInput.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    const menu = document.createElement('div');
    menu.style.cssText = `
        position: fixed;
        top: ${e.pageY}px;
        left: ${e.pageX}px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        padding: 8px 0;
    `;
    
    const copyOption = document.createElement('div');
    copyOption.textContent = '전체 텍스트 복사';
    copyOption.style.cssText = `
        padding: 8px 16px;
        cursor: pointer;
        transition: background 0.2s;
    `;
    copyOption.addEventListener('mouseenter', () => {
        copyOption.style.background = '#f8f9fa';
    });
    copyOption.addEventListener('mouseleave', () => {
        copyOption.style.background = 'white';
    });
    copyOption.addEventListener('click', () => {
        copyToClipboard(textInput.value);
        document.body.removeChild(menu);
    });
    
    menu.appendChild(copyOption);
    document.body.appendChild(menu);
    
    // 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function closeMenu() {
        if (document.body.contains(menu)) {
            document.body.removeChild(menu);
        }
        document.removeEventListener('click', closeMenu);
    });
});

// 통계 카드 호버 효과만 유지 (클릭 복사 기능 제거)
document.querySelectorAll('.stat-card').forEach(card => {
    // 호버 효과만 유지하고 클릭 이벤트는 제거
    card.style.cursor = 'default';
});

