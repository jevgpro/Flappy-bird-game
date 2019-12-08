let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
let rune = new Image();
let empty_rune = new Image();
let fly = new Audio();
let score_audio = new Audio();
let gap = 100;
let gameMod = "waiting";
let test = 0;

empty_rune.src = "img/runs_empty";
rune.src = "img/runs.png";
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

document.addEventListener("keydown", moveUp);

//Сделан свитч для переключения между запущенной игрой и не запущенной
function moveUp() {
  switch (gameMod) {
    case "running":
      yPos -= 40;
      break;
    case "waiting":
      draw();
      gameMod = "running";
      break;
  }
  //fly.play();
  //console.log(gameMod);
}

let pipe = [];
let runes = [];

runes[0] = {
  x : cvs.width + 130,
  y : 0
}

pipe[0] = {
  x : cvs.width,
  y : 0
}

let score = 0
let xPos = 10;
let yPos = 150;
let grav = 1.2;

function draw() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(rune, pipe[0].x + 10, pipe[0].y + pipeUp.height + 40);
  for(let i = 0; i < pipe.length; i++){
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    //ctx.drawImage(rune, pipe[0].x + 10, pipe[0].y + pipeUp.height + 40);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if(pipe[i].x == 100){
      pipe.push({
        x : cvs.width,
        y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
      /*runes.push({
        x : cvs.width,
        y : 0
      });*/
    }

    if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
      && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y +
      pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height){
        window.location.href = "index.html";
    }

    if(pipe[i].x == 5){
      score++;
      score_audio.play();
    }
    //console.log(yPos);
    //console.log(pipe[i].y + pipeUp.height);
    //console.log(runes[i].x--);
    runes[0].x--;
    if(xPos + bird.width >= runes[0].x + 10 && test == 0)
    {
      console.log("LOL");
      //rune.remove();
      ctx.drawImage(bg, 0, 0);
      ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
      ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
      ctx.drawImage(fg, 0, cvs.height - fg.height);
      ctx.drawImage(bird, xPos, yPos);
      test = 1;
      //let test = ctx.getImageData(pipe[0].x + 10, pipe[0].y + pipeUp.height + 40);
      //console.log(test);
      //ctx.drawImage(empty_rune, pipe[0].x + 10, pipe[0].y + pipeUp.height + 40);
      //$(rune).fadeOut();
      //destroyRune();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);
  yPos += grav;
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}
window.onload = starGame;

//загружаем картинки при запуске страницы и пишем текст
function starGame() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Press x to win", cvs.width / 5, cvs.height / 2);
}

function destroyRune() {

}
