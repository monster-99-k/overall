// 비밀번호 생성기 스크립트

// DOM 요소
const useUppercase = document.getElementById('useUppercase');
const useLowercase = document.getElementById('useLowercase');
const useNumbers = document.getElementById('useNumbers');
const useSymbols = document.getElementById('useSymbols');
const passwordLength = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const generatedPassword = document.getElementById('generatedPassword');
const viewPassword = document.getElementById('viewPassword');
const passwordStrength = document.getElementById('passwordStrength');
const passwordEntropy = document.getElementById('passwordEntropy');

let isPasswordVisible = false;

// 문자 세트 정의
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// 길이 슬라이더 업데이트
passwordLength.addEventListener('input', () => {
    lengthValue.textContent = passwordLength.value;
});

// 비밀번호 생성 함수
function generatePassword() {
    let charset = '';
    
    if (useUppercase.checked) charset += uppercase;
    if (useLowercase.checked) charset += lowercase;
    if (useNumbers.checked) charset += numbers;
    if (useSymbols.checked) charset += symbols;
    
    if (charset === '') {
        alert('최소 하나의 옵션을 선택해주세요!');
        return;
    }
    
    let password = '';
    const length = parseInt(passwordLength.value);
    
    // 안전한 난수 생성
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }
    
    generatedPassword.value = password;
    calculatePasswordStrength(password);
}

// 비밀번호 강도 계산
function calculatePasswordStrength(password) {
    let strength = 0;
    let charsetSize = 0;
    
    if (/[a-z]/.test(password)) {
        strength += 26;
        charsetSize += 26;
    }
    if (/[A-Z]/.test(password)) {
        strength += 26;
        charsetSize += 26;
    }
    if (/[0-9]/.test(password)) {
        strength += 10;
        charsetSize += 10;
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
        strength += 32;
        charsetSize += 32;
    }
    
    // 엔트로피 계산 (bits)
    const entropy = Math.log2(charsetSize) * password.length;
    passwordEntropy.textContent = `엔트로피: ${entropy.toFixed(2)} bits`;
    
    // 강도 평가
    if (entropy < 35) {
        passwordStrength.innerHTML = '<span style="color:#ff6b6b;">보안강도: 약함</span>';
    } else if (entropy < 60) {
        passwordStrength.innerHTML = '<span style="color:#ffa500;">보안강도: 보통</span>';
    } else if (entropy < 80) {
        passwordStrength.innerHTML = '<span style="color:#28a745;">보안강도: 강함</span>';
    } else {
        passwordStrength.innerHTML = '<span style="color:#20c997;">보안강도: 매우 강함</span>';
    }
}

// 비밀번호 복사
function copyPassword() {
    if (!generatedPassword.value) {
        showNotification('생성된 비밀번호가 없습니다!');
        return;
    }
    
    generatedPassword.select();
    document.execCommand('copy');
    showNotification('비밀번호가 클립보드에 복사되었습니다!');
}

// 비밀번호 보기/숨기기
function togglePasswordVisibility() {
    isPasswordVisible = !isPasswordVisible;
    generatedPassword.type = isPasswordVisible ? 'text' : 'password';
    viewPassword.textContent = isPasswordVisible ? '🙈' : '👁️';
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

// 이벤트 리스너
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
regenerateBtn.addEventListener('click', generatePassword);
viewPassword.addEventListener('click', togglePasswordVisibility);

// 엔터키로 생성
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target === generatedPassword) {
        generatePassword();
    }
});

// 초기 비밀번호 생성
generatePassword();

