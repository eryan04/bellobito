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
        text: "Vous stalkez l'ex de votre crush sur les réseaux ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 2,
        text: "Vous avez déjà ghost quelqu'un après une date ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 3,
        text: "Vous regardez le bigo de votre partenaire en cachette ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 4,
        text: "Vous avez déjà menti sur votre body count ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 5,
        text: "Vous êtes du genre à revenir vers votre ex quand vous vous ennuyez ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 6,
        text: "Vous avez déjà trompé votre partenaire (même un smack) ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 7,
        text: "Vous utilisez Tinder/Hinge/Grindr en étant en couple ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 8,
        text: "Vous êtes chaud(e) pour un plan à 3 ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 9,
        text: "Vous avez déjà couché le premier soir ?",
        type: "boolean",
        goodAnswer: "maybe"
    },
    {
        id: 10,
        text: "Une babies vous suffit ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 11,
        text: "Vous avez des feelings pour quelqu'un d'autre en ce moment ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 12,
        text: "Vous acceptez de partager votre localisation H24 avec votre partenaire ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 13,
        text: "Vous êtes jaloux/jalouse de manière toxique ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 14,
        text: "Vous avez déjà envoyé des nudes à une autre personne que votre partenaire officiel ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 15,
        text: "Vous matez d'autres personnes quand vous êtes en couple ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 16,
        text: "Vous avez déjà fait semblant d'avoir un orgasme ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 17,
        text: "Le sexe est plus important pour vous que les sentiments ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 18,
        text: "Vous avez déjà couché avec l'ex de votre shab ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 19,
        text: "Vous seriez chaud(e) pour un mariage ouvert ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 20,
        text: "Vous mentez sur vos revenus pour impressionner les babies?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 21,
        text: "Vous êtes toujours pas remis(e) votre ex ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 22,
        text: "Vous avez déjà simulé une IST (ou maladie) pour annuler un date ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 23,
        text: "Vous jugez les gens sur leur body count ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 24,
        text: "Vous êtes du genre sugar daddy/sugar mommy ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 25,
        text: "Vous êtes chaud(e) d'avoir des minots ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 26,
        text: "Vous êtes tactile en public ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 27,
        text: "Vous préférez être célibataire que mal accompagné(e) ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 28,
        text: "Vous avez déjà refusé quelqu'un à cause de son physique ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 29,
        text: "L'origine de votre partenaire vous est indifférente ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 30,
        text: "Vous scrollez sur les profils de vos ex régulièrement ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 31,
        text: "Vous pardonnez facilement si on vous trompe ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 32,
        text: "Vous êtes prêt(e) à quitter votre ville pour votre moitié ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 33,
        text: "Vous parlez de votre vie de couple à tout le monde ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 34,
        text: "Vous êtes du genre possessif/possessive ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 35,
        text: "Vous avez déjà consulté pour vos red flags en amour ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 36,
        text: "Vous savez où vous voulez être dans 5 ans (sah 2 sah) ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 37,
        text: "Vous êtes du genre à faire passer votre crush avant vos potes ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 38,
        text: "Vous acceptez que votre partenaire ait des potes du sexe opposé ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 39,
        text: "Vous remerciez pour les petites attentions ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 40,
        text: "Sexfriends c'est votre zone de confort ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 41,
        text: "Vous acceptez qu'on vous dise vos 4 vérités ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 42,
        text: "Vous avez des sujets tabous avec votre partenaire ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 43,
        text: "Vos pouvez mentir à votre clochard/niatta ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 44,
        text: "Vous lâchez votre partenaire dès que ça devient compliqué ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 45,
        text: "Ça vous dérange que votre partenaire ait un passé plus chargé que vous ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 46,
        text: "Combien de partenaires sexuels avez-vous eu jusqu'à présent ? (Body Count)",
        type: "bodycount"
    },
    {
        id: 47,
        text: "Vous donnez une 2ème chance après une infidélité ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 48,
        text: "Vous êtes du genre bipolaire émotionnellement ?",
        type: "boolean",
        goodAnswer: "no"
    },
    {
        id: 49,
        text: "Vous avez vraiment du temps pour une relation sérieuse ?",
        type: "boolean",
        goodAnswer: "yes"
    },
    {
        id: 50,
        text: "Vous êtes prêt(e) à vous poser en couple sérieusement ?",
        type: "boolean",
        goodAnswer: "yes"
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
            const goodAnswer = question.goodAnswer;
            
            if (answer === goodAnswer) {
                // Bonne réponse = +0 (pas de pénalité)
                score += 0;
            } else if (answer === 'maybe') {
                // Je ne sais pas = -5
                score -= 5;
            } else if (answer && answer !== goodAnswer) {
                // Mauvaise réponse = -10
                score -= 10;
            } else {
                // Non répondu = -5
                score -= 5;
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
