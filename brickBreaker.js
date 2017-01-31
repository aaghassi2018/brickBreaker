var canvasGA = document.getElementById("gameArea");
var contextGA = canvasGA.getContext("2d");
window.addEventListener('keydown', processKeyboardInput);
window.addEventListener('keyup', processKeyUp);

var gameInSession = false;


var bar = new Bar();
var ball = new Ball();
var bricks = [];
var darkBricks = [];

var level1Cords = [125, 60, 55, 150, 55, 270, 125, 370, 325, 60, 395, 150, 395, 270, 325, 370];
var level2Cords = [50,50,228,369,456,214,352,145,214,454];
var level3Cords = [350,350,100,100,200,200,300,300];
var level3CordsDark = [98,98];


var workingCords = [];
var workingCordsDark = [];

var left = false;
var right =false;
var once = 0;
var currL;

var l1;
var l2;
var l3;

//from w3schools.com
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
}

//from w3schools.com
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkProgress(){
  //0 is incomplete, 1 is complete

  l1 = getCookie("l1");
  l2 = getCookie("l2");
  l3 = getCookie("l3");

    if (l1 == null) {
      l1 = 0;
    }
    if (l2 == null) {
      l2 = 0;
    }
    if (l3 == null) {
      l3 = 0;

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
  ball.vx=6;
  ball.vy=6;


  gameInSession=true;
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
  for (var i = 0; i < workingCords.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 0;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  bar.draw();
  ball.draw();

}


setInterval( playGame, 33 );
function playGame() {
	if(!gameInSession)
		return;


  update();
}

function processKeyboardInput(event) {
	var key = event.keyCode;
	if(key == 37 || key == 65){
     left = true;
  }
	else if(key == 39 || key == 68 ){
     right = true;
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
  if(workingCords.length == 0){
    win();

  }

    if(ball.y >= canvasGA.height - bar.height-20 && ball.x+ball.width>bar.x && ball.x <(bar.x+bar.width)){
      //ball collision with bar
      if(right==true){
          // if(ball.vx>=0){
          //   //window.alert('ball going right, bar going right')
          //   ball.vy*=-1;
          //
          //
          //   //ball.vx+=1;
          //   ball.vy-=1;
          // }
          // else {
          //   //window.alert('ball going left, bar going right')
          //   ball.vy*=-1;
          //
          //
          //   //ball.vx-=1;
          //   ball.vy+=1;
          // }
          ball.vy *=-1;
          ball.vx+=1;
      }
      else if(left==true){
        // if(ball.vx<=0){
        //   //window.alert('ball going left, bar going left')
        //   ball.vy*=-1;
        //
        //
        //   ball.vx+=2;
        //   ball.vy+=2;
        // }
        // else {
        //   //window.alert('ball going right, bar going left')
        //   //window.alert('yo')
        //   ball.vy*=-1;
        //
        //
        //   ball.vx-=1;
        //   ball.vy-=1;
        // }
        ball.vy *=-1;
        ball.vy-=1;
      }
      else {
        {
          ball.vy *=-1;
        }
      }


    }
    if(ball.vx>= 7){
      ball.vx = 7;
    }
    if(ball.vy>= 7){
      ball.vy = 7;
    }
    if(ball.x <= -2 || ball.x+ball.width >= canvasGA.width+2){
      ball.vx*=-1;
    }
    if(ball.y <= -2){
      ball.vy *=-1;
    }

    for(var i = 0; i < workingCords.length; i +=2){
      if(ball.x + ball.width >= workingCords[i] && ball.x <= workingCords[i]+ 40){
        if(ball.y + ball.height >= workingCords[i+1] && ball.y <= workingCords[i+1] + 20){
          bro(workingCords[i],workingCords[i+1]);
          workingCords.splice(i,2);
          bricks.splice(i/2,1);

        }
      }
    }
    for(var i = 0; i < workingCordsDark.length; i +=2){
      if(ball.x + ball.width >= workingCordsDark[i] && ball.x <= workingCordsDark[i]+ 40){
        if(ball.y + ball.height >= workingCordsDark[i+1] && ball.y <= workingCordsDark[i+1] + 20){
          bro(workingCordsDark[i],workingCordsDark[i+1]);
          workingCordsDark.splice(i,2);
          darkBricks.splice(i/2,1);

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
    //document.cookie = "l1=1";
    setCookie('l1',1,365);
  }
  if(currL == 2){
    //document.cookie = "l2=1";
    setCookie('l2',1,365);
  }
  if(currL == 3){
    //document.cookie = "l3=1";
    setCookie('l3',1,365);

  }
  document.getElementById("youWinDiv").style.visibility='visible';
  document.getElementById("gameOn").style.visibility='hidden';
  gameInSession=false;
}

function bro(x,y){
for(once; once< 1; once++){

  if(ball.x >= x && ball.x < x+40){
    ball.vy*= -1;
    }
    else if (ball.y> y) {
      ball.vy*=-1;
    }
    else
    {
      ball.vx *= -1;
    }
  }
}

function gameOver(){

  document.getElementById("gameOverDiv").style.visibility='visible';
  document.getElementById("gameOn").style.visibility='hidden';
  gameInSession=false;
}

function move() {
  if(right) {
    if(bar.x<canvasGA.width - bar.width) {
      bar.x += 8;
    }
  }
  if(left) {
    if(bar.x>0) {
      bar.x -= 8;
    }
  }
}

function drawStuff() {
  contextGA.fillStyle = "#FFFFFF";
	contextGA.fillRect(0, 0, canvasGA.width, canvasGA.height);


	bar.draw();
  ball.draw();


  bricks.forEach(function(brick) {
    brick.draw();
  })
  darkBricks.forEach(function(darkBrick) {
    darkBrick.draw();
  })
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

function darkBrick(x, y) {
  this.width = 45;
  this.height = 25;
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
