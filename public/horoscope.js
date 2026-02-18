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

const horoscopes = {
    belier: [
        { text: "Aujourd'hui, votre charisme naturel attire tous les regards. Une rencontre inattendue pourrait bouleverser votre cœur. Restez ouvert aux surprises.", rating: 5 },
        { text: "Votre passion déborde et cela ne passe pas inaperçu. C'est le moment idéal pour déclarer vos sentiments à la personne qui vous fait vibrer.", rating: 4 },
        { text: "Prenez le temps de ralentir aujourd'hui. L'amour se construit dans la douceur et la patience, pas dans la précipitation.", rating: 3 },
        { text: "Attention, votre impulsivité pourrait causer des tensions dans votre couple. Respirez avant de réagir, vous éviterez bien des conflits.", rating: 2 },
        { text: "Journée difficile pour votre vie amoureuse. Une vieille dispute pourrait resurgir. Gardez votre calme et évitez les mots blessants.", rating: 1 },
        { text: "Restez à l'écoute de vos émotions. Une tension pourrait émerger, mais le dialogue reste votre meilleur allié.", rating: 3 },
        { text: "L'amour brille de mille feux pour vous aujourd'hui. Si vous êtes célibataire, quelqu'un de spécial croise votre chemin.", rating: 5 },
        { text: "Les astres ne sont pas de votre côté. Des malentendus pourraient ternir votre relation. La communication sera difficile aujourd'hui.", rating: 1 },
        { text: "Votre égoïsme risque de blesser votre partenaire. Pensez davantage aux besoins de l'autre plutôt qu'aux vôtres.", rating: 2 }
    ],
    taureau: [
        { text: "Votre sensualité est à son apogée. Créez une ambiance romantique pour passer un moment inoubliable avec votre moitié.", rating: 5 },
        { text: "La stabilité que vous apportez rassure votre partenaire. Continuez à cultiver cette confiance mutuelle.", rating: 4 },
        { text: "Attention à ne pas être trop possessif aujourd'hui. Laissez de l'espace à l'autre pour respirer.", rating: 3 },
        { text: "Votre entêtement pourrait créer un mur entre vous et votre partenaire. Apprenez à faire des compromis avant qu'il ne soit trop tard.", rating: 2 },
        { text: "Journée compliquée. Votre jalousie excessive éloigne l'être aimé. Faites confiance ou vous risquez de tout perdre.", rating: 1 },
        { text: "Prenez le temps de savourer les petits plaisirs de la vie à deux. Un dîner romantique serait parfait.", rating: 4 },
        { text: "Les astres vous encouragent à exprimer vos besoins affectifs clairement. Votre partenaire sera réceptif.", rating: 4 },
        { text: "Mauvaise période pour l'amour. Votre routine et votre manque d'initiative rendent la relation monotone. Un effort s'impose.", rating: 1 },
        { text: "Votre rigidité émotionnelle frustre votre partenaire. Osez sortir de votre zone de confort et montrez plus d'affection.", rating: 2 }
    ],
    gemeaux: [
        { text: "Votre esprit vif et votre humour séduisent naturellement. Une conversation passionnante pourrait mener à quelque chose de plus.", rating: 4 },
        { text: "Aujourd'hui, variez les plaisirs ! Proposez une activité originale à votre partenaire pour raviver la flamme.", rating: 5 },
        { text: "Attention à ne pas disperser votre énergie. Concentrez-vous sur une personne qui compte vraiment pour vous.", rating: 3 },
        { text: "Votre inconstance affective déstabilise votre partenaire. Décidez-vous enfin : vous êtes dans cette relation ou non ?", rating: 2 },
        { text: "Mauvaise journée. Votre papillonnage et vos hésitations blessent profondément l'être aimé. Un choix s'impose rapidement.", rating: 1 },
        { text: "Un message ou un appel inattendu pourrait égayer votre journée amoureuse. Restez disponible.", rating: 4 },
        { text: "Votre charme communicatif fait des merveilles. Célibataire ? Quelqu'un remarque votre présence.", rating: 5 },
        { text: "Votre superficialité déçoit. Votre partenaire attend plus de profondeur émotionnelle. Arrêtez de fuir l'engagement.", rating: 1 },
        { text: "Trop de bavardage, pas assez d'action. Votre partenaire se lasse de vos belles paroles sans suite. Prouvez vos sentiments.", rating: 2 }
    ],
    cancer: [
        { text: "Votre sensibilité touche profondément votre partenaire aujourd'hui. N'ayez pas peur de montrer vos émotions.", rating: 5 },
        { text: "Créez un cocon douillet pour vous et votre moitié. L'intimité sera au rendez-vous ce soir.", rating: 5 },
        { text: "Attention aux sautes d'humeur. Communiquez vos ressentis plutôt que de vous renfermer.", rating: 3 },
        { text: "Journée émotionnellement difficile. Vous vous accrochez au passé au lieu d'avancer. Votre partenaire se sent négligé.", rating: 2 },
        { text: "Mauvaise période. Votre susceptibilité excessive provoque des disputes inutiles. Tout devient un drame avec vous.", rating: 1 },
        { text: "Votre besoin de protection et de sécurité affective est important aujourd'hui. Exprimez-le clairement.", rating: 3 },
        { text: "Les astres favorisent les moments en famille ou en petit comité. L'amour se nourrit de ces instants simples.", rating: 4 },
        { text: "Votre comportement étouffant suffoque votre partenaire. Donnez de l'espace ou vous allez tout perdre.", rating: 1 },
        { text: "Trop de larmes, pas assez d'action. Votre victimisation épuise votre entourage affectif. Reprenez-vous.", rating: 2 }
    ],
    lion: [
        { text: "Vous rayonnez et tous les regards se tournent vers vous ! Votre magnétisme attire naturellement l'amour.", rating: 5 },
        { text: "Aujourd'hui, soyez généreux en compliments et en gestes tendres. Votre partenaire en sera touché.", rating: 4 },
        { text: "Attention à ne pas monopoliser toute l'attention. L'amour est un échange, pas un one-man-show.", rating: 3 },
        { text: "Votre égo surdimensionné énerve tout le monde. Descendez de votre piédestal avant que votre partenaire ne parte.", rating: 2 },
        { text: "Journée catastrophique. Votre besoin constant d'admiration épuise votre partenaire. L'amour n'est pas un spectacle.", rating: 1 },
        { text: "Votre fierté pourrait créer une petite tension. Sachez faire preuve d'humilité et tout ira bien.", rating: 3 },
        { text: "Les astres illuminent votre vie amoureuse. Profitez de cette énergie positive pour créer des souvenirs.", rating: 5 },
        { text: "Votre arrogance repousse l'être aimé. Arrêtez de tout ramener à vous, l'autre existe aussi.", rating: 1 },
        { text: "Trop de drame et de mise en scène. Soyez authentique pour une fois, votre partenaire mérite mieux qu'un rôle.", rating: 2 }
    ],
    vierge: [
        { text: "Votre attention aux détails touche profondément votre partenaire. Ces petits gestes font toute la différence.", rating: 4 },
        { text: "Relâchez un peu le contrôle aujourd'hui. Laissez-vous porter par la spontanéité de l'amour.", rating: 3 },
        { text: "Votre dévouement et votre serviabilité sont remarquables. On apprécie votre présence rassurante.", rating: 4 },
        { text: "Votre esprit critique détruit tout. Arrêtez de chercher la perfection, votre partenaire n'est pas un projet à corriger.", rating: 2 },
        { text: "Période sombre. Votre manie de tout analyser tue la magie de l'amour. Rien n'est jamais assez bien pour vous.", rating: 1 },
        { text: "Votre sens de l'organisation pourrait sauver la journée. Planifiez une sortie romantique parfaite.", rating: 4 },
        { text: "Les astres encouragent la communication claire. Exprimez vos attentes avec bienveillance.", rating: 4 },
        { text: "Votre froideur émotionnelle glace votre relation. Osez montrer vos sentiments sans les intellectualiser.", rating: 1 },
        { text: "Trop de jugement, pas assez d'acceptation. Votre partenaire se sent constamment évalué. C'est épuisant.", rating: 2 }
    ],
    balance: [
        { text: "Votre charme naturel opère à merveille. Aujourd'hui, l'harmonie règne dans votre vie amoureuse.", rating: 5 },
        { text: "Prenez une décision importante pour votre couple. Les astres soutiennent vos choix amoureux.", rating: 4 },
        { text: "Attention à l'indécision. Votre partenaire a besoin de sentir que vous êtes pleinement engagé.", rating: 3 },
        { text: "Votre indécision chronique frustre profondément votre partenaire. Il est temps de choisir et d'assumer.", rating: 2 },
        { text: "Mauvaise journée. Vous fuyez le conflit au point de tout éviter. Cette lâcheté émotionnelle détruit votre couple.", rating: 1 },
        { text: "Un compromis sera nécessaire, mais vous excellez dans cet art. Trouvez le juste milieu.", rating: 4 },
        { text: "Votre diplomatie résout un petit conflit avec élégance. Votre partenaire admire cette qualité.", rating: 4 },
        { text: "Trop de superficialité. Votre obsession de l'apparence cache un vide émotionnel qui inquiète votre partenaire.", rating: 1 },
        { text: "Vous cherchez tellement à plaire à tout le monde que vous perdez votre authenticité. Soyez vous-même.", rating: 2 }
    ],
    scorpion: [
        { text: "Votre intensité émotionnelle est magnétique aujourd'hui. Laissez votre passion s'exprimer pleinement.", rating: 5 },
        { text: "La profondeur de vos sentiments impressionne. N'ayez pas peur d'aller au fond des choses avec votre partenaire.", rating: 5 },
        { text: "Attention à la jalousie. Faites confiance et laissez votre partenaire respirer.", rating: 3 },
        { text: "Votre jalousie maladive empoisonne tout. Votre partenaire étouffe sous votre surveillance constante.", rating: 2 },
        { text: "Journée catastrophique. Votre obsession du contrôle et vos manipulations émotionnelles ont atteint leurs limites.", rating: 1 },
        { text: "Votre mystère intrigue et attire. Célibataire ? Quelqu'un veut percer vos secrets.", rating: 4 },
        { text: "Les non-dits pèsent lourd aujourd'hui. Exprimez ce qui vous habite vraiment, libérez-vous.", rating: 3 },
        { text: "Votre venin verbal détruit. Chaque dispute devient une guerre totale. Votre partenaire est épuisé de se battre.", rating: 1 },
        { text: "Trop d'intensité, pas assez de légèreté. Tout devient un drame existentiel avec vous. Relâchez la pression.", rating: 2 }
    ],
    sagittaire: [
        { text: "Votre optimisme contagieux illumine votre relation. Partagez vos rêves d'aventure avec votre moitié.", rating: 5 },
        { text: "Une escapade imprévue pourrait raviver la flamme. Surprenez votre partenaire avec une proposition audacieuse.", rating: 5 },
        { text: "Attention à ne pas fuir l'engagement. Parfois, poser ses valises est aussi une aventure.", rating: 3 },
        { text: "Votre incapacité à vous engager blesse. Votre partenaire attend des réponses, pas des promesses vagues.", rating: 2 },
        { text: "Période difficile. Votre besoin constant de liberté devient de l'égoïsme. Vous voulez l'amour sans ses responsabilités.", rating: 1 },
        { text: "Les astres favorisent les nouvelles rencontres pour les célibataires. Restez ouvert aux opportunités.", rating: 5 },
        { text: "Votre franchise est rafraîchissante, mais dosez vos paroles pour ne pas blesser involontairement.", rating: 3 },
        { text: "Votre brutalité verbale blesse inutilement. La vérité sans empathie est juste de la cruauté.", rating: 1 },
        { text: "Vous fuyez dès que ça devient sérieux. Grandissez et affrontez vos peurs d'intimité.", rating: 2 }
    ],
    capricorne: [
        { text: "Votre sérieux et votre fiabilité sont des atouts majeurs. Votre partenaire se sent en sécurité avec vous.", rating: 4 },
        { text: "Permettez-vous un peu de folie aujourd'hui ! L'amour n'est pas qu'une question de responsabilité.", rating: 3 },
        { text: "Vos efforts constants dans la relation sont reconnus et appréciés. Continuez ainsi.", rating: 4 },
        { text: "Votre froideur émotionnelle glace. Votre partenaire a besoin d'affection, pas d'un partenaire d'affaires.", rating: 2 },
        { text: "Mauvaise journée. Vous traitez l'amour comme un dossier professionnel. Aucune passion, aucune spontanéité. C'est sinistre.", rating: 1 },
        { text: "Attention à ne pas être trop rigide. Laissez place à la spontanéité et à la légèreté.", rating: 3 },
        { text: "Les astres favorisent l'engagement sérieux. Si vous êtes prêt, franchissez une nouvelle étape.", rating: 5 },
        { text: "Votre obsession du travail vous fait négliger votre couple. Votre carrière ne vous réchauffera pas la nuit.", rating: 1 },
        { text: "Trop de contrôle, pas assez de cœur. Vous programmez tout, même la romance. C'est étouffant.", rating: 2 }
    ],
    verseau: [
        { text: "Votre originalité séduit et intrigue. N'ayez pas peur d'être vous-même, c'est votre plus grand atout.", rating: 5 },
        { text: "Une approche non conventionnelle de l'amour pourrait surprendre agréablement votre partenaire.", rating: 4 },
        { text: "Attention à ne pas être trop détaché émotionnellement. L'amour demande aussi de la chaleur.", rating: 3 },
        { text: "Votre froideur émotionnelle frustre. On dirait que vous observez la relation de l'extérieur, jamais impliqué.", rating: 2 },
        { text: "Période difficile. Vous intellectualisez tout au point d'éviter toute vraie connexion. Descendez de votre nuage.", rating: 1 },
        { text: "L'amitié est la base de votre relation amoureuse. Cultivez cette complicité précieuse.", rating: 4 },
        { text: "Les astres favorisent les rencontres atypiques. Élargissez vos horizons sociaux.", rating: 5 },
        { text: "Votre besoin d'indépendance devient de l'isolement. Vous voulez quelqu'un sans jamais vraiment vous donner.", rating: 1 },
        { text: "Trop excentrique, pas assez présent. Votre partenaire veut un amour réel, pas un concept philosophique.", rating: 2 }
    ],
    poissons: [
        { text: "Votre romantisme est à son apogée. Créez une atmosphère de rêve pour vous et votre bien-aimé.", rating: 5 },
        { text: "Votre empathie vous permet de comprendre profondément les besoins de votre partenaire.", rating: 5 },
        { text: "Attention à ne pas vous perdre dans l'autre. Préservez votre identité tout en aimant.", rating: 3 },
        { text: "Vous vous noyez dans l'autre au point de disparaître. Votre dépendance émotionnelle devient malsaine.", rating: 2 },
        { text: "Journée sombre. Vous vivez dans l'illusion plutôt que dans la réalité. Votre partenaire ne peut pas être votre sauveur.", rating: 1 },
        { text: "L'art et la créativité renforcent votre connexion. Partagez une activité artistique ensemble.", rating: 4 },
        { text: "Soyez réaliste dans vos attentes. L'amour idéal n'existe pas, mais l'amour vrai est magnifique.", rating: 3 },
        { text: "Votre victimisation constante épuise. Arrêtez de fuir dans vos rêves et affrontez les problèmes réels.", rating: 1 },
        { text: "Trop de sensibilité, pas assez de résilience. Chaque petite chose devient un drame. Grandissez émotionnellement.", rating: 2 }
    ]
};

function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function getTodayHoroscope(sign) {
    const dayOfYear = getDayOfYear();
    const signHash = hashString(sign);
    const seed = dayOfYear + signHash;
    const index = seed % horoscopes[sign].length;
    return horoscopes[sign][index];
}

function renderHearts(rating) {
    let hearts = '';
    for (let i = 0; i < 5; i++) {
        hearts += i < rating ? '❤️' : '🤍';
    }
    return hearts;
}

function loadHoroscopes() {
    const signs = ['belier', 'taureau', 'gemeaux', 'cancer', 'lion', 'vierge', 'balance', 'scorpion', 'sagittaire', 'capricorne', 'verseau', 'poissons'];
    
    signs.forEach(sign => {
        const horoscope = getTodayHoroscope(sign);
        
        const textElement = document.querySelector(`.horoscope-text[data-sign="${sign}"]`);
        if (textElement) {
            textElement.textContent = horoscope.text;
        }
        
        const heartsElement = document.querySelector(`.hearts[data-sign="${sign}"]`);
        if (heartsElement) {
            heartsElement.innerHTML = renderHearts(horoscope.rating);
        }
    });
}

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString('fr-FR', options);
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    updateDate();
    loadHoroscopes();
    
    document.querySelectorAll('.horoscope-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('card-pulse');
            setTimeout(() => card.classList.remove('card-pulse'), 600);
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease-out';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.horoscope-card').forEach(card => {
        observer.observe(card);
    });
});
