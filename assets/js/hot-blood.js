// 열혈형 테스트 - life-crisis와 동일한 UX (다음/이전 버튼, 진행 표시)

let hbCurrent = 0;
let hbAnswers = [];

const hbQuestions = [
    '새로운 일에 도전하는 것을 즐긴다',
    '목표를 세우면 끝까지 밀어붙이는 편이다',
    '팀을 이끌거나 주도하는 것을 좋아한다',
    '문제가 생기면 즉시 해결책을 찾는다',
    '일상에서도 활력이 넘친다는 이야기를 듣는다',
    '위험을 감수하더라도 시도해보는 편이다',
    '감정 표현에 적극적이다',
    '운동이나 활동적인 취미를 즐긴다',
    '성공을 위해 스스로를 몰아붙일 때가 있다',
    '열정을 주변에도 전파하는 편이다'
];

const hbStartBtn = document.getElementById('startBtn');
const hbTestStart = document.getElementById('testStart');
const hbTestQuestion = document.getElementById('testQuestion');
const hbTestResult = document.getElementById('testResult');
const hbProgress = document.getElementById('progressText');
const hbPrevBtn = document.getElementById('hbPrevBtn');
const hbNextBtn = document.getElementById('hbNextBtn');
const hbResultTitle = document.getElementById('resultTitle');
const hbResultDesc = document.getElementById('resultDescription');
const hbResultScore = document.getElementById('resultScore');

const hbOptionBtns = document.querySelectorAll('.option-btn');

hbStartBtn.addEventListener('click', () => {
    hbTestStart.style.display = 'none';
    hbTestQuestion.style.display = 'block';
    hbShowQuestion();
});

function hbShowQuestion(){
    document.getElementById('questionText').textContent = hbQuestions[hbCurrent];
    // 초기화 스타일
    hbOptionBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'white';
        b.style.color = '#495057';
        b.style.borderColor = '#667eea';
    });
    hbProgress.textContent = `질문 ${hbCurrent + 1} / ${hbQuestions.length}`;
    hbPrevBtn.style.display = hbCurrent === 0 ? 'none' : 'inline-block';
    hbNextBtn.style.display = hbAnswers[hbCurrent] != null ? 'inline-block' : 'none';
    hbNextBtn.textContent = hbCurrent === hbQuestions.length - 1 ? '결과 보기' : '다음';
}

hbOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = parseInt(btn.dataset.value);
        if (isNaN(value)) return;
        hbOptionBtns.forEach(b => {
            b.classList.remove('active');
            b.style.background = 'white';
            b.style.color = '#495057';
            b.style.borderColor = '#667eea';
        });
        btn.classList.add('active');
        btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        btn.style.color = 'white';
        btn.style.borderColor = 'transparent';

        hbAnswers[hbCurrent] = value;
        // 다음 버튼 표시
        hbNextBtn.style.display = 'inline-block';
        hbNextBtn.textContent = hbCurrent === hbQuestions.length - 1 ? '결과 보기' : '다음';
    });
});

hbNextBtn.addEventListener('click', () => {
    if (hbAnswers[hbCurrent] == null) return;
    if (hbCurrent < hbQuestions.length - 1) {
        hbCurrent++;
        hbShowQuestion();
    } else {
        hbShowResult();
    }
});

hbPrevBtn.addEventListener('click', () => {
    if (hbCurrent > 0) {
        hbCurrent--;
        hbShowQuestion();
    }
});

function hbShowResult(){
    hbTestQuestion.style.display = 'none';
    hbTestResult.style.display = 'block';
    const total = hbAnswers.reduce((a,b)=>a+(b||0),0);
    const max = hbQuestions.length * 5;
    const score = Math.round((total / max) * 100);
    let title, desc, icon='🔥';
    if (score >= 80) {
        title = '초열혈형';
        desc = '압도적인 추진력과 에너지를 지닌 타입입니다. 주도성과 도전성을 강점으로 살려보세요.';
    } else if (score >= 60) {
        title = '고열혈형';
        desc = '열정과 실행력이 균형 잡혀 있습니다. 목표 지향성이 뚜렷합니다.';
    } else if (score >= 40) {
        title = '중간열혈형';
        desc = '상황에 따라 열정이 달라집니다. 동기 요소를 찾으면 성과가 올라갑니다.';
    } else {
        title = '저열혈형';
        desc = '차분하고 신중한 성향입니다. 지속 가능한 방식으로 동기를 설계해 보세요.';
    }
    document.getElementById('resultIcon').textContent = icon;
    hbResultTitle.textContent = title;
    hbResultScore.textContent = `점수: ${score} / 100`;
    hbResultDesc.innerHTML = `<p>${desc}</p>`;
}

document.getElementById('retryBtn').addEventListener('click', () => {
    hbCurrent = 0;
    hbAnswers = [];
    hbTestResult.style.display = 'none';
    hbTestStart.style.display = 'block';
});

document.getElementById('shareBtn').addEventListener('click', () => {
    const text = `🔥 열혈형 테스트 결과: ${hbResultTitle.textContent}`;
    if (navigator.share) {
        navigator.share({ title:'열혈형 테스트', text, url: location.href });
    } else {
        navigator.clipboard.writeText(text + ' - ' + location.href);
        alert('결과가 복사되었습니다.');
    }
});

// 열혈형 테스트 스크립트

let currentQuestion = 0;
let userAnswers = [];

// 질문 데이터
const questions = [
    {
        question: "새로운 사람들과 어울리는 것을 즐긴다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "열정적으로 일하거나 공부하는 것을 좋아한다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "활동적이고 에너지가 넘치는 편이다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "도전하는 것을 두려워하지 않는다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "감정을 솔직하게 표현하는 편이다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "모임이나 행사에서 적극적으로 참여한다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "목표를 향해 열정적으로 추진한다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "생동감 있고 역동적인 분위기를 좋아한다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "일에 대한 열정이 높고 관심이 많다",
        options: [
            { text: "전혀 그렇지 않다", value: 1 },
            { text: "그렇지 않다", value: 2 },
            { text: "보통이다", value: 3 },
            { text: "그렇다", value: 4 },
            { text: "매우 그렇다", value: 5 }
        ]
    },
    {
        question: "적극적이고 추진력 있는 성격이다",
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
    });
    
    document.getElementById('progressText').textContent = `질문 ${currentQuestion + 1} / ${questions.length}`;
}

// 선택지 클릭
const optionBtns = document.querySelectorAll('.option-btn');
optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        userAnswers.push(parseInt(btn.dataset.value));
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
    
    // 총점 계산 (10~50점)
    const totalScore = userAnswers.reduce((sum, answer) => sum + answer, 0);
    const percentage = (totalScore / 50) * 100;
    
    // 결과 결정
    let result;
    if (percentage >= 80) {
        result = {
            title: '🔥 최고 열혈형',
            icon: '🔥',
            description: '당신은 최고 수준의 열혈형입니다! 강한 에너지와 열정을 가지고 있으며, 적극적이고 추진력이 뛰어납니다. 목표를 향해 맹렬히 나아가는 스타일이며, 사람들에게 동기부여를 주는 리더적 성향을 가지고 있습니다. 이런 열정은 주변 사람들에게 긍정적인 영향을 미칩니다.'
        };
    } else if (percentage >= 65) {
        result = {
            title: '🔥🔥 강한 열혈형',
            icon: '🔥',
            description: '당신은 강한 열혈형입니다! 활동적이고 에너지가 넘치며, 새로운 도전을 즐깁니다. 적극적인 태도로 주변 사람들과 어울리기를 좋아하고, 다양한 활동을 하며 자신만의 색을 뚜렷이 드러냅니다. 이런 열정은 여러분의 강점이 될 수 있습니다.'
        };
    } else if (percentage >= 50) {
        result = {
            title: '🔥 열혈형',
            icon: '🔥',
            description: '당신은 열혈형입니다. 활기차고 에너지 넘치는 편이며, 새로운 것에 관심이 많습니다. 때로는 적극적으로 행동하기도 하지만, 때로는 차분하기도 한 균형잡힌 성격입니다. 이런 열정은 계획적이고 신중한 선택과 함께하면 더욱 효과적일 수 있습니다.'
        };
    } else if (percentage >= 35) {
        result = {
            title: '🌤️ 온건한 성격',
            icon: '🌤️',
            description: '당신은 온건한 성격입니다. 때로는 열정적이기도 하고, 때로는 차분하기도 합니다. 상황에 따라 유연하게 대응하는 스타일이며, 긍정적인 면과 신중한 면을 모두 가지고 있습니다. 필요할 때는 열정을 발휘하고, 때로는 여유를 가지는 것이 큰 강점입니다.'
        };
    } else {
        result = {
            title: '❄️ 차분한 성격',
            icon: '❄️',
            description: '당신은 차분하고 신중한 성격입니다. 조용하게 자신만의 세계를 가지고 있으며, 깊이 있게 생각하는 것을 좋아합니다. 열혈형이 아니어도 문제가 전혀 아닙니다. 오히려 이렇게 차분하고 확고한 성격은 안정적이고 신뢰할 수 있는 사람으로 평가받습니다. 자신만의 장점을 살려나가세요.'
        };
    }
    
    document.getElementById('resultIcon').textContent = result.icon;
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultScore').innerHTML = `<div class="score-circle"><span>${percentage}%</span></div><p>열혈도: ${totalScore}/50점</p>`;
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
    const shareText = `🔥 열혈형 테스트 결과: ${document.getElementById('resultTitle').textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: '열혈형 테스트',
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

