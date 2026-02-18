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

const zodiacCompatibility = {
    belier: { belier: 78, taureau: 45, gemeaux: 88, cancer: 42, lion: 92, vierge: 35, balance: 85, scorpion: 58, sagittaire: 95, capricorne: 38, verseau: 87, poissons: 65 },
    taureau: { belier: 45, taureau: 72, gemeaux: 40, cancer: 88, lion: 52, vierge: 90, balance: 70, scorpion: 82, sagittaire: 35, capricorne: 95, verseau: 48, poissons: 85 },
    gemeaux: { belier: 88, taureau: 40, gemeaux: 75, cancer: 48, lion: 82, vierge: 50, balance: 95, scorpion: 42, sagittaire: 87, capricorne: 45, verseau: 92, poissons: 68 },
    cancer: { belier: 42, taureau: 88, gemeaux: 48, cancer: 80, lion: 62, vierge: 85, balance: 58, scorpion: 95, sagittaire: 40, capricorne: 72, verseau: 45, poissons: 90 },
    lion: { belier: 92, taureau: 52, gemeaux: 82, cancer: 62, lion: 78, vierge: 48, balance: 88, scorpion: 65, sagittaire: 95, capricorne: 42, verseau: 85, poissons: 60 },
    vierge: { belier: 35, taureau: 90, gemeaux: 50, cancer: 85, lion: 48, vierge: 70, balance: 72, scorpion: 82, sagittaire: 45, capricorne: 95, verseau: 52, poissons: 87 },
    balance: { belier: 85, taureau: 70, gemeaux: 95, cancer: 58, lion: 88, vierge: 72, balance: 80, scorpion: 65, sagittaire: 87, capricorne: 52, verseau: 95, poissons: 75 },
    scorpion: { belier: 58, taureau: 82, gemeaux: 42, cancer: 95, lion: 65, vierge: 82, balance: 65, scorpion: 85, sagittaire: 48, capricorne: 90, verseau: 52, poissons: 95 },
    sagittaire: { belier: 95, taureau: 35, gemeaux: 87, cancer: 40, lion: 95, vierge: 45, balance: 87, scorpion: 48, sagittaire: 82, capricorne: 38, verseau: 92, poissons: 65 },
    capricorne: { belier: 38, taureau: 95, gemeaux: 45, cancer: 72, lion: 42, vierge: 95, balance: 52, scorpion: 90, sagittaire: 38, capricorne: 82, verseau: 58, poissons: 85 },
    verseau: { belier: 87, taureau: 48, gemeaux: 92, cancer: 45, lion: 85, vierge: 52, balance: 95, scorpion: 52, sagittaire: 92, capricorne: 58, verseau: 78, poissons: 70 },
    poissons: { belier: 65, taureau: 85, gemeaux: 68, cancer: 90, lion: 60, vierge: 87, balance: 75, scorpion: 95, sagittaire: 65, capricorne: 85, verseau: 70, poissons: 82 }
};

function calculateNumerology(name) {
    const values = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8 };
    let sum = 0;
    for (let char of name.toLowerCase().replace(/[^a-z]/g, '')) {
        sum += values[char] || 0;
    }
    while (sum > 9) {
        sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return sum;
}

function calculateNameCompatibility(name1, name2) {
    let total = 0;
    const combinedLength = name1.length + name2.length;
    
    for (let i = 0; i < Math.max(name1.length, name2.length); i++) {
        const char1 = name1.charCodeAt(i % name1.length) || 0;
        const char2 = name2.charCodeAt(i % name2.length) || 0;
        total += Math.abs(char1 - char2);
    }
    
    const normalized = (total % 101);
    const variance = (combinedLength * 7) % 30;
    let score = Math.abs(50 - normalized) + variance;
    
    if (score > 50) {
        score = 50 + Math.pow((score - 50) / 50, 0.8) * 50;
    }
    
    return Math.round(Math.min(100, Math.max(0, score)));
}

function getZodiacAnalysis(zodiac1, zodiac2, score) {
    const signs = { belier: "Bélier", taureau: "Taureau", gemeaux: "Gémeaux", cancer: "Cancer", lion: "Lion", vierge: "Vierge", balance: "Balance", scorpion: "Scorpion", sagittaire: "Sagittaire", capricorne: "Capricorne", verseau: "Verseau", poissons: "Poissons" };
    
    if (score >= 90) return `${signs[zodiac1]} et ${signs[zodiac2]} forment une union cosmique exceptionnelle. Vos énergies s'harmonisent parfaitement.`;
    if (score >= 75) return `Belle compatibilité entre ${signs[zodiac1]} et ${signs[zodiac2]}. Vos signes se complètent très bien.`;
    if (score >= 60) return `${signs[zodiac1]} et ${signs[zodiac2]} ont une compatibilité prometteuse avec quelques ajustements.`;
    if (score >= 45) return `La relation entre ${signs[zodiac1]} et ${signs[zodiac2]} peut fonctionner avec des efforts mutuels.`;
    if (score >= 30) return `${signs[zodiac1]} et ${signs[zodiac2]} ont des énergies très différentes. Cela peut être compliqué.`;
    return `Compatibilité astrologique difficile entre ${signs[zodiac1]} et ${signs[zodiac2]}. Vos éléments s'opposent naturellement.`;
}

function getNumerologyAnalysis(num1, num2) {
    const diff = Math.abs(num1 - num2);
    if (diff === 0) return `Vos chiffres sont identiques (${num1}) - une connexion spirituelle profonde vous unit.`;
    if (diff <= 2) return `Vos chiffres (${num1} et ${num2}) sont très proches - excellente harmonie vibratoire.`;
    if (diff <= 4) return `Vos chiffres (${num1} et ${num2}) s'équilibrent bien - bonne complémentarité.`;
    if (diff <= 6) return `Vos chiffres (${num1} et ${num2}) sont assez éloignés - vous devrez trouver votre équilibre.`;
    return `Vos chiffres (${num1} et ${num2}) sont très différents - vos vibrations s'opposent sur le plan énergétique.`;
}

function getNameCategory(name) {
    const vowels = name.toLowerCase().match(/[aeiouy]/g) || [];
    const consonants = name.toLowerCase().match(/[bcdfghjklmnpqrstvwxz]/g) || [];
    const ratio = vowels.length / name.length;
    
    if (ratio > 0.5) return { type: "mélodique", trait: "doux et harmonieux" };
    if (ratio > 0.3) return { type: "équilibré", trait: "stable et fiable" };
    return { type: "rythmique", trait: "dynamique et énergique" };
}

function getNameAnalysis(name1, name2, score) {
    const cat1 = getNameCategory(name1);
    const cat2 = getNameCategory(name2);
    
    return `${name1} est un prénom ${cat1.type} (${cat1.trait}), tandis que ${name2} est ${cat2.type} (${cat2.trait}). Votre compatibilité nominale est de ${score}%.`;
}

function getMessage(score) {
    if (score >= 90) return "💕 Match parfait ! Les étoiles sont alignées pour vous !";
    if (score >= 75) return "❤️ Excellente compatibilité ! Vous êtes faits l'un pour l'autre !";
    if (score >= 60) return "💖 Belle compatibilité ! Une histoire prometteuse vous attend !";
    if (score >= 45) return "💗 Compatibilité intéressante ! L'amour peut grandir avec le temps !";
    if (score >= 30) return "💝 Compatibilité modeste mais tout est possible avec de l'amour !";
    if (score >= 15) return "💛 Atomes crochus timides... Il faudra du travail mais pourquoi pas !";
    return "💙 Opposés qui s'attirent ? L'amour réserve parfois des surprises !";
}

function getAdvice(score) {
    if (score >= 90) return "Continuez à cultiver cette connexion magique et laissez votre amour grandir naturellement.";
    if (score >= 75) return "Communiquez ouvertement et partagez vos rêves pour renforcer vos liens.";
    if (score >= 60) return "Prenez le temps de vous découvrir et de construire une base solide ensemble.";
    if (score >= 45) return "Restez patients et ouverts d'esprit. Les meilleures histoires demandent du temps.";
    if (score >= 30) return "Acceptez vos différences et voyez-les comme une richesse. La complémentarité peut créer l'équilibre.";
    if (score >= 15) return "L'amour nécessite des efforts, mais votre volonté peut faire la différence. Soyez authentiques.";
    return "Les astres ne décident pas tout. Si vous vous aimez vraiment, vous pouvez tout surmonter ensemble.";
}

function animateScore(finalScore) {
    let current = 0;
    const duration = 2000;
    const increment = finalScore / (duration / 16);
    const scoreElement = document.getElementById('score');
    
    function update() {
        current += increment;
        if (current >= finalScore) {
            current = finalScore;
            scoreElement.textContent = Math.round(current);
            if (finalScore >= 90) {
                createConfetti();
            }
        } else {
            scoreElement.textContent = Math.round(current);
            requestAnimationFrame(update);
        }
    }
    update();
}

function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#ff6b9d', '#ff8fa3'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        document.getElementById('result').appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

function checkEasterEgg(name1, name2) {
    const easterEggs = {
        'romeo&juliette': { message: '💕 Le couple le plus célèbre de tous les temps !', bonus: 10 },
        'romeo&juliet': { message: '💕 Le couple le plus célèbre de tous les temps !', bonus: 10 },
        'mickey&minnie': { message: '🐭 Couple Disney iconique!', bonus: 8 },
        'simba&nala': { message: '🦁 Hakuna Matata! L\'amour triomphe!', bonus: 8 },
        'bella&edward': { message: '🧛 Amour vampirique éternel!', bonus: 7 },
        'jack&rose': { message: '🚢 Je ne te lâcherai jamais Jack!', bonus: 9 },
        'harry&sally': { message: '💑 Quand Harry rencontre Sally!', bonus: 7 },
    };
    
    const key = (name1.toLowerCase() + '&' + name2.toLowerCase()).replace(/\s/g, '');
    const reverseKey = (name2.toLowerCase() + '&' + name1.toLowerCase()).replace(/\s/g, '');
    
    if (easterEggs[key]) return easterEggs[key];
    if (easterEggs[reverseKey]) return easterEggs[reverseKey];
    
    if (name1.toLowerCase() === name2.toLowerCase()) {
        return { message: '🤔 Narcisse ? On s\'aime soi-même avant tout!', bonus: 0 };
    }
    
    return null;
}

function animateProgress(percentage) {
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (percentage / 100) * circumference;
    
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
        circle.style.strokeDashoffset = offset;
    }, 100);
}

function animateProgressBar(elementId, percentage, delay = 0) {
    setTimeout(() => {
        const bar = document.getElementById(elementId);
        if (bar) {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = percentage + '%';
            }, 50);
        }
    }, delay);
}

function saveToHistory(data) {
    const history = JSON.parse(localStorage.getItem('bellobito_history') || '[]');
    const entry = {
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    };
    history.unshift(entry);
    if (history.length > 10) history.pop();
    localStorage.setItem('bellobito_history', JSON.stringify(history));
    updateStats();
}

function updateStats() {
    const history = JSON.parse(localStorage.getItem('bellobito_history') || '[]');
    if (history.length === 0) return;
    
    const avg = Math.round(history.reduce((sum, item) => sum + item.finalScore, 0) / history.length);
    const best = Math.max(...history.map(item => item.finalScore));
    const tests = history.length;
    
    localStorage.setItem('bellobito_stats', JSON.stringify({ avg, best, tests }));
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span class="toast-message">${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('toast-show'), 10);
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('bellobito_history') || '[]');
    const container = document.getElementById('historyList');
    if (!container) return;
    
    if (history.length === 0) {
        container.innerHTML = '<p class="history-empty">Aucun test pour le moment. Faites votre premier test !</p>';
        return;
    }
    
    container.innerHTML = history.map(item => `
        <div class="history-item">
            <div class="history-names">${item.name1} & ${item.name2}</div>
            <div class="history-score">${item.finalScore}%</div>
            <div class="history-date">${new Date(item.timestamp).toLocaleDateString('fr-FR')}</div>
        </div>
    `).join('');
}

function toggleHistory() {
    const panel = document.getElementById('historyPanel');
    if (panel) {
        panel.classList.toggle('history-open');
        if (panel.classList.contains('history-open')) {
            loadHistory();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    const historyBtn = document.getElementById('historyBtn');
    if (historyBtn) {
        historyBtn.addEventListener('click', toggleHistory);
    }
    
    const closeHistoryBtn = document.getElementById('closeHistory');
    if (closeHistoryBtn) {
        closeHistoryBtn.addEventListener('click', toggleHistory);
    }
    
    const form = document.getElementById('compatibilityForm');
    const resetBtn = document.getElementById('resetBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();
        const zodiac1 = document.getElementById('zodiac1').value;
        const zodiac2 = document.getElementById('zodiac2').value;
        
        if (!name1 || !name2 || !zodiac1 || !zodiac2) return;
        
        const nameScore = calculateNameCompatibility(name1, name2);
        const zodiacScore = zodiacCompatibility[zodiac1][zodiac2];
        const num1 = calculateNumerology(name1);
        const num2 = calculateNumerology(name2);
        const numerologyScore = Math.max(0, Math.min(100, 100 - (Math.abs(num1 - num2) * 10)));
        
        let finalScore = Math.round((nameScore * 0.3 + zodiacScore * 0.5 + numerologyScore * 0.2));
        
        const easterEgg = checkEasterEgg(name1, name2);
        if (easterEgg) {
            finalScore = Math.min(100, finalScore + easterEgg.bonus);
            setTimeout(() => showToast(easterEgg.message, 'success'), 1500);
        }
        
        document.getElementById('message').textContent = getMessage(finalScore);
        document.getElementById('nameAnalysis').textContent = getNameAnalysis(name1, name2, nameScore);
        document.getElementById('zodiacAnalysis').textContent = getZodiacAnalysis(zodiac1, zodiac2, zodiacScore);
        document.getElementById('numerologyAnalysis').textContent = getNumerologyAnalysis(num1, num2);
        document.getElementById('advice').textContent = getAdvice(finalScore);
        
        document.getElementById('nameScore').textContent = Math.round(nameScore) + '%';
        document.getElementById('zodiacScore').textContent = Math.round(zodiacScore) + '%';
        document.getElementById('numerologyScore').textContent = Math.round(numerologyScore) + '%';
        
        animateProgressBar('nameBar', nameScore, 200);
        animateProgressBar('zodiacBar', zodiacScore, 400);
        animateProgressBar('numerologyBar', numerologyScore, 600);
        
        document.getElementById('testForm').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        
        saveToHistory({ name1, name2, zodiac1, zodiac2, nameScore, zodiacScore, numerologyScore, finalScore });
        
        animateScore(finalScore);
        animateProgress(finalScore);
        
        setTimeout(() => showToast('Test de compatibilité réussi !'), 500);
    });
    
    resetBtn.addEventListener('click', () => {
        document.getElementById('result').classList.add('hidden');
        document.getElementById('testForm').classList.remove('hidden');
        form.reset();
    });
    
    shareBtn.addEventListener('click', () => {
        const score = document.getElementById('score').textContent;
        const text = `Mon score de compatibilité sur BelloBito : ${score}% ! 💖`;
        
        if (navigator.share) {
            navigator.share({ title: 'BelloBito', text: text, url: window.location.href })
                .then(() => showToast('Partagé avec succès !'))
                .catch(() => {});
        } else {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Copié dans le presse-papier !');
                shareBtn.textContent = 'Copié !';
                setTimeout(() => { shareBtn.textContent = 'Partager'; }, 2000);
            });
        }
    });
    
    const stats = JSON.parse(localStorage.getItem('bellobito_stats') || '{}');
    if (stats.tests && document.getElementById('userStats')) {
        document.getElementById('userStats').innerHTML = `
            <div class="stat-item"><span class="stat-value">${stats.tests}</span> test${stats.tests > 1 ? 's' : ''}</div>
            <div class="stat-item"><span class="stat-value">${stats.avg}%</span> moyenne</div>
            <div class="stat-item"><span class="stat-value">${stats.best}%</span> record</div>
        `;
    }
});
