const socket = io();
let board;
let sparePiece = 49;
let players = [];
let gameCode;
let startGame = false;
let cards = [];
let playerTurn = "";
let playerId = "";

socket.on('startGame', () => {
    startGame = true;
    GiveArrowsEventListeners();
    showBoard();
})
socket.on('showLobby', package => {
    package = JSON.parse(package);
    gameCode = package.roomName;
    players = package.playerList;
    gameCodeDisplay.innerText = gameCode;
    showLobby();
});

socket.on('unknownCode', () => {
    alert("That code doesn't exist!");
    startGame = false;
})

socket.on('gameFull', () => {
    alert("There are already 4 players in this game :(");
})

socket.on('gameStarted', () => {
    alert("This game is already in progress :(");
})

socket.on('endGame', (package) => {
    package = JSON.parse(package);
    let winner = package.player;
    gameScreen.style.display = "none";
    endGameScreen.style.display = "block";
    winnerDisplay.innerText = `${winner.playerName} wins!`
})

socket.on('newPositions', package => {
    if (startGame){
        package = JSON.parse(package);
        players = package.boardPack.playerList;
        board = package.boardPack.board;
        sparePiece = package.boardPack.sparePiece;
        playerTurn = package.boardPack.playerTurn;
        UpdateBoard();
    }
});

socket.on('playerCards', package => {
    package = JSON.parse(package);
    cards = package.cardPack;
    playerId = package.id;
    //console.log(cards[0].id);
});

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const spareTile = document.querySelector('.spare-tile');
const targetCard = document.querySelector(".targetCard");
const nextCardBtn = document.getElementById('nextCardBtn');
const startGameBtn = document.getElementById('startGameBtn');
const lobbyScreen = document.getElementById('lobby');
const lobbyPlayers = document.getElementById('lobbyPlayers');
const endTurnBtn = document.getElementById('endTurnBtn');
const endGameScreen = document.getElementById('endGameScreen');
const winnerDisplay = document.getElementById('winnerDisplay');
const scoreBoard = document.getElementById('scoreBoard');
const nameInput = document.getElementById('nameInput');

endTurnBtn.addEventListener('click', () => {
    socket.emit('endTurn', gameCode);
});

newGameBtn.addEventListener('click', () => {
    let name = nameInput.value;
    if (!name){
        alert('Please enter a name');
        return;
    }
    socket.emit('newGame', name);
});

joinGameBtn.addEventListener('click', joinGame);

spareTile.addEventListener('click', () => {
    socket.emit('rotate');
});

startGameBtn.addEventListener('click', () => {
    socket.emit('startGameBtn', gameCode);
});

function joinGame() {
    let name = nameInput.value;
    if (!name){
        alert('Please enter a name');
        return;
    }
    const code = gameCodeInput.value;
    socket.emit('joinGame', JSON.stringify({code, name}));
}

function showBoard() {
    lobbyScreen.style.display = "none";
    endGameScreen.style.display = "none";
    gameScreen.style.display = "block";
}

function showLobby() {
    initialScreen.style.display = "none";
    lobbyScreen.style.display = "block";
    lobbyPlayers.innerHTML = "";
    for (let i in players) {
        let player = players[i];
        let id = `player-${player.playerNumber}`;
        lobbyPlayers.innerHTML += `<p>${player.playerName}:</p><div class="player" id=${id}></div>`;
    }
}

let down = false;
document.addEventListener('keydown', e => {
    if (down) return;
    if (!startGame) return;
    down = true;
    if (e.key == "w")
        socket.emit('keyPress', {inputId:'up', state:true});
    else if (e.key == "a")
        socket.emit('keyPress', {inputId:'left', state:true});
    else if (e.key == "s")
        socket.emit('keyPress', {inputId:'down', state:true});
    else if (e.key == "d")
        socket.emit('keyPress', {inputId:'right', state:true});
})

document.addEventListener('keyup', e => {
    down = false;
    if (!startGame) return;
    if (e.key == "w")
        socket.emit('keyRelease', {inputId:'up', state:false});
    else if (e.key == "a")
        socket.emit('keyRelease', {inputId:'left', state:false});
    else if (e.key == "s")
        socket.emit('keyRelease', {inputId:'down', state:false});
    else if (e.key == "d")
        socket.emit('keyRelease', {inputId:'right', state:false});
})

const arrows = document.querySelectorAll(".arrow");

function GiveArrowsEventListeners() {
    for (let i = 0; i < arrows.length; i++ ) {
        arrows[i].addEventListener("click", function() {
            switch (arrows[i].classList[2]) {
                case "col1-top":
                    socket.emit('colShiftDown', 1);
                    break;
                case "col2-top":
                    socket.emit('colShiftDown', 3);
                    break;
                case "col3-top":
                    socket.emit('colShiftDown', 5);
                    break;
                case "col1-bottom":
                    socket.emit('colShiftUp', 1);
                    break;
                case "col2-bottom":
                    socket.emit('colShiftUp', 3);
                    break;
                case "col3-bottom":
                    socket.emit('colShiftUp', 5);
                    break;
                case "row1-right":  
                    socket.emit('rowShiftLeft', 1);
                    break;          
                case "row1-left":  
                    socket.emit('rowShiftRight', 1);
                    break;          
                case "row2-right":            
                    socket.emit('rowShiftLeft', 3);       
                    break;          
                case "row2-left":    
                    socket.emit('rowShiftRight', 3);             
                    break;          
                case "row3-right":   
                    socket.emit('rowShiftLeft', 5);         
                    break;          
                case "row3-left":    
                    socket.emit('rowShiftRight', 5);
                    break;          
                }
        })
        switch (arrows[i].classList[1]) {
            case "arrow-down":
                arrows[i].addEventListener("mouseover", function() {
                    this.style.borderTop = "30px solid rgb(100, 100, 100)";
                })
                arrows[i].addEventListener("mouseout", function() {
                    this.style.borderTop = "30px solid rgb(255, 245, 104)";
                })
                break;
            case "arrow-up":
                arrows[i].addEventListener("mouseover", function() {
                    this.style.borderBottom = "30px solid rgb(100, 100, 100)";
                })
                arrows[i].addEventListener("mouseout", function() {
                    this.style.borderBottom = "30px solid rgb(255, 245, 104)";
                })
                break;
            case "arrow-right":
                arrows[i].addEventListener("mouseover", function() {
                    this.style.borderLeft = "30px solid rgb(100, 100, 100)";
                })
                arrows[i].addEventListener("mouseout", function() {
                    this.style.borderLeft = "30px solid rgb(255, 245, 104)";
                })
                break;
            case "arrow-left":
                arrows[i].addEventListener("mouseover", function() {
                    this.style.borderRight = "30px solid rgb(100, 100, 100)";
                })
                arrows[i].addEventListener("mouseout", function() {
                    this.style.borderRight = "30px solid rgb(255, 245, 104)";
                })
                break;
        }
    }
}

function UpdateBoard() {
    let table = document.querySelectorAll("td.inner");
    let spareTile = document.querySelector(".spare-tile");
    const flatBoard = [].concat(...board);
    for (let i = 0; i < flatBoard.length; i++){
        table[i].innerHTML = ""; // clears the board
        if(flatBoard[i] != null){
            const rotation = flatBoard[i].rotation * 90;
            table[i].setAttribute("id", `f${flatBoard[i].id}`); //= "<div class='notfixed-tiles'" + `id=${flatBoard[i]}>${flatBoard[i]+1}</div>`;
            table[i].style.transform = `rotate(${rotation}deg)`;
        }
    }
    // update spare tile orientation
    const rotation = sparePiece.rotation * 90;
    spareTile.setAttribute("id", `f${sparePiece.id}`);
    spareTile.style.transform = `rotate(${rotation}deg)`;

    UpdatePlayers(table);
    UpdateScoreBoard();
    
    // update End Turn button
    if (playerId != playerTurn) {
        endTurnBtn.disabled = true;
    } else {
        endTurnBtn.disabled = false;
    }

}

function UpdatePlayers(gameBoard) {
    for (let i in players){
        let player = players[i];
        const x = player.x;
        const y = player.y;
        const pos = 7*y + x;
        let id = `player-${player.playerNumber}`;
        gameBoard[pos].innerHTML += `<div class="player" id=${id}></div>`;
    }
}

function UpdateScoreBoard() {
    scoreBoard.innerHTML = ""; // clear board
    for (let i in players) {
        let label = "";
        let player = players[i];
        if (!player.cards[0]) return; 
        if (player.id == playerTurn)
            label = "->";
        let targetCardId = player.cards[0].id;
        scoreBoard.innerHTML += `<tr>
                                    <th scope="row">${label}</th>
                                    <td>${player.playerName}</td>
                                    <td>${player.score}</td>
                                    <td><div class="notfixed-tiles targetCard" id=f${targetCardId}></div></td>
                                </tr>`
    }
}