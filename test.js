let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let gap = 90;
let score = 0;
//позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.3;
document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);
//Картинки
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
let fly = new Audio();
let scoresound = new Audio();

//сорусы
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
fly.src = "audio/fly.mp3";
scoresound.src = "audio/score.mp3";
//создаем блоки
let pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};

pipeBottom.onload = draw;

function moveUp() {
  yPos -= 30;
  fly.play();
}

function draw() {
  ctx.drawImage(bg, 0, 0);
  //создаем блоки в игре
  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;

    if (pipe[i].x == 70) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }
    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height
    ) {
      location.reload();
    }
    if (pipe[i].x == 5) {
      score += 1;
      scoresound.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);
  yPos += grav;
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}
