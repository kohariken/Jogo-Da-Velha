var board;
var turn = "X";
var winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var gameOver = false;
var count = 0;
var resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);


var darkModeButton = document.getElementById("dark-mode-button");
darkModeButton.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
      darkModeButton.innerHTML = "Light Mode";
  } else {
      darkModeButton.innerHTML = "Dark Mode";
  }
}

var xWins = 0;
var oWins = 0;
var draws = 0;

var xWinsElement = document.getElementById("x-wins");
var oWinsElement = document.getElementById("o-wins");
var drawsElement = document.getElementById("draws");

var board = [];

var cell = document.createElement("td");
bestMove = { move: null, score: 0 };






function updateScoreboard() {
    xWinsElement.innerHTML = "X Venceu: " + xWins;
    oWinsElement.innerHTML = "O Venceu: " + oWins;
    drawsElement.innerHTML = "Deu Velha: " + draws;
}

function init() {
  document.body.classList.add("dark");
    var cells = document.querySelectorAll("td");
    for(var i = 0; i < cells.length; i++){
        board.push(cells[i].textContent);
    }
    board = document.getElementById("board");
    board.addEventListener("click", function(event) {
        var cell = event.target;
        if (cell.textContent === "" && !gameOver) {
            cell.textContent = turn;
            cell.classList.add(turn.toLowerCase());
            turn = (turn === "X") ? "O" : "X";
            checkWin(cell);
            checkDraw();
            setInterval(makeAIMove, 500);
        }
        
    });
}

function checkWin(cell) {
    for (let i = 0; i < winCombinations.length; i++) {
        if (winCombinations[i].indexOf(parseInt(cell.id)) !== -1) {
            if (document.getElementById(winCombinations[i][0]).textContent === cell.textContent
                && document.getElementById(winCombinations[i][1]).textContent === cell.textContent
                && document.getElementById(winCombinations[i][2]).textContent === cell.textContent) {
                gameOver = true;
                if(cell.textContent === "X"){
                    xWins++;
                }else{
                    oWins++;
                }
                updateScoreboard();
                alert(cell.textContent + " Venceu a partida!");
                resetGame();
                return;
            }
        }
    }
}

function checkDraw(){
    if(count === 8 && !gameOver){
        gameOver = true;
        alert("Deu Velha!");
        draws++;
        updateScoreboard();
        resetGame();
    }
    count ++;
}

function resetGame() {
    gameOver = false;
    count = 0;
    turn = "X";
    var cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        cells[i].classList.remove("x", "o");
    }
    updateScoreboard();
}


//IA ..........................................................................................................................


function checkBlockingMove() {
  for (let i = 0; i < winCombinations.length; i++) {
    var cell1 = document.getElementById(winCombinations[i][0]);
    var cell2 = document.getElementById(winCombinations[i][1]);
    var cell3 = document.getElementById(winCombinations[i][2]);
    if (cell1.textContent === "X" && cell2.textContent === "X" && cell3.textContent === "") {
      return cell3;
    } else if (cell1.textContent === "X" && cell2.textContent === "" && cell3.textContent === "X") {
      return cell2;
    } else if (cell1.textContent === "" && cell2.textContent === "X" && cell3.textContent === "X") {
      return cell1;
    }
  }
  return null;
}

function makeAIMove() {
  if (turn === "O" && !gameOver) {
    var blockingMove = checkBlockingMove();
    if (blockingMove !== null) {
      blockingMove.textContent = turn;
      blockingMove.classList.add(turn.toLowerCase());
    } else {
      var emptyCells = document.querySelectorAll("td:empty");
      var randomIndex = Math.floor(Math.random() * emptyCells.length);
      var cell = emptyCells[randomIndex];
      cell.textContent = turn;
      cell.classList.add(turn.toLowerCase());
    }
    turn = (turn === "X") ? "O" : "X";
    checkWin(blockingMove || cell);
    checkDraw();
  }
}
