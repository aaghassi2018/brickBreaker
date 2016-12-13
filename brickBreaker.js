var canvasGA = document.getElementById("gameArea");
var contextGA = canvasGA.getContext("2d");
window.addEventListener('keydown', processKeyboardInput);
window.addEventListener('keyup', processKeyUp);

var gameInSession = false;


var bar = new Bar();
var ball = new Ball();
var bricks = [];

var easyCords = [125, 60, 55, 150, 55, 270, 125, 370, 325, 60, 395, 150, 395, 270, 325, 370];
var gameMode;



var left = false;
var right =false;


function initEasy(){
  gameMode = 'easy';
  for (var i = 0; i < easyCords.length; i +=2) {
    bricks.push(new Brick(easyCords[i], easyCords[i+1]));
  }
  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 0;
  ball.y = canvasGA.height-200;
  ball.vx=0.5;
  ball.vy=0.5;


  gameInSession=true;
  bar.draw();
  ball.draw();
  bricks.forEach(function(element) {
    element.draw();
  })
}

setInterval( playGame, 1 );
function playGame() {
	if(!gameInSession)
		return;

  update();
}

function processKeyboardInput(event) {
	var key = event.key;

	if(key == 'a'){
     left = true;
  }
	else if(key == 'd'){
     right = true;
  }

}

function processKeyUp(event) {
  var key = event.key;

  if(key == 'a'){
     left = false;
  }
  else if(key == 'd'){
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

    for(var i = 0; i < easyCords.length; i +=2){
      for(var j = 1; i < easyCords.length; i +=2){
        if(ball.x >= easyCords[i] && ball.x + ball.width <= easyCords[i] + 20
        && ball. y >= easyCords[j] && ball.y<= easyCords[j] +20){
          window.alert("hit!");
          //this doesn't work...
        }
      }
    }

    move();
    ball.update();
    drawStuff();

    if(ball.y >= canvasGA.height - bar.height - bar.height + 2){
      gameOver();
      gameInSession = false;
    }
}

function gameOver(){
  document.getElementById("body").innerHTML = "<h1 id='gameOver'> Game Over! </h1> <button type='button' onclick = 'location.reload()' style='padding:1em; margin-top:20px; margin-left: 125px; background-color:#FF0000'> Play Again? </button>";
}

function move() {
  if(right) {
    if(bar.x<canvasGA.width - bar.width) {
      bar.x += 2;
    }
  }
  if(left) {
    if(bar.x>0) {
      bar.x -= 2;
    }
  }
}

function drawStuff() {
  contextGA.fillStyle = "#FFFFFF";
	contextGA.fillRect(0, 0, canvasGA.width, canvasGA.height);


	bar.draw();
  ball.draw();
  bricks.forEach(function(element) {
    element.draw();
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

  this.vx=0.5;
  this.vy=0.5;

  this.draw = function() {
    contextGA.fillStyle = "#50FFAB"
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  }
}
