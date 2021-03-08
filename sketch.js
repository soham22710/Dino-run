var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var ground,groundImage,ig;
var dino,dinoImage,dino_colloid;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var cloud,cloud1,cloud2,cloud3,cloudsGroup;
var gameOverImg,restartImg


function preload(){
  groundImage=loadImage("ground1.png");
  dinoImage=loadAnimation("Trex1.png","trex2.png","trex3.png","trex4.png");
  
dino_colloid=loadAnimation("dino_colloided.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
cloud1=loadImage("cloud1.png");
cloud2=loadImage("cloud2.png");
cloud3=loadImage("cloud3.png");
gameOverImg=loadImage("Gameover.png");
restartImg=loadImage("26868-8-restart-file-thumb.png");

  
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  ground = createSprite(width/100000000,height/1,2000,20);
  ground.addImage("ground1",groundImage);
  ground.scale = 2.5
  
  ig = createSprite(width/2,height/1.142,2000000,20);
  ig.visible = false;
  
  dino=createSprite(50,height-140,20,20);
  dino.addAnimation("trex",dinoImage);
  dino.scale = 0.35;
  dino.debug = false;
  
dino.addAnimation("colloided", dino_colloid);   
   cloudsGroup=createGroup();
  obstaclesGroup = createGroup();
 score=0;
  
    gameOver = createSprite(width/2.1,height/3);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2.1,height/2.1);
  restart.addImage(restartImg);
   gameOver.scale = 0.5;
  restart.scale = 0.15;
  
}
function draw(){
  background(10,120,250);
  text("Score: "+ score, 500,50);
  if(gameState === PLAY){
    score = score + Math.round(frameCount/150);
  ground.velocityX = -(4 + 3* score/300)
   if(ground.x <0){
    ground.x=ground.width/4;
  }
    if((touches.length>0)||keyDown("space") && dino.y >= height-120) {
      dino.velocityY = -11.8;
      touches=[];
    }
  
    dino.velocityY = dino.velocityY + 0.6
      gameOver.visible = false;
    restart.visible = false;
  obstaclesGroup.depth=dino.depth;
  spawnObstacles();
  spawnClouds();
  
    if(obstaclesGroup.isTouching(dino)){
     
      gameState = END;
      
    }    
  }
  else if (gameState === END) {
   dino.changeAnimation("colloided",dino_colloid);
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
      ground.velocityX=0;
          gameOver.visible = true;
      restart.visible = true;
        obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    dino.velocityY = 0
        if(mousePressedOver(restart)) {
      reset();
    }
  } 

   dino.collide(ig);
  drawSprites();
}
function reset(){
  gameState = PLAY ;
  gameOver.visible = false;
  restart.visible = false;
  
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  dino.changeAnimation("trex",dinoImage);
  score = 0;

}
function spawnObstacles ()  {
  if (frameCount % 90 === 0){
    var obstacle = createSprite(width,height/1.24,10,40);
      var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
               
  }
   obstacle.velocityX = -(6 + score/300);
        obstacle.scale = 0.22;
    obstacle.debug=false;
     obstacle.setCollider("circle",0,0,100);
    obstaclesGroup.add(obstacle);
  
}
}
function spawnClouds(){
   if (frameCount % 60 === 0) {
    cloud = createSprite(width,height-100,40,10);
    cloud.y = Math.round(random(80,120));
     cloud.scale = 0.3;
    cloud.velocityX = -(5+score/300);
     cloud.depth=dino.depth-1;
     var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: cloud.addImage(cloud1);
              break;
      case 2: cloud.addImage(cloud2);
              break;
      case 3: cloud.addImage(cloud3);
              break;
     
  }
      cloudsGroup.add(cloud);
}
}