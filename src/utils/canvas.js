export const getMousePosition = (e, canvas) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};

export const addRect = ctx => {
  ctx.save();
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 100, 100);
  ctx.restore();
};

export const addReference = (ctx, x, y, size) => {
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

export const addMiddleCross = ctx => {
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
