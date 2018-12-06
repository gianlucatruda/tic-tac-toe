function clearBoard() {
    var cells = document.getElementsByClassName("cell");
    for (let i=0; i<cells.length; i++) {
        cells[i].innerHTML = ".";
    }
    console.log("Board cleared");
}

function newGame() {
    clearBoard();
    document.getElementsByClassName("min-header")[0].innerHTML = "Minimal";
    GAMEOVER = false;
}

function endGame(winner, triple) {
    triple.forEach(element => {
        document.getElementsByClassName("cell")[element-1].innerHTML = "<b>"+winner+"</b>";
    });
    GAMEOVER = true;
    document.getElementsByClassName("min-header")[0].innerHTML = winner+"'s win!";
}

function opponentPlay(cells, id, game, piece) {
    var hasMoved = false;
    while (!hasMoved){
        var pos = Math.floor(Math.random()*8);
        if (cells[pos].innerHTML == "."){
            cells[pos].innerHTML = "x";
            hasMoved = true;
        }
    }
}

function postData(url, data) {
    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
    })
    .then(response => response.json());
}

function placePiece(cells, id, game, piece) {
    if (cells[id].innerHTML == "." && !GAMEOVER){
        fetch('http://127.0.0.1:8001/game/' + game)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(JSON.stringify(myJson));
                board = myJson['games'][0][1];
                board[id] = piece;
                myData = { state: board };
                postData('http://127.0.0.1:8001/game/' + game, myData).then(
                    data => console.log(JSON.stringify(data))
                ).catch(error => console.error(error));
                cells[id].innerHTML = piece;
                if (!checkForWin(cells)) {
                    opponentPlay(cells, id, game, piece);
                    checkForWin(cells);
                }

            });
    }

}

function checkForWin(cells) {
    winStates = ['123', '456', '789',
                 '147', '258', '369',
                 '159', '357']

    for (let i = 0; i < winStates.length; i++) {
        var triple = winStates[i].split("");
        // console.log("Check", i, triple);
        var values = []
        for (let j = 0; j < triple.length; j++) {
            values.push(cells[parseInt(triple[j])-1].innerHTML)
        }
        // console.log(values);
        if (!values.includes('.') && values.every((val, i, arr) => val === arr[0])){
            endGame(values[0], triple);
            return true
        }
    }

    return false

}


var newGameButton = document.getElementsByClassName("newgame")[0];
newGameButton.addEventListener("click", newGame);

var cells = document.getElementsByClassName("cell");
var GAMEOVER = false;
var GAME = 0;
var PIECE = 'o';

// EventListeners don't play nicely with loops :(
cells[0].addEventListener("click", function(){placePiece(cells, 0, GAME, PIECE)});
cells[1].addEventListener("click", function(){placePiece(cells, 1, GAME, PIECE)});
cells[2].addEventListener("click", function(){placePiece(cells, 2, GAME, PIECE)});
cells[3].addEventListener("click", function(){placePiece(cells, 3, GAME, PIECE)});
cells[4].addEventListener("click", function(){placePiece(cells, 4, GAME, PIECE)});
cells[5].addEventListener("click", function(){placePiece(cells, 5, GAME, PIECE)});
cells[6].addEventListener("click", function(){placePiece(cells, 6, GAME, PIECE)});
cells[7].addEventListener("click", function(){placePiece(cells, 7, GAME, PIECE)});
cells[8].addEventListener("click", function(){placePiece(cells, 8, GAME, PIECE)});