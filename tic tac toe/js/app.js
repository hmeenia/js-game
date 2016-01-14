var app = function () {
    var chance,
        gameArray = []; // x = 1, o = 0

    function init() {
        var gameContainer = document.getElementById("_table"),
            gameRow, gameCell, row, column;

        chance = true;
        document.getElementById("winner").classList.add("hide");
        gameContainer.innerHTML = "";

        for (row = 0; row < 3; row++) {
            gameRow = document.createElement("div");
            gameRow.classList.add("div-table-row");
            gameRow.classList.add("row-" + row);

            gameArray[row] = [];
            for (column = 0; column < 3; column++) {
                gameCell = document.createElement("div");
                gameCell.classList.add("div-table-col");
                gameCell.setAttribute("data-cell-id", row + "" + column);
                gameRow.appendChild(gameCell);
                gameCell.addEventListener("click", onCellClick);

                //Init gameArray with all NaN;

                gameArray[row][column] = NaN;
            }
            gameContainer.appendChild(gameRow);
        }

    }

    function onCellClick(e) {
        var elem = e.target,
            winnerDiv;
        if (chance && !elem.innerHTML) {
            elem.innerHTML = "X";
        } else if (!chance && !elem.innerHTML) {
            elem.innerHTML = "0";
        }
        if (checkWin(elem.getAttribute("data-cell-id"), e.target.innerHTML)) {
            winnerDiv = document.getElementById("winner");
            winnerDiv.innerHTML += elem.innerHTML + " Wins";
            winnerDiv.classList.remove("hide");
        }
        chance = !chance;
    }

    function checkWin(id, currTurn) {
        var row = id.split("")[0],
            column = id.split("")[1];
        gameArray[row][column] = currTurn;

        return checkRowWin(currTurn, row) ||
            checkColumnWin(currTurn, column) ||
            checkDiagWin(currTurn, id);
    }

    function checkRowWin(turn, rowId) {
        var a, str = "";
        for (a = 0; a < 3; a++) {
            str += gameArray[rowId][a];
        }

        return str === (turn + turn + turn);

    }

    function checkColumnWin(turn, colId) {
        var a, str = "";
        for (a = 0; a < 3; a++) {
            str += gameArray[a][colId];
        }

        return str === (turn + turn + turn);

    }

    function checkDiagWin(turn, id) {
        if (id === "00" || id === "11" || id === "22" || id === "02" || id === "20") {

            if ((gameArray[0][0] + gameArray[1][1] + gameArray[2][2]) === (turn + turn + turn)) {
                return true;
            } else if ((gameArray[0][2] + gameArray[1][1] + gameArray[2][0]) === (turn + turn + turn)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return {
        init: init
    };

}();

app.init();