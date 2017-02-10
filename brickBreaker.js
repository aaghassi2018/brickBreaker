var canvasGA = document.getElementById("gameArea");
var contextGA = canvasGA.getContext("2d");
window.addEventListener('keydown', processKeyboardInput);
window.addEventListener('keyup', processKeyUp);

var gameInSession = false;


var bar = new Bar();
var ball = new Ball();
//normal mode
var bricks = [];
var darkBricks = [];

//special mode
var shortPaddleBricks = [];
var paddleDissapearBricks = [];

var level1Cords = [125, 60, 55, 150, 55, 270, 125, 370, 325, 60, 395, 150, 395, 270, 325, 370];


var level2Cords = [50,50,228,369,456,214,352,145,214,454];


var level3Cords = [10,0, 50,0, 90,0, 130,0, 170,0, 210,0, 250,0, 290,0, 330,0, 370,0, 410,0, 450,0, 50,150, 70,170, 90,190];
var level3CordsDark = [45,145, 65,165, 85,185];

//special mode
var level1SCords = [100,100];
var level1SCordsShortPaddle = [300,300];
var level1SPaddleDissapearCords = [250,250];

var workingCords = [];
var workingCordsDark = [];


//special mode
var workingCordsShortPaddle = [];
var workingCordsPaddleDissapear = [];

var left = false;
var right =false;
var once = 0;
var currL;

var l1;
var l2;
var l3;

var l1S;

var playGameTimeout = 33;

var time = 5;

var shouldDrawBar = true;

function getCookie(cname) {
  return localStorage.getItem(cname);
}


function setCookie(cname, cvalue) {

  localStorage.setItem(cname,cvalue);

}

function checkProgress(){
  //0 is incomplete, 1 is complete

  l1 = getCookie("l1");
  l2 = getCookie("l2");
  l3 = getCookie("l3");

  l1S = getCookie("l1S");

  if (l1 == null) {
    l1 = '0';
  }
  if (l2 == null) {
    l2 = '0';
  }
  if (l3 == null) {
    l3 = '0';

  }
  if (l1S == null) {
    l1S = '0';

  }

  if(l1 == 1){
    document.getElementById("l1B").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l1B").style.backgroundColor = "#FF0000";
  }
  if(l2 == 1){
    document.getElementById("l2B").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l2B").style.backgroundColor = "#FF0000";
  }
  if(l3 == 1){
    document.getElementById("l3B").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l3B").style.backgroundColor = "#FF0000";
  }
  if(l1S == 1){
    document.getElementById("l1SB").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l1SB").style.backgroundColor = "#FF0000";
  }
}

function init1(){

  workingCords = level1Cords;
  currL = 1;

  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";



  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 0;
  ball.y = canvasGA.height-200;
  ball.vx=5;
  ball.vy=5;


  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init2(){
  workingCords = level2Cords;
  currL = 2;
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 0;
  ball.y = canvasGA.height-200;
  ball.vx=5;
  ball.vy=5;


  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init3(){
  workingCords = level3Cords;
  workingCordsDark = level3CordsDark;

  currL = 3;
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 0;
  ball.y = canvasGA.height-200;
  ball.vx=5;
  ball.vy=5;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init1S(){
  workingCords = level1SCords;
  workingCordsShortPaddle = level1SCordsShortPaddle;
  workingCordsPaddleDissapear = level1SPaddleDissapearCords;

  currL = 'l1S';
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }


  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 0;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}


setTimeout(playGame, playGameTimeout );

function playGame() {
  if(!gameInSession) {
    setTimeout(playGame, playGameTimeout);
    return;
  }
  update();
  setTimeout(playGame, playGameTimeout);
}

function processKeyboardInput(event) {
  var key = event.keyCode;
  if(key == 37 || key == 65){
    left = true;
  }
  else if(key == 39 || key == 68 ){
    right = true;
  }
  else if(key == 32){
    playGameTimeout += 100;
  }
  else if (key == 50) {
    playGameTimeout = 33;
  }

}

function processKeyUp(event) {
  var key = event.keyCode;
  if(key == 37 || key == 65){
    left = false;
  }
  else if(key == 39 || key == 68){
    right = false;
  }
}

function update() {

  if(!gameInSession)
  return;
  if(workingCords.length == 0 && workingCordsDark.length == 0 && workingCordsShortPaddle.length == 0 && workingCordsShortPaddle.length == 0 && workingCordsPaddleDissapear.length == 0){
    win();

  }

  if(ball.y >= canvasGA.height - bar.height-20 && ball.x+ball.width>bar.x && ball.x <(bar.x+bar.width)){
    //ball collision with bar
    if(right==true){
      ball.vy *=-1;
      ball.vx+=1;
    }
    else if(left==true){
      ball.vy *=-1;
      ball.vy-=1;
    }
    else {
      {
        ball.vy *=-1;
      }
    }


  }
  if(ball.vx>= 3){
    ball.vx = 3;
  }
  if(ball.vy>= 3){
    ball.vy = 3;
  }
  if(ball.x <= -2 || ball.x+ball.width >= canvasGA.width+2){
    ball.vx*=-1;
  }
  if(ball.y <= -2){
    ball.vy *=-1;
  }

  for(var i = 0; i < workingCords.length; i +=2){
    if(ball.x + ball.width >= workingCords[i] && ball.x <= workingCords[i]+ 40){
      if(ball.y + ball.height >= workingCords[i+1] && ball.y <= workingCords[i+1] + 22){
        bro(workingCords[i],workingCords[i+1]);
        workingCords.splice(i,2);
        bricks.splice(i/2,1);

      }
    }
  }
  for(var i = 0; i < workingCordsDark.length; i +=2){
    if(ball.x + ball.width >= workingCordsDark[i] && ball.x <= workingCordsDark[i]+ 55){
      if(ball.y + ball.height >= workingCordsDark[i+1] && ball.y <= workingCordsDark[i+1] + 40){
        bro(workingCordsDark[i],workingCordsDark[i+1]);
        workingCordsDark.splice(i,2);
        darkBricks.splice(i/2,1);

      }
    }
  }
  for(var i = 0; i < workingCordsShortPaddle.length; i +=2){
    if(ball.x + ball.width >= workingCordsShortPaddle[i] && ball.x <= workingCordsShortPaddle[i]+ 40){
      if(ball.y + ball.height >= workingCordsShortPaddle[i+1] && ball.y <= workingCordsShortPaddle[i+1] + 20){
        bro(workingCordsShortPaddle[i],workingCordsShortPaddle[i+1]);
        workingCordsShortPaddle.splice(i,2);
        shortPaddleBricks.splice(i/2,1);
        bar.width = 50;
      }
    }
  }
  for(var i = 0; i < workingCordsPaddleDissapear.length; i +=2){
    if(ball.x + ball.width >= workingCordsPaddleDissapear[i] && ball.x <= workingCordsPaddleDissapear[i]+ 40){
      if(ball.y + ball.height >= workingCordsPaddleDissapear[i+1] && ball.y <= workingCordsPaddleDissapear[i+1] + 20){
        bro(workingCordsPaddleDissapear[i],workingCordsPaddleDissapear[i+1]);
        workingCordsPaddleDissapear.splice(i,2);
        paddleDissapearBricks.splice(i/2,1);
        show5Sec();
      }
    }
  }
  once = 0;


  move();
  ball.update();
  drawStuff();

  if(ball.y >= canvasGA.height - bar.height){
    gameOver();
    gameInSession = false;
  }
}

function win(){
  if(currL == 1){
    setCookie('l1','1');
  }
  if(currL == 2){
    setCookie('l2','1');
  }
  if(currL == 3){
    setCookie('l3','1');
  }
  if(currL == 'l1S'){
    setCookie('l1S','1');
  }
  checkProgress()
  document.getElementById("rightOfInGame").style.visibility = "hidden";
  document.getElementById("youWinDiv").style.visibility='visible';
  document.getElementById("gameOn").style.visibility='hidden';
  gameInSession=false;
}

function bro(x,y){
  for(once; once< 1; once++){

    //if ball.y is between the brick y and the brick y + 20
    if(ball.y > y && ball.y < y + 18) {
      ball.vx*=-1;

    }
    else //(ball.x <= x || ball.x+ball.width > x+40){
      {
      ball.vy*= -1;
    }
  }
}

function gameOver(){

  document.getElementById("gameOverDiv").style.visibility='visible';
  document.getElementById("gameOn").style.visibility='hidden';
  document.getElementById("rightOfInGame").style.visibility = "hidden";
  gameInSession=false;
}

function move() {
  if(right) {
    if(bar.x<canvasGA.width - bar.width) {
      bar.x += 5.5;
    }
  }
  if(left) {
    if(bar.x>0) {
      bar.x -= 5.5;
    }
  }
}

function drawStuff() {
  contextGA.fillStyle = "#FFFFFF";
  contextGA.fillRect(0, 0, canvasGA.width, canvasGA.height);

  if(shouldDrawBar == true){
    bar.draw();
  }
  ball.draw();


  bricks.forEach(function(brick) {
    brick.draw();
  })
  darkBricks.forEach(function(darkBrick) {
    darkBrick.draw();
  })
  shortPaddleBricks.forEach(function(shortBrick) {
    shortBrick.draw();
  })
  paddleDissapearBricks.forEach(function(paddleDissapearBrick) {
    paddleDissapearBrick.draw();
  })
}

function show5Sec(){

  document.getElementById("rightOfInGame").style.visibility = "visible";
  document.getElementById("secRemaining").innerHTML = time;

  shouldDrawBar = false;

  var lala = setTimeout(show5Sec, 1000);
  time--;


  if(time == -2 || gameInSession == false){
    clearInterval(lala);
    time = 5;
    shouldDrawBar = true;
    document.getElementById("rightOfInGame").style.visibility = "hidden";
  }
}



function Bar() {
  this.width = 100;
  this.height = 20;
  this.x = 90;
  this.y = canvasGA.height-this.height;

  this.draw = function() {
    contextGA.fillStyle = "#FF00FF";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

}

function Brick(x, y) {
  this.width = 40;
  this.height = 20;
  this.x = x;
  this.y = y;

  this.draw = function() {
    contextGA.fillStyle = "#FF0000";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

}

function shortPaddleBrick(x, y) {
  this.width = 40;
  this.height = 20;
  this.x = x;
  this.y = y;

  this.draw = function() {
    contextGA.fillStyle = "#000000";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

}

function paddleDissapearBrick(x, y) {
  this.width = 40;
  this.height = 20;
  this.x = x;
  this.y = y;

  this.draw = function() {
    contextGA.fillStyle = "#000000";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

}

function darkBrick(x, y) {
  this.width = 50;
  this.height = 40;
  this.x = x;
  this.y = y;

  this.draw = function() {
    contextGA.fillStyle = "#990000";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

}

function Ball() {
  this.width = 20;
  this.height = 20;


  this.x = 0;
  this.y = canvasGA.height-200;

  this.vx=0;
  this.vy=0;

  this.draw = function() {
    contextGA.fillStyle = "#50FFAB"
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  }
}
