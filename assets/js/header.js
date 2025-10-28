// 헤더 컴포넌트 관리 스크립트
// 모든 페이지에서 공통으로 사용되는 네비게이션 바를 동적으로 생성

(function() {
    'use strict';

    // 현재 페이지 경로를 기반으로 활성 메뉴 항목 결정
    function getCurrentPage() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        return fileName;
    }

    // 네비게이션 바 HTML 생성
    function createNavbar() {
        const currentPage = getCurrentPage();
        
        // 네비게이션 아이템 정의
        const navItems = [
            { href: 'index.html', text: '글자수세기', class: 'nav-item' },
            { href: 'stamp-maker.html', text: '도장 만들기', class: 'nav-item' },
            { href: 'password-generator.html', text: '비밀번호 생성', class: 'nav-item' },
            { href: 'qr-generator.html', text: 'QR 코드 생성', class: 'nav-item' },
            { 
                text: '커뮤니티', 
                class: 'nav-item dropdown',
                submenu: [
                    { href: 'quotes.html', text: '랜덤 명언' },
                    { href: 'lotto.html', text: '로또 번호' }
                ]
            },
            { href: 'converter.html', text: '이미지 변환', class: 'nav-item' },
            { 
                text: '테스트', 
                class: 'nav-item dropdown',
                submenu: [
                    { href: 'test-menu.html', text: '테스트 모음' }
                ]
            }
        ];

        // 현재 페이지에 맞게 활성 클래스 추가
        navItems.forEach(item => {
            if (item.href && item.href === currentPage) {
                item.class += ' active';
            }
            if (item.submenu) {
                item.submenu.forEach(subitem => {
                    if (subitem.href === currentPage) {
                        item.class += ' active';
                        subitem.active = true;
                    }
                });
            }
        });

        // 네비게이션 HTML 생성
        let navHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <h2>온라인 도구</h2>
                </div>
                <button class="nav-toggle" id="navToggle" aria-label="메뉴">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-menu" id="navMenu">`;

        navItems.forEach(item => {
            if (item.submenu) {
                // 드롭다운 메뉴
                navHTML += `
                    <li class="${item.class}">
                        <a>${item.text}</a>
                        <ul class="dropdown-menu">`;
                
                item.submenu.forEach(subitem => {
                    const activeClass = subitem.active ? ' active' : '';
                    navHTML += `
                            <li class="nav-item${activeClass}">
                                <a href="${subitem.href}">${subitem.text}</a>
                            </li>`;
                });
                
                navHTML += `
                        </ul>
                    </li>`;
            } else {
                // 일반 메뉴
                navHTML += `
                    <li class="${item.class}">
                        <a href="${item.href}">${item.text}</a>
                    </li>`;
            }
        });

        navHTML += `
                </ul>
            </div>
        </nav>`;

        return navHTML;
    }

    // DOM에 네비게이션 바 삽입
    function initNavbar() {
        const navbarContainer = document.getElementById('header-container');
        if (navbarContainer) {
            navbarContainer.innerHTML = createNavbar();
            // 네비게이션 기능 초기화
            initNavFunctionality();
        }
    }

    // 네비게이션 기능 초기화 (기존 nav.js와 유사)
    function initNavFunctionality() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!navToggle || !navMenu) return;
        
        // 햄버거 메뉴 클릭 이벤트
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 드롭다운 메뉴 토글
        const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
        dropdownItems.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            if (dropdownLink && dropdownMenu) {
                dropdownLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 다른 드롭다운 닫기
                    dropdownItems.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.querySelector('.dropdown-menu')?.classList.remove('active');
                        }
                    });
                    
                    // 현재 드롭다운 토글
                    dropdownMenu.classList.toggle('active');
                });
                
                // 드롭다운 메뉴 항목 클릭 시 닫기
                const dropdownLinks = dropdownMenu.querySelectorAll('a');
                dropdownLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        dropdownMenu.classList.remove('active');
                    });
                });
            }
        });
        
        // 메뉴 항목 클릭 시 메뉴 닫기 (모바일)
        const navItems = navMenu.querySelectorAll('.nav-item:not(.dropdown) a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // 드롭다운 닫기
                dropdownItems.forEach(dd => {
                    dd.querySelector('.dropdown-menu')?.classList.remove('active');
                });
            });
        });
        
        // 외부 클릭 시 메뉴 및 드롭다운 닫기
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            const isClickOnDropdown = event.target.closest('.nav-item.dropdown');
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // 드롭다운 외부 클릭 시 닫기
            if (!isClickOnDropdown && event.target.closest('.dropdown-menu') === null) {
                dropdownItems.forEach(dd => {
                    dd.querySelector('.dropdown-menu')?.classList.remove('active');
                });
            }
        });
        
        // 윈도우 리사이즈 시 메뉴 상태 확인
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // DOM 로드 완료 시 네비게이션 바 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();

