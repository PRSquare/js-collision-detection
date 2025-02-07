export function vecAdd(v1, v2) {
  let rv = [];
  for (let i = 0; i < Math.min(v1.length, v2.length); i++) {
    rv.push(v1[i] + v2[i]);
  }
  return rv;
}

export function vecMultip(vec, a) {
  return vec.map((e) => e * a);
}

export function distance(v1, v2) {
  let sum = 0;
  for (let i = 0; i < Math.min(v1.length, v2.length); i++) {
    sum += Math.pow(v2[i] - v1[i], 2);
  }
  return Math.sqrt(sum);
}

export function vecLen(vec) {
  let sqSum = 0;
  vec.forEach((e) => (sqSum += e * e));
  return Math.sqrt(sqSum);
}

export function dotProduct(v1, v2) {
  let rv = [];
  for (let i = 0; i < Math.min(v1.length, v2.length); i++) {
    rv.push(v1[i] * v2[i]);
  }

  return rv.reduce((e, a) => e + a);
}

export function normal2D(vec) {
  return [vec[1] / vecLen(vec), -vec[0] / vecLen(vec)];
}

export function createVec(line) {
  const p1 = line.p1 || line[0];
  const p2 = line.p2 || line[1];

  return vecAdd(
    p2,
    p1.map((e) => -e),
  );
}
