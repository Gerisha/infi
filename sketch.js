var PLAY = 1;
var END = 0;
var gameState = PLAY;


var girl, girl_running, girl_collided;
var ground, invisibleround, groundImage;
var backgr, backg;
var gameov, gameOver;

var backSprite;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg, restartImg
var jumpSound, checkPointSound, dieSound

function preload() {
  girl_running = loadAnimation("g.png", "g1.png", "g2.png", "g3.png");
  girl_collided = loadImage("g.png")
  gameov = loadImage("gameover.png")

  groundImage = loadImage("ground.png");
  backgr = loadImage("back.jpg")



  obstacle1 = loadImage("de.png");
  obstacle2 = loadImage("vi.png");
  obstacle3 = loadImage("vi1.png");
  obstacle4 = loadImage("witch.png");
  obstacle5 = loadImage("wiz.png");
  obstacle6 = loadImage("tig.png");

  //restartImg = loadImage("restart.png")


  jumpSound = loadSound("jump.wav")
  dieSound = loadSound("preview.mp3")

}

function setup() {
  createCanvas(1500, 550);
  console.log(message)
  backSprite = createSprite(750, 275);
  backSprite.addImage("backImg", backgr);
  backSprite.scale = 2.5;

  var message = "This is a message";

  girl = createSprite(50, 400, 10, 50);
  girl.addAnimation("running", girl_running);
  girl.addImage("collided", girl_collided)

  girl.scale = 1.5;

  ground = createSprite(200, 490, 1500, 500);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.width = 2500;
  ground.scale = 2;

  // restart = createSprite(300,140);
  // restart.addImage(restartImg);
  gameOver = createSprite(650, 220);
  gameOver.addImage(gameov)

  gameOver.scale = 0.7;
  // restart.scale = 0.5;

  invisibleGround = createSprite(200, 550, 400, 10);
  invisibleGround.visible = false;


  obstaclesGroup = createGroup();



  girl.setCollider("rectangle", 0, 0, girl.width, girl.height);
   //girl.debug = true;
   

  score = 0;
  restart = createButton("restart");
  restart.position(650, 95);
  restart.mousePressed(reset);


}

function draw() {

  // background(backgr);
  //displaying scor


  if (gameState === PLAY) {

    gameOver.visible = false;

    restart.hide();
    backSprite.velocityX = -(4 + 3 * score / 100)
    //scoring
    score = score + Math.round(getFrameRate() / 60);

    // if(score>0 && score%100 === 0){
    //    checkPointSound.play() 
    // }

    if (backSprite.x < 0) {
      backSprite.x = 800;
    }

    // jump when the space key is pressed
    if (keyDown("space") && girl.y >= 250) {
      girl.velocityY = -12;
      //jumpSound.play();
    }

    //add gravity
    girl.velocityY = girl.velocityY + 0.8

    //     //spawn the clouds
    //     spawnClouds();

    //     //spawn obstacles on the ground
    spawnObstacles();

    if (obstaclesGroup.isTouching(girl)) {
      //trex.velocityY = -12;
      // jumpSound.play();
      gameState = END;
      // dieSound.play()

    }
  }


  else if (gameState === END) {
    gameOver.visible = true;
    backSprite.velocityX=0;
    obstaclesGroup.destroyEach();
    //change the trex animation
    girl.changeImage("collided", girl_collided);

    restart.show();

    ground.velocityX = 0;
    girl.velocityY = 0



    //set lifetime of the game objects so that they are never destroyed



  }



  //   //stop trex from falling down
  girl.collide(invisibleGround);
//girl.debug=true;
  girl.setCollider("rectangle", 0, 0, 50, 70);

  obstaclesGroup.setColliderEach("rectangle", 0, 0, 50, 100, -45);
  drawSprites();
  text("Score: " + score, 500, 50);

  end()
}


function reset() {
  gameState = PLAY;
  obstaclesGroup.destroyEach();

  girl.changeAnimation("running", girl);
  score = 0;


}


function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 470, 10, 40);
    obstacle.velocityX = -(6 + score / 100);
    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function end() {
  if (score === 200) {
    next = createButton("next")
    next.position(1000, 320)
    gameState = "over";
    girl.visible = false;
    backSprite.velocityX=0;
    fill("blue")
    textSize(50)
    text("Click next to move onto the next stage. ", 200, 300)
    next.mousePressed(() => {
      window.open("https://gerisha.github.io/cave/", '_top')
    })
  }

}
