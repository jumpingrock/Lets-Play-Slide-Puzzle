var playerName = "";//prompt("Enter your name: ", "Kenneth");
var gameDifficulty = 0, gridSize = 0;//prompt("Select your difficulty", "5");
var im = [];
var Matrix = [];
var record = {};
var playerMoves = 0;
var fileLocation = "", fileLocationShort = "";
var containerHeight = 0, containerWidth = 0
const greyboxURL = "images/greybox.jpg";

function on() {
    document.getElementById("overlay").style.display = "block";
};

function off() { // turn off overlay and send information into the required variables. first program to grab variables
    document.getElementById("overlay").style.display = "none";
    playerName = document.querySelector("#fname").value;
    gameDifficulty = document.querySelector("#difficulty").value;
    gridSize = gameDifficulty*gameDifficulty;
    shuffleNo();
    newgame();
    initGame();
    var boxy = document.querySelectorAll(".boxy");
    for (var i=0; i<(gameDifficulty*gameDifficulty);i++){
        //listen for click on puzzle boxes and on click fire up gameGrid function.
        boxy[i].addEventListener("click", isMovable);
        console.log(boxy[i]);
    };//end of boxy click event for loop
};
on();






