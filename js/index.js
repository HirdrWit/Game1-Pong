var paddleLeft = document.getElementById('left-paddle');
var paddleRight = document.getElementById('right-paddle');
var ball = document.getElementById('ball');
var paddleLeftTop = (screen.height/2)-150;
var paddleRightTop = (screen.height/2)-150;
var paddleLeftHeight = 200;
var paddleRightHeight = 200;
var paddleRightDirection = 0;
var paddleRightTimer;
var paddleLeftDirection = 0;
var paddleLeftTimer;
paddleLeft.style.top = (screen.height/2)-150;
paddleRight.style.top = (screen.height/2)-150;
var ballXPos = 50;
var ballYPos = 50;
var ballXDir = 5;
var ballYDir = 5;
var ballWidth = 20;
var ballHeight = 20;
var leftScoreDisplay = document.getElementById('left-score');
var rightScoreDisplay = document.getElementById('right-score');
var leftScore = 0;
var rightScore = 0;
var windowsize = window.innerHeight - 213;


function moveLeftPaddleDown() {
    if(paddleLeftTop < windowsize){
        paddleLeftTop += paddleLeftDirection;
        paddleLeft.style.top = paddleLeftTop + 'px';
    }
}

function moveLeftPaddleUp() {
    if(paddleLeftTop > 0){
        paddleLeftTop += paddleLeftDirection;
        paddleLeft.style.top = paddleLeftTop + 'px';
    }
}

function moveRightPaddleDown() {
    if(paddleRightTop < windowsize){
        paddleRightTop += paddleRightDirection;
        paddleRight.style.top = paddleRightTop + 'px';
    }
}
function moveRightPaddleUp() {
    if(paddleRightTop > 0){
        paddleRightTop += paddleRightDirection;
        paddleRight.style.top = paddleRightTop + 'px';
    }
}

function checkCollision(){
    var newBallXPos = ballXPos + ballXDir;
    var newBallYPos = ballYPos + ballYDir;
    if(newBallXPos > window.innerWidth-50 && 
        newBallYPos > paddleRightTop &&
        newBallYPos < paddleRightTop +200)
       {
        ballXDir = -Math.abs(ballXDir);
        return true;
        }
    
    if(newBallXPos < 20 && 
        newBallYPos > paddleLeftTop &&
        newBallYPos < paddleLeftTop + 200
    )
       {
        ballXDir = Math.abs(ballXDir);
        return true;
        }
       
    return false;
}
function Scored(side){
    if(side === "left"){
        leftScore = leftScore + 1
        leftScoreDisplay.innerHTML = leftScore;
    }
    else{
        rightScore = rightScore + 1;
        rightScoreDisplay.innerHTML = rightScore;
    }
}
function moveBall(){
    var newBallXPos = ballXPos + ballXDir;
    var newBallYPos = ballYPos + ballYDir;
    if(!checkCollision()){
        if(newBallXPos + ballWidth > window.innerWidth){
            ballXDir = -Math.abs(ballXDir);
            Scored("left");
        }
        if (newBallYPos + ballHeight > window.innerHeight) {
            ballYDir = -Math.abs(ballYDir);
        }
        if (newBallXPos < 0) {
            ballXDir = Math.abs(ballXDir);
            Scored("right");
        }
        if (newBallYPos < 0) {
            ballYDir = Math.abs(ballYDir);
        }
    }

    ballXPos += ballXDir;
    ballYPos += ballYDir;

    ball.style.top = ballYPos + 'px';
    ball.style.left = ballXPos + 'px';
}
document.addEventListener('keydown', function(evt) {
    switch (evt.code) {
        case 'ArrowDown':
            if (!paddleRightTimer) {
                    paddleRightDirection = 10;
                    paddleRightTimer = setInterval(moveRightPaddleDown, 50);
            }
            break;
        case 'ArrowUp':
            if (!paddleRightTimer ) {
                paddleRightDirection = -10;
                paddleRightTimer = setInterval(moveRightPaddleUp, 50);
            }
            break;
        case 'KeyS':
            if (!paddleLeftTimer) {
                paddleLeftDirection = 10;
                paddleLeftTimer = setInterval(moveLeftPaddleDown, 50);
            }
            break;
        case 'KeyW':
            if (!paddleLeftTimer) {
                paddleLeftDirection = -10;
                paddleLeftTimer = setInterval(moveLeftPaddleUp, 50);
            }
            break;
    }
    //console.log(evt);
})
document.addEventListener('keyup', function(evt) {
    switch (evt.code) {
        case 'ArrowDown':
        case 'ArrowUp':
            clearInterval(paddleRightTimer);
            paddleRightTimer = null;
            break;
        case 'KeyS':
        case 'KeyW':
            clearInterval(paddleLeftTimer);
            paddleLeftTimer = null;
            break;
    }
    //console.log(evt);
})

setInterval(moveBall, 15 );