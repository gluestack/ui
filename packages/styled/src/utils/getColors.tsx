export function rgba2hex(orig: any) {
  let a;
  const rgb = orig
    .replace(/\s/g, '')
    .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
  const alpha = ((rgb && rgb[4]) || '').trim();
  let hex = rgb
    ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
      (rgb[2] | (1 << 8)).toString(16).slice(1) +
      (rgb[3] | (1 << 8)).toString(16).slice(1)
    : orig;

  if (alpha !== '') {
    a = alpha;
  } else {
    a = 1;
  }

  a = ((a * 255) | (1 << 8)).toString(16).slice(1);
  hex = hex + a;

  return hex;
}

export function addOpacityToHex(hex: string, alpha: number) {
  // Convert the hexadecimal code to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Add the alpha value to the RGB values
  const a = alpha;

  // Convert the RGB values with the alpha value to a RGBA string
  const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;

  // Convert the RGBA string back to a hexadecimal code
  // const result = `#${rgba
  //   .match(/\d+/g)
  //   .map((n) => parseInt(n).toString(16).padStart(2, '0'))
  //   .join('')}`;
  const result = rgba2hex(rgba);

  return '#' + result;
}
