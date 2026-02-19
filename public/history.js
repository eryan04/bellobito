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
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon();
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('bellobito_theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

// Mapping des signes
const zodiacNames = {
    belier: '♈ Bélier',
    taureau: '♉ Taureau',
    gemeaux: '♊ Gémeaux',
    cancer: '♋ Cancer',
    lion: '♌ Lion',
    vierge: '♍ Vierge',
    balance: '♎ Balance',
    scorpion: '♏ Scorpion',
    sagittaire: '♐ Sagittaire',
    capricorne: '♑ Capricorne',
    verseau: '♒ Verseau',
    poissons: '♓ Poissons'
};

// Charger tous les tests
async function loadAllTests() {
    try {
        const response = await fetch('/api/tests?limit=100');
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const tests = await response.json();
        displayResults(tests);
    } catch (err) {
        console.error('Erreur:', err);
        showError('Impossible de charger les tests');
    }
}

// Rechercher des tests
async function searchTests(name, zodiac) {
    try {
        let url = '/api/tests/search?';
        const params = [];
        
        if (name) params.push(`name=${encodeURIComponent(name)}`);
        if (zodiac) params.push(`zodiac=${encodeURIComponent(zodiac)}`);
        
        if (params.length === 0) {
            loadAllTests();
            return;
        }
        
        url += params.join('&');
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur lors de la recherche');
        const tests = await response.json();
        displayResults(tests, name || zodiac);
    } catch (err) {
        console.error('Erreur:', err);
        showError('Impossible d\'effectuer la recherche');
    }
}

// Afficher les résultats
function displayResults(tests, searchTerm = null) {
    const grid = document.getElementById('resultsGrid');
    const count = document.getElementById('resultsCount');
    
    if (tests.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-title">Aucun résultat</div>
                <div class="empty-state-text">
                    ${searchTerm ? 'Essayez une autre recherche' : 'Aucun test disponible pour le moment'}
                </div>
            </div>
        `;
        count.textContent = '0 résultat';
        return;
    }
    
    count.textContent = `${tests.length} résultat${tests.length > 1 ? 's' : ''}`;
    
    grid.innerHTML = tests.map(test => {
        const extras = test.extras || {};
        const date = new Date(test.created_at);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        return `
            <div class="result-card">
                <div class="result-names">${test.name1} & ${test.name2}</div>
                <div class="result-score">${test.score}%</div>
                
                ${extras.zodiac1 && extras.zodiac2 ? `
                    <div class="result-details">
                        <div class="result-detail">
                            <div class="result-detail-label">${test.name1}</div>
                            <div class="result-detail-value">${zodiacNames[extras.zodiac1] || extras.zodiac1}</div>
                        </div>
                        <div class="result-detail">
                            <div class="result-detail-label">${test.name2}</div>
                            <div class="result-detail-value">${zodiacNames[extras.zodiac2] || extras.zodiac2}</div>
                        </div>
                        ${extras.nameScore ? `
                            <div class="result-detail">
                                <div class="result-detail-label">Score prénom</div>
                                <div class="result-detail-value">${Math.round(extras.nameScore)}%</div>
                            </div>
                        ` : ''}
                        ${extras.zodiacScore ? `
                            <div class="result-detail">
                                <div class="result-detail-label">Score astro</div>
                                <div class="result-detail-value">${Math.round(extras.zodiacScore)}%</div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                
                <div class="result-date">📅 ${formattedDate}</div>
                
                <div class="result-actions">
                    <button class="result-btn result-btn-view" onclick="viewResult(${test.id})">
                        👁️ Voir
                    </button>
                    <button class="result-btn result-btn-share" onclick="shareResult(${test.id}, '${test.name1}', '${test.name2}', ${test.score})">
                        📤 Partager
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Voir le résultat complet
function viewResult(testId) {
    window.location.href = `/result/${testId}`;
}

// Partager un résultat
function shareResult(testId, name1, name2, score) {
    const url = `${window.location.origin}/result/${testId}`;
    const text = `${name1} & ${name2} : ${score}% de compatibilité sur BelloBito ! 💖\n\nVoir le résultat complet :`;
    
    if (navigator.share) {
        navigator.share({
            title: `Résultat BelloBito - ${name1} & ${name2}`,
            text: text,
            url: url
        }).then(() => {
            console.log('Partage réussi');
        }).catch((error) => {
            if (error.name !== 'AbortError') {
                copyToClipboard(url);
            }
        });
    } else {
        copyToClipboard(url);
    }
}

// Copier dans le presse-papier
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Lien copié dans le presse-papier ! 📋');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('Lien copié dans le presse-papier ! 📋');
        } else {
            showToast('Copié ! 📋');
        }
    } catch (err) {
        console.error('Erreur de copie:', err);
        showToast('Lien copié ! 📋');
    }
    
    document.body.removeChild(textArea);
}

// Afficher un toast
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

// Afficher une erreur
function showError(message) {
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <div class="empty-state-title">Erreur</div>
            <div class="empty-state-text">${message}</div>
        </div>
    `;
}

// Événements
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('searchName').value.trim();
        const zodiac = document.getElementById('searchZodiac').value;
        searchTests(name, zodiac);
    });
    
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', () => {
        document.getElementById('searchName').value = '';
        document.getElementById('searchZodiac').value = '';
        loadAllTests();
    });
    
    // Charger tous les tests au démarrage
    loadAllTests();
});
