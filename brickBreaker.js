var canvasGA = document.getElementById("gameArea");
var contextGA = canvasGA.getContext("2d");
window.addEventListener('keydown', processKeyboardInput);
window.addEventListener('keyup', processKeyUp);

var gameInSession = false;


var bar = new Bar();
var ball = new Ball();

var left = false;
var right =false;


function init(){
  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 0;
  ball.y = canvasGA.height-200;
  ball.vx=0.5;
  ball.vy=0.5;

  gameInSession=true;
  bar.draw();
  ball.draw();
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

    if(ball.y >= canvasGA.height - bar.height-20 && ball.x>bar.x && (ball.x + ball.width) <(bar.x+bar.width)){
      ball.vy *= -1;
    }
    move();
    ball.update();
    drawStuff();


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
