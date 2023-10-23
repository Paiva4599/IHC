const AROUND_CELL_OPERATORS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
const minesweeper = new Minesweeper();
const board = document.getElementById("board");
const counter = document.getElementById("mine-counter");
const results = document.querySelector(".results");
const game = document.querySelector(".game");
const btn = document.querySelector(".btn");
const resultMessage = document.querySelector(".winner");

var flagCounter = 10;
const winMessage = "Você venceu!";
const loseMessage = "Você perdeu";
var leftMines = minesweeper.minesPositions;

var pendingClick;
var clicked = 0;
var time_dbclick = 500;

window.onload = () => {
  board.innerHTML = "";
  minesweeper.printBoard(board);
  counter.innerText = flagCounter;
  Array.from(document.getElementsByClassName("cell")).forEach((element) => {
    element.setAttribute("onclick", "myClick(this)");
  });
};

function openCell(cell) {
  cell.innerHTML = "";
  const cellContent = document.createElement("DIV");
  [i, j] = cell.id.split(" ");

  switch (minesweeper.board[i][j]) {
    case 0:
      cellContent.innerHTML = "";
      break;
    case "M":
      cellContent.innerHTML = `<i class="fa fa-bomb" aria-hidden="true"></i>`;
      cell.classList.add("mine");
      finishGame(loseMessage);
      break;
    default:
      cellContent.innerHTML = minesweeper.board[i][j].toString();
      break;
  }

  cell.classList.add(cellContent.innerHTML == "M" ? "mine" : "show");
  cell.appendChild(cellContent);

  if (cellContent.innerHTML == "") {
    var neighbours = [];
    for (let n = 0; n < AROUND_CELL_OPERATORS.length; n++) {
      const around = AROUND_CELL_OPERATORS[n];
      const boardX = parseInt(i) + around[0];
      const boardY = parseInt(j) + around[1];

      if (boardY >= 0 && boardY < 9 && boardX >= 0 && boardX < 9) {
        neighbours.push(`${boardX} ${boardY}`);
      }
    }

    neighbours.forEach((neighbour) => {
      var neighbourHTML = document.getElementById(neighbour);
      if (!neighbourHTML.classList.toString().includes("show")) {
        openCell(neighbourHTML);
      }
    });
  }
}

function flagCell(cell) {
  var position = cell.id.split(" ").map(item => parseInt(item));
  // position = position.map(item => parseInt(item))
  cell.classList.add("flagged");
  cell.innerHTML = `<i class="fa fa-flag" aria-hidden="true"></i>`;
  checkIfMine(position);
  const checkIfFinish = (updateCounter() == 0);

  if (checkIfFinish) {
    if (leftMines.length == 0) {
      finishGame(winMessage);
    } else {
      finishGame(loseMessage);
    }
  }
}

function unflagCell(cell) {
  var position = cell.id.split(" ").map(item => parseInt(item));
  cell.classList.remove("flagged");
  cell.innerHTML = "";
  updateCounter(false);
  checkIfMineUnflag(position);
}

function updateCounter(decrease = true) {
  flagCounter = decrease ? flagCounter - 1 : flagCounter + 1;
  counter.innerText = flagCounter == 10 ? flagCounter : `0${flagCounter}`;
  return flagCounter;
}

function myClick(cell) {
  clicked++;
  clearTimeout(pendingClick);
  if (clicked >= 2) {
    if (flagCounter > 0 && !cell.classList.contains("flagged")) {
      flagCell(cell);
    } else if (flagCounter < 10 && cell.classList.contains("flagged")) {
      unflagCell(cell);
    }
    clicked = 0;
  } else {
    pendingClick = setTimeout(() => {
      openCell(cell);
      clicked = 0;
    }, time_dbclick);
  }
}

btn.onclick = () => {
  window.location.reload();
};

function checkIfMine(position) {
  if (minesweeper.minesPositions.some(item => item[0] == position[0] && item[1] == position[1])) {
    leftMines = leftMines.filter((item) => !(item[0] == position[0] && item[1] == position[1]));
  }
}

function checkIfMineUnflag(position) {
  if (minesweeper.minesPositions.some(item => item[0] == position[0] && item[1] == position[1])) {
    leftMines.push(position);
  }
}

function finishGame(message) {
  game.classList.add("hide");
  results.classList.add("show");
  resultMessage.innerHTML = message;
}