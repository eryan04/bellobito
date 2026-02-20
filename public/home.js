function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('bellobito_theme') || 'dark';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }
    updateThemeIcon();
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('bellobito_theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

async function loadDailyQuote() {
    try {
        const response = await fetch('/api/quote-of-day');
        const data = await response.json();
        const quoteEl = document.getElementById('dailyQuote');
        quoteEl.style.opacity = '0';
        setTimeout(() => {
            quoteEl.textContent = data.quote;
            quoteEl.style.transition = 'opacity 0.5s ease';
            quoteEl.style.opacity = '1';
        }, 100);
    } catch (error) {
        document.getElementById('dailyQuote').textContent = 'L\'amour est la seule réalité qui soit éternelle.';
    }
}

let statsLoaded = false;

async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        const stats = document.querySelectorAll('.stat-number');
        if (stats[0]) stats[0].setAttribute('data-count', data.testsRealises);
        if (stats[1]) stats[1].setAttribute('data-count', data.satisfaction);
        if (stats[2]) stats[2].setAttribute('data-count', data.couplesFormes);
        
        statsLoaded = true;
        // Si la section est déjà visible, animer immédiatement
        setTimeout(() => {
            if (!document.querySelector('.hero-stats')?.classList.contains('stats-animated')) {
                animateStats();
            }
        }, 100);
    } catch (error) {
        console.error('Erreur chargement stats:', error);
        statsLoaded = true;
    }
}

function createFloatingHearts() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['💖', '💗', '💕', '💝', '❤️', '✨'][Math.floor(Math.random() * 6)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        hero.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }, 2000);
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        if (isNaN(target) || stat.classList.contains('animated')) return;
        
        stat.classList.add('animated');
        let current = 0;
        const increment = target / 50;
        const duration = 2000; // 2 secondes
        const stepTime = Math.abs(Math.floor(duration / target)) || 40;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    });
}

// Nouvelle fonction pour observer quand les stats deviennent visibles
function initStatsObserver() {
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('stats-animated')) {
                // Attendre que les stats soient chargées
                const checkAndAnimate = () => {
                    if (statsLoaded) {
                        entry.target.classList.add('stats-animated');
                        animateStats();
                        observer.unobserve(entry.target);
                    } else {
                        setTimeout(checkAndAnimate, 100);
                    }
                };
                checkAndAnimate();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
}

function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateKonamiMode() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = ['💖', '💗', '💕', '💝', '❤️', '🔥'][Math.floor(Math.random() * 6)];
            const heart = document.createElement('div');
            heart.textContent = emoji;
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.fontSize = '3rem';
            heart.style.animation = 'float-up 3s ease-out forwards';
            heart.style.zIndex = '9999';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 6000);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    loadDailyQuote();
    loadStats();
    createFloatingHearts();
    initKonamiCode();
    initStatsObserver();
    initParallax();
    initRippleEffect();
    initCursorEffect();
    initTextReveal();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .quote-of-day').forEach(el => {
        observer.observe(el);
    });
});

// Révélation du texte au chargement - VERSION SIMPLIFIEE
function initTextReveal() {
    // Animation CSS suffit, pas besoin de JS ici
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 0.8s ease';
            heroSection.style.opacity = '1';
        }, 100);
    }
}

// Effet de parallaxe au scroll - Version améliorée
function initParallax() {
    const heroImage = document.querySelector('.hero-img');
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroImage) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.2;
                
                if (heroImage && scrolled < 800) {
                    heroImage.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
                }
                if (heroBadge && scrolled < 800) {
                    heroBadge.style.transform = `translateY(${-rate * 0.3}px)`;
                }
                if (heroTitle && scrolled < 800) {
                    heroTitle.style.opacity = 1 - scrolled * 0.002;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Effet ripple sur les boutons - Version améliorée
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .feature-card, .stat-box');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Effet de souris qui suit le curseur
function initCursorEffect() {
    // Ne pas activer sur mobile
    if (window.innerWidth < 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.textContent = '💖';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isHovering = false;
    
    // Activer le curseur au premier mouvement
    let firstMove = true;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (firstMove) {
            cursor.classList.add('active');
            firstMove = false;
        }
    });
    
    function animateCursor() {
        const speed = isHovering ? 0.2 : 0.12;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Masquer le curseur par défaut du navigateur
    document.body.style.cursor = 'none';
    
    // Effet sur les éléments interactifs
    const updateInteractives = () => {
        const interactives = document.querySelectorAll('a, button, .feature-card, input, select, .nav-link');
        interactives.forEach(el => {
            el.style.cursor = 'none';
            
            el.addEventListener('mouseenter', () => {
                isHovering = true;
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(15deg)';
            });
            el.addEventListener('mouseleave', () => {
                isHovering = false;
                cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
            });
        });
    };
    
    updateInteractives();
    
    // Observer pour les nouveaux éléments
    const observer = new MutationObserver(updateInteractives);
    observer.observe(document.body, { childList: true, subtree: true });
}

// Easter Egg - Modale "KESTUFOU LA FRANJO"
const navBrand = document.querySelector('.nav-brand');
const easterEggModal = document.getElementById('easterEggModal');
const easterEggClose = document.querySelector('.easter-egg-close');
const easterEggOverlay = document.querySelector('.easter-egg-overlay');

if (navBrand && easterEggModal) {
    navBrand.style.cursor = 'pointer';
    
    navBrand.addEventListener('click', () => {
        easterEggModal.style.display = 'block';
        setTimeout(() => {
            easterEggModal.classList.add('show');
        }, 10);
    });
    
    const closeModal = () => {
        easterEggModal.classList.remove('show');
        setTimeout(() => {
            easterEggModal.style.display = 'none';
        }, 300);
    };
    
    if (easterEggClose) {
        easterEggClose.addEventListener('click', closeModal);
    }
    
    if (easterEggOverlay) {
        easterEggOverlay.addEventListener('click', closeModal);
    }
}
