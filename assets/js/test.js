// 연애 스타일 테스트 스크립트

let currentQuestion = 0;
let userAnswers = [];
let selectedGender = '';

// 질문 데이터
const questions = [
    {
        question: "첫 만남에서 가장 먼저 하는 것은?",
        options: [
            { text: "간단한 식당이나 카페", value: "A" },
            { text: "좋은 음식점이나 레스토랑", value: "B" }
        ]
    },
    {
        question: "데이트 비용 부담은 어떻게 느끼시나요?",
        options: [
            { text: "적당하게 나누는 게 편안하다", value: "A" },
            { text: "더 챙기는 편이 자연스럽다", value: "B" }
        ]
    },
    {
        question: "선물을 줄 때 어떤 스타일인가요?",
        options: [
            { text: "의미있고 실용적인 선물", value: "A" },
            { text: "좀 더 특별하고 비싼 선물", value: "B" }
        ]
    },
    {
        question: "기념일이나 특별한 날에는?",
        options: [
            { text: "간단하고 따뜻하게 기념한다", value: "A" },
            { text: "여행이나 특별한 이벤트를 계획한다", value: "B" }
        ]
    },
    {
        question: "상대방이 바쁠 때는?",
        options: [
            { text: "이해하고 자기 할 일 한다", value: "A" },
            { text: "배려하며 도와주려고 한다", value: "B" }
        ]
    },
    {
        question: "갈등 상황에서는?",
        options: [
            { text: "논리적으로 대화로 해결한다", value: "A" },
            { text: "상대 감정 먼저 챙기고 해결한다", value: "B" }
        ]
    },
    {
        question: "연인에게 표현할 때?",
        options: [
            { text: "솔직하게 표현한다", value: "A" },
            { text: "로맨틱하게 표현한다", value: "B" }
        ]
    },
    {
        question: "데이트 계획은?",
        options: [
            { text: "서로 논의해서 함께 정한다", value: "A" },
            { text: "미리 준비해서 깜짝 계획한다", value: "B" }
        ]
    }
];

// DOM 요소
const startBtn = document.getElementById('startBtn');
const testStart = document.getElementById('testStart');
const testGender = document.getElementById('testGender');
const testQuestion = document.getElementById('testQuestion');
const testResult = document.getElementById('testResult');

// 시작 버튼
startBtn.addEventListener('click', () => {
    testStart.style.display = 'none';
    testGender.style.display = 'block';
});

// 성별 선택
const genderBtns = document.querySelectorAll('.gender-btn');
genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedGender = btn.dataset.gender;
        testGender.style.display = 'none';
        testQuestion.style.display = 'block';
        showQuestion();
    });
});

// 질문 표시
function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    
    const options = document.querySelectorAll('.option-btn');
    question.options.forEach((option, index) => {
        options[index].textContent = option.text;
        options[index].dataset.value = option.value;
    });
    
    document.getElementById('progressText').textContent = `질문 ${currentQuestion + 1} / ${questions.length}`;
}

// 선택지 클릭
const optionBtns = document.querySelectorAll('.option-btn');
optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        userAnswers.push(btn.dataset.value);
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });
});

// 결과 표시
function showResult() {
    testQuestion.style.display = 'none';
    testResult.style.display = 'block';
    
    // 답변 패턴 생성
    const answerPattern = userAnswers.join('');
    
    // B의 개수를 세어서 5개 이상이면 테토, 아니면 에겐
    const bCount = answerPattern.split('B').length - 1;
    let resultKey;
    
    if (selectedGender === 'male') {
        // 남자
        if (bCount >= 5) {
            resultKey = '테토남';
        } else {
            resultKey = '에겐남';
        }
    } else {
        // 여자
        if (bCount >= 5) {
            resultKey = '테토녀';
        } else {
            resultKey = '에겐녀';
        }
    }
    
    // 결과 매핑
    const resultMap = {
        '테토남': { title: '테토남', icon: '💎', description: '더 많이 챙기고 싶은 연애 스타일입니다. 특별하고 기억에 남는 순간을 만들기를 좋아하며, 상대방에게 더 많이 베풀고 싶어 하는 성향을 가지고 있습니다. 로맨틱하고 행동으로 보여주는 것을 좋아하는 유형입니다.' },
        '에겐남': { title: '에겐남', icon: '🤝', description: '균형잡힌 연애 스타일을 선호합니다. 상호 존중하고 수평적인 관계를 중시하며, 서로의 미래와 목표를 함께 계획하는 것을 중요하게 생각합니다. 깊고 안정적인 관계를 추구하는 성향입니다.' },
        '테토녀': { title: '테토녀', icon: '💕', description: '더 많이 챙기고 싶은 연애 스타일입니다. 특별한 기념일이나 날짜를 중요하게 여기며, 상대방에게 자신만의 방식으로 표현하고 챙기는 것을 좋아합니다. 감성적이고 세심한 배려를 중요하게 생각하는 유형입니다.' },
        '에겐녀': { title: '에겐녀', icon: '🌸', description: '균형잡힌 연애 스타일을 선호합니다. 상호 존중하고 서로의 공간을 인정하는 관계를 추구하며, 깊이 있는 대화와 정신적 교감을 중요하게 여깁니다. 안정적이고 성숙한 관계를 원하는 성향입니다.' }
    };
    
    const result = resultMap[resultKey] || resultMap['에겐남'];
    
    document.getElementById('resultIcon').textContent = result.icon;
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultDescription').innerHTML = `<p>${result.description}</p>`;
}

// 다시 하기
document.getElementById('retryBtn').addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = [];
    selectedGender = '';
    
    testResult.style.display = 'none';
    testStart.style.display = 'block';
});

// 공유하기
document.getElementById('shareBtn').addEventListener('click', () => {
    const shareText = `🧪 연애 스타일 테스트 결과: ${document.getElementById('resultTitle').textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: '연애 스타일 테스트',
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
