// Initialisation du thème
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

// Récupérer l'ID depuis l'URL
function getTestId() {
    const path = window.location.pathname;
    const match = path.match(/\/result\/(\d+)/);
    return match ? parseInt(match[1]) : null;
}

// Charger les données du test
async function loadTestResult() {
    const testId = getTestId();
    
    if (!testId) {
        showError('ID de test invalide');
        return;
    }

    try {
        const response = await fetch(`/api/tests/${testId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                showError('Ce test n\'existe pas ou a été supprimé.');
            } else {
                showError('Erreur lors du chargement du test.');
            }
            return;
        }

        const test = await response.json();
        displayResult(test);
    } catch (err) {
        console.error('Error loading test:', err);
        showError('Impossible de charger le test. Vérifiez votre connexion.');
    }
}

// Afficher une erreur
function showError(message) {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    const errorDiv = document.getElementById('error');
    errorDiv.classList.remove('hidden');
    document.getElementById('errorMessage').textContent = message;
}

// Afficher le résultat
function displayResult(test) {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');

    // Nom et date
    document.getElementById('resultNames').textContent = `${test.name1} & ${test.name2}`;
    const date = new Date(test.created_at);
    document.getElementById('resultDate').textContent = `Test réalisé le ${date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })}`;

    // Score principal
    const score = test.score;
    document.getElementById('score').textContent = score;
    
    // Animer le cercle
    animateProgress(score);
    animateScore(0, score);

    // Message
    document.getElementById('message').textContent = getMessage(score, test.name1, test.name2);

    // Détails si disponibles
    const extras = test.extras || {};
    if (extras.nameScore || extras.zodiacScore || extras.numerologyScore) {
        document.getElementById('detailsSection').classList.remove('hidden');
        
        if (extras.nameScore) {
            document.getElementById('nameScore').textContent = Math.round(extras.nameScore) + '%';
            animateProgressBar('nameBar', extras.nameScore, 200);
            document.getElementById('nameAnalysis').textContent = getNameAnalysis(test.name1, test.name2, extras.nameScore);
        }
        
        if (extras.zodiacScore && extras.zodiac1 && extras.zodiac2) {
            document.getElementById('zodiacScore').textContent = Math.round(extras.zodiacScore) + '%';
            animateProgressBar('zodiacBar', extras.zodiacScore, 400);
            document.getElementById('zodiacAnalysis').textContent = getZodiacAnalysis(extras.zodiac1, extras.zodiac2, extras.zodiacScore);
        }
        
        if (extras.numerologyScore) {
            document.getElementById('numerologyScore').textContent = Math.round(extras.numerologyScore) + '%';
            animateProgressBar('numerologyBar', extras.numerologyScore, 600);
            document.getElementById('numerologyAnalysis').textContent = 'Vos vibrations numériques s\'harmonisent bien.';
        }
        
        document.getElementById('advice').textContent = getAdvice(score);
    }

    // Mettre à jour les meta tags pour le partage
    updateMetaTags(test);
}

// Mettre à jour les meta tags pour partage social
function updateMetaTags(test) {
    const title = `${test.name1} & ${test.name2} : ${test.score}% de compatibilité !`;
    const description = getMessage(test.score, test.name1, test.name2);
    
    document.title = `${test.name1} & ${test.name2} - ${test.score}% - BelloBito`;
    document.getElementById('og-title').setAttribute('content', title);
    document.getElementById('og-description').setAttribute('content', description);
    document.getElementById('twitter-title').setAttribute('content', title);
    document.getElementById('twitter-description').setAttribute('content', description);
}

// Animations
function animateProgress(score) {
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (score / 100) * circumference;
    
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);
}

function animateScore(start, end) {
    const element = document.getElementById('score');
    const duration = 2000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else if (end >= 90) {
            createConfetti();
        }
    }
    
    update();
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

// Messages
function getMessage(score, name1, name2) {
    if (score >= 90) return `🔥 Incroyable ! ${name1} et ${name2} sont faits l'un pour l'autre !`;
    if (score >= 75) return `❤️ Excellente compatibilité ! ${name1} et ${name2} forment un duo en or !`;
    if (score >= 60) return `💖 Belle compatibilité ! ${name1} et ${name2} ont un beau potentiel ensemble !`;
    if (score >= 45) return `💗 Compatibilité intéressante ! L'amour peut grandir avec le temps !`;
    if (score >= 30) return `💝 Un peu de travail, mais tout est possible avec de l'amour !`;
    return `💙 Les opposés s'attirent parfois... qui sait ce que l'avenir réserve ?`;
}

function getAdvice(score) {
    if (score >= 90) return "Continuez à cultiver cette connexion magique et laissez votre amour grandir naturellement.";
    if (score >= 75) return "Communiquez ouvertement et partagez vos rêves pour renforcer vos liens.";
    if (score >= 60) return "Prenez le temps de vous découvrir et de construire une base solide ensemble.";
    if (score >= 45) return "Restez patients et ouverts d'esprit. Les meilleures histoires demandent du temps.";
    if (score >= 30) return "Acceptez vos différences et voyez-les comme une richesse.";
    return "Les astres ne décident pas tout. Si vous vous aimez vraiment, vous pouvez tout surmonter.";
}

function getNameAnalysis(name1, name2, score) {
    return `Les prénoms ${name1} et ${name2} ont une compatibilité de ${Math.round(score)}%. Une belle harmonie nominale !`;
}

const zodiacNames = {
    belier: 'Bélier', taureau: 'Taureau', gemeaux: 'Gémeaux', cancer: 'Cancer',
    lion: 'Lion', vierge: 'Vierge', balance: 'Balance', scorpion: 'Scorpion',
    sagittaire: 'Sagittaire', capricorne: 'Capricorne', verseau: 'Verseau', poissons: 'Poissons'
};

function getZodiacAnalysis(zodiac1, zodiac2, score) {
    const sign1 = zodiacNames[zodiac1] || zodiac1;
    const sign2 = zodiacNames[zodiac2] || zodiac2;
    
    if (score >= 90) return `${sign1} et ${sign2} forment une union cosmique exceptionnelle !`;
    if (score >= 75) return `Belle compatibilité entre ${sign1} et ${sign2}. Vos signes se complètent bien.`;
    if (score >= 60) return `${sign1} et ${sign2} ont une compatibilité prometteuse.`;
    if (score >= 45) return `${sign1} et ${sign2} peuvent s'entendre avec des efforts mutuels.`;
    return `${sign1} et ${sign2} ont des énergies très différentes, mais tout est possible !`;
}

// Confetti pour les très bons scores
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = ['#f093fb', '#f5576c', '#ff6b9d', '#ffd93d'][Math.floor(Math.random() * 4)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Partage
function shareResult() {
    const url = window.location.href;
    const testId = getTestId();
    const scoreEl = document.getElementById('score');
    const namesEl = document.getElementById('resultNames');
    
    const text = `${namesEl.textContent} : ${scoreEl.textContent}% de compatibilité sur BelloBito ! 💖\n\nVoir le résultat complet :`;
    
    if (navigator.share) {
        navigator.share({
            title: `Résultat BelloBito - ${namesEl.textContent}`,
            text: text,
            url: url
        }).catch(() => {
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Lien copié dans le presse-papier ! 📋');
    }).catch(() => {
        showToast('Impossible de copier le lien', 'error');
    });
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

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResult);
    }
    
    loadTestResult();
});
