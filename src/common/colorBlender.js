export const intToHex = (num) => {
  let hex = Math.round(num).toString(16);
  if (hex.length === 1) {
    hex = `0${hex}`;
  }
  return hex;
}

export const blendColor = (colorA, colorB, pct) => {
  let color1 = colorA || '#000000';
  let color2 = colorB || '#ffffff';
  const percentage = pct || 0.5;

  if (color1.length !== 4 && color1.length !== 7) {
    throw new Error('colors must be provided as hexes');
  }

  if (color2.length !== 4 && color2.length !== 7) {
    throw new Error('colors must be provided as hexes');
  }

  if (percentage > 1 || percentage < 0) {
    throw new Error('percentage must be between 0 and 1');
  }

  if (color1.length === 4) {
    color1 = color1[1] + color1[1] + color1[2]
            + color1[2] + color1[3] + color1[3];
  } else {
    color1 = color1.substring(1);
  }

  if (color2.length === 4) {
    color2 = color2[1] + color2[1] + color2[2]
            + color2[2] + color2[3] + color2[3];
  } else {
    color2 = color2.substring(1);
  }

  color1 = [
    parseInt(color1[0] + color1[1], 16),
    parseInt(color1[2] + color1[3], 16),
    parseInt(color1[4] + color1[5], 16),
  ];
  color2 = [
    parseInt(color2[0] + color2[1], 16),
    parseInt(color2[2] + color2[3], 16),
    parseInt(color2[4] + color2[5], 16),
  ];

  const color3 = [
    (1 - percentage) * color1[0] + percentage * color2[0],
    (1 - percentage) * color1[1] + percentage * color2[1],
    (1 - percentage) * color1[2] + percentage * color2[2],
  ];

  // return '#' + intToHex(color3[0]) + intToHex(color3[1]) + intToHex(color3[2]);
  return `#${intToHex(color3[0])}${intToHex(color3[1])}${intToHex(color3[2])}`;
}

export const blendColors = (colors, percentage) => {
  let curr = colors[0];
  const rest = colors.slice(1);
  while (rest.length) {
    curr = blendColor(curr, rest.shift(), percentage);
  }
  return curr;
}
