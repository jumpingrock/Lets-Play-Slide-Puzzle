//drawing of dynamic grid to house puzzle.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  };
  return array;
};

var shuffleNo = function(){

    for (var i = 0; i<gameDifficulty*gameDifficulty;i++){
        im.push(i+1);
    };
    im=shuffle(im);//this is to create an array that randomize numbers
    console.log(im)
}
var newgame = function(){

    gameDifficulty = parseInt(document.querySelector("#difficulty").value)
    if(gameDifficulty == 3){
        fileLocation = "file:///C:/Users/Kenne/Projects/Predatory/images/9/";
        fileLocationShort = "images/9/";
        containerHeight = 9;
        containerWidth = 3;

    }else if(gameDifficulty == 5){
        fileLocation = "file:///C:/Users/Kenne/Projects/Predatory/images/25/";
        fileLocationShort = "images/25/";
        containerHeight = 17;
        containerWidth = 4;
    }else if(gameDifficulty == 7){
        fileLocation = "file:///C:/Users/Kenne/Projects/Predatory/images/49/";
        fileLocationShort = "images/49/";
        containerHeight = 26;
        containerWidth = 5;
    }else if(gameDifficulty == 10){
        fileLocation = "file:///C:/Users/Kenne/Projects/Predatory/images/100/";
        fileLocationShort = "images/100/";
        containerHeight = 35;
        containerWidth = 6;
    }
};//end of newgame

var initGame = function() {
    var count =0;
    var containerOfBoxes = document.querySelector("#containerOfBoxes");
    // document.querySelector("#levnum").innerText = gameDifficulty;
    containerOfBoxes.style.height = `${gameDifficulty*110+ containerHeight}px`;
    containerOfBoxes.style.width = `${gameDifficulty*110+ containerWidth}px`;
    for (var i = 0; i<gameDifficulty; i++){
        for(var j = 0; j<gameDifficulty; j++){
            //for loop to create boxes and append with image and style. Dynamic HTML CSS creation depending on difficulty.
            var box = document.createElement('img')
            box.className = "boxy";
            box.style.height = `${110}px`;
            box.style.width = `${110}px`;
            box.style.padding = "0px";
            box.style.margin = "0px";
            box.style.display = "inline-block";
            containerOfBoxes.appendChild(box);
            box.setAttribute("id", i.toString()+j.toString());
            box.innerText = im[count];

    //for grey box puzzle if i is equal to last of grid then append image as grey box and give it a name of boogybox.

            if(im[count] == (gameDifficulty*gameDifficulty)){ //create gray tile when random number load the biggest no.
                console.log("9", gameDifficulty)
                box.src= fileLocationShort+(im[count])+".jpg";
                record = {id: i.toString()+j.toString(),
                indx: im[count],
                greybox: "yes",
                img: fileLocation+(im[count])+".jpg"};
            }else{ //creation of normal tile
                box.src= fileLocationShort +(im[count])+".jpg";
                record = {id: i.toString()+j.toString(),
                indx: im[count],
                greybox: "no",
                img: fileLocation+(im[count])+".jpg"};

            };//end of if else
            Matrix.push(record);
            count+=1;
        };// end of j loop
    };//end of i loop


}; // end of window.onload function
//---------------------------------------------------
// Some random colors https://codepen.io/nashvail/details/wpGgXO
    const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

    const numBalls = 10;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      let ball = document.createElement("div");
      ball.classList.add("ball");
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 83)}vw`;
      ball.style.top = `${Math.floor(Math.random() * 80)}vh`;
      ball.style.transform = `scale(${Math.random()})`;
      ball.style.width = `${Math.random()}em`;
      ball.style.height = ball.style.width;
      balls.push(ball);
      document.body.append(ball);
    }
    // Keyframes
    balls.forEach((el, i, ra) => {
      let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
      };

      let anim = el.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
          duration: (Math.random() + 1) * 2000, // random duration
          direction: "alternate",
          fill: "both",
          iterations: Infinity,
          easing: "ease-in-out"
        }
      );
    });
//-------------------------------------------------
var isMovable = function() {

    var movingImg = "";
    var movingIndex = 0;
    for (var i = 0; i<Matrix.length;i++){//using this.innerText to check with matrix if it is within radius of greybox then switch
        if(Matrix[i].greybox == "yes" && ((Matrix[i].id -this.id == 10) || (Matrix[i].id - this.id == -10))){
            Matrix[i].img = this.src;
            document.getElementById(`${Matrix[i].id}`).src = this.src;
            this.src = greyboxURL;
            for(var j = 0; j<Matrix.length;j++){
                if(Matrix[j].id == this.id){
                    Matrix[j].greybox = "yes";
                    Matrix[i].greybox = "no";
                    movingIndex = Matrix[i].indx;
                    Matrix[i].indx = Matrix[j].indx;
                    Matrix[j].indx = movingIndex;
                    movingImg = Matrix[i].img;
                    Matrix[i].img = Matrix[j].img;
                    Matrix[j].img = movingImg;
                };
            };
        }else if(Matrix[i].greybox == "yes" && ((Matrix[i].id - this.id == 1) || (Matrix[i].id - this.id == -1))){
            Matrix[i].img = this.src;
            document.getElementById(`${Matrix[i].id}`).src = this.src;
            this.src = greyboxURL;
            moveCount();
            winCheck();
            for(var j = 0; j<Matrix.length;j++){
                if(Matrix[j].id == this.id){
                    Matrix[j].greybox = "yes";
                    Matrix[i].greybox = "no";
                    movingIndex = Matrix[i].indx;
                    Matrix[i].indx = Matrix[j].indx;
                    Matrix[j].indx = movingIndex;
                    movingImg = Matrix[i].img;
                    Matrix[i].img = Matrix[j].img;
                    Matrix[j].img = movingImg;
                };//end of if updating of matrix
            };//and of for loop j
        };//end of is move legal if else
    };//end of first for loop
    moveCount();
    winCheck();
};//end of function isMovable

//---------------------------------------------------------------
var moveCount = function() {

    playerMoves+=1;
    document.querySelector("#moveno").innerText = playerMoves;
}
//---------------------------------------------------------------
var winCheck = function(){

    if (gameDifficulty == 3 && Matrix[0].indx == 1 && Matrix[1].indx == 2 && Matrix[2].indx == 3 && Matrix[3].indx == 4 && Matrix[4].indx == 5 & Matrix[5].indx == 6 && Matrix[6].indx == 7 && Matrix[7].indx == 8 && Matrix[8].indx == 9){
        alert("You Win!!");
    }else if (gameDifficulty == 5 && Matrix[0].indx == 1 && Matrix[1].indx == 2 && Matrix[2].indx == 3 && Matrix[3].indx == 4 && Matrix[4].indx == 5 & Matrix[5].indx == 6 && Matrix[6].indx == 7 && Matrix[7].indx == 8 && Matrix[8].indx == 9 && Matrix[9].indx == 10 && Matrix[10].indx == 11 && Matrix[11].indx == 12 && Matrix[12].indx == 13 && Matrix[13].indx == 14 & Matrix[14].indx == 15 && Matrix[15].indx == 16 && Matrix[16].indx == 17 && Matrix[17].indx == 18 && Matrix[18].indx == 19 && Matrix[19].indx == 20 && Matrix[20].indx == 21 && Matrix[21].indx == 22 && Matrix[22].indx == 23 & Matrix[23].indx == 24 && Matrix[24].indx == 25 ){
        alert("You Win!!");
    };
};

//----------------------------------------------------------------

var lapseTime = 0, dispTime = document.querySelector("#time"),lapseSec = 0, lapseMin = 0;
interval = setInterval(function () {
    lapseSec = ("00"+lapseSec).substr(-2);
    lapseMin = ("00"+lapseMin).substr(-2);
    lapseTime = `${lapseMin}:${lapseSec}`;
    dispTime.innerText = lapseTime;
    lapseSec = parseInt(lapseSec);
    lapseMin = parseInt(lapseMin);
    lapseSec+=1;
    if (lapseSec == 60){
        lapseSec = 0;
        lapseMin +=1;
    }
},1000)
//----------------------------------------------------------------------

// var solver = function() {
//     var boxy = document.querySelectorAll(".boxy")
//     for (var i =0; i < gameDifficulty*gameDifficulty ; i++){
//         // for (var j =0; j < gameDifficulty*gameDifficulty ; j++){
//         boxy[Matrix[i].indx].src = Matrix[i].img;
//     };
// };
// document.querySelector("#solveBut").addEventListener('click',solver);
