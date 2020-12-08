var gameState="PLAY";
var wall,wallImage;
var door,doorImage;
var doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibeBlockGroup,invisibleBlock;
var spookySound;

function preload(){
  wallImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  
  spookySound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  wall=createSprite(300,300,600,10);
  wall.addImage(wallImage);
  wall.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  
  invisibleBlockGroup=new Group();
  climberGroup=new Group();
  doorGroup=new Group();
}
function draw(){
  background("white");
  if(gameState==="PLAY"){
  if(wall.y>600){
     wall.y=300;
  }
  if(keyDown("left")){
     ghost.x=ghost.x-3;
   }
  if(keyDown("right")){
     ghost.x=ghost.x+3;
   }
  if(keyDown("space")){
     ghost.velocityY=-5;
   }
   ghost.velocityY=ghost.velocityY+0.2;
  
  if(climberGroup.isTouching(ghost)){
       ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
  }

  spawndoors();
  drawSprites();
 }
  if(gameState==="end"){
    textSize(30);
    fill("yellow");
    stroke("black");
    text("GAMEOVER",230,50);
  }
     
     
}
function spawndoors(){
  if(frameCount%240===0){
  door=createSprite(200,-50,10,10);
  door.addImage(doorImage);
  climber=createSprite(200,10,10,10);
  climber.addImage(climberImage);
  invisibleBlock=createSprite(200,15,10,10);
  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;
  door.velocityY=1;
  door.x=Math.round(random(120,400));
  climber.x=door.x;
  climber.velocityY=1;
  invisibleBlock.x=door.x;
  invisibleBlock.velocityY=1;
  door.lifetime=700;
  climber.lifetime=800;
  doorGroup.add(door);
  climberGroup.add(climber);
  invisibleBlock.debug=true;
  invisibleBlockGroup.add(invisibleBlock);
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  } 
}