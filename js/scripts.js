// ページローディングアニメーション
window.addEventListener('load', function() {
    // すぐにpreloaderを非表示にし、bodyにloadedクラスを追加
    document.body.classList.add('loaded');
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // すべての画像が読み込まれたか確認
    const allImages = document.querySelectorAll('img');
    let loadedImages = 0;
    
    const checkAllImagesLoaded = () => {
        loadedImages++;
        if (loadedImages === allImages.length) {
            document.body.classList.add('all-content-loaded');
        }
    };
    
    allImages.forEach(img => {
        if (img.complete) {
            checkAllImagesLoaded();
        } else {
            img.addEventListener('load', checkAllImagesLoaded);
        }
    });
    
    // モバイルかどうかを検出
    const isMobile = window.innerWidth <= 768;
    
    // モバイルの場合、AOSアニメーションを無効化
    if (isMobile && typeof AOS !== 'undefined') {
        AOS.init({
            disable: true
        });
    }
});

// DOM要素が読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューの切り替え
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // 画面の空白部分をクリックしたらメニューを閉じる
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
    
    // ナビゲーションリンクがクリックされたらメニューを閉じる
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // スクロールしたらヘッダーのスタイルを変更
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // スクロール方向を検出してヘッダーを表示/非表示
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // 下にスクロール
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // トップに戻るボタンの表示切り替え
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // トップに戻るボタンのクリックイベント
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // AOS (Animate On Scroll) ライブラリの初期化
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50,
        delay: 100,
        disable: 'mobile'
    });
    
    // ヒーローセクションとギャラリーセクションのパララックス効果
    const hero = document.querySelector('.hero');
    const parallaxBg = document.querySelector('.parallax-background');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // ヒーローセクションのパララックス
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
        
        // ギャラリーセクションのパララックス
        if (parallaxBg) {
            const galleryOffset = document.querySelector('.gallery').offsetTop;
            const offsetY = (scrollPosition - galleryOffset) * 0.1;
            
            if (scrollPosition > galleryOffset - window.innerHeight && 
                scrollPosition < galleryOffset + document.querySelector('.gallery').offsetHeight) {
                parallaxBg.style.transform = `translateY(${offsetY}px) scale(1.1)`;
            }
        }
    });
    
    // サービスカードのホバーエフェクト強化
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ギャラリーアイテムのクリックイベント（モーダル表示）
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // ここにモーダル表示のコードを追加することができます
            // 簡略化のため、今回は実装しません
        });
    });
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 文字のタイピングアニメーション（ヒーローセクションで使用）
    const heroTitle = document.querySelector('.hero h1');
    
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // ページ読み込み後少し遅らせてアニメーションを開始
        setTimeout(() => {
            typeWriter();
        }, 500);
    }
    
    // 予約ボタンのクリックエフェクト
    const ctaBtn = document.querySelector('.cta .btn');
    
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            // 波紋エフェクトを作成
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // サービスアイコンのアニメーション
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    serviceIcons.forEach(icon => {
        // アイコンをホバーした時のエフェクト
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // 画像の遅延読み込み
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // すべてのボタンにリップルエフェクトを追加
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 波紋エフェクトを作成
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
