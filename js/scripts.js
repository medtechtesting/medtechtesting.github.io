/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // 語言切換功能
    const languageToggle = document.querySelector('.language-toggle');
    const zhElements = document.querySelectorAll('.lang-zh');
    const enElements = document.querySelectorAll('.lang-en');
    
    // 從localStorage獲取語言設定
    let currentLanguage = localStorage.getItem('language') || 'zh';
    
    // 初始化語言顯示
    function setLanguage(lang) {
        if (lang === 'en') {
            zhElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => el.style.display = 'inline');
            document.documentElement.lang = 'en';
        } else {
            zhElements.forEach(el => el.style.display = 'inline');
            enElements.forEach(el => el.style.display = 'none');
            document.documentElement.lang = 'zh-TW';
        }
        currentLanguage = lang;
        localStorage.setItem('language', lang);
    }
    
    // 初始化頁面語言
    setLanguage(currentLanguage);
    
    // 語言切換按鈕事件
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const newLang = currentLanguage === 'zh' ? 'en' : 'zh';
            setLanguage(newLang);
            
            // 添加切換動畫效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // 改善表單驗證
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 基本驗證
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !phone || !message) {
                alert(currentLanguage === 'zh' ? '請填寫所有必填欄位' : 'Please fill in all required fields');
                return;
            }
            
            // Email格式驗證
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert(currentLanguage === 'zh' ? '請輸入有效的Email地址' : 'Please enter a valid email address');
                return;
            }
            
            // 提交表單
            this.submit();
        });
    }

    // 改善滾動體驗
    const smoothScroll = function(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // 為所有導航連結添加平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // 添加載入動畫
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 觀察所有需要動畫的元素
    document.querySelectorAll('.portfolio-item, .form-floating, .btn').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 改善模態框體驗
    const modals = document.querySelectorAll('.portfolio-modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            this.querySelector('.modal-content').style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.querySelector('.modal-content').style.transform = 'scale(1)';
            }, 50);
        });
    });

    // 添加鍵盤快捷鍵支援
    document.addEventListener('keydown', function(e) {
        // ESC鍵關閉模態框
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const closeBtn = openModal.querySelector('.btn-close');
                if (closeBtn) closeBtn.click();
            }
        }
        
        // Ctrl+L 切換語言
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            if (languageToggle) languageToggle.click();
        }
    });

    // 改善無障礙支援
    document.querySelectorAll('button, a, input, textarea').forEach(element => {
        if (!element.hasAttribute('aria-label') && !element.textContent.trim()) {
            element.setAttribute('aria-label', element.getAttribute('title') || 'Interactive element');
        }
    });

    // 添加頁面載入完成動畫
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // 改善移動端體驗
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // 添加錯誤處理
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    // 改善性能
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(navbarShrink, 10);
    });

});
