var boy, coin, rock, train, invisibleGround, invisibleGround2
var boyImage, boyfallen, coinImage, coinImg, rockImage, trainImage
var coinGroup, rockGroup, trainGroup, invisibleGround2Group
var gameOver, gameOverImg
var forest, bg
var score = 0
var gamestate = "play"
var selectSprite = 3, r = 350, n

function preload()
{
    boyImage = loadAnimation("boy_running_1.png","boy_running_2.png","boy_running_3.png","boy_running_4.png")
    boyfallen = loadAnimation("boy_fell.png")
    coinImage = loadAnimation("coin_1.png","coin_2.png","coin_3.png")
    coinImg = loadAnimation("coin_4.png")
    bg = loadImage ("forest.jpg")
    rockImage = loadImage ("Rock.png")
    trainImage = loadImage("train.png")
    gameOverImg = loadImage('gameover.png')
}

function setup()
{
    createCanvas (600,400)

    coinGroup = new Group()
    rockGroup = new Group()
    trainGroup = new Group()
    invisibleGround2Group = new Group()

    forest = createSprite(250,200)
    forest.addImage (bg)
    forest.scale = 0.9

    boy = createSprite (70,300)
    boy.addAnimation("boyRunning",boyImage)
    boy.addAnimation("boyFell",boyfallen)
    boy.scale = 0.2
    //boy.debug = true
    boy.setCollider("rectangle",0,0,125,boy.height)

    invisibleGround = createSprite(300,315,600,2)
    invisibleGround.visible = false

    gameOver = createSprite(300,200)
    gameOver.addImage(gameOverImg)
    gameOver.scale = 0.2
    gameOver.visible = false
}

function draw()
{
    //console.log(boy.y)

    forest.velocityX = -(3 + frameCount/150)
    
    background(200)
    drawSprites()

    textSize (20)
    fill ("black")
    text("Score : "+score,500,50)

    if (gamestate == "play")
    {
        if (forest.x < 240)
        {
            forest.x = 360
        }

        if (boy.isTouching(coinGroup))
        {
            r = Math.round(random(380,330))
            coinGroup.destroyEach()
            score += 10
        }


        if (frameCount% 120 == 0 )
        {
            if (selectSprite == 1)
            {
                coins()
            }
            if (selectSprite == 2)
            {
                n = 1
                rocks()
                coins2()
            }
            if (selectSprite == 3)
            {
                n = 2
                trains()
                coins2()
            }
            selectNum()
        }
        if (keyDown("space") && boy.y>300)
        {
            boy.velocityY = -11
        }
        boy.velocityY += 0.4
        if (frameCount %150 == 0){
            boy.velocityY += 0.3
        }

        if (boy.isTouching(rockGroup)||boy.isTouching(trainGroup))
        {
            gamestate = "end"
        }
        boy.collide(invisibleGround)
        boy.collide(invisibleGround2Group)
    }
    else
    {
        gameOver.visible = true

        coin.changeAnimation ("coin",coinImg)

        boy.changeAnimation ("boyFell",boyfallen)
        boy.setVelocity(0,0)
        boy.scale = 1.001
        boy.y = 310

        forest.velocityX = 0
        trainGroup.setVelocityEach(0,0)
        rockGroup.setVelocityEach(0,0)
        coinGroup.setVelocityEach(0,0)
        invisibleGround2Group.setVelocityEach(0,0)


        trainGroup.setLifetimeEach(-1)
        rockGroup.setLifetimeEach(-1)
        coinGroup.setLifetimeEach(-1)
        invisibleGround2Group.setLifetimeEach(-1)

    }
}

function rocks()
{
    rock = createSprite(450,320)
    rock.addImage(rockImage)
    rock.depth = boy.depth
    boy.depth += 1
    rock.scale = 0.25
    rock.velocityX = -(4 + frameCount/150)
    rock.lifetime = 110
    rockGroup.add (rock)
}

function coins ()
{
    var y = random(200,310)
    coin = createSprite(450,y)
    coin.addAnimation("coinRotating",coinImage)
    coin.addAnimation("coin",coinImg)
    coin.scale = 0.2
    coin.velocityX = -(4 + frameCount/150)
    coin.lifetime = 110
    coin.depth = boy.depth
    boy.depth += 1
    coinGroup.add(coin)
}

function coins2 ()
{
    if (n == 1)
    {
        coin = createSprite(450,202)
    }
    if (n == 2)
    {
        coin = createSprite(450,190)
    }
    coin.addAnimation("coinRotating",coinImage)
    coin.addAnimation("coin",coinImg)
    coin.scale = 0.2
    coin.velocityX = -(4 + frameCount/150)
    coin.lifetime = 110
    coin.depth = gameOver.depth
    gameOver.depth += 1
    coinGroup.add(coin)
}

function trains()
{
    train = createSprite(450,260)
    train.addImage(trainImage)
    train.depth = boy.depth
    boy.depth += 1
    train.scale = 0.6
    train.velocityX = -(4 + frameCount/150)
    train.lifetime = 110
    trainGroup.add (train)
    //train.debug = true
    train.setCollider('rectangle',0,0,600,200)

    invisibleGround2 = createSprite(train.x,190,350,5)
    invisibleGround2.visible = false
    invisibleGround2.velocityX = -(4 + frameCount/150)
    invisibleGround2.lifetime = 110
    invisibleGround2.depth = boy.depth
    boy.depth += 1
    invisibleGround2Group.add (invisibleGround2)
    //invisibleGround2.debug = true
}

function selectNum ()
{
    //selectSprite = 3
    selectSprite = Math.round(random(1,3))
}