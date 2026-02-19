// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', initGame);

// settings menu

function toggleSettings() {
    const overlay = document.getElementById('settingsOverlay');
    
    overlay.classList.toggle('show');
}