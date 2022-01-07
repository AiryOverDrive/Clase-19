var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  ghost.debug = true;
  ghost.setCollider("rectangle", -20,0,100,300)


  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);
  if(keyDown("left_arrow")){
    ghost.x -= 3;
  }

  if(keyDown("right_arrow")){
    ghost.x += 3;
  }

  if(keyDown("space")){
    ghost.velocityY -= 6;
  }

  ghost.velocityY += 0.8;

  

  if(tower.y > 600){
      tower.y = 400
    }

    ghost.collide(climbersGroup);
    /*if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }*/
    

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
      ghost.destroy();
 
    }

    spawnDoors();
    drawSprites();
}
function spawnDoors(){
  //escribe el codigo para aparecer las puertas de la torre
  if(frameCount % 240 == 0){

    door = createSprite(200,-50);
    door.addImage(doorImg);

    climber = createSprite(200,10);
    climber.addImage(climberImg);
    

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.debug = true;  

    door.x = Math.round(random(120,400));
    door.velocityY = 2;

    climber.x = door.x;
    climber.velocityY = 2; 

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    invisibleBlock.y += 10;

    ghost.depth = door.depth && climber.depth;
    ghost.depth += 1;

    door.lifetime = 700;
    climber.lifetime = 700;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    climber.debug = true; 
    
  }
}