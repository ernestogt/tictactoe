const gameBoard = document.querySelector('#gameBoard');
const info = document.querySelector('#info');
//gameBoard.innerHTML = "<p>Hola</p>"
const button = document.querySelector(".play")
const tiles = ["", "", "", "", "", "", "", "", ""]

let go
let count = 0;
let aux = [true, false]
let turn = aux[Math.floor(Math.random() * aux.length)];

function createBoard() {
    go = turn ? "circle" : "cross";
    info.textContent = go + " goes first";
    count = 0;
    tiles.forEach((_element, index) => {
        const cell = document.createElement("div");
        cell.classList.add('square');
        cell.id = index;
        let count = 0
        cell.addEventListener("click", addGo, { once: true });
        gameBoard.append(cell);
    });
}

const addGo = (e) => {
    const display = document.createElement("div");
    display.classList.add(go);
    e.target.append(display);
    go = go === "circle" ? "cross" : "circle";
    info.textContent = "it is now " + go + "'s turn";
    //e.target.removeEventListener("click", addGo)
    count++;
    checkScore()
    if (count > 8) {
        button.style.display = 'block';
        info.textContent = "The game ended as a tie!";
    }
}


const checkScore = () => {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    winningCombos.forEach(arr => {
        const circleWins = arr.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
        if (circleWins) {
            info.textContent = "Circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            button.style.display = 'block'
            button.addEventListener('click', playAgain)

            return;
        }
    });
    winningCombos.forEach(arr => {
        const crossWins = arr.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));
        console.log(crossWins)
        if (crossWins) {
            info.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            button.style.display = 'block';
            button.addEventListener('click', playAgain)

            return
        }
    });
}

const playAgain = () => {
    turn = !turn

    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild)
    }
    button.style.display = 'none';
    createBoard()

}
createBoard()


