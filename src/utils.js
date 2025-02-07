const canvas = document.querySelector("#canvas");
const clW = canvas.clientWidth / 2;
const clH = canvas.clientHeight / 2;

export function toAbsoluteCords(cords) {
  return [cords[0] / clW - 1.0, 2.0 - cords[1] / clH - 1.0];
}

export function toElementCords(cords) {
  return [clW + cords[0] * clW, clH - cords[1] * clH];
}

export function translateScale(scale) {
  return [scale[0] * clW, scale[1] * clH];
}
