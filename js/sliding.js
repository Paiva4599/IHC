var rows = 3;
var columns = 3;

var clicked_tile;
var blank_tile;

var turns = 0;

var possible_order = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
var correct_order = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "../IHC/assets/sliding/" + possible_order.shift() + ".jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    clicked_tile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() { }

function dragDrop() {
    blank_tile = this;
}

function dragEnd() {
    if (blank_tile.src.includes("3.jpg")) {

        let clicked_coord = clicked_tile.id.split("-");
        let row = parseInt(clicked_coord[0]);
        let col = parseInt(clicked_coord[1]);

        let blank_coord = blank_tile.id.split("-");
        let row2 = parseInt(blank_coord[0]);
        let col2 = parseInt(blank_coord[1]);

        let left = row == row2 && col2 == col - 1;
        let right = row == row2 && col2 == col + 1;
        let up = col == col2 && row2 == row - 1;
        let down = col == col2 && row2 == row + 1;

        let is_adjacent = left || right || up || down;

        if (is_adjacent) {
            let clicked_img = clicked_tile.src;
            let blank_img = blank_tile.src;

            clicked_tile.src = blank_img;
            blank_tile.src = clicked_img;

            turns += 1;
            document.getElementById("turns").innerText = turns;

            let board = document.getElementById("board");

            for (let n = 0; n < 9; n++) {

                let images = board.getElementsByTagName('img')[n].src;
                let char = images.charAt(images.length - 5)
                possible_order.push(char);
            }

            console.log(possible_order.toString());
            console.log(correct_order.toString());
        }
    }

    if (possible_order.toString() == correct_order.toString()) {
        alert("Você ganhou em " + turns + " tentativas!!");
    }

    possible_order = []
}
