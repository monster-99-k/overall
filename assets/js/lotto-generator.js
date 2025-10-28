// 로또 번호 생성기 스크립트

// DOM 요소
const usePascal = document.getElementById('usePascal');
const useFermat = document.getElementById('useFermat');
const generateLottoBtn = document.getElementById('generateLottoBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const lottoNumbers = document.getElementById('lottoNumbers');
const recentLottoList = document.getElementById('recentLottoList');
const copyNumbersBtn = document.getElementById('copyNumbersBtn');
const resetBtn = document.getElementById('resetBtn');

let recentDraws = [];
let currentNumbers = [];

// 파스칼 삼각수 계산
function pascalTriangle(n, k) {
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 0; i < k; i++) {
        result = result * (n - i) / (i + 1);
    }
    return Math.round(result);
}

// 페르마의 작은 정리 활용
function fermatCalculation(num) {
    // 2^(num-1) mod num 계산
    const mod = 45; // 로또 번호 범위
    let result = 1;
    let base = 2;
    let exp = num - 1;
    
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
    }
    return result + 1; // 1~45 범위로 변환
}

// 현재 최신 회차 계산 (1195회차 기준)
function getCurrentDrawNumber() {
    const today = new Date();
    const baseDate = new Date('2025-10-25'); // 1195회차 기준 날짜
    const baseDrawNo = 1195;
    
    // 일요일까지는 이번 주 추첨, 월요일부터는 다음 주
    const dayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    const isAfterMonday = dayOfWeek >= 1;
    
    // 오늘이 월요일 이후면 최신 회차, 그렇지 않으면 이전 회차
    if (isAfterMonday) {
        // 월요일부터 토요일까지는 최신 회차
        const daysSinceBase = Math.floor((today - baseDate) / (1000 * 60 * 60 * 24));
        const weeksSinceBase = Math.floor(daysSinceBase / 7);
        return baseDrawNo + weeksSinceBase;
    } else {
        // 일요일은 이전 주 회차
        const daysSinceBase = Math.floor((today - baseDate) / (1000 * 60 * 60 * 24)) - 1;
        const weeksSinceBase = Math.floor(daysSinceBase / 7);
        return baseDrawNo + weeksSinceBase;
    }
}

// 최근 회차 번호 가져오기
async function fetchRecentDraws() {
    try {
        const currentDraw = getCurrentDrawNumber();
        console.log('계산된 최신 회차:', currentDraw);
        
        recentDraws = [];
        
        // 각 회차를 순차적으로 가져오기
        for (let i = 0; i < 10; i++) {
            const drwNo = currentDraw - i;
            
            try {
                const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;
                const response = await fetch(url);
                
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.returnValue === 'success') {
                        recentDraws.push(data);
                    }
                }
            } catch (error) {
                console.log(`회차 ${drwNo} API 실패, 건너뛰기`);
            }
            
            // API 부하 방지
            if (i < 9) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        
        console.log('API에서 가져온 회차 수:', recentDraws.length);
        
        // 부족한 회차는 샘플 데이터로 보완
        const needed = 10 - recentDraws.length;
        if (needed > 0) {
            const existingDrwNos = new Set(recentDraws.map(d => d.drwNo));
            const currentDrawNo = getCurrentDrawNumber();
            
            for (let i = 0; i < needed; i++) {
                let drwNo = currentDraw - recentDraws.length - i;
                let sampleDate = getDateForDraw(drwNo);
                let numbers = generateRandomLottoNumbers();
                
                // 중복되지 않는 회차만 추가
                if (!existingDrwNos.has(drwNo)) {
                    recentDraws.push({
                        drwNo: drwNo,
                        drwNoDate: sampleDate,
                        drwtNo1: numbers[0],
                        drwtNo2: numbers[1],
                        drwtNo3: numbers[2],
                        drwtNo4: numbers[3],
                        drwtNo5: numbers[4],
                        drwtNo6: numbers[5],
                        bnusNo: numbers[6]
                    });
                }
            }
        }
        
        console.log('최종 회차 수:', recentDraws.length);
        
    } catch (error) {
        console.error('회차 가져오기 에러:', error);
        recentDraws = getSampleData();
    }
}


// 샘플 데이터 생성 (동적으로)
function getSampleData() {
    const currentDraw = getCurrentDrawNumber();
    const sampleData = [];
    
    for (let i = 0; i < 10; i++) {
        const drwNo = currentDraw - i;
        const sampleDate = getDateForDraw(drwNo);
        
        // 랜덤 번호 생성
        const numbers = generateRandomLottoNumbers();
        
        sampleData.push({
            drwNo: drwNo,
            drwNoDate: sampleDate,
            drwtNo1: numbers[0],
            drwtNo2: numbers[1],
            drwtNo3: numbers[2],
            drwtNo4: numbers[3],
            drwtNo5: numbers[4],
            drwtNo6: numbers[5],
            bnusNo: numbers[6]
        });
    }
    
    return sampleData;
}

// 회차에 대한 날짜 계산
function getDateForDraw(drwNo) {
    const baseDate = new Date('2025-10-25');
    const baseDrawNo = 1195;
    
    const weeksDiff = drwNo - baseDrawNo;
    const date = new Date(baseDate);
    date.setDate(date.getDate() + (weeksDiff * 7));
    
    return date.toISOString().split('T')[0];
}

// 랜덤 로또 번호 생성
function generateRandomLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    numbers.sort((a, b) => a - b);
    
    // 보너스 번호
    let bonus = Math.floor(Math.random() * 45) + 1;
    while (numbers.includes(bonus)) {
        bonus = Math.floor(Math.random() * 45) + 1;
    }
    numbers.push(bonus);
    
    return numbers;
}

// 파스칼 방식으로 번호 생성
function generatePascalNumbers() {
    if (recentDraws.length === 0) return [];
    
    const numbers = [];
    const frequency = {};
    
    // 최근 회차 번호 빈도 계산
    recentDraws.forEach(draw => {
        for (let i = 1; i <= 6; i++) {
            const num = draw[`drwtNo${i}`];
            if (num) {
                frequency[num] = (frequency[num] || 0) + 1;
            }
        }
    });
    
    // 파스칼 삼각수로 계산된 번호 생성 (랜덤 요소 추가)
    for (let i = 1; i <= 45; i++) {
        const freq = frequency[i] || 0;
        let pascalValue = pascalTriangle(10, freq);
        
        // 랜덤 요소 추가
        const randomFactor = Math.random() * 0.3 + 0.85; // 0.85 ~ 1.15 사이
        pascalValue = Math.round(pascalValue * randomFactor);
        
        if (pascalValue > 0) {
            numbers.push({
                num: i,
                value: pascalValue + Math.random() * 10 // 랜덤 요소 강화
            });
        }
    }
    
    // 값이 높은 순으로 정렬하고 상위 6개 선택
    numbers.sort((a, b) => b.value - a.value);
    return numbers.slice(0, 6).map(n => n.num).sort((a, b) => a - b);
}

// 페르마 방식으로 번호 생성
function generateFermatNumbers() {
    if (recentDraws.length === 0) return [];
    
    const numbers = [];
    const frequency = {};
    
    // 최근 회차 번호 빈도 계산
    recentDraws.forEach(draw => {
        for (let i = 1; i <= 6; i++) {
            const num = draw[`drwtNo${i}`];
            if (num) {
                frequency[num] = (frequency[num] || 0) + 1;
            }
        }
    });
    
    // 페르마 계산 적용 (랜덤 요소 추가)
    for (let i = 1; i <= 45; i++) {
        const freq = frequency[i] || 0;
        if (freq > 0) {
            let fermatValue = fermatCalculation(freq);
            
            // 랜덤 요소 추가
            const randomShift = Math.floor(Math.random() * 10) - 5;
            fermatValue += randomShift;
            
            const finalNum = ((fermatValue + i) % 45) + 1;
            numbers.push({
                num: finalNum,
                value: fermatValue + Math.random() * 100
            });
        }
    }
    
    // 값이 높은 순으로 정렬하고 상위 6개 선택
    const selected = [];
    numbers.sort((a, b) => b.value - a.value);
    const seen = new Set();
    
    for (let item of numbers) {
        if (!seen.has(item.num)) {
            selected.push(item.num);
            seen.add(item.num);
            if (selected.length === 6) break;
        }
    }
    
    // 6개 미만이면 랜덤으로 보완
    while (selected.length < 6) {
        const randNum = Math.floor(Math.random() * 45) + 1;
        if (!selected.includes(randNum)) {
            selected.push(randNum);
        }
    }
    
    return selected.sort((a, b) => a - b);
}

// 번호 생성 함수
async function generateNumbers() {
    if (!usePascal.checked && !useFermat.checked) {
        showNotification('최소 하나의 계산 방식을 선택해주세요!');
        return;
    }
    
    try {
        loadingSpinner.style.display = 'inline';
        generateLottoBtn.disabled = true;
        
        // 최근 회차 번호 가져오기
        if (recentDraws.length === 0) {
            await fetchRecentDraws();
            displayRecentDraws();
        }
        
        let recommendedNumbers = [];
        
        // 선택된 방식으로 번호 생성
        if (usePascal.checked && useFermat.checked) {
            const pascalNums = generatePascalNumbers();
            const fermatNums = generateFermatNumbers();
            
            // 두 방식의 교집합 + 랜덤 요소
            const combined = [...new Set([...pascalNums, ...fermatNums])];
            
            // 교집합에서 일부 선택 (랜덤하게)
            const shuffled = combined.sort(() => Math.random() - 0.5);
            
            // 2~3개는 교집합에서, 나머지는 랜덤
            const takeFromCombined = Math.min(3, shuffled.length);
            recommendedNumbers = shuffled.slice(0, takeFromCombined);
            
            // 나머지 랜덤으로 채우기
            while (recommendedNumbers.length < 6) {
                const randNum = Math.floor(Math.random() * 45) + 1;
                if (!recommendedNumbers.includes(randNum)) {
                    recommendedNumbers.push(randNum);
                }
            }
        } else if (usePascal.checked) {
            const pascalNums = generatePascalNumbers();
            // 파스칼 결과 + 랜덤 혼합
            const shuffleCount = Math.floor(Math.random() * 3) + 2; // 2~4개
            recommendedNumbers = pascalNums.slice(0, shuffleCount);
            
            while (recommendedNumbers.length < 6) {
                const randNum = Math.floor(Math.random() * 45) + 1;
                if (!recommendedNumbers.includes(randNum)) {
                    recommendedNumbers.push(randNum);
                }
            }
        } else if (useFermat.checked) {
            const fermatNums = generateFermatNumbers();
            // 페르마 결과 + 랜덤 혼합
            const shuffleCount = Math.floor(Math.random() * 3) + 2; // 2~4개
            recommendedNumbers = fermatNums.slice(0, shuffleCount);
            
            while (recommendedNumbers.length < 6) {
                const randNum = Math.floor(Math.random() * 45) + 1;
                if (!recommendedNumbers.includes(randNum)) {
                    recommendedNumbers.push(randNum);
                }
            }
        }
        
        recommendedNumbers = recommendedNumbers.slice(0, 6).sort((a, b) => a - b);
        currentNumbers = recommendedNumbers;
        
        // 번호 표시
        displayNumbers(recommendedNumbers);
        
        showNotification('번호가 생성되었습니다!');
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('번호 생성에 실패했습니다.');
    } finally {
        loadingSpinner.style.display = 'none';
        generateLottoBtn.disabled = false;
    }
}

// 번호 표시
function displayNumbers(numbers) {
    lottoNumbers.innerHTML = `
        <div class="lotto-number-display">
            ${numbers.map(num => `<span class="lotto-ball ball-${getBallColor(num)}">${num}</span>`).join('')}
        </div>
    `;
}

// 번호 구간별 색상
function getBallColor(num) {
    if (num <= 10) return 'yellow';
    if (num <= 20) return 'blue';
    if (num <= 30) return 'red';
    if (num <= 40) return 'gray';
    return 'green';
}

// 최근 회차 표시
function displayRecentDraws() {
    if (recentDraws.length === 0) {
        recentLottoList.innerHTML = '<p style="text-align: center; color: #6c757d;">데이터를 불러올 수 없습니다.</p>';
        return;
    }
    
    let html = '';
    recentDraws.forEach(draw => {
        html += `
            <div class="recent-draw">
                <div class="draw-header">
                    <span class="draw-number">${draw.drwNo}회차</span>
                    <span class="draw-date">${draw.drwNoDate}</span>
                </div>
                <div class="draw-numbers">
                    ${[1,2,3,4,5,6].map(i => {
                        const num = draw[`drwtNo${i}`];
                        return `<span class="lotto-ball-small ball-${getBallColor(num)}">${num}</span>`;
                    }).join('')}
                    <span class="bonus">+<span class="lotto-ball-small ball-${getBallColor(draw.bnusNo)}">${draw.bnusNo}</span></span>
                </div>
            </div>
        `;
    });
    
    recentLottoList.innerHTML = html;
}

// 이벤트 리스너
generateLottoBtn.addEventListener('click', generateNumbers);

resetBtn.addEventListener('click', () => {
    lottoNumbers.innerHTML = '<p>번호 추천받기 버튼을 클릭하세요</p>';
    currentNumbers = [];
});

copyNumbersBtn.addEventListener('click', () => {
    if (currentNumbers.length === 0) {
        showNotification('먼저 번호를 생성해주세요!');
        return;
    }
    
    const textToCopy = currentNumbers.join(', ');
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('번호가 복사되었습니다!');
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('번호가 복사되었습니다!');
    }
});

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

// 페이지 로드 시 최근 회차 표시
window.addEventListener('DOMContentLoaded', async () => {
    await fetchRecentDraws();
    displayRecentDraws();
});

