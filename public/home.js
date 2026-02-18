function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('bellobito_theme') || 'light';
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

function createFloatingHearts() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['💖', '💗', '💕', '💝'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        hero.appendChild(heart);
        
        setTimeout(() => heart.remove(), 7000);
    }, 3000);
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        if (!target) return;
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    });
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
    createFloatingHearts();
    initKonamiCode();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                if (entry.target.querySelector('.stat-number')) {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .hero-stats, .quote-of-day').forEach(el => {
        observer.observe(el);
    });
});
