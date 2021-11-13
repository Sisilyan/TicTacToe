let btn = document.querySelector('.btn')
let modal = document.querySelector('.modal');
let end = document.querySelector('.end');
let contan = document.querySelector('.contan')

btn.addEventListener('click' , openModal);
end.addEventListener('click' , closeModal)

function openModal(){
modal.style.display = 'flex'
btn.innerHTML = "Game Started";
end.style.display = 'flex'

}
function closeModal(){
modal.style.display = 'none';
btn.style.backgroundColor = 'white';
btn.style.color = 'black'
end.style.display = 'none'
location.reload()
}
    const SIZE = 3;
    const BOX_WIDTH = 100;
    const BORDER_SIZE = 2;
    const gameData = {}
    
    function initGame() {
        gameData.turn = 1; // X
        gameData.move = 0;
        gameData.board = []

        for (let n = 0; n < SIZE; n++) {
            gameData.board[n] = new Array(SIZE).fill(null);
        }
    }

    function getCurrentPlayerName() {
        return gameData.turn === 0 ? 'O' : 'X';
    }

    function getNextPlayer() {
        return gameData.turn === 0 ? 1 : 0;
    }

    function valideHorizotal(lineIndex) {
        for (let key of gameData.board[lineIndex]) {
            if (key !== gameData.turn) {
                console.log(key, gameData.turn)
                return false;
            }
        }
        return true;
    }

    function validateVertical(boxIndex) {
        for (let line of gameData.board) { // 0, 1, 2
            if (line[boxIndex] !== gameData.turn) {
                return false;
            }
        }
        return true;
    }

    function validateGame(lineIndex, boxIndex) {
        if (valideHorizotal(lineIndex) || validateVertical(boxIndex)) {
            alert('WIN:', getCurrentPlayerName())
        }

        console.log(gameData.move)
        if (gameData.move === SIZE ** 2) {
            alert('Draw!!');
            location.reload()
        }
    }

    function play() {
        gameData.move += 1;

        const p = document.createElement('p');
        p.innerHTML = getCurrentPlayerName();

        this.appendChild(p);

        const lineIndex = Math.floor(this.boardIndex / SIZE);
        const boxIndex = this.boardIndex % SIZE;

        gameData.board[lineIndex][boxIndex] = gameData.turn;

        setTimeout(() => {
            validateGame(lineIndex, boxIndex)
            gameData.turn = getNextPlayer()
        }, 0)
    }

    function createBox(index) {
        const BoxElement = document.createElement('div');
        BoxElement.setAttribute('class', 'box');
        BoxElement.style.width = BOX_WIDTH;
        BoxElement.style.height = BOX_WIDTH;

        BoxElement.boardIndex = index;

        BoxElement.addEventListener('click', play);
        return BoxElement;
    }

    function setupGame() {
        modal.style.width = (BOX_WIDTH) * SIZE;
        modal.style.height = (BOX_WIDTH) * SIZE;

        modal.style.marginTop = -(SIZE * BOX_WIDTH) / 2;
        modal.style.marginLeft = -(SIZE * BOX_WIDTH) / 2;

        for (let n = 0; n < SIZE ** 2; n++) {
            modal.appendChild(createBox(n));
        }
    }

    setupGame()
    initGame()

