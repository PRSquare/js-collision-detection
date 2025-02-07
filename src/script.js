import { drawFigure, drawPoint, drawArrow } from "./draw";
import { toAbsoluteCords } from "./utils";
import { createVec, normal2D, dotProduct, vecLen, vecAdd } from "./vec-math";

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const statusStr = document.querySelector("#status");

canvas.addEventListener("click", (e) => {
  const cursorPos = toAbsoluteCords([e.offsetX, e.offsetY]);

  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  context.fillStyle = "red";
  drawPoint(context, cursorPos);

  navigator.clipboard.writeText(`[${cursorPos.toString()}]`);

  const points = [
    [-0.5, -0.5],
    [-0.1, -0.7],
    [0.5, -0.5],
    [0.0, 0.5],
  ];

  let fArr = [];
  for (let i = 0; i < points.length - 1; i++) {
    fArr.push([points[i], points[i + 1]]);
  }
  fArr.push([points[points.length - 1], points[0]]);

  context.strokeStyle = "blue";
  context.fillStyle = "blue";
  // drawNormals(context, fArr);

  const MyFigure = fArr;
  context.strokeStyle = "grey";
  drawFigure(context, MyFigure);

  const doCollide = checkColision(MyFigure, cursorPos);
  const status = doCollide ? "Collision" : "No collision";
  setStatus(status);

  if (doCollide) {
    const points = findColisionPoints(MyFigure, cursorPos);
    context.fillStyle = "black";
    points.forEach((p) => {
      drawPoint(context, p);
    });

    context.fillStyle = "blue";
    context.strokeStyle = "blue";
    const nearest = getNearestPoint(points, cursorPos);
    drawPoint(context, nearest);
    drawArrow(context, [cursorPos, nearest]);
  }
});

function setStatus(text) {
  statusStr.innerHTML = text;
}

function rectToFigure(rect) {
  const p1 = rect.p1;
  const p2 = [rect.p2[0], p1[1]];
  const p3 = rect.p2;
  const p4 = [p1[0], rect.p2[1]];
  return [
    [p1, p2],
    [p2, p3],
    [p3, p4],
    [p4, p1],
  ];
}

function checkColision(figure, point) {
  const vecs = figure.map((e) => createVec(e));
  const norms = vecs.map((e) => normal2D(e));

  for (let i = 0; i < figure.length; i++) {
    if (dotProduct(norms[i], createVec([point, figure[i][0]])) < 0) {
      return false;
    }
  }
  return true;
}

function findColisionPoints(figure, point) {
  return figure.map((e) => getProjection(e, point));
}

function getProjection(line, point) {
  const v1 = createVec(line);
  const v2 = createVec([line[0], point]);

  const l = dotProduct(v1, v2) / vecLen(v1, v2);

  const rv = v1.map((e) => (e / vecLen(v1)) * l);

  return vecAdd(line[0], rv);
}

function getNearestPoint(points, point) {
  const lens = points.map((p) => vecLen(createVec([p, point])));

  let curI = 0;
  let curMin = lens[0];
  for (let i = curI + 1; i < lens.length; i++) {
    if (lens[i] < curMin) {
      curI = i;
      curMin = lens[i];
    }
  }

  return points[curI];
}
