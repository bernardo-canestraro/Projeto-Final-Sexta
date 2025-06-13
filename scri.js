document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const messageDisplay = document.getElementById('message');
    const acertosDisplay = document.getElementById('acertos');
    const errosDisplay = document.getElementById('erros');
    const restartBtn = document.getElementById('restartBtn');

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
            card.textContent = symbol;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard(event) {
        if (lockBoard) return;
        const clickedCard = event.target;

        if (flippedCards.length < 2 && !clickedCard.classList.contains('matched') && !clickedCard.classList.contains('flipped')) {
            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);

            if (flippedCards.length === 2) {
                lockBoard = true;
                setTimeout(checkForMatch, 100);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.symbol === card2.dataset.symbol) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards += 2;
            acertos++;
            acertosDisplay.textContent = acertos;
            messageDisplay.textContent = "Par encontrado!";
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            erros++;
            errosDisplay.textContent = erros;
            messageDisplay.textContent = "Tente novamente.";
            setTimeout(() => {
                messageDisplay.textContent = "";
            }, 2000); 
        }

        flippedCards = [];
        lockBoard = false;
        if (matchedCards === cardsArray.length) {
            messageDisplay.textContent = "Parabéns! Você encontrou todos os pares!";
        }
    }

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

    restartBtn.addEventListener('click', restartGame);

    createBoard();
});