// 집중력과 활동성 자가 체크 도구 스크립트

let currentQuestion = 0;
let userAnswers = [];

// 질문 데이터
const questions = [
    {
        question: "자세를 유지하거나 조용히 앉아 있는 것이 어렵다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "세부사항을 놓치거나 실수가 반복된다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "지속적으로 집중하는 것이 어려울 때가 있다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "한 가지 일에 집중하기보다 여러 일을 동시에 생각한다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "할 일을 체계적으로 조직화하고 관리하는 것이 어렵다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "즉흥적으로 행동하거나 말하는 경우가 있다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "흥미 있는 일에는 깊이 몰입할 수 있다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "시간을 관리하거나 약속을 지키는 것이 어렵다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "멀리 떨어진 곳의 소리나 자극에 쉽게 주의가 분산된다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "에너지가 넘쳐 활동적인 것을 좋아한다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "다른 사람의 말을 끝까지 듣지 못하고 끼어들 때가 있다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "물건을 자주 잃어버리거나 놓친다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "불필요한 수준까지 활동적이거나 안절부절 못한다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "할 일이나 약속을 깜빡 잘 때가 많다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "참기 어려울 정도로 충동적으로 행동하는 경우가 있다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "조용히 하거나 기다려야 하는 상황이 힘들다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "방에서 방으로 이동하거나 무엇인가를 계속 움직이는 편이다",
        options: [
            { text: "전혀 그렇지 않다", value: 0 },
            { text: "그렇지 않다", value: 1 },
            { text: "보통이다", value: 2 },
            { text: "그렇다", value: 3 },
            { text: "매우 그렇다", value: 4 }
        ]
    },
    {
        question: "정리 정돈이나 계획을 세우는 것보다 즉흥적으로 행동하는 편이다",
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
    
    // 총점 계산 (0~72점)
    const totalScore = userAnswers.reduce((sum, answer) => sum + answer, 0);
    const percentage = (totalScore / 72) * 100;
    
    // 결과 결정
    let result;
    if (percentage <= 15) {
        result = {
            title: '집중력과 활동성 일반적 수준',
            icon: '🌿',
            description: '당신은 집중력과 활동성 측면에서 일반적인 패턴을 보입니다. 일상적인 업무나 활동에서 집중할 수 있으며, 에너지 수준도 적절하게 관리되고 있습니다. 이러한 특성은 다양한 상황에서 안정적으로 대응할 수 있게 해줍니다.'
        };
    } else if (percentage <= 30) {
        result = {
            title: '약간의 활발한 특성',
            icon: '🌟',
            description: '당신은 적당히 활발하고 창의적인 특성을 가지고 있습니다. 때로는 집중력이 필요할 때 집중하고, 때로는 자유롭게 활동하는 균형잡힌 스타일입니다. 이러한 특성은 다양한 상황에 유연하게 적응할 수 있는 강점이 됩니다.'
        };
    } else if (percentage <= 45) {
        result = {
            title: '활발하고 창의적인 특성',
            icon: '⚡',
            description: '당신은 상당히 활발하고 창의적인 특성을 가지고 있습니다. 높은 에너지 수준과 빠른 사고 능력을 가지며, 새로운 아이디어나 접근 방식을 좋아합니다. 때로는 집중력이 필요할 때 어려움을 느낄 수 있지만, 이러한 특성은 창의적이고 역동적인 장점으로 작용할 수 있습니다.'
        };
    } else if (percentage <= 60) {
        result = {
            title: '높은 에너지와 독특한 집중 패턴',
            icon: '🔥',
            description: '당신은 매우 활발하고 높은 에너지를 가지며, 독특한 집중 패턴을 보입니다. 흥미 있는 일에는 강한 집중력을 발휘하지만 일상적인 일에는 어려움을 느낄 수 있습니다. 이러한 특성은 창의성, 속도감, 다양한 아이디어 생성 등에서 강점이 될 수 있으며, 자신에게 맞는 환경과 방법을 찾는 것이 중요합니다.'
        };
    } else {
        result = {
            title: '매우 독특한 에너지와 집중 패턴',
            icon: '⭐',
            description: '당신은 매우 높은 에너지와 독특한 집중 패턴을 보입니다. 전통적인 방식보다는 자신만의 방법으로 일하는 것이 더 효과적일 수 있으며, 흥미 있는 영역에서는 탁월한 집중력을 보일 수 있습니다. 이러한 특성은 오히려 강점이 될 수 있는 부분입니다. 자신에게 맞는 환경, 도구, 방법을 찾아 활용하는 것이 중요하며, 필요하다면 전문가와 함께 이러한 특성을 더 잘 이해하고 활용할 수 있는 방법을 찾아볼 수 있습니다.'
        };
    }
    
    document.getElementById('resultIcon').textContent = result.icon;
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultScore').innerHTML = `<div class="score-circle"><span>${Math.round(percentage)}%</span></div><p>특성 점수: ${totalScore}/72점</p>`;
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
    const shareText = `⚡ 집중력 체크 결과: ${document.getElementById('resultTitle').textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: '집중력 체크',
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

