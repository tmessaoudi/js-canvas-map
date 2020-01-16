export const applyMatrixToPoint = (matrix, point) => {
  return {
    x: matrix[0] * point.x + matrix[2] * point.y + matrix[4],
    y: matrix[1] * point.x + matrix[3] * point.y + matrix[5]
  };
};

export const inv = matrix => {
  let a = matrix[0],
    b = matrix[1],
    c = matrix[2],
    d = matrix[3],
    e = matrix[4],
    f = matrix[5],
    dt = a * d - b * c; // determinant(), skip DRY here...
  const inv = Array(6);
  inv[0] = d / dt;
  inv[1] = -b / dt;
  inv[2] = -c / dt;
  inv[3] = a / dt;
  inv[4] = (c * f - d * e) / dt;
  inv[5] = -(a * f - b * e) / dt;

  return inv;
};
