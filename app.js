let state = {
    players: ["player1", "player2"],
    currentPlayer: 0,
    roll : {
        player1: 0,
        player2: 0
    },
    total : {
        player1: 0,
        player2: 0
    },
};

const start = () => {
    document.querySelector(".player1-score").innerHTML = state.roll.player1;
    document.querySelector(".player2-score").innerHTML = state.roll.player2;
    document.querySelector("#player1-total").innerHTML = state.total.player1;
    document.querySelector("#player2-total").innerHTML = state.total.player2;
};

const refreshRoll = (player) => {
    document.querySelector(`.${player}-score`).innerHTML = state.roll[player];
};

const refreshScore = (player) => {
    document.querySelector(`#${player}-total`).innerHTML = state.total[player];
};

const nextPlayer = (player) => {

    if (player === "player1") {
        state.currentPlayer = 1
    }

    if (player === "player2") {
        state.currentPlayer = 0
    }

    let gamer = state.players[state.currentPlayer];

    document.querySelector(`.${player}`).classList.remove("currentPlayer");
    document.querySelector(`.${gamer}`).classList.add("currentPlayer");
};


const rollTheDice = () => { 
    let randomNumber1 = Math.floor(Math.random() * 6) + 1; 
    let player = state.players[state.currentPlayer];
    
    setTimeout(() => { 
        document.querySelector(".img1").setAttribute("src", 
            "images/dice" + randomNumber1 + ".png"); 

        if (randomNumber1 !== 1) {

            state.roll[player] += randomNumber1;
            refreshRoll(player);
    
        } else {
            state.roll[player] = 0;
            refreshRoll(player);
            nextPlayer(player);
        }
    }, 1000); 

};

const newGame = () => {
    document.location.reload();
}

const holdScore = () => {

    let player = state.players[state.currentPlayer];
    state.total[player] += state.roll[player];
  
    if (state.total[player] < 100) {
        state.roll[player] = 0;
        refreshScore(player);
        refreshRoll(player);
        nextPlayer(player);
    } 
    
    if (state.total[player] >= 100) {
        window.alert(`${player} won the game !`);
        newGame();
    }
};

// Listeners
document.querySelector("#roll").addEventListener("click", rollTheDice);
document.querySelector("#hold").addEventListener("click", holdScore);
document.querySelector("#new").addEventListener("click", newGame);

// Starting
start();