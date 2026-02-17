// Gestion du formulaire
document.getElementById('compatibilityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    if (name1 && name2) {
        calculateCompatibility(name1, name2);
    }
});

// Fonction de calcul de compatibilité
function calculateCompatibility(name1, name2) {
    // Algorithme simple basé sur les noms
    const combined = (name1 + name2).toLowerCase();
    let score = 0;
    
    // Calcul basé sur les lettres communes
    for (let char of combined) {
        score += char.charCodeAt(0);
    }
    
    // Normaliser le score entre 50 et 100 pour rester positif
    score = (score % 51) + 50;
    
    // Afficher le résultat avec animation
    showResult(score, name1, name2);
}

// Affichage du résultat
function showResult(score, name1, name2) {
    const formContainer = document.querySelector('.form-container');
    const resultDiv = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');
    
    // Cacher le formulaire
    formContainer.style.display = 'none';
    
    // Afficher le résultat
    resultDiv.classList.remove('hidden');
    
    // Animer le score
    animateScore(0, score, scoreElement);
    
    // Message personnalisé selon le score
    const message = getCompatibilityMessage(score, name1, name2);
    messageElement.textContent = message;
}

// Animation du score
function animateScore(start, end, element) {
    const duration = 2000;
    const startTime = Date.now();
    
    function update() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Messages personnalisés
function getCompatibilityMessage(score, name1, name2) {
    if (score >= 90) {
        return `🔥 Incroyable ! ${name1} et ${name2} sont faits l'un pour l'autre ! C'est le coup de foudre assuré !`;
    } else if (score >= 75) {
        return `💖 Excellente compatibilité ! ${name1} et ${name2} forment un couple prometteur !`;
    } else if (score >= 60) {
        return `💕 Bonne compatibilité ! ${name1} et ${name2} ont de belles chances ensemble !`;
    } else {
        return `💫 Compatibilité moyenne. ${name1} et ${name2} devront faire des efforts, mais tout est possible en amour !`;
    }
}

// Réinitialiser le formulaire
function resetForm() {
    const formContainer = document.querySelector('.form-container');
    const resultDiv = document.getElementById('result');
    
    // Réinitialiser les champs
    document.getElementById('compatibilityForm').reset();
    
    // Afficher le formulaire et cacher le résultat
    formContainer.style.display = 'block';
    resultDiv.classList.add('hidden');
}
