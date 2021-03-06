import { getMousePosition, addReference, addMiddleCross } from "./utils/canvas";

let canvas = document.getElementById("game");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext("2d");

let plusBtn = document.getElementById("zoom-in");
let minusBtn = document.getElementById("zoom-out");

let position = { x: canvas.width / 2, y: canvas.height / 2 };
let mp = undefined;
let zoom = 100;

window.canvasCtx = ctx;

const resetCanvas = () => {
  ctx.resetTransform();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const changeZoomInfo = () => {
  const zoomInfoHTML = document.getElementById("zoomInfo");
  zoomInfoHTML.innerHTML = Math.floor(zoom) + "%";
};

const changePositionInfo = () => {
  const positionInfoHTML = document.getElementById("positionInfo");
  positionInfoHTML.innerHTML = position.x + "/" + position.y;
};

const updateInfo = () => {
  changeZoomInfo();
  changePositionInfo();
};

const draw = () => {
  ctx.save();
  resetCanvas();
  addMiddleCross(ctx);

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(zoom / 100, zoom / 100);
  ctx.translate(-position.x, -position.y);

  // ctx.setTransform(
  //   zoom, // Horizontal scaling
  //   0, // Horizontal skewing
  //   0, // Vertical skewing
  //   zoom, // Vertical scaling
  //   -position.x,
  //   -position.y
  // );

  addReference(ctx, 0, 0, 10);
  addReference(ctx, canvas.width / 2, 0, 10);
  addReference(ctx, 0, canvas.height / 2, 10);
  addReference(ctx, canvas.width / 2, canvas.height / 2, 10);
  addReference(ctx, 777, 538, 10);

  //addRect(ctx);

  ctx.restore();
};

canvas.addEventListener("mousedown", function(event) {
  mp = getMousePosition(event, this);
  document.body.style.cursor = "grab";
});

canvas.addEventListener("mousemove", function(event) {
  if (mp) {
    let newMousePos = getMousePosition(event, canvas);
    position = {
      x: Math.floor(position.x - (newMousePos.x - mp.x) / (zoom / 100)),
      y: Math.floor(position.y - (newMousePos.y - mp.y) / (zoom / 100))
    };
    mp = newMousePos;
    changePositionInfo();
    draw();
  }
});

canvas.addEventListener("mouseup", function(event) {
  document.body.style.cursor = "default";
  mp = undefined;
});

canvas.addEventListener("wheel", function(event) {
  if (zoom > 10 && event.deltaY > 0) {
    zoom -= 10;
  } else if (zoom < 200 && event.deltaY < 0) {
    zoom += 10;
  }
  changeZoomInfo();
  draw();
});

minusBtn.addEventListener("click", function(event) {
  if (zoom > 10) {
    zoom -= 10;
  }
  changeZoomInfo();
  draw();
});

plusBtn.addEventListener("click", function(event) {
  if (zoom < 200) {
    zoom += 10;
  }
  changeZoomInfo();
  draw();
});

updateInfo();
draw();
