 
var ball,database,position,ballPosition,bg,balloonA;
function preload(){
  bg=loadImage("image/Hot Air Ballon-01.png");
  balloonA=loadAnimation("image/Hot Air Ballon-02.png","image/Hot Air Ballon-03.png"
      ,"image/Hot Air Ballon-04.png");
}
function setup(){
    database=firebase.database();

    //console.log(dB);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.addAnimation("balloonfly",balloonA)
    ball.scale=0.35
    ballPosition=database.ref('Ball/position');
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if (position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
        ball.scale=ball.scale-0.005
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
        ball.scale=ball.scale+0.005
    }
}
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function readPosition(data){
    position = data.val();
    ball.x=position.x
    ball.y=position.y
}
function showError(){
    console.log("error message displayed");
}
function writePosition(x,y){
    database.ref('Ball/position').set({
    'x' : position.x+x,
    'y' : position.y+y
    })
}