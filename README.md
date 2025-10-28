# 글자수세기 - 실시간 글자수 계산기

[lettercounter.net](https://lettercounter.net/)과 같은 실시간 글자수 세기 웹사이트입니다.

## ✨ 주요 기능

- **실시간 글자수 계산**: 입력과 동시에 글자수가 업데이트됩니다
- **다양한 통계**: 총 글자수, 공백 제외 글자수, 단어수, 줄수 제공
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화
- **자동 저장**: 브라우저에 텍스트가 자동으로 저장됩니다
- **키보드 단축키**: Ctrl+Enter로 텍스트 지우기
- **복사 기능**: 우클릭 메뉴와 통계 카드 클릭으로 복사 가능
- **아름다운 UI**: 모던하고 직관적인 디자인

## 🚀 배포 방법

### 1. GitHub Pages (무료)

1. GitHub에 새 저장소를 만듭니다
2. 이 파일들을 저장소에 업로드합니다
3. Settings > Pages에서 Source를 "Deploy from a branch"로 설정
4. Branch를 "main"으로 선택하고 Save
5. 몇 분 후 `https://yourusername.github.io/repositoryname`에서 접속 가능

### 2. Netlify (무료)

1. [Netlify](https://netlify.com)에 가입
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. 자동으로 배포됩니다

### 3. Vercel (무료)

1. [Vercel](https://vercel.com)에 가입
2. "New Project" 클릭
3. GitHub 저장소 import
4. 자동으로 배포됩니다

### 4. 로컬에서 실행

```bash
# 간단한 HTTP 서버 실행
python -m http.server 8000
# 또는
npx serve .
```

그 후 브라우저에서 `http://localhost:8000` 접속

## 📁 파일 구조

```
tistory/
├── index.html      # 메인 HTML 파일
├── style.css       # 스타일시트
├── script.js       # JavaScript 기능
└── README.md       # 프로젝트 설명
```

## 🎯 사용 사례

- **학생**: 이력서, 자기소개서 글자수 제한 확인
- **블로거**: 포스팅 글자수 확인 및 SEO 최적화
- **작가**: 원고 글자수 체크
- **마케터**: 메타 디스크립션, 제목 태그 최적화

## 💡 사용 팁

- **이력서/자기소개서**: 글자수 제한에 맞춰 작성
- **블로그 포스팅**: 최소 1500자 이상 권장
- **SEO 최적화**: 
  - 제목 태그: 60자 이내
  - 메타 디스크립션: 160자 이내
- **통계 카드 클릭**: 해당 정보를 클립보드에 복사

## 🔧 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript (ES6+)**: 실시간 계산, 이벤트 처리
- **반응형 디자인**: 모든 기기 지원

## 📱 브라우저 지원

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**즐거운 글쓰기 되세요! ✍️** 