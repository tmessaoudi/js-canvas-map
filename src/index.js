import { getMousePosition } from "./utils/canvas";

let canvas = document.getElementById("game");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext("2d");

let plusBtn = document.getElementById("zoom-in");
let minusBtn = document.getElementById("zoom-out");

let position = { x: 960, y: 0 };
let mp = undefined;
let zoom = 1;

window.canvasCtx = ctx;

const resetCanvas = () => {
  ctx.resetTransform();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const changeZoomInfo = () => {
  const zoomInfoHTML = document.getElementById("zoomInfo");
  zoomInfoHTML.innerHTML = Math.floor(zoom * 100) + "%";
};

const changePositionInfo = () => {
  const positionInfoHTML = document.getElementById("positionInfo");
  positionInfoHTML.innerHTML = position.x + "/" + position.y;
};

const updateInfo = () => {
  changeZoomInfo();
  changePositionInfo();
};

const addRect = ctx => {
  ctx.save();
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 100, 100);
  ctx.restore();
};

const addReference = (ctx, x, y, size) => {
  ctx.save();
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.stroke();
  ctx.fillStyle = "blue";
  ctx.fillText(`${x},${y}`, x - size, y - size);
  ctx.restore();
};

const addMiddleCross = ctx => {
  ctx.save();
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(ctx.canvas.width / 2, 0);
  ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
  ctx.moveTo(0, ctx.canvas.height / 2);
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
  ctx.stroke();
  ctx.restore();
};

const draw = () => {
  ctx.save();
  resetCanvas();
  addMiddleCross(ctx);
  ctx.setTransform(
    zoom, // Horizontal scaling
    0, // Horizontal skewing
    0, // Vertical skewing
    zoom, // Vertical scaling
    -position.x + canvas.width / 2, // Horizontal moving
    -position.y + canvas.height / 2 // Vertical moving
  );

  addReference(ctx, 0, 0, 10);
  addReference(ctx, canvas.width / 2, 0, 10);
  addReference(ctx, 0, canvas.height / 2, 10);
  addReference(ctx, canvas.width / 2, canvas.height / 2, 10);

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
      x: position.x - (newMousePos.x - mp.x),
      y: position.y - (newMousePos.y - mp.y)
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
  if (zoom > 0.2 && event.deltaY > 0) {
    zoom -= 0.1;
  } else if (zoom < 5 && event.deltaY < 0) {
    zoom += 0.1;
  }
  position = {
    x: position.x * zoom,
    y: position.y * zoom
  };
  changeZoomInfo();
  draw();
});

minusBtn.addEventListener("click", function(event) {
  if (zoom > 0.2) {
    zoom -= 0.1;
  }
  position = {
    x: position.x * zoom,
    y: position.y * zoom
  };
  console.log(position);
  changeZoomInfo();
  draw();
});

plusBtn.addEventListener("click", function(event) {
  if (zoom < 5) {
    zoom += 0.1;
  }
  position = {
    x: position.x * zoom,
    y: position.y * zoom
  };
  console.log(position);
  changeZoomInfo();
  draw();
});
updateInfo();
draw();
