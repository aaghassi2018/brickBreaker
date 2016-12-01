var canvasGA = document.getElementById("gameArea");
var contextGA = canvasGA.getContext("2d");
window.addEventListener('keydown', processKeyboardInput);

var gameInSession = true;


var bar = new Bar();


init();

function init(){
  bar.draw(90);
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
    if(bar.x>= -25){
		  bar.x -= 14;
    }
  }
	else if(key == 'd'){
    if(bar.x<=canvasGA.width-59){
		  bar.x += 14;
    }
  }
}

function update() {

	if(!gameInSession)
		return;

    drawStuff();
}

function drawStuff() {
  contextGA.fillStyle = "#FFFFFF";
	contextGA.fillRect(0, 0, canvasGA.width, canvasGA.height);


	bar.draw();
}


function processUserInput(event) {

}

function Bar() {
	this.width = 80;
	this.height = 20;
	this.x = 90;
  this.y = canvasGA.height-this.height;

  this.draw = function() {
      contextGA.fillStyle = "#FF00FF";
  			contextGA.fillRect(this.x, this.y, this.width, this.height);
  		}

}
