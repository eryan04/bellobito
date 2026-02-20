// Curseur personnalisé cœur pour tout le site
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
        const interactives = document.querySelectorAll('a, button, .feature-card, input, select, .nav-link, .test-card, .history-item, .btn');
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

// Initialiser au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursorEffect);
} else {
    initCursorEffect();
}
