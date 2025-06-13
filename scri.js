document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const messageDisplay = document.getElementById('message');
    const acertosDisplay = document.getElementById('acertos');
    const errosDisplay = document.getElementById('erros');
    const restartBtn = document.getElementById('restartBtn');
    //Botõess, Gameboard, Mensagem, Acertos e Erros
    const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    let flippedCards = [];
    let matchedCards = 0;
    let acertos = 0;
    let erros = 0;
    let lockBoard = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        shuffle(cardsArray);
        cardsArray.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            // Busca as imagens na pasta img de acordo com o símbolo
            const img = document.createElement('img');
            img.src = `./img/${symbol}.png`;
            img.alt = symbol;

            card.appendChild(img);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard(event) {
        if (lockBoard) return;

        const clickedCard = event.currentTarget;

        if (flippedCards.length < 2 && !clickedCard.classList.contains('matched') && !clickedCard.classList.contains('flipped')) {
            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);

            if (flippedCards.length === 2) {
                lockBoard = true;
                setTimeout(checkForMatch, 800);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.index === card2.dataset.index) {
            // Corrige o problema de clicar na Mesma carta duas vezes e ele dar Par encontrado
            card1.classList.remove('flipped');
            messageDisplay.textContent = "Carta já virada!";
        } else if (card1.dataset.symbol === card2.dataset.symbol) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards += 2;
            acertos++;
            acertosDisplay.textContent = acertos;
            messageDisplay.textContent = "Par encontrado!";
            //Timeout para a mensagem "par encontrado" desaparecer
            setTimeout(() => {
                messageDisplay.textContent = "";
            }, 1000);
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            erros++;
            errosDisplay.textContent = erros;
            messageDisplay.textContent = "Tente novamente.";
            //Timeout para a mensagem "tente Novamente" desaparecer 
            setTimeout(() => {
                messageDisplay.textContent = "";
            }, 1000);
        }

        flippedCards = [];
        lockBoard = false;

        if (matchedCards === cardsArray.length) {
            messageDisplay.textContent = "Parabéns! Você encontrou todos os pares!";
        }
    }
    // Função para reiniciar o jogo
    function restartGame() {
        matchedCards = 0;
        acertos = 0;
        erros = 0;
        acertosDisplay.textContent = acertos;
        errosDisplay.textContent = erros;
        messageDisplay.textContent = '';
        flippedCards = [];
        lockBoard = false;
        createBoard();
    }
    // Adiciona o evento de clique ao botão de reiniciar
    restartBtn.addEventListener('click', restartGame);

    createBoard();
});
