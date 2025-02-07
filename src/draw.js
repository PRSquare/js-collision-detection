import { toElementCords } from "./utils";
import { normal2D, vecLen } from "./vec-math";

export function drawFigure(context, figureTr) {
  const path = new Path2D();
  const startP = toElementCords(figureTr[0][0]);
  path.moveTo(startP[0], startP[1]);
  figureTr.forEach((e) => {
    const cords = toElementCords(e[1]);
    path.lineTo(cords[0], cords[1]);
  });
  context.stroke(path);
}

export function drawPoint(context, cords, size = 3) {
  const c = toElementCords(cords);
  fillCircle(context, c[0], c[1], size);
}
export function fillCircle(contextObj, x, y, r) {
  contextObj.beginPath();
  contextObj.arc(x, y, r, 0, 2 * Math.PI);
  contextObj.fill();
}

export function drawRect(context, rect) {
  context.beginPath();
  const p1 = toElementCords(rect.p1);
  const p2 = toElementCords(rect.p2);
  context.moveTo(p1[0], p1[1]);
  context.lineTo(p2[0], p1[1]);
  context.lineTo(p2[0], p2[1]);
  context.lineTo(p1[0], p2[1]);
  context.closePath();
  context.stroke();
}

export function drawLine(context, cords) {
  const p1 = toElementCords(cords.p1 || cords[0]);
  const p2 = toElementCords(cords.p2 || cords[1]);

  context.moveTo(p1[0], p1[1]);
  context.lineTo(p2[0], p2[1]);
  context.stroke();
}

export function drawArrow(context, cords) {
  drawLine(context, cords);
  const p1 = cords.p1 || cords[0];
  const p2 = cords.p2 || cords[1];

  const vec1 = [p1[0] - p2[0], p1[1] - p2[1]];
  const vec2 = normal2D(vec1).map((e) => e * 0.02);
  const offsetVec = vec1.map((e) => (e / vecLen(vec1)) * 0.05);

  const lp0 = toElementCords(p2);
  const lp1 = toElementCords([
    p2[0] + vec2[0] + offsetVec[0],
    p2[1] + vec2[1] + offsetVec[1],
  ]);
  const lp2 = toElementCords([
    p2[0] - vec2[0] + offsetVec[0],
    p2[1] - vec2[1] + offsetVec[1],
  ]);
  const arrowTipPath = new Path2D();
  arrowTipPath.moveTo(lp0[0], lp0[1]);
  arrowTipPath.lineTo(lp1[0], lp1[1]);
  arrowTipPath.lineTo(lp2[0], lp2[1]);
  arrowTipPath.lineTo(lp0[0], lp0[1]);
  context.fill(arrowTipPath);
}

export function drawVec(context, vec, from = [0, 0]) {
  drawArrow(context, [from, vecAdd(from, vec)]);
}

export function drawNormals(context, figure) {
  const vecs = figure.map((e) => createVec(e));
  const norms = vecs.map((e) => normal2D(e));
  for (let i = 0; i < figure.length; i++) {
    drawVec(
      context,
      norms[i].map((e) => e * 0.1),
      vecAdd(figure[i][0], figure[i][1]).map((e) => e / 2),
    );
  }
}
