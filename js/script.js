function initGame() {
    // Usar os dados carregados do arquivo chars-data.js
    console.log(charsData);
    renderCharacters(charsData.characters);
}

function renderCharacters(characters) {
    const rectangleContainer = document.querySelector('.rectangle');
    rectangleContainer.innerHTML = ''; // Limpar conteúdo anterior

    // Loop através de cada personagem
    characters.forEach(character => {
        // Criar elemento div com classe 'box'
        const boxElement = document.createElement('div');
        boxElement.className = 'box';
        
        // Se tiver portrait, adicionar como background-image
        if (character.portrait) {
            boxElement.style.backgroundImage = `url('${character.portrait}')`;
        }
        
        // Adicionar atributos com dados do personagem
        boxElement.setAttribute('data-name', character.name || 'Unknown');
        
        // Adicionar evento de clique (opcional)
        boxElement.addEventListener('click', () => {
            console.log('Personagem selecionado:', character.name);
        });
        
        // Adicionar ao container
        rectangleContainer.appendChild(boxElement);
    });
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', initGame);

// settings menu

function toggleSettings() {
    const overlay = document.getElementById('settingsOverlay');
    
    overlay.classList.toggle('show');
}