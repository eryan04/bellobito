// Thème
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

document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

initTheme();

// Questions pour le questionnaire "Mariable ?"
const allQuestions = [
    {
        id: 1,
        text: "Vous êtes prêt(e) à faire des compromis dans une relation ?",
        type: "boolean"
    },
    {
        id: 2,
        text: "Cherchez-vous une relation à long terme ?",
        type: "boolean"
    },
    {
        id: 3,
        text: "Êtes-vous conscient(e) de vos défauts et prêt(e) à les améliorer ?",
        type: "boolean"
    },
    {
        id: 4,
        text: "Pouvez-vous gérer le stress et les conflits de manière mature ?",
        type: "boolean"
    },
    {
        id: 5,
        text: "Avez-vous des objectifs de vie clairs ?",
        type: "boolean"
    },
    {
        id: 6,
        text: "Êtes-vous financièrement stable ?",
        type: "boolean"
    },
    {
        id: 7,
        text: "Êtes-vous prêt(e) à écouter votre partenaire sans jugement ?",
        type: "boolean"
    },
    {
        id: 8,
        text: "Savez-vous communiquer vos émotions ouvertement ?",
        type: "boolean"
    },
    {
        id: 9,
        text: "Êtes-vous prêt(e) pour le mariage et/ou une vie commune ?",
        type: "boolean"
    },
    {
        id: 10,
        text: "Êtes-vous libre de toute relation actuellement ?",
        type: "boolean"
    },
    {
        id: 11,
        text: "Avez-vous des valeurs familiales importantes ?",
        type: "boolean"
    },
    {
        id: 12,
        text: "Êtes-vous patient(e) dans une relation ?",
        type: "boolean"
    },
    {
        id: 13,
        text: "Pouvez-vous donner de l'espace à votre partenaire ?",
        type: "boolean"
    },
    {
        id: 14,
        text: "Êtes-vous honnête dans vos relations ?",
        type: "boolean"
    },
    {
        id: 15,
        text: "Avez-vous un bon sens de l'humour ?",
        type: "boolean"
    },
    {
        id: 16,
        text: "Êtes-vous capable d'être vulnérable émotionnellement ?",
        type: "boolean"
    },
    {
        id: 17,
        text: "Valuez-vous l'intimité physique et émotionnelle ?",
        type: "boolean"
    },
    {
        id: 18,
        text: "Pouvez-vous soutenir les rêves de votre partenaire ?",
        type: "boolean"
    },
    {
        id: 19,
        text: "Êtes-vous prêt(e) pour des responsabilités conjugales ?",
        type: "boolean"
    },
    {
        id: 20,
        text: "Recherchez-vous une personne avec des valeurs similaires ?",
        type: "boolean"
    },
    {
        id: 21,
        text: "Avez-vous surmonté les traumatismes de vos relations passées ?",
        type: "boolean"
    },
    {
        id: 22,
        text: "Êtes-vous prêt(e) à inverser vos priorités pour votre partenaire ?",
        type: "boolean"
    },
    {
        id: 23,
        text: "Pouvez-vous accepter les différences culturelles ou religieuses ?",
        type: "boolean"
    },
    {
        id: 24,
        text: "Avez-vous une carrière ou des projets qui vous accomplissent ?",
        type: "boolean"
    },
    {
        id: 25,
        text: "Êtes-vous prêt(e) potentiellement pour des enfants ?",
        type: "boolean"
    },
    {
        id: 26,
        text: "Aimez-vous montrer de l'affection à votre partenaire ?",
        type: "boolean"
    },
    {
        id: 27,
        text: "Pouvez-vous être heureux/heureuse sans être en couple ?",
        type: "boolean"
    },
    {
        id: 28,
        text: "Acceptez-vous les défauts physiques de votre partenaire ?",
        type: "boolean"
    },
    {
        id: 29,
        text: "Êtes-vous prêt(e) à grandir et évoluer avec votre partenaire ?",
        type: "boolean"
    },
    {
        id: 30,
        text: "Avez-vous une bonne estime de vous-même ?",
        type: "boolean"
    },
    {
        id: 31,
        text: "Pouvez-vous pardonner les erreurs de votre partenaire ?",
        type: "boolean"
    },
    {
        id: 32,
        text: "Êtes-vous prêt(e) à faire des sacrifices pour le bien du couple ?",
        type: "boolean"
    },
    {
        id: 33,
        text: "Avez-vous des relations amicales saines et stables ?",
        type: "boolean"
    },
    {
        id: 34,
        text: "Pouvez-vous respirer l'indépendance et la confiance ?",
        type: "boolean"
    },
    {
        id: 35,
        text: "Êtes-vous prêt(e) à consulter un thérapeute de couple si nécessaire ?",
        type: "boolean"
    },
    {
        id: 36,
        text: "Avez-vous une vision claire du futur que vous souhaitez ?",
        type: "boolean"
    },
    {
        id: 37,
        text: "Pouvez-vous donner de l'importance au bien-être de votre partenaire ?",
        type: "boolean"
    },
    {
        id: 38,
        text: "Êtes-vous prêt(e) à renoncer à certaines libertés pour la fidélité ?",
        type: "boolean"
    },
    {
        id: 39,
        text: "Avez-vous de la gratitude pour les petites choses dans une relation ?",
        type: "boolean"
    },
    {
        id: 40,
        text: "Pouvez-vous être un(e) ami(e) avant d'être un(e) amant(e) ?",
        type: "boolean"
    },
    {
        id: 41,
        text: "Êtes-vous prêt(e) à entendre les critiques constructives ?",
        type: "boolean"
    },
    {
        id: 42,
        text: "Pouvez-vous maintenir une connexion intellectuelle avec votre partenaire ?",
        type: "boolean"
    },
    {
        id: 43,
        text: "Avez-vous un modèle positif de relation (parents, amis) ?",
        type: "boolean"
    },
    {
        id: 44,
        text: "Êtes-vous prêt(e) à être loyal(e) fond même en cas de difficultés ?",
        type: "boolean"
    },
    {
        id: 45,
        text: "Pouvez-vous accepter que votre partenaire ait un passé amoureux ?",
        type: "boolean"
    },
    {
        id: 46,
        text: "Combien de partenaires sexuels avez-vous eu jusqu'à présent ? (Body Count)",
        type: "bodycount"
    },
    {
        id: 47,
        text: "Êtes-vous prêt(e) à donner une seconde chance à votre relation ?",
        type: "boolean"
    },
    {
        id: 48,
        text: "Pouvez-vous exprimer vos besoins sans agressivité ?",
        type: "boolean"
    },
    {
        id: 49,
        text: "Avez-vous une bonne gestion du temps pour votre relation ?",
        type: "boolean"
    },
    {
        id: 50,
        text: "Êtes-vous prêt(e) à construire une vie ensemble avec passion et engagement ?",
        type: "boolean"
    }
];

// État global
let state = {
    questionCount: 0,
    currentIndex: 0,
    questions: [],
    answers: [],
    totalScore: 0,
    bodycount: 0
};

// Initialiser le questionnaire
function initializeQuestionnaire(count) {
    // Mélanger les questions et en sélectionner le nombre demandé
    const filtered = allQuestions.filter(q => q.type !== 'bodycount');
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    
    // Inclure obligatoirement la question bodycount
    const bodyCountQuestion = allQuestions.find(q => q.type === 'bodycount');
    const selectedQuestions = shuffled.slice(0, count - 1);
    
    // Insérer la question bodycount à une position aléatoire
    const insertPosition = Math.floor(Math.random() * count);
    selectedQuestions.splice(insertPosition, 0, bodyCountQuestion);
    
    state.questionCount = count;
    state.questions = selectedQuestions;
    state.currentIndex = 0;
    state.answers = new Array(count).fill(null);
    state.bodycount = 0;
}

// Afficher une question
function displayQuestion() {
    const question = state.questions[state.currentIndex];
    const container = document.getElementById('questionsContainer');
    
    container.innerHTML = '';
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    
    let html = `<h3 class="question-text">${question.text}</h3>`;
    
    if (question.type === 'boolean') {
        html += `
            <div class="answer-options">
                <button class="answer-btn" data-answer="yes" data-value="yes">
                    <span class="answer-icon">✅</span>
                    <span class="answer-label">Oui</span>
                </button>
                <button class="answer-btn" data-answer="maybe" data-value="maybe">
                    <span class="answer-icon">❓</span>
                    <span class="answer-label">Je ne sais pas</span>
                </button>
                <button class="answer-btn" data-answer="no" data-value="no">
                    <span class="answer-icon">❌</span>
                    <span class="answer-label">Non</span>
                </button>
            </div>
        `;
    } else if (question.type === 'bodycount') {
        html += `
            <div class="bodycount-container">
                <p class="bodycount-instruction">Entrez un nombre (0 ou plus)</p>
                <input type="number" id="bodycountInput" class="form-input bodycount-input" min="0" value="0">
                <div class="bodycount-info">Plus ce nombre est élevé, plus votre score de mariabilité baissera</div>
            </div>
        `;
    }
    
    questionDiv.innerHTML = html;
    container.appendChild(questionDiv);
    
    // Ajouter les event listeners
    if (question.type === 'boolean') {
        const buttons = container.querySelectorAll('.answer-btn');
        buttons.forEach(btn => {
            const answer = state.answers[state.currentIndex];
            if (answer === btn.dataset.answer) {
                btn.classList.add('selected');
            }
            btn.addEventListener('click', (e) => {
                buttons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                handleAnswer(btn.dataset.answer);
            });
        });
    }
    
    // Mettre à jour la barre de progression
    updateProgress();
    updateNavButtons();
}

// Gérer une réponse
function handleAnswer(answer) {
    state.answers[state.currentIndex] = answer;
}

// Mettre à jour les boutons de navigation
function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (state.currentIndex === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    if (state.currentIndex === state.questionCount - 1) {
        nextBtn.textContent = 'Voir le résultat 🎉';
    } else {
        nextBtn.textContent = 'Suivant →';
    }
}

// Mettre à jour la barre de progression
function updateProgress() {
    const progress = ((state.currentIndex + 1) / state.questionCount) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = state.currentIndex + 1;
    document.getElementById('totalQuestions').textContent = state.questionCount;
}

// Calculer le score
function calculateScore() {
    let score = 100;
    
    // Calculer les points basés sur les réponses
    state.answers.forEach((answer, index) => {
        const question = state.questions[index];
        
        if (question.type === 'boolean') {
            if (answer === 'yes') {
                score += 0; // Oui = +0 (déjà à 100)
            } else if (answer === 'maybe') {
                score -= 5; // Je ne sais pas = -5
            } else if (answer === 'no') {
                score -= 10; // Non = -10
            } else {
                score -= 5; // Non répondu = -5
            }
        }
    });
    
    // Appliquer la pénalité du bodycount
    // 1 bodycount = 10% de pénalité
    const bodycountPenalty = Math.min(state.bodycount * 10, 100);
    score -= bodycountPenalty;
    
    // S'assurer que le score est entre 0 et 100
    score = Math.max(0, Math.min(100, Math.round(score)));
    
    return score;
}

// Afficher les résultats
function showResults() {
    // Chercher la valeur du bodycount dans les réponses
    let bodycountValue = 0;
    state.questions.forEach((question, index) => {
        if (question.type === 'bodycount') {
            bodycountValue = parseInt(state.answers[index]) || 0;
        }
    });
    state.bodycount = bodycountValue;
    
    // Calculer le score
    const finalScore = calculateScore();
    
    // Déterminer le message
    let message = '';
    let emoji = '💔';
    
    if (finalScore >= 90) {
        message = 'Vous êtes extrêmement mariable ! Vous êtes prêt(e) pour une belle histoire d\'amour ! 💍';
        emoji = '💎';
    } else if (finalScore >= 75) {
        message = 'Vous êtes très mariable ! Vous avez vraiment de bonnes chances ! 💕';
        emoji = '💕';
    } else if (finalScore >= 60) {
        message = 'Vous êtes plutôt mariable. Avec le bon partenaire, tout peut fonctionner ! 🌹';
        emoji = '🌹';
    } else if (finalScore >= 45) {
        message = 'Vous êtes partiellement mariable. Il reste du travail, mais c\'est possible ! 💌';
        emoji = '💌';
    } else if (finalScore >= 30) {
        message = 'Vous avez besoin de temps pour vous préparer. L\'amour du vrai viendra ! 🕐';
        emoji = '🕐';
    } else {
        message = 'Vous n\'êtes pas encore prêt(e). Prenez du temps pour vous avant de chercher quelqu\'un. 💫';
        emoji = '💫';
    }
    
    // Afficher les résultats
    document.getElementById('questionnairPhase').style.display = 'none';
    document.getElementById('selectionPhase').style.display = 'none';
    document.getElementById('resultsPhase').style.display = 'block';
    
    document.getElementById('scorePercentage').textContent = finalScore;
    document.getElementById('scoreMessage').textContent = message;
    
    // Ajouter des détails
    const detailsDiv = document.getElementById('scoreDetails');
    detailsDiv.innerHTML = `
        <div class="score-breakdown">
            <p><strong>Nombre de questions :</strong> ${state.questionCount}</p>
            <p><strong>Score de base :</strong> 100</p>
            <p><strong>Pénalité body count :</strong> -${Math.min(state.bodycount * 10, 100)}%</p>
            <p><strong>Score final :</strong> ${emoji} ${finalScore}%</p>
        </div>
    `;
}

// Event listeners
document.querySelectorAll('.selection-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const questionCount = parseInt(e.currentTarget.dataset.questions);
        initializeQuestionnaire(questionCount);
        
        document.getElementById('selectionPhase').style.display = 'none';
        document.getElementById('questionnairPhase').style.display = 'block';
        
        displayQuestion();
    });
});

document.getElementById('nextBtn').addEventListener('click', () => {
    // Valider que une réponse est sélectionnée
    const question = state.questions[state.currentIndex];
    
    if (question.type === 'boolean') {
        if (state.answers[state.currentIndex] === null) {
            alert('Veuillez sélectionner une réponse');
            return;
        }
    } else if (question.type === 'bodycount') {
        const bodycountInput = document.getElementById('bodycountInput');
        if (!bodycountInput || bodycountInput.value === '') {
            alert('Veuillez entrer un nombre');
            return;
        }
        state.answers[state.currentIndex] = bodycountInput.value;
    }
    
    if (state.currentIndex === state.questionCount - 1) {
        showResults();
    } else {
        state.currentIndex++;
        displayQuestion();
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (state.currentIndex > 0) {
        state.currentIndex--;
        displayQuestion();
    }
});

document.getElementById('restartBtn').addEventListener('click', () => {
    state = {
        questionCount: 0,
        currentIndex: 0,
        questions: [],
        answers: [],
        totalScore: 0,
        bodycount: 0
    };
    
    document.getElementById('resultsPhase').style.display = 'none';
    document.getElementById('selectionPhase').style.display = 'block';
});

document.getElementById('shareResultBtn').addEventListener('click', () => {
    const scorePercentage = document.getElementById('scorePercentage').textContent;
    const text = `Je suis ${scorePercentage}% mariable selon le questionnaire "Mariable ?" de BelloBito ! 💍 Teste-toi aussi ! https://bellobito.com/mariable`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mon score Mariable ?',
            text: text
        }).catch(err => console.log('Erreur lors du partage:', err));
    } else {
        // Fallback pour les navigateurs sans Web Share API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Texte copié à votre presse-papiers !');
    }
});
