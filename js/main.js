var menuVisible = false; 
const menuTitle = document.getElementById("menu-title");
const gameList = document.getElementById("game-list");
menuTitle.addEventListener("click", toggleMenu);

function toggleMenu() {
    if (!menuVisible) {
        gameList.classList.add("visible");   
        menuVisible = true;         
    }
    else {
        gameList.classList.remove("visible");
        menuVisible = false;         
    }
}