// JavaScript for Beauty Salon LP - 改善版

document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの動作
    const hamburger = document.querySelector('.hamburger');
    const headerNav = document.querySelector('.header-nav');
    const body = document.body;
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            headerNav.classList.toggle('active');
            body.classList.toggle('nav-open'); // スクロール制御用
        });
    }
    
    // メニュータブの切り替え
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // アクティブクラスを全て削除
            menuTabs.forEach(t => t.classList.remove('active'));
            menuContents.forEach(c => c.classList.remove('active'));
            
            // クリックされたタブとそれに対応するコンテンツをアクティブに
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // FAQのアコーディオン動作
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 他のアイテムを閉じる（オプション）
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            // クリックされたアイテムを開閉
            item.classList.toggle('active');
        });
    });
    
    // スムーススクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // ハンバーガーメニューが開いていれば閉じる
                if (headerNav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    headerNav.classList.remove('active');
                    body.classList.remove('nav-open');
                }
            }
        });
    });
    
    // スクロール時のヘッダー変化
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    const scrollThreshold = 50; // スクロール検知のしきい値
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
            
            // スクロール方向によるヘッダー表示/非表示の制御（オプション）
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // 下スクロール
                header.classList.add('header-hidden');
            } else {
                // 上スクロール
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // リサイズ時の調整（モバイルナビゲーション対応）
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            // デスクトップサイズになったらモバイルメニュー関連のクラスを削除
            if (headerNav.classList.contains('active')) {
                headerNav.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('nav-open');
            }
        }
    });

    // ギャラリースライダーのタッチスワイプ対応
    const gallerySlider = document.querySelector('.gallery-slider');
    if (gallerySlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        gallerySlider.addEventListener('mousedown', (e) => {
            isDown = true;
            gallerySlider.classList.add('active');
            startX = e.pageX - gallerySlider.offsetLeft;
            scrollLeft = gallerySlider.scrollLeft;
        });

        gallerySlider.addEventListener('mouseleave', () => {
            isDown = false;
            gallerySlider.classList.remove('active');
        });

        gallerySlider.addEventListener('mouseup', () => {
            isDown = false;
            gallerySlider.classList.remove('active');
        });

        gallerySlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallerySlider.offsetLeft;
            const walk = (x - startX) * 2; // スクロール速度調整
            gallerySlider.scrollLeft = scrollLeft - walk;
        });

        // タッチデバイス用
        gallerySlider.addEventListener('touchstart', (e) => {
            isDown = true;
            gallerySlider.classList.add('active');
            startX = e.touches[0].pageX - gallerySlider.offsetLeft;
            scrollLeft = gallerySlider.scrollLeft;
        }, { passive: true });

        gallerySlider.addEventListener('touchend', () => {
            isDown = false;
            gallerySlider.classList.remove('active');
        });

        gallerySlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - gallerySlider.offsetLeft;
            const walk = (x - startX) * 2;
            gallerySlider.scrollLeft = scrollLeft - walk;
        }, { passive: true });
    }
    
    // フォームバリデーション強化
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // 必須フィールドの検証
            const requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            // メールアドレス形式の検証
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    emailField.classList.add('error');
                    isValid = false;
                }
            }
            
            // 電話番号の形式検証（任意）
            const telField = contactForm.querySelector('input[type="tel"]');
            if (telField && telField.value) {
                const telPattern = /^[0-9\-+\s()]{10,}$/;
                if (!telPattern.test(telField.value)) {
                    telField.classList.add('error');
                    isValid = false;
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                // エラーメッセージ表示
                alert('入力内容に誤りがあります。必須項目を入力し、正しい形式で入力してください。');
            }
        });
        
        // フォーカス時にエラー表示をクリア
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('error');
            });
        });
    }
});
