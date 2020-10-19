//variable creation
var trex, trexAnimation,trexCollided;
var ground,groundImage,invisibleGround;
var cloud,cloudImage,cloudGroup;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle1,obstacle6,obstacleGroup;
var score = 0
var gameOver,gameoverImage;
var restart,restartImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

// loading sounds, animation, image
function preload(){
trexAnimation = loadAnimation("trex1.png","trex3.png","trex4.png");
trexCollided = loadAnimation("trex_collided.png");
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameoverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");
}

//setup canvas, create sp, set properties
function setup(){
  createCanvas(600,200);
  trex = createSprite(50,160,20,20);
  trex.addAnimation ( "running",  trexAnimation);
  trex.scale = 0.5;
  trex.addAnimation("trex_collided",trexCollided);
  
  ground = createSprite(300,180,600,10);
  ground.addImage (groundImage);
  
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100,10,10);
  gameOver.addImage(gameoverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,140,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  cloudGroup = new Group();
  
  obstacleGroup = new Group();
}

//add behavior to game obj
function draw(){
background(255);
text("score"+": "+ score,540,20);
if(gameState === PLAY){
  score = score+Math.round(getFrameRate()/60)
  
  if(keyDown("space")&& trex.y > 159){
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY+0.8
  ground.velocityX = -4;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  spawnCloud();
  spawnObstacle();
  if(trex.isTouching(obstacleGroup)){
    gameState = 0;
  }
}
  else if(gameState === END){
 ground.velocityX=0;
 obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-2);
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-2);
    trex.changeAnimation("trex_collided",trexCollided);
    gameOver.visible=true;
    restart.visible=true;
      if(mousePressedOver(restart)){
    reset();
      }
          }
  trex.collide(invisibleGround);

  
drawSprites();
}

function reset(){
  gameState = 1;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0;
  trex.changeAnimation("running",trexAnimation);
}

function spawnCloud(){
  if(frameCount%60===0){
  cloud = createSprite(600,random(20,100),10,10);
  cloud.addImage(cloudImage);
  cloud.velocityX= -5;
  cloud.scale=0.5;
    cloud.lifetime=120;
  cloud.depth=trex.depth;
    cloudGroup.add(cloud);
  }
  trex.depth=trex.depth+1;
  
}


function spawnObstacle(){
  if(frameCount%60===0){
  obstacle = createSprite(600,170,10,10);
  obstacle.addImage(obstacle1);
  obstacle.velocityX= -5;
  obstacle.scale=0.5;
    obstacle.lifetime=120;
    var obs=Math.round(random(1,6));
  switch(obs){
    case 1 :  obstacle.addImage(obstacle1);  
      break;
    case 2 :  obstacle.addImage(obstacle2);
      break;
     case 3 :  obstacle.addImage(obstacle3);
      break;
     case 4 :  obstacle.addImage(obstacle4);
      break;
     case 5 :  obstacle.addImage(obstacle5);
      break;
     case 6 :  obstacle.addImage(obstacle6);
}
obstacleGroup.add(obstacle);
  }
  
}