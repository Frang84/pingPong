const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const paddleColor = "blue";
const wallColor = "red";
const paddleBorder = "white";
const ballColor = "yellow";
const boardBackground = "black";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 4;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let paddle = {
    widt: 25,
    height: 100,
    x: 0,
    y: 0
}
let wall = {
    widt: 25,
    height: 500,
    x: gameWidth -25,
    y: 0
}

window.addEventListener("keydown", changeDirection);

gameStart();
drawPaddle();
function gameStart(){
    createBall();
    nextTick();

};
function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddle();
        moveBall();
        drawBall(ballX, ballY);
        CheckCollision();
        nextTick();
    }, 10)
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function drawPaddle(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddleColor;
    ctx.fillRect(paddle.x, paddle.y, paddle.widt, paddle.height);
    ctx.strokeRect(paddle.x, paddle.y, paddle.widt, paddle.height);

    ctx.fillStyle = wallColor;
    ctx.fillRect(wall.x, wall.y, wall.widt, wall.height);
    ctx.strokeRect(wall.x, wall.y, wall.widt, wall.height);
}
function createBall(){
    
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }
    else{
        ballXDirection = -1;
    }
    
    if(Math.round(Math.random()) == 1){
        ballYDirection = Math.random()*1;
    }
    else{
        ballYDirection = Math.random()*-1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);

};
function drawBall(ballX, ballY){
    ctx.fillStyle= ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2* Math.PI);
    ctx.stroke();
    ctx.fill();
};
function CheckCollision(){
    if (ballY <= 0 + ballRadius) {
        ballYDirection *= -1;  
    }
    if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
    }
    if(ballX <= 0){
        ctx.clearBoard();
        
        //createBall();
        return;
    }
    if(ballX >= gameWidth){
        createBall();
        return;
    }
    if(ballX <= (paddle.x + paddle.widt + ballRadius)){
        if (ballY > paddle.y && ballY < paddle.y + paddle.height){
            ballX = (paddle.x + paddle.widt + ballRadius)
            ballXDirection *= -1;
           // ballSpeed += 1;
        } 
    }
    if(ballX >= (wall.x - ballRadius)){
        if (ballY > wall.y && ballY < wall.y + wall.height){
            ballXDirection *= -1;
            //ballSpeed += 1;
        } 
    }
};
function moveBall(){
    ballX += (ballSpeed*ballXDirection);
    ballY += (ballSpeed*ballYDirection);
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 38;
    const paddle1Down = 40;
    switch(keyPressed){
        case(paddle1Up):
            if(paddle.y > 0){
                paddle.y -= paddleSpeed;
            }
        break;
        case(paddle1Down):
            if(paddle.y+paddle.height < gameHeight){
                paddle.y += paddleSpeed;
            }
        break;
        
    }
};
function updateScore(){};
function resetGame(){};
