// 인식 패턴 자가 체크 도구 스크립트

let currentQuestion = 0;
let userAnswers = [];

// 질문 데이터
const questions = [
    {
        question: "아이가 눈을 맞추거나 눈 접촉을 피하는 경우가 있나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 특정 장난감이나 활동에만 깊이 몰두하는 경우가 있나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 소음이나 밝은 빛 같은 감각 자극에 과도하게 반응하나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 일상적인 루틴이 바뀌면 매우 불안해하거나 저항하나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 다른 사람의 표정이나 감정을 읽는 것이 어려워 하나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 손을 흔들거나 몸을 앞뒤로 흔드는 등 반복적인 행동을 보이나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 다른 아이들과 함께 놀기를 어려워하거나 피하나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 언어 발달이 지연되거나 말을 하는 것을 피하나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 가상놀이나 역할놀이보다는 반복적인 놀이를 선호하나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 잡히거나 안기는 것을 거부하거나 불편해하나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 새로운 환경이나 사람에게 적응하는데 오래 걸리나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 물건이나 장난감을 특정 순서로 배열하는 것을 좋아하나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 신체 접촉이나 애착 행동을 피하거나 거부하나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 과도한 감정 반응을 보이거나 감정 조절이 어려울 때가 있나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "아이가 한 가지 놀이나 활동에 깊이 몰두하며 다른 것에 관심을 보이지 않나요?",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
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
        options[index].classList.remove('active');
        options[index].style.background = 'white';
        options[index].style.color = '#495057';
        options[index].style.borderColor = '#667eea';
    });
    
    document.getElementById('progressText').textContent = `질문 ${currentQuestion + 1} / ${questions.length}`;
    prevQuestionBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    nextQuestionBtn.style.display = userAnswers[currentQuestion] != null ? 'inline-block' : 'none';
    nextQuestionBtn.textContent = currentQuestion === questions.length - 1 ? '결과 보기' : '다음';
}

// 선택지 클릭
const optionBtns = document.querySelectorAll('.option-btn');
optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = parseInt(btn.dataset.value);
        if (isNaN(value)) return;
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
        userAnswers[currentQuestion] = value;
        nextQuestionBtn.style.display = 'inline-block';
        nextQuestionBtn.textContent = currentQuestion === questions.length - 1 ? '결과 보기' : '다음';
    });
});

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
    }
});

// 결과 표시
function showResult() {
    testQuestion.style.display = 'none';
    testResult.style.display = 'block';
    
    // 총점 계산 (0~60점)
    const totalScore = userAnswers.reduce((sum, answer) => sum + answer, 0);
    const percentage = (totalScore / 60) * 100;
    
    // 결과 결정
    let result;
    if (percentage <= 15) {
        result = {
            title: '일반적인 발달 패턴',
            icon: '🌱',
            description: '우리 아이는 대부분의 아이들과 유사한 방식으로 발달하고 있습니다. 사회적 상호작용과 의사소통 능력, 감각 처리 등이 일반적인 범위 내에 있습니다. 이러한 발달 패턴은 다양한 상황에서 적응할 수 있는 기초가 됩니다.'
        };
    } else if (percentage <= 30) {
        result = {
            title: '독특한 발달 특성',
            icon: '🌿',
            description: '우리 아이는 일부 영역에서 다른 아이들과 약간 다른 발달 패턴을 보일 수 있습니다. 이러한 차이는 아이만의 독특한 특성이거나 강점이 될 수 있습니다. 아이의 관심사나 선호도를 존중하면서 다양한 경험을 제공하는 것이 중요합니다.'
        };
    } else if (percentage <= 45) {
        result = {
            title: '차별화된 발달 특성',
            icon: '🌳',
            description: '우리 아이는 상당히 차별화된 인식과 행동 패턴을 보입니다. 특정 활동에 깊이 몰두하거나, 감각 처리, 사회적 상호작용 등에서 독특한 특성을 가질 수 있습니다. 이러한 특성은 아이의 강점이 될 수 있으며, 아이가 편안함을 느끼는 환경과 방법을 만들어주는 것이 중요합니다. 발달 전문가나 소아과와 상담을 통해 더 잘 이해하고 지원할 수 있습니다.'
        };
    } else if (percentage <= 60) {
        result = {
            title: '특별한 발달 패턴',
            icon: '🌲',
            description: '우리 아이는 주변과 상당히 다른 발달 패턴을 보입니다. 감각 처리, 사회적 상호작용, 의사소통, 행동 패턴 등 여러 영역에서 차별화된 특성을 관찰할 수 있습니다. 이러한 특성은 아이만의 독특한 강점이 될 수 있으며, 아이에게 맞는 환경과 지원 방법을 찾는 것이 중요합니다. 소아과나 발달 전문가와 상담하여 아이의 특성을 더 잘 이해하고 지원하는 방법을 모색해보세요.'
        };
    } else {
        result = {
            title: '매우 특별한 발달 패턴',
            icon: '🌵',
            description: '우리 아이는 매우 독특한 발달 패턴을 보입니다. 감각 처리, 사회적 상호작용, 의사소통, 행동 패턴 등 여러 영역에서 주변과 다른 특성을 관찰할 수 있습니다. 이는 잘못된 것이 아니라 아이만의 독특한 인식과 행동 방식입니다. 아이의 특성을 이해하고, 아이에게 맞는 환경과 방법을 찾는 것이 중요합니다. 소아과, 발달 전문가, 또는 교육 전문가와 상담하여 아이의 발달을 더 잘 이해하고 지원할 수 있는 방법을 찾아보시기 바랍니다. 모든 아이는 고유한 특성을 가지고 있으며, 이는 아이의 강점이 될 수 있습니다.'
        };
    }
    
    document.getElementById('resultIcon').textContent = result.icon;
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultScore').innerHTML = `<div class="score-circle"><span>${Math.round(percentage)}%</span></div><p>차별화 점수: ${totalScore}/60점</p>`;
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
    const shareText = `🧩 인식 패턴 체크 결과: ${document.getElementById('resultTitle').textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: '인식 패턴 체크',
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

