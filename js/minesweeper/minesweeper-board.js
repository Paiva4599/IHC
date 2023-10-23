// source: https://github.com/0fc0de/minesweeper-board
class Minesweeper {
  constructor() {
    this.board = [];
    this.minesPositions = [];
    this.flaggedMines = [];
    this.init();
  }

  init() {
    this.generateEmptyBoard();
    this.generateMinesPositions();
    this.insertMines();
    this.updateBoardNumbers();
  }

  generateEmptyBoard() {
    for (let y = 0; y < 9; y++) {
      this.board.push([]);
      for (let x = 0; x < 9; x++) {
        this.board[y][x] = 0;
      }
    }
  }

  generateMinesPositions() {
    this.minesPositions = [];

    while (this.minesPositions.length < 10) {
      const y = this.getRandomInt(0, 9);
      const x = this.getRandomInt(0, 9);

      if (!this.isAlreadyAMine([y, x])) {
        this.minesPositions.push([y, x]);
      }
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  isAlreadyAMine(minePosition) {
    return this.minesPositions.join(" ").includes(minePosition.toString());
  }

  insertMines() {
    for (let i = 0; i < this.minesPositions.length; i++) {
      const y = this.minesPositions[i][0];
      const x = this.minesPositions[i][1];
      this.board[y][x] = "M";
    }
  }

  updateBoardNumbers() {
    for (let i = 0; i < this.minesPositions.length; i++) {
      for (let j = 0; j < AROUND_CELL_OPERATORS.length; j++) {
        const minePosition = this.minesPositions[i];
        const around = AROUND_CELL_OPERATORS[j];
        const boardY = minePosition[0] + around[0];
        const boardX = minePosition[1] + around[1];

        if (
          boardY >= 0 &&
          boardY < 9 &&
          boardX >= 0 &&
          boardX < 9 &&
          typeof this.board[boardY][boardX] === "number"
        ) {
          this.board[boardY][boardX]++;
        }
      }
    }
  }

  printBoard($board) {
    for (let y = 0; y < this.board.length; y++) {
      const $row = document.createElement("DIV");
      $row.classList.add("row");

      for (let x = 0; x < this.board[y].length; x++) {
        const $cell = document.createElement("DIV");
        $cell.classList.add("cell");
        $cell.id = `${y} ${x}`;

        $row.appendChild($cell);
      }

      $board.appendChild($row);
    }
  }
}
