// 20대 위기 테스트 스크립트

let currentQuestion = 0;
let userAnswers = [];

// 질문 데이터
const questions = [
    {
        question: "최근 1년간 나의 목표나 방향이 명확하지 않다고 느낀다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "주변 사람들과 비교하면서 내 자신이 부족하다고 느낀다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "현재 직장이나 일에서 성취감이나 만족감을 느끼지 못한다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "인간관계에서 상대방을 이해하기 어렵다고 느껴 외로움을 느낀다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "미래에 대한 불안이나 걱정이 크다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "새로운 도전보다는 안정적인 선택을 선호한다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "자신의 가치나 목적을 찾지 못해서 혼란스럽다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "과거의 선택이나 결정을 후회하며 미련을 가진다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "삶의 의미나 목적을 찾기 위해 노력하고 있다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "현재의 나와 10년 후의 나를 상상했을 때 확신이 없다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    }
];

// DOM 요소
const startBtn = document.getElementById('startBtn');
const testStart = document.getElementById('testStart');
const testQuestion = document.getElementById('testQuestion');
const testResult = document.getElementById('testResult');
const prevQuestionBtn = document.getElementById('prevQuestionBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');

// 시작 버튼
startBtn.addEventListener('click', () => {
    testStart.style.display = 'none';
    testQuestion.style.display = 'block';
    showQuestion();
});

// 질문 표시
function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    
    const options = document.querySelectorAll('.option-btn');
    question.options.forEach((option, index) => {
        options[index].textContent = option.text;
        options[index].dataset.value = option.value;
        // 선택 상태 초기화
        options[index].classList.remove('active');
        options[index].style.background = 'white';
        options[index].style.color = '#495057';
        options[index].style.borderColor = '#667eea';
    });
    
    document.getElementById('progressText').textContent = `질문 ${currentQuestion + 1} / ${questions.length}`;

    // 이전/다음 버튼 상태
    prevQuestionBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    nextQuestionBtn.style.display = 'none';
}

// 선택지 클릭
const optionBtns = document.querySelectorAll('.option-btn');
optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = parseInt(btn.dataset.value);
        if (isNaN(value)) return; // 안전 장치
        // 선택 스타일 표시
        optionBtns.forEach(b => {
            b.classList.remove('active');
            b.style.background = 'white';
            b.style.color = '#495057';
            b.style.borderColor = '#667eea';
        });
        btn.classList.add('active');
        btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        btn.style.color = 'white';
        btn.style.borderColor = 'transparent';

        // 현재 질문의 답을 저장/갱신
        userAnswers[currentQuestion] = value;
        // 다음 버튼 표시
        nextQuestionBtn.style.display = 'inline-block';
        nextQuestionBtn.textContent = currentQuestion === questions.length - 1 ? '결과 보기' : '다음';
    });
});

// 다음/이전 버튼 동작
nextQuestionBtn.addEventListener('click', () => {
    if (userAnswers[currentQuestion] == null) return;
    if (currentQuestion < questions.length - 1) {
        currentQuestion += 1;
        showQuestion();
    } else {
        showResult();
    }
});

prevQuestionBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion -= 1;
        showQuestion();
        // 이전 질문에서 이미 답한 값이 있으면 다음 버튼 표시
        if (userAnswers[currentQuestion] != null) {
            nextQuestionBtn.style.display = 'inline-block';
            nextQuestionBtn.textContent = currentQuestion === questions.length - 1 ? '결과 보기' : '다음';
        }
    }
});

// 결과 표시
function showResult() {
    testQuestion.style.display = 'none';
    testResult.style.display = 'block';
    
    // 총점 계산
    const totalScore = userAnswers.reduce((sum, answer) => sum + answer, 0);
    const average = totalScore / questions.length;
    
    // 결과 결정
    let result;
    if (average <= 1.5) {
        result = {
            title: '청량한 20대',
            icon: '☀️',
            description: '당신은 현재 상태를 명확히 인지하고 있으며, 미래에 대한 계획이 분명합니다. 자신에게 맞는 선택을 하고 있으며 불필요한 불안 없이 현재를 즐기고 있습니다. 이런 상태를 유지하며 자신만의 길을 꾸준히 걸어가세요.'
        };
    } else if (average <= 2.5) {
        result = {
            title: '조금의 고민이 있는 20대',
            icon: '🌤️',
            description: '가끔은 방향성에 대해 고민하기도 하지만, 전반적으로는 자신의 위치를 알고 있습니다. 약간의 불안은 정상적인 것이며, 이런 고민이 성장의 발판이 됩니다. 주변과 비교하지 말고 자신만의 속도로 앞으로 나아가세요.'
        };
    } else if (average <= 3.5) {
        result = {
            title: '방황하는 20대',
            icon: '🌙',
            description: '현재 자신의 위치와 앞으로의 방향에 대해 고민이 많은 단계입니다. 이는 쿼터 라이프 크라이시스의 전형적인 증상으로, 많은 사람들이 경험하는 정상적인 과정입니다. 다양한 경험을 통해 자신에게 맞는 것을 찾아가고 있으며, 이런 탐색이 나중에 큰 자산이 됩니다.'
        };
    } else if (average <= 4.0) {
        result = {
            title: '심각한 고민에 빠진 20대',
            icon: '🌧️',
            description: '현재 삶의 방향성과 목적에 대해 깊은 고민에 빠져있습니다. 과거의 선택에 대한 후회나 미래에 대한 불안이 큰 상태입니다. 이런 시기는 위기이지만 동시에 성장의 기회이기도 합니다. 주변의 도움을 구하고, 작은 것부터 시작해 변화를 만들어가보세요.'
        };
    } else {
        result = {
            title: '심각한 위기 상황',
            icon: '⛈️',
            description: '현재 심각한 위기 상황을 겪고 있을 가능성이 높습니다. 자신의 가치를 찾지 못하고, 방향성에 대한 혼란이 큰 상태입니다. 이런 시기에는 혼자 해결하려 하지 말고 전문가의 도움을 받거나, 신뢰할 수 있는 사람들과 대화를 나누는 것이 도움이 됩니다. 이런 고민은 결코 당신의 탓이 아닙니다.'
        };
    }
    
    document.getElementById('resultIcon').textContent = result.icon;
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultDescription').innerHTML = `<p>${result.description}</p>`;
}

// 다시 하기
document.getElementById('retryBtn').addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = [];
    
    testResult.style.display = 'none';
    testStart.style.display = 'block';
});

// 공유하기
document.getElementById('shareBtn').addEventListener('click', () => {
    const shareText = `🌙 20대 위기 테스트 결과: ${document.getElementById('resultTitle').textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: '20대 위기 테스트',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText + ' - ' + window.location.href);
        showNotification('결과가 클립보드에 복사되었습니다!');
    }
});

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
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

