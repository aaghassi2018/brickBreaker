var canvasGA = document.getElementById("gameArea");
var contextGA = canvasGA.getContext("2d");

var previewCanvasGA = document.getElementById("preview");
var previewContectGA = previewCanvasGA.getContext("2d");
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
var longPaddleBricks = [];
var movingBricks1 = [];
var movingBricks2 = [];



var level1Cords = [126, 60, 66, 160, 66, 270, 126, 370, 326, 60, 396, 160, 396, 270, 326, 370];
var level1CordsDark = [];
var level1CordsShortPaddle = [];
var level1PaddleDissapearCords = [];
var level1CordsLongPaddle = [];
var level1CordsMovingBrick1 = [];
var level1CordsMovingBrick2 = [];


var level2Cords = [60,60,228,200,400,214,362,146,214,400, 80,110, 250,90, 200,330, 350,350, 20,400, 50,300, 300,22, 450,55, 120,250];
var level2CordsDark = [];
var level2CordsShortPaddle = [];
var level2PaddleDissapearCords = [];
var level2CordsLongPaddle = [];
var level2CordsMovingBrick1 = [];
var level2CordsMovingBrick2 = [];

var level3Cords = [10,0, 60,0, 90,0, 130,0, 170,0, 210,0, 260,0, 290,0, 330,0, 370,0, 410,0, 460,0, 60,160, 96,196, 140,240, 340,240, 260,160, 296,196];
var level3CordsDark = [46,146, 90,190, 136,236, 336,236, 290,190, 246,146];
var level3CordsShortPaddle = [];
var level3PaddleDissapearCords = [];
var level3CordsLongPaddle = [];
var level3CordsMovingBrick1 = [];
var level3CordsMovingBrick2 = [];

var level4Cords = [30,420, 30,399, 30,378, 30,357, 30,336, 30,315, 30,294, 30,273, 30,252, 30,231, 30,210, 30,189, 30,168,    110,420, 110,399, 110,378, 110,357, 110,336, 110,315, 110,294, 110,273, 110,252, 110,231, 110,210, 110,189, 110,168,    190,420, 190,399, 190,378, 190,357, 190,336, 190,315, 190,294, 190,273, 190,252, 190,231, 190,210, 190,189, 190,168,    270,420, 270,399, 270,378, 270,357, 270,336, 270,315, 270,294, 270,273, 270,252, 270,231, 270,210, 270,189, 270,168,    350,420, 350,399, 350,378, 350,357, 350,336, 350,315, 350,294, 350,273, 350,252, 350,231, 350,210, 350,189, 350,168,    430,420, 430,399, 430,378, 430,357, 430,336, 430,315, 430,294, 430,273, 430,252, 430,231, 430,210, 430,189, 430,168,    5,147, 46,147, 87,147, 128,147, 169,147, 210,147, 251,147, 292,147, 333,147, 374,147, 415,147, 456,147,    130,126, 135,105, 145,84, 160,63, 180,42, 205,21, 235,0, 270,0, 300,21, 325,42, 345,63, 360,84, 370,105, 375,126,    251,126, 251,105, 229,84, 271,84,    251,52];
var level4CordsDark = [242,43];
var level4CordsShortPaddle = [];
var level4PaddleDissapearCords = [];
var level4CordsLongPaddle = [];
var level4CordsMovingBrick1 = [];
var level4CordsMovingBrick2 = [];

var level5Cords = [200,290,170,310,140,330,120,310,100,290,80,270,60,250,40,230,20,210,40,190,60,190,80,170,100,170,120,150,140,130,160,110,180,90,200,70,220,90,240,110,260,130,280,150,300,170,320,170,340,190,360,190,380,210,360,230,340,250,320,270,300,290,280,310,260,330,230,310];
var level5CordsDark = [];
var level5CordsShortPaddle = [];
var level5PaddleDissapearCords = [];
var level5CordsLongPaddle = [];
var level5CordsMovingBrick1 = [];
var level5CordsMovingBrick2 = [];

var level6Cords = [1,450, 85,450, 169,450, 253,450, 336,450, 418,450,   43,430, 127,430, 211,430, 295,430, 377,430, 459,430,    1,410, 85,410, 169,410, 253,410, 336,410, 418,410,     43,390, 127,390, 211,390, 295,390, 377,390, 459,390,      1,370, 85,370, 169,370, 253,370, 336,370, 418,370,     43,350, 127,350, 211,350, 295,350, 377,350, 459,350,     1,330, 85,330, 169,330, 253,330, 336,330, 418,330,     43,310, 127,310, 211,310, 295,310, 377,310, 459,310,     1,290, 85,290, 169,290, 253,290, 336,290, 418,290,     43,270, 127,270, 211,270, 295,270, 377,270, 459,270,     1,250, 85,250, 169,250, 253,250, 336,250, 418,250,     43,230, 127,230, 211,230, 295,230, 377,230, 459,230,     1,210, 85,210, 169,210, 253,210, 336,210, 418,210,    43,190, 127,190, 211,190, 295,190, 377,190, 459,190,    1,170, 85,170, 169,170, 253,170, 336,170, 418,170,    43,150, 127,150, 211,150, 295,150, 377,150, 459,150,     1,130, 85,130, 169,130, 253,130, 336,130, 418,130,    43,110, 127,110, 211,110, 295,110, 377,110, 459,110,    1,90, 85,90, 169,90, 253,90, 336,90, 418,90,    43,70, 127,70, 211,70, 295,70, 377,70, 459,70,    1,50, 85,50, 169,50, 253,50, 336,50, 418,50,    43,30, 127,30, 211,30, 295,30, 377,30, 459,30,    1,10, 85,10, 169,10, 253,10, 336,10, 418,10,    43,0, 127,0, 211,0, 295,0, 377,0, 459,0];
var level6CordsDark = [-4,200, 60,200, 124,200, 188,200, 252,200, 316,200, 380,200, 444,200];
var level6CordsShortPaddle = [];
var level6PaddleDissapearCords = [];
var level6CordsLongPaddle = [];
var level6CordsMovingBrick1 = [];
var level6CordsMovingBrick2 = [];


//special mode


var level1SCords = [100,210,40,236,40,276,100,300,160,236,160,276,76,100,176,100,276,100,376,100];
var level1SCordsDark = [];
var level1SCordsShortPaddle = [300,300];
var level1SPaddleDissapearCords = [];
var level1SCordsLongPaddle = [100,253];
var level1SCordsMovingBrick1 = [];
var level1SCordsMovingBrick2 = [];

var level2SCords = [76,26,176,26,276,26,376,26,360,240,360,160,360,200,260,240,260,200,260,160];
var level2SCordsDark = [];
var level2SCordsShortPaddle = [];
var level2SPaddleDissapearCords = [103,263];
var level2SCordsLongPaddle = [310,200];
var level2SCordsMovingBrick1 = [];
var level2SCordsMovingBrick2 = [];

var level3SCords = [360,220, 420,69, 69,420, 6,6, 450,450];
var level3SCordsDark = [];
var level3SCordsShortPaddle = [];
var level3SPaddleDissapearCords = [];
var level3SCordsLongPaddle = [];
var level3SCordsMovingBrick1 = [360,140];
var level3SCordsMovingBrick2 = [100,100];

var level4SCords = [1,450, 43,450, 85,450, 127,450, 169,450, 211,450, 253,450, 295,450, 336,450, 377,450, 418,450, 459,450,    1,250, 43,250, 85,250, 127,250, 169,250, 211,250, 253,250, 295,250, 336,250, 377,250, 418,250, 459,250,     1,200, 43,200, 85,200, 127,200, 169,200, 211,200, 253,200, 295,200, 336,200, 377,200, 418,200, 459,200,    1,0, 43,0, 85,0, 127,0, 169,0, 211,0, 253,0, 295,0, 336,0, 377,0, 418,0, 459,0,      43,430,  127,430,  211,430,  295,430,  377,430,  459,430];
var level4SCordsDark = [];
var level4SCordsShortPaddle = [120,175, 350,230, 30,400];
var level4SPaddleDissapearCords = [80,350, 250,280, 322,124];
var level4SCordsLongPaddle = [400,300, 200,230, 450,280, 120,340];
var level4SCordsMovingBrick1 = [30,30];
var level4SCordsMovingBrick2 = [430,140];

var level5SCords = [1,0, 43,0, 85,0, 127,0, 169,0, 211,0, 253,0, 295,0, 336,0, 377,0, 418,0, 459,0,    43,21, 85,21, 127,21, 169,21, 211,21, 253,21, 295,21, 336,21, 377,21, 418,21,    63,42, 105,42, 189,42, 231,42, 273,42, 356,42, 397,42,    83,63, 209,63, 251,63, 376,63,    229,84,        1,40, 1,80, 1,120, 1,160, 1,200, 1,240, 1,280, 1,320, 1,360, 1,400, 1,440,    459,40, 459,80, 459,120, 459,160, 459,200, 459,240, 459,280, 459,320, 459,360, 459,400, 459,440,          189,166,     336,187,   336,229,    189,250,         43,208, 85,208, 127,208, 169,208, 211,208, 253,208, 295,208, 336,208, 377,208, 418,208];
var level5SCordsDark = [];
var level5SCordsShortPaddle = [229,104, 229,125, 83,145, 231,166, 273,166, 211,187, 253,187, 356,166,     229,292, 83,271, 231,250, 273,250, 211,229, 253,229, 356,250];
var level5SPaddleDissapearCords = [83,105, 209,145, 251,145, 397,166, 377,187, 418,187,     209,271, 251,271, 397,250, 377,229, 418,229];
var level5SCordsLongPaddle = [376,105, 376,145, 63,166, 105,166, 43,187, 85,187, 127,187, 295,187, 169,187,     376,271, 63,250, 105,250, 43,229, 85,229, 127,229, 295,229, 169,229];
var level5SCordsMovingBrick1 = [];
var level5SCordsMovingBrick2 = [];


var level6SCordsDark = [];
var level6SCordsShortPaddle = [43,0, 127,0, 211,0, 295,0, 377,0, 459,0, 1,50, 85,50, 169,50, 253,50, 336,50, 418,50, 43,110, 127,110, 211,110, 295,110, 377,110, 459,110, 1,170, 85,170, 169,170, 253,170, 336,170, 418,170, 43,230, 127,230, 211,230, 295,230, 377,230, 459,230, 1,290, 85,290, 169,290, 253,290, 336,290, 418,290, 43,350, 127,350, 211,350, 295,350, 377,350, 459,350, 1,410, 85,410, 169,410, 253,410, 336,410, 418,410];
var level6SPaddleDissapearCords = [1,10, 85,10, 169,10, 253,10, 336,10, 418,10, 43,70, 127,70, 211,70, 295,70, 377,70, 459,70, 1,130, 85,130, 169,130, 253,130, 336,130, 418,130, 43,190, 127,190, 211,190, 295,190, 377,190, 459,190, 1,250, 85,250, 169,250, 253,250, 336,250, 418,250, 43,310, 127,310, 211,310, 295,310, 377,310, 459,310, 1,370, 85,370, 169,370, 253,370, 336,370, 418,370, 43,430, 127,430, 211,430, 295,430, 377,430, 459,430];
var level6SCordsLongPaddle = [43,30, 127,30, 211,30, 295,30, 377,30, 459,30, 1,90, 85,90, 169,90, 253,90, 336,90, 418,90, 43,150, 127,150, 211,150, 295,150, 377,150, 459,150, 1,210, 85,210, 169,210, 253,210, 336,210, 418,210, 43,270, 127,270, 211,270, 295,270, 377,270, 459,270, 1,330, 85,330, 169,330, 253,330, 336,330, 418,330, 43,390, 127,390, 211,390, 295,390, 377,390, 459,390, 1,450, 85,450, 169,450, 253,450, 336,450, 418,450];
var level6SCordsMovingBrick1 = [];
var level6SCordsMovingBrick2 = [];
var level6SCords = [];

var levelMCords = [];
var levelMCordsDark = [];
var levelMCordsShortPaddle = [];
var levelMPaddleDissapearCords = [];
var levelMCordsLongPaddle = [];



var workingCords = [];
var workingCordsDark = [];


//special mode
var workingCordsShortPaddle = [];
var workingCordsPaddleDissapear = [];
var workingCordsLongPaddle = [];
var workingCordsMovingBrick1 = [];
var workingCordsMovingBrick2 = [];

var left = false;
var right =false;
var once = 0;
var currL;

var l1;
var l2;
var l3;
var l4;
var l5;
var l6;

var l1S;
var l2S;
var l3S;
var l4S;
var l5S;
var l6S;

var lM;

var playGameTimeout = 33;

var time = 3;

var shouldDrawBar = true;

var haveMovedBrick1 = false;
var haveMovedBrick2 = false;

var brickColor = "#FF0000";

var shouldBeRed1 = false;
var shouldBeRed2 = false;

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
  l4 = getCookie("l4");
  l5 = getCookie("l5");
  l6 = getCookie("l6");


  l1S = getCookie("l1S");
  l2S = getCookie("l2S");
  l3S = getCookie("l3S");
  l4S = getCookie("l4S");
  l5S = getCookie("l5S");
  l6S = getCookie("l6S");

  if (l1 == null) {
    l1 = '0';
  }
  if (l2 == null) {
    l2 = '0';
  }
  if (l3 == null) {
    l3 = '0';

  }
  if (l4 == null) {
    l4 = '0';

  }
  if (l5 == null) {
    l5 = '0';

  }
  if (l6 == null) {
    l6 = '0';

  }
  if (l1S == null) {
    l1S = '0';

  }
  if (l2S == null) {
    l2S = '0';

  }
  if (l3S == null) {
    l3S = '0';

  }
  if (l4S == null) {
    l4S = '0';

  }
  if (l5S == null) {
    l5S = '0';

  }
  if (l6S == null) {
    l6S = '0';

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
  if(l4 == 1){
    document.getElementById("l4B").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l4B").style.backgroundColor = "#FF0000";
  }
  if(l5 == 1){
    document.getElementById("l5B").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l5B").style.backgroundColor = "#FF0000";
  }
  if(l6 == 1){
    document.getElementById("l6B").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l6B").style.backgroundColor = "#FF0000";
  }
  if(l1S == 1){
    document.getElementById("l1SB").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l1SB").style.backgroundColor = "#FF0000";
  }
  if(l2S == 1){
    document.getElementById("l2SB").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l2SB").style.backgroundColor = "#FF0000";
  }
  if(l3S == 1){
    document.getElementById("l3SB").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l3SB").style.backgroundColor = "#FF0000";
  }
  if(l4S == 1){
    document.getElementById("l4SB").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l4SB").style.backgroundColor = "#FF0000";
  }
  if(l5S == 1){
    document.getElementById("l5SB").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l5SB").style.backgroundColor = "#FF0000";
  }
  if(l6S == 1){
    document.getElementById("l6SB").style.backgroundColor = "#00FF00";
  }
  else {
    document.getElementById("l6SB").style.backgroundColor = "#FF0000";
  }
}

function init1(){

  workingCords = level1Cords;
  workingCordsDark = level1CordsDark;
  workingCordsShortPaddle = level1CordsShortPaddle;
  workingCordsPaddleDissapear = level1PaddleDissapearCords;
  workingCordsLongPaddle = level1CordsLongPaddle;
  workingCordsMovingBrick1 = level1CordsMovingBrick1;
  workingCordsMovingBrick2 = level1CordsMovingBrick2;


  currL = 1;

  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";



  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;


  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init2(){
  workingCords = level2Cords;
  workingCordsDark = level2CordsDark;
  workingCordsShortPaddle = level2CordsShortPaddle;
  workingCordsPaddleDissapear = level2PaddleDissapearCords;
  workingCordsLongPaddle = level2CordsLongPaddle;
  workingCordsMovingBrick1 = level2CordsMovingBrick1;
  workingCordsMovingBrick2 = level2CordsMovingBrick2;
  currL = 2;
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;


  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init3(){
  workingCords = level3Cords;
  workingCordsDark = level3CordsDark;
  workingCordsShortPaddle = level3CordsShortPaddle;
  workingCordsPaddleDissapear = level3PaddleDissapearCords;
  workingCordsLongPaddle = level3CordsLongPaddle;
  workingCordsMovingBrick1 = level3CordsMovingBrick1;
  workingCordsMovingBrick2 = level3CordsMovingBrick2;

  currL = 3;
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}
function init4(){
  workingCords = level4Cords;
  workingCordsDark = level4CordsDark;
  workingCordsShortPaddle = level4CordsShortPaddle;
  workingCordsPaddleDissapear = level4PaddleDissapearCords;
  workingCordsLongPaddle = level4CordsLongPaddle;
  workingCordsMovingBrick1 = level4CordsMovingBrick1;
  workingCordsMovingBrick2 = level4CordsMovingBrick2;

  currL = 4;
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init5(){
  workingCords = level5Cords;
  workingCordsDark = level5CordsDark;
  workingCordsShortPaddle = level5CordsShortPaddle;
  workingCordsPaddleDissapear = level5PaddleDissapearCords;
  workingCordsLongPaddle = level5CordsLongPaddle;
  workingCordsMovingBrick1 = level5CordsMovingBrick1;
  workingCordsMovingBrick2 = level5CordsMovingBrick2;

  currL = 5;
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init6(){
  workingCords = level6Cords;
  workingCordsDark = level6CordsDark;
  workingCordsShortPaddle = level6CordsShortPaddle;
  workingCordsPaddleDissapear = level6PaddleDissapearCords;
  workingCordsLongPaddle = level6CordsLongPaddle;
  workingCordsMovingBrick1 = level6CordsMovingBrick1;
  workingCordsMovingBrick2 = level6CordsMovingBrick2;

  currL = 6;
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }
  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init1S(){
  workingCords = level1SCords;
  workingCordsDark = level1SCordsDark;
  workingCordsShortPaddle = level1SCordsShortPaddle;
  workingCordsPaddleDissapear = level1SPaddleDissapearCords;
  workingCordsLongPaddle = level1SCordsLongPaddle;
  workingCordsMovingBrick1 = level1SCordsMovingBrick1;
  workingCordsMovingBrick2 = level1SCordsMovingBrick2;
  currL = 'l1S';
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }


  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init2S(){
  workingCords = level2SCords;
  workingCordsDark = level2SCordsDark;
  workingCordsShortPaddle = level2SCordsShortPaddle;
  workingCordsPaddleDissapear = level2SPaddleDissapearCords;
  workingCordsLongPaddle = level2SCordsLongPaddle;
  workingCordsMovingBrick1 = level2SCordsMovingBrick1;
  workingCordsMovingBrick2 = level2SCordsMovingBrick2;

  currL = 'l2S';
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }


  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init3S(){
  workingCords = level3SCords;
  workingCordsDark = level3SCordsDark;
  workingCordsShortPaddle = level3SCordsShortPaddle;
  workingCordsPaddleDissapear = level3SPaddleDissapearCords;
  workingCordsLongPaddle = level3SCordsLongPaddle;
  workingCordsMovingBrick1 = level3SCordsMovingBrick1;
  workingCordsMovingBrick2 = level3SCordsMovingBrick2;

  currL = 'l3S';
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }


  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init4S(){
  workingCords = level4SCords;
  workingCordsDark = level4SCordsDark;
  workingCordsShortPaddle = level4SCordsShortPaddle;
  workingCordsPaddleDissapear = level4SPaddleDissapearCords;
  workingCordsLongPaddle = level4SCordsLongPaddle;
  workingCordsMovingBrick1 = level4SCordsMovingBrick1;
  workingCordsMovingBrick2 = level4SCordsMovingBrick2;

  currL = 'l4S';
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
  }


  document.getElementById("rightOfGameArea").style.visibility = "hidden";


  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;
  playGame();
  bar.draw();
  ball.draw();

}

function init5S(){
  workingCords = level5SCords;
  workingCordsDark = level5SCordsDark;
  workingCordsShortPaddle = level5SCordsShortPaddle;
  workingCordsPaddleDissapear = level5SPaddleDissapearCords;
  workingCordsLongPaddle = level5SCordsLongPaddle;
  workingCordsMovingBrick1 = level5SCordsMovingBrick1;
  workingCordsMovingBrick2 = level5SCordsMovingBrick2;

  currL = 'l5S';
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
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

function init6S(){
  workingCords = level6SCords;
  workingCordsDark = level6SCordsDark;
  workingCordsShortPaddle = level6SCordsShortPaddle;
  workingCordsPaddleDissapear = level6SPaddleDissapearCords;
  workingCordsLongPaddle = level6SCordsLongPaddle;
  workingCordsMovingBrick1 = level6SCordsMovingBrick1;
  workingCordsMovingBrick2 = level6SCordsMovingBrick2;

  currL = 'l6S';
  for (var i = 0; i < workingCords.length; i +=2) {
    bricks.push(new Brick(workingCords[i], workingCords[i+1]));
  }
  for (var i = 0; i < workingCordsDark.length; i +=2) {
    darkBricks.push(new darkBrick(workingCordsDark[i], workingCordsDark[i+1]));
  }
  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    shortPaddleBricks.push(new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    paddleDissapearBricks.push(new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]));
  }
  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    longPaddleBricks.push(new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
    movingBricks1.push(new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]));
  }
  for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
    movingBricks2.push(new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]));
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

function initM(){
  currL = 'lM';
  if(workingCords.length == 0 && workingCordsDark.length == 0 && workingCordsShortPaddle.length == 0 && workingCordsShortPaddle.length == 0 && workingCordsPaddleDissapear.length == 0 && workingCordsLongPaddle.length == 0 && workingCordsMovingBrick1.length == 0 && workingCordsMovingBrick2.length == 0){
    return;
  }


  document.getElementById("rightOfGameArea").style.visibility = "hidden";
  document.getElementById("yoyo").style.visibility = "hidden";
  document.getElementById("gameOn").style.visibility='visible';
  document.getElementById("previewDiv").style.visibility='hidden';



  bar.x = 90;
  bar.y = canvasGA.height-bar.height;

  ball.x = 5;
  ball.y = canvasGA.height-200;
  ball.vx=6;
  ball.vy=6;



  gameInSession=true;
  playGameTimeout = 33;

  playGame();
  bar.draw();
  ball.draw();

}

function showOptions(){
  document.getElementById("rightOfGameArea").style.visibility = "hidden";
  document.getElementById("yoyo").style.visibility = "visible";
  document.getElementById("gameOn").style.visibility='hidden';
  document.getElementById("previewDiv").style.visibility='visible';

}

function addCords(){
  if(isNaN(document.getElementById("userNormalX").value) || document.getElementById("userNormalX").value < 0 || document.getElementById("userNormalX").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }
  if(isNaN(document.getElementById("userNormalY").value) || document.getElementById("userNormalY").value < 0 || document.getElementById("userNormalY").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }

  if(isNaN(document.getElementById("userDarkX").value) || document.getElementById("userDarkX").value < 0 || document.getElementById("userDarkX").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }

  if(isNaN(document.getElementById("userDarkY").value) || document.getElementById("userDarkY").value < 0 || document.getElementById("userDarkY").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }
  if(isNaN(document.getElementById("userShortX").value) || document.getElementById("userShortX").value < 0 || document.getElementById("userShortX").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }
  if(isNaN(document.getElementById("userShortY").value) || document.getElementById("userShortY").value < 0 || document.getElementById("userShortY").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }
  if(isNaN(document.getElementById("userLongX").value) || document.getElementById("userLongX").value < 0 || document.getElementById("userLongX").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }
  if(isNaN(document.getElementById("userLongY").value) || document.getElementById("userLongY").value < 0 || document.getElementById("userLongY").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }
  if(isNaN(document.getElementById("userDarkX").value) || document.getElementById("userDarkX").value < 0 || document.getElementById("userDarkX").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }

  if(isNaN(document.getElementById("userDissapearX").value) || document.getElementById("userDissapearX").value < 0 || document.getElementById("userDissapearX").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }

  if(isNaN(document.getElementById("userDissapearY").value) || document.getElementById("userDissapearY").value < 0 || document.getElementById("userDissapearY").value > 400){
    window.alert('Coordinantes must be a number between 1 and 400...')
    return;
  }


  previewContectGA.fillStyle = "#FFFFFF";
  previewContectGA.fillRect(0, 0, canvasGA.width, canvasGA.height);

  if (document.getElementById("userNormalX").value != "" && document.getElementById("userNormalY") != "") {
    levelMCords.push(parseInt(document.getElementById('userNormalX').value));
    levelMCords.push(parseInt(document.getElementById('userNormalY').value));
  }
  if (document.getElementById("userDarkX").value != "" && document.getElementById("userDarkY") != "") {
  levelMCordsDark.push(parseInt(document.getElementById('userDarkX').value));
  levelMCordsDark.push(parseInt(document.getElementById('userDarkY').value));
}
if (document.getElementById("userShortX").value != "" && document.getElementById("userShortY") != "") {
  levelMCordsShortPaddle.push(parseInt(document.getElementById('userShortX').value));
  levelMCordsShortPaddle.push(parseInt(document.getElementById('userShortY').value));
}
if (document.getElementById("userLongX").value != "" && document.getElementById("userLongY") != "") {
  levelMCordsLongPaddle.push(parseInt(document.getElementById('userLongX').value));
  levelMCordsLongPaddle.push(parseInt(document.getElementById('userLongY').value));
}
if (document.getElementById("userDissapearX").value != "" && document.getElementById("userDissapearY") != "") {
  levelMPaddleDissapearCords.push(parseInt(document.getElementById('userDissapearX').value));
  levelMPaddleDissapearCords.push(parseInt(document.getElementById('userDissapearY').value));
}

  workingCords = levelMCords;
  workingCordsDark = levelMCordsDark;
  workingCordsShortPaddle = levelMCordsShortPaddle;
  workingCordsPaddleDissapear = levelMPaddleDissapearCords;
  workingCordsLongPaddle = levelMCordsLongPaddle;


  bricks = [];
  darkBricks = [];
  shortPaddleBricks = [];
  longPaddleBricks = [];
  paddleDissapearBricks = [];

  for (var i = 0; i < workingCords.length; i +=2) {
    var curBrick = new Brick(workingCords[i], workingCords[i+1]);
    bricks.push(curBrick);
  }

  for (var i = 0; i < workingCordsDark.length; i +=2) {
    var curBrick = new darkBrick(workingCordsDark[i], workingCordsDark[i+1]);
    darkBricks.push(curBrick);
  }

  for (var i = 0; i < workingCordsShortPaddle.length; i +=2) {
    var curBrick = new shortPaddleBrick(workingCordsShortPaddle[i], workingCordsShortPaddle[i+1]);
    shortPaddleBricks.push(curBrick);
  }

  for (var i = 0; i < workingCordsLongPaddle.length; i +=2) {
    var curBrick = new longPaddleBrick(workingCordsLongPaddle[i], workingCordsLongPaddle[i+1]);
    longPaddleBricks.push(curBrick);
  }

  for (var i = 0; i < workingCordsPaddleDissapear.length; i +=2) {
    var curBrick = new paddleDissapearBrick(workingCordsPaddleDissapear[i], workingCordsPaddleDissapear[i+1]);
    paddleDissapearBricks.push(curBrick);
  }

  document.getElementById('userNormalX').value = "";
  document.getElementById('userNormalY').value = "";
  document.getElementById('userDarkX').value = "";
  document.getElementById('userDarkY').value = "";
  document.getElementById('userShortX').value = "";
  document.getElementById('userShortY').value = "";
  document.getElementById('userLongX').value = "";
  document.getElementById('userLongY').value = "";
  document.getElementById('userDissapearX').value = "";
  document.getElementById('userDissapearY').value = "";


  bricks.forEach(function(Brick) {
    Brick.prevDraw();
  })
  darkBricks.forEach(function(darkBrick) {
    darkBrick.prevDraw();
  })
  shortPaddleBricks.forEach(function(shortBrick) {
    shortBrick.prevDraw();
  })
  paddleDissapearBricks.forEach(function(paddleDissapearBrick) {
    paddleDissapearBrick.prevDraw();
  })
  longPaddleBricks.forEach(function(longBrick) {
    longBrick.prevDraw();
  })


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
  if(workingCords.length == 0 && workingCordsDark.length == 0 && workingCordsShortPaddle.length == 0 && workingCordsShortPaddle.length == 0 && workingCordsPaddleDissapear.length == 0 && workingCordsLongPaddle.length == 0 && workingCordsMovingBrick1.length == 0 && workingCordsMovingBrick2.length == 0){
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
  if(ball.x <= 0 || ball.x+ball.width >= canvasGA.width+2){
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
        if(i == 0){
          bricks.splice(0,1);
        }
        else {
          bricks.splice(i/2,1);
        }
        checkForWin();
      }
    }
  }
  for(var i = 0; i < workingCordsDark.length; i +=2){
    if(ball.x + ball.width >= workingCordsDark[i] && ball.x <= workingCordsDark[i]+ 66){
      if(ball.y + ball.height >= workingCordsDark[i+1] && ball.y <= workingCordsDark[i+1] + 40){
        bro(workingCordsDark[i],workingCordsDark[i+1]);
        workingCordsDark.splice(i,2);
        if(i == 0){
          darkBricks.splice(0,1);
        }
        else {
          darkBricks.splice(i/2,1);
        }

      }
    }
    checkForWin();
  }
  for(var i = 0; i < workingCordsShortPaddle.length; i +=2){
    if(ball.x + ball.width >= workingCordsShortPaddle[i] && ball.x <= workingCordsShortPaddle[i]+ 40){
      if(ball.y + ball.height >= workingCordsShortPaddle[i+1] && ball.y <= workingCordsShortPaddle[i+1] + 20){
        bro(workingCordsShortPaddle[i],workingCordsShortPaddle[i+1]);
        workingCordsShortPaddle.splice(i,2);
        if(i == 0){
          shortPaddleBricks.splice(0,1);
        }
        else {
          shortPaddleBricks.splice(i/2,1);
        }
        bar.width = 60;
      }
    }
    checkForWin();
  }
  for(var i = 0; i < workingCordsPaddleDissapear.length; i +=2){
    if(ball.x + ball.width >= workingCordsPaddleDissapear[i] && ball.x <= workingCordsPaddleDissapear[i]+ 40){
      if(ball.y + ball.height >= workingCordsPaddleDissapear[i+1] && ball.y <= workingCordsPaddleDissapear[i+1] + 20){
        bro(workingCordsPaddleDissapear[i],workingCordsPaddleDissapear[i+1]);
        workingCordsPaddleDissapear.splice(i,2);
        if(i == 0){
          paddleDissapearBricks.splice(0,1);
        }
        else {
          paddleDissapearBricks.splice(i/2,1);
        }
        show6Sec();
      }
    }
    checkForWin();
  }
  for(var i = 0; i < workingCordsLongPaddle.length; i +=2){
    if(ball.x + ball.width >= workingCordsLongPaddle[i] && ball.x <= workingCordsLongPaddle[i]+ 40){
      if(ball.y + ball.height >= workingCordsLongPaddle[i+1] && ball.y <= workingCordsLongPaddle[i+1] + 20){
        bro(workingCordsLongPaddle[i],workingCordsLongPaddle[i+1]);
        workingCordsLongPaddle.splice(i,2);
        if(i == 0){
          longPaddleBricks.splice(0,1);
        }
        else {
          longPaddleBricks.splice(i/2,1);
        }
        bar.width = 200;
      }
    }
    checkForWin();
  }
  for(var i = 0; i < workingCordsMovingBrick1.length; i +=2){
    if(ball.x + ball.width >= workingCordsMovingBrick1[i] && ball.x <= workingCordsMovingBrick1[i]+ 40){
      if(ball.y + ball.height >= workingCordsMovingBrick1[i+1] && ball.y <= workingCordsMovingBrick1[i+1] + 20){
        bro(workingCordsMovingBrick1[i],workingCordsMovingBrick1[i+1]);
        moveBrick1(i);
      }
    }
  }
  for(var i = 0; i < workingCordsMovingBrick2.length; i +=2){
    if(ball.x + ball.width >= workingCordsMovingBrick2[i] && ball.x <= workingCordsMovingBrick2[i]+ 40){
      if(ball.y + ball.height >= workingCordsMovingBrick2[i+1] && ball.y <= workingCordsMovingBrick2[i+1] + 20){
        bro(workingCordsMovingBrick2[i],workingCordsMovingBrick2[i+1]);
        moveBrick2(i);
      }
    }
    checkForWin();
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

function moveBrick1(i){
  if(haveMovedBrick1 == true){
    workingCordsMovingBrick1 = [];
    movingBricks1 = [];
  }
  else
  {

    var x = workingCordsMovingBrick1[i];
    var y = workingCordsMovingBrick1[i+1];
    var newX = Math.floor((Math.random() * 400) + 1);
    var newY = Math.floor((Math.random() * 400) + 1);



    workingCordsMovingBrick1.splice(i,2);
    movingBricks1.splice(i/2,1);

    workingCordsMovingBrick1[i] = newX;
    workingCordsMovingBrick1[i+1] = newY;
    level3SCordsMovingBrick1[i] = newX;
    level3SCordsMovingBrick1[i+1] = newY;

    for (var i = 0; i < workingCordsMovingBrick1.length; i +=2) {
      var curBrick = new movingBrick1(workingCordsMovingBrick1[i], workingCordsMovingBrick1[i+1]);
      shouldBeRed1 = true;
      movingBricks1.push(curBrick);
    }
    haveMovedBrick1 = true;
  }
}

function moveBrick2(i){
  if(haveMovedBrick2 == true){
    workingCordsMovingBrick2 = [];
    movingBricks2 = [];
  }
  else
  {

    var x = workingCordsMovingBrick2[i];
    var y = workingCordsMovingBrick2[i+1];
    var newX = Math.floor((Math.random() * 400) + 1);
    var newY = Math.floor((Math.random() * 400) + 1);



    workingCordsMovingBrick2.splice(i,2);
    movingBricks2.splice(i/2,1);

    workingCordsMovingBrick2[i] = newX;
    workingCordsMovingBrick2[i+1] = newY;
    level3SCordsMovingBrick2[i] = newX;
    level3SCordsMovingBrick2[i+1] = newY;


    for (var i = 0; i < workingCordsMovingBrick2.length; i +=2) {
      var curBrick = new movingBrick2(workingCordsMovingBrick2[i], workingCordsMovingBrick2[i+1]);
      shouldBeRed2 = true;
      movingBricks2.push(curBrick);
    }
    haveMovedBrick2 = true;
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
  if(currL == 4){
    setCookie('l4','1');
  }
  if(currL == 5){
    setCookie('l5','1');
  }
  if(currL == 6){
    setCookie('l6','1');
  }
  if(currL == 'l1S'){
    setCookie('l1S','1');
  }
  if(currL == 'l2S'){
    setCookie('l2S','1');
  }
  if(currL == 'l3S'){
    setCookie('l3S','1');
  }
  if(currL == 'l4S'){
    setCookie('l4S','1');
  }
  if(currL == 'l5S'){
    setCookie('l5S','1');
  }
  if(currL == 'l6S'){
    setCookie('l6S','1');
  }
  checkProgress()
  document.getElementById("rightOfInGame").style.visibility = "hidden";
  document.getElementById("youWinDiv").style.visibility='visible';
  document.getElementById("gameOn").style.visibility='hidden';
  gameInSession=false;
}

function bro(x,y){

  console.log(x + ", " + y)
  console.log("Ball: " + ball.x + ", " + ball.y)


  for(once; once< 1; once++){

    //if ball.y is between the brick y and the brick y + 20
    if(ball.y > y - 19 + ball.vy && ball.y < y + 19 + ball.vy) {
      ball.vx*=-1;
      ball.x += ball.vx;

    }
    else //(ball.x <= x || ball.x+ball.width > x+40){
      {
      ball.vy*= -1;
      ball.y += ball.vy;
    }
  }

}

function checkForWin(){
  if(workingCords.length == 0 && workingCordsDark.length == 0 && workingCordsShortPaddle.length == 0 && workingCordsShortPaddle.length == 0 && workingCordsPaddleDissapear.length == 0 && workingCordsLongPaddle.length == 0 && workingCordsMovingBrick1.length == 0 && workingCordsMovingBrick2.length == 0){
    win();
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
      bar.x += 6.6;
    }
  }
  if(left) {
    if(bar.x>0) {
      bar.x -= 6.6;
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
  longPaddleBricks.forEach(function(longBrick) {
    longBrick.draw();
  })
  movingBricks1.forEach(function(movingBrick1) {
    movingBrick1.draw();
  })
  movingBricks2.forEach(function(movingBrick2) {
    movingBrick2.draw();
  })
}

function show6Sec(){

  document.getElementById("rightOfInGame").style.visibility = "visible";
  document.getElementById("secRemaining").innerHTML = time;

  shouldDrawBar = false;

  var lala = setTimeout(show6Sec, 1000);
  time--;


  if(time == -2 || gameInSession == false){
    clearInterval(lala);
    time = 3;
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
    if(this.x == ""){
      bricks.splice(0,2);
      workingCords.splice(0,2);
    }
    else {
    contextGA.fillStyle = "#FF0000";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }
  }
  this.prevDraw = function() {
    if(this.x == ""){

    }
    else {
        previewContectGA.fillStyle = "#FF0000";
        previewContectGA.fillRect(this.x, this.y, this.width, this.height);
    }
  }

}

function shortPaddleBrick(x, y) {
  this.width = 40;
  this.height = 20;
  this.x = x;
  this.y = y;

  this.draw = function() {
    if(this.x == ""){
      shortPaddleBricks.splice(0,2);
      workingCordsShortPaddle.splice(0,2);
    }
    else {
    contextGA.fillStyle = "#000000";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }
  }
  this.prevDraw = function() {
    if(this.x == ""){

    }
    else {
        previewContectGA.fillStyle = "#000000";
        previewContectGA.fillRect(this.x, this.y, this.width, this.height);
    }
  }

}
function longPaddleBrick(x, y) {
  this.width = 40;
  this.height = 20;
  this.x = x;
  this.y = y;

  this.draw = function() {
    if(this.x == ""){
      longPaddleBricks.splice(0,2);
      workingCordsLongPaddle.splice(0,2);
    }
    else {
    contextGA.fillStyle = "#000000";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }
  }
  this.prevDraw = function() {
    if(this.x == ""){

    }
    else {
        previewContectGA.fillStyle = "#000000";
        previewContectGA.fillRect(this.x, this.y, this.width, this.height);
    }
  }

}

function paddleDissapearBrick(x, y) {
  this.width = 40;
  this.height = 20;
  this.x = x;
  this.y = y;

  this.draw = function() {
    if(this.x == ""){
      paddleDissapearBricks.splice(0,2);
      workingCordsPaddleDissapear.splice(0,2);
    }
    else {
    contextGA.fillStyle = "#000000";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }
  }
  this.prevDraw = function() {
      if(this.x == ""){

      }
      else {
          previewContectGA.fillStyle = "#000000";
          previewContectGA.fillRect(this.x, this.y, this.width, this.height);
      }
    }

}

function movingBrick1(x, y) {
  var color1 = "#000000";
  this.width = 40;
  this.height = 20;
  this.x = x;
  this.y = y;

  this.draw = function() {
    if(shouldBeRed1 == true){
      contextGA.fillStyle = brickColor;
    }
    else {
      contextGA.fillStyle = color1;
    }

    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

}
function movingBrick2(x, y) {
  var color2 = "#000000";
  this.width = 40;
  this.height = 20;
  this.x = x;
  this.y = y;

  this.draw = function() {
    if(shouldBeRed2 == true){
      contextGA.fillStyle = brickColor;
    }
    else {
      contextGA.fillStyle = color2;
    }

    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }



}

function darkBrick(x, y) {
  this.width = 60;
  this.height = 40;
  this.x = x;
  this.y = y;

  this.draw = function() {
    if(this.x == ""){
      darkBricks.splice(0,2);
      workingCordsDark.splice(0,2);
    }
    else {
    contextGA.fillStyle = "#990000";
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }
  }
  this.prevDraw = function() {
    if(this.x == ""){

    }
    else {
        previewContectGA.fillStyle = "#990000";
        previewContectGA.fillRect(this.x, this.y, this.width, this.height);
    }
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
    contextGA.fillStyle = "#60FFAB"
    contextGA.fillRect(this.x, this.y, this.width, this.height);
  }

  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  }
}
