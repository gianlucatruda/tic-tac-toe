function clearBoard() {
    var cells = document.getElementsByClassName("cell");
    for (let i=0; i<cells.length; i++) {
        cells[i].innerHTML = " ";
    }
    console.log("Board cleared");
}

function newGame(cells) {
    clearBoard(cells);
}

function loadGame() {
    alert('Load Game');
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
        if(values.every((val, i, arr) => val === arr[0])){
            console.log(values);
            return true
        }
    }

    return false

}


var newGameButton = document.getElementsByClassName("newgame")[0];
var loadGameButton = document.getElementsByClassName("loadgame")[0];

newGameButton.addEventListener("click", newGame);
loadGameButton.addEventListener("click", loadGame);

