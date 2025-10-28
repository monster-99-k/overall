// 자존감 테스트 (로컬 구현)
// 참고 플로우: start-channel 버튼 → 질문 진행 → 결과 산출

(function(){
    const startBtn = document.getElementById('start-channel');
    const quizContainer = document.getElementById('quizContainer');
    const resultContainer = document.getElementById('resultContainer');
    const questionTitle = document.getElementById('questionTitle');
    const answersEl = document.getElementById('answers');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progressEl = document.getElementById('progress');
    const resultSummary = document.getElementById('resultSummary');
    const retryBtn = document.getElementById('retryBtn');

    // 간단한 10문항 예시 데이터 (5점 리커트)
    const questions = [
        '나는 나 자신에게 호의적인 편이다.',
        '나의 능력에 전반적으로 만족한다.',
        '스스로 가치 있는 사람이라고 느낀다.',
        '나는 내 장점을 잘 알고 있다.',
        '실수하더라도 금방 회복하는 편이다.',
        '타인의 시선에 과도하게 흔들리지 않는다.',
        '도전적인 일을 피하지 않는다.',
        '나의 의견을 분명히 표현한다.',
        '과거의 실패가 현재의 나를 규정하지 않는다.',
        '나는 스스로를 존중한다.'
    ];

    const choices = [
        { label: '전혀 아니다', value: 1 },
        { label: '아니다', value: 2 },
        { label: '보통이다', value: 3 },
        { label: '그렇다', value: 4 },
        { label: '매우 그렇다', value: 5 },
    ];

    let index = 0;
    const answers = new Array(questions.length).fill(null);

    function renderQuestion() {
        questionTitle.textContent = `Q${index + 1}. ${questions[index]}`;
        answersEl.innerHTML = '';
        choices.forEach((c, i) => {
            const id = `opt_${index}_${i}`;
            const wrapper = document.createElement('label');
            wrapper.className = 'option-btn';
            wrapper.style.cursor = 'pointer';
            wrapper.htmlFor = id;
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `q_${index}`;
            input.id = id;
            input.value = String(c.value);
            input.style.display = 'none';
            if (answers[index] === c.value) input.checked = true;
            const text = document.createElement('span');
            text.textContent = c.label;
            wrapper.appendChild(input);
            wrapper.appendChild(text);
            wrapper.addEventListener('click', () => {
                answers[index] = c.value;
                // 선택 표시
                Array.from(answersEl.children).forEach(ch => ch.classList.remove('active'));
                wrapper.classList.add('active');
                // 다음 버튼 표시
                const nextBtn = document.getElementById('nextBtn');
                if (nextBtn) {
                    nextBtn.style.display = 'inline-block';
                    nextBtn.textContent = index === questions.length - 1 ? '결과 보기' : '다음';
                }
            });
            answersEl.appendChild(wrapper);
        });
        progressEl.textContent = `${index + 1} / ${questions.length}`;
        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        const nextBtnEl = document.getElementById('nextBtn');
        if (nextBtnEl) {
            nextBtnEl.style.display = answers[index] != null ? 'inline-block' : 'none';
            nextBtnEl.textContent = index === questions.length - 1 ? '결과 보기' : '다음';
        }
    }

    function calcResult() {
        const total = answers.reduce((a, b) => a + (b ?? 0), 0);
        const max = questions.length * 5;
        const score = Math.round((total / max) * 100);
        let level, desc;
        if (score >= 80) {
            level = '높은 자존감';
            desc = '자신에 대한 신뢰가 높고 도전을 즐기는 편입니다.';
        } else if (score >= 60) {
            level = '보통 자존감';
            desc = '대체로 안정적이지만 상황에 따라 흔들릴 수 있습니다.';
        } else {
            level = '낮은 자존감';
            desc = '스스로에 대한 부정적 신념을 돌보는 노력이 필요합니다.';
        }
        resultSummary.innerHTML = `<p><strong>점수:</strong> ${score} / 100</p><p><strong>등급:</strong> ${level}</p><p>${desc}</p>`;
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            startBtn.parentElement.style.display = 'none';
            quizContainer.style.display = 'block';
            renderQuestion();
        });
    }

    nextBtn.addEventListener('click', () => {
        if (answers[index] == null) {
            alert('응답을 선택해주세요.');
            return;
        }
        if (index < questions.length - 1) {
            index += 1;
            renderQuestion();
        } else {
            // 결과
            quizContainer.style.display = 'none';
            resultContainer.style.display = 'block';
            calcResult();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index -= 1;
            renderQuestion();
        }
    });

    retryBtn.addEventListener('click', () => {
        index = 0;
        answers.fill(null);
        resultContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        renderQuestion();
    });
})();


