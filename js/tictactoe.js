const box = document.querySelector(".box"),
  buttonX = box.querySelector(".options .playerX"),
  buttonO = box.querySelector(".options .playerO"),
  board = document.querySelector(".board"),
  allBox = document.querySelectorAll(".area section span"),
  player = document.querySelector(".player"),
  results = document.querySelector(".results"),
  winner = results.querySelector(".winner"),
  btn = results.querySelector("button");

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }

  buttonX.onclick = () => {
    box.classList.add("hide");
    board.classList.add("show");
  };
  buttonO.onclick = () => {
    box.classList.add("hide");
    board.classList.add("show");
    player.setAttribute("class", "players active player O");
  };
};

let playerXIcon = "fa fa-times";
let playerOIcon = "far fa-circle";
let sign = "X";
let runBot = true;

function clickedBox(element) {
  if (player.classList.contains("O")) {
    sign = "O";
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    player.classList.remove("active");
    element.setAttribute("id", sign);
  } else {
    sign = "X";
    element.innerHTML = `<i class="${playerXIcon} aria-hidden="true"></i>`;
    player.classList.add("active");
    element.setAttribute("id", sign);
  }
  selectWinner();
  element.style.pointerEvents = "none";
  let delay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, delay);
}

function bot(runBot) {
  if (runBot) {
    let list = [];
    sign = "O";
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        list.push(i);
      }
    }

    let random = list[Math.floor(Math.random() * list.length)];
    if (list.length > 0) {
      if (player.classList.contains("players")) {
        sign = "X";
        allBox[random].innerHTML = `<i class="${playerXIcon}"></i>`;
        player.classList.add("active");
        allBox[random].setAttribute("id", sign);
      } else {
        allBox[random].innerHTML = `<i class="${playerOIcon}"></i>`;
        player.classList.remove("active");
        allBox[random].setAttribute("id", sign);
      }
      selectWinner();
    }
    allBox[random].style.pointerEvents = "none";
  }
}

function getClass(idname) {
  return document.getElementsByClassName(`box${idname}`)[0].id;
}

function checkClass(val1, val2, val3, csign) {
  if (
    getClass(val1) == csign &&
    getClass(val2) == csign &&
    getClass(val3) == csign
  ) {
    return true;
  }
}

function selectWinner() {
  if (
    checkClass(1, 2, 3, sign) ||
    checkClass(4, 5, 6, sign) ||
    checkClass(7, 8, 9, sign) ||
    checkClass(1, 4, 7, sign) ||
    checkClass(2, 5, 8, sign) ||
    checkClass(3, 6, 9, sign) ||
    checkClass(1, 5, 9, sign) ||
    checkClass(3, 5, 7, sign)
  ) {
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      board.classList.remove("show");
      results.classList.add("show");
    }, 700);
    winner.innerHTML = `<span>Jogador <b>${sign}</b> venceu!</span>`;
  } else {
    if (
      getClass(1) != "" &&
      getClass(2) != "" &&
      getClass(3) != "" &&
      getClass(4) != "" &&
      getClass(5) != "" &&
      getClass(6) != "" &&
      getClass(7) != "" &&
      getClass(8) != "" &&
      getClass(9) != ""
    ) {
      runBot = false;
      bot(runBot);
      setTimeout(() => {
        board.classList.remove("show");
        results.classList.add("show");
      }, 700);
      winner.innerHTML = `Velha!`;
    }
  }
}

btn.onclick = () => {
  window.location.reload();
};
