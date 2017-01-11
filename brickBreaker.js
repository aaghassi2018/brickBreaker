var canvasGA = document.getElementById("gameArea");
var contextGA = canvasGA.getContext("2d");
window.addEventListener('keydown', processKeyboardInput);
window.addEventListener('keyup', processKeyUp);

var gameInSession = false;


var bar = new Bar();
var ball = new Ball();
var bricks = [];

var level1Cords = [125, 60, 55, 150, 55, 270, 125, 370, 325, 60, 395, 150, 395, 270, 325, 370];
var level2Cords = [50,100,100,25,25,2,5,55,55,6,55,44,874,758,250,250];

var workingCords = [];


var left = false;
var right =false;
var once = 0;



function init1(){

  workingCords = level1Cords;

  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }



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
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }



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

    if(ball.y >= canvasGA.height - bar.height-20 && ball.x+ball.width>bar.x && ball.x <(bar.x+bar.width)){
      ball.vy *= -1;
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
    once = 0;


    move();
    ball.update();
    drawStuff();

    if(ball.y >= canvasGA.height - bar.height - bar.height + 2){
      gameOver();
      gameInSession = false;
    }
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
  document.getElementById("body").innerHTML = "<h1 id='gameOver'> Game Over! </h1> <button type='button' onclick = 'location.reload()' style='padding:1em; margin-top:20px; margin-left: 125px; background-color:#FF0000'> Play Again? </button>";
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
}


function processUserInput(event) {

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

function Ball() {
  this.width = 20;
	this.height = 20;

	this.x = 0;
  this.y = canvasGA.height-200;

  this.vx=5;
  this.vy=5;

  this.draw = function() {
    contextGA.fillStyle = "#50FFAB"
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  }
}
