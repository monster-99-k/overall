// 반응형 네비게이션 토글 기능

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
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
});

