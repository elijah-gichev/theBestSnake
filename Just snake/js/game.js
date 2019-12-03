

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

canvas.height = 608;
canvas.width = 608;


const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const endImg = new Image();
endImg.src = "img/formatEnd.png";

const endMusic = new Audio();
endMusic.src = "music/theEndMusic.mp3";

let box = 32;
let score = 0;


let food = {
    x : Math.floor(Math.random() * 17 + 1) * box,
    y : Math.floor(Math.random() * 15 + 3) * box,
}

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};


let dir;
document.addEventListener("keydown", direction);
function direction(event){
    let key = event.keyCode;
    if(key == 37 && dir != "right")
        dir = "left";
    else if(key == 38 && dir != "down")
        dir = "up";
    else if(key == 39 && dir != "left")
        dir = "right";
    else if(key = 40 && dir != "up")
        dir = "down";
}

function isEatTail(head, arr){
    for(let i = 0 ;i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y){
            theEnd();
        }
    }
} 

function theEnd(){
    ctx.drawImage(endImg, 0, 0);
    endMusic.play();
    clearInterval(game);
}

 

function drawGame(){
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0 ? "green" : "white");
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if(snakeX == food.x && snakeY == food.y){
        score += 1;
        food.x = Math.floor(Math.random() * 17 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 3) * box;
    }else{
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        theEnd();
    

    if (dir == "left")
        snakeX -= box;
    else if(dir == "right")
        snakeX += box;
    else if(dir == "up")
        snakeY -= box;
    else if(dir == "down")
        snakeY += box;

    let newHead = {
        x : snakeX,
        y : snakeY,
    }

    isEatTail(newHead, snake);
    snake.unshift(newHead);    
}

let game = setInterval(drawGame, 100);//callback функция, вызывающая drawgame каждые 100ms

