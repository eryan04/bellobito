document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initForm();
});

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    const savedTheme = localStorage.getItem('bellobito_theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        const isDark = document.documentElement.classList.contains('dark-mode');
        if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('bellobito_theme', isDark ? 'dark' : 'light');
    });
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function initForm() {
    const form = document.getElementById('compatibilityForm');
    const resetBtn = document.getElementById('resetBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    form.addEventListener('submit', handleSubmit);
    resetBtn.addEventListener('click', resetTest);
    shareBtn.addEventListener('click', shareResult);
}

function handleSubmit(e) {
    e.preventDefault();
    
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    if (name1 && name2) {
        calculateCompatibility(name1, name2);
    }
}

function calculateCompatibility(name1, name2) {
    const combined = (name1 + name2).toLowerCase();
    let score = 0;
    
    for (let char of combined) {
        score += char.charCodeAt(0);
    }
    
    score = (score % 51) + 50;
    
    showResult(score, name1, name2);
}

function showResult(score, name1, name2) {
    const formDiv = document.getElementById('testForm');
    const resultDiv = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');
    const analysisElement = document.getElementById('analysis');
    const adviceElement = document.getElementById('advice');
    
    formDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    
    animateScore(0, score, scoreElement);
    animateProgress(score);
    
    messageElement.textContent = getMessage(score, name1, name2);
    analysisElement.textContent = getAnalysis(score);
    adviceElement.textContent = getAdvice(score);
    
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function animateScore(start, end, element) {
    const duration = 2000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

function animateProgress(score) {
    const circle = document.getElementById('progressCircle');
    if (!circle) return;
    
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (score / 100) * circumference;
    
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);
}

function getMessage(score, name1, name2) {
    if (score >= 90) {
        return `🔥 Incroyable ! ${name1} et ${name2} sont faits l'un pour l'autre ! Une connexion exceptionnelle !`;
    } else if (score >= 80) {
        return `💖 Excellent ! ${name1} et ${name2} forment un duo en or. Les étoiles sont alignées !`;
    } else if (score >= 70) {
        return `💕 Très bien ! ${name1} et ${name2} ont une belle compatibilité. De belles perspectives !`;
    } else if (score >= 60) {
        return `💝 Bien ! ${name1} et ${name2} ont du potentiel ensemble. Continuez à vous découvrir !`;
    } else {
        return `✨ ${name1} et ${name2} ont encore beaucoup à découvrir l'un de l'autre. L'amour se construit !`;
    }
}

function getAnalysis(score) {
    if (score >= 90) {
        return "Votre compatibilité est exceptionnelle. Vous partagez une connexion rare et précieuse. Vos personnalités se complètent parfaitement.";
    } else if (score >= 80) {
        return "Excellente compatibilité ! Vous avez de nombreux points communs et une belle harmonie naturelle. Votre relation a un fort potentiel.";
    } else if (score >= 70) {
        return "Bonne compatibilité avec une base solide. Vous vous comprenez bien et partagez des valeurs similaires.";
    } else if (score >= 60) {
        return "Compatibilité prometteuse. Vous avez des différences qui peuvent enrichir votre relation si vous y travaillez ensemble.";
    } else {
        return "Vos différences sont importantes, mais rappelez-vous que les opposés s'attirent souvent. La communication sera essentielle.";
    }
}

function getAdvice(score) {
    if (score >= 90) {
        return "Continuez à cultiver cette belle connexion avec des petites attentions quotidiennes. N'oubliez jamais de communiquer ouvertement.";
    } else if (score >= 80) {
        return "Prenez le temps de créer des souvenirs ensemble. Essayez de nouvelles activités pour renforcer votre complicité.";
    } else if (score >= 70) {
        return "L'écoute active est votre meilleur atout. Soyez attentifs l'un à l'autre et célébrez vos petites victoires communes.";
    } else if (score >= 60) {
        return "Acceptez vos différences comme des opportunités d'apprentissage. La patience et l'ouverture d'esprit seront vos alliés.";
    } else {
        return "Prenez le temps de vraiment vous connaître. Soyez authentiques et communiquez vos attentes clairement.";
    }
}

function resetTest() {
    const formDiv = document.getElementById('testForm');
    const resultDiv = document.getElementById('result');
    
    resultDiv.classList.add('hidden');
    formDiv.classList.remove('hidden');
    
    document.getElementById('compatibilityForm').reset();
    
    const circle = document.getElementById('progressCircle');
    if (circle) {
        circle.style.strokeDashoffset = 565.48;
    }
    
    formDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function shareResult() {
    const score = document.getElementById('score').textContent;
    const message = document.getElementById('message').textContent;
    const text = `${message}\n\nScore : ${score}%\n\nCalculez votre compatibilité sur BelloBito !`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mon résultat BelloBito',
            text: text
        }).catch(() => {
            copyToClipboard(text);
        });
    } else {
        copyToClipboard(text);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Résultat copié dans le presse-papier !');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ Résultat copié dans le presse-papier !');
    });
}
