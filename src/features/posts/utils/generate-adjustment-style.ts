import { Adjustment } from './adjustments';

const mapRange = (value: number, min: number, max: number) => {
  return min + ((value + 100) / 200) * (max - min);
};

export const generateFilterStyle = (adjustments: Adjustment[]) => {
  const getValue = (name: string) =>
    adjustments.find((adj) => adj.name === name)?.value ?? 0;

  const brightness = mapRange(getValue('Brightness'), 50, 150);
  const contrast = mapRange(getValue('Contrast'), 50, 150);
  const saturate = mapRange(getValue('Saturation'), 0, 200);
  const sepia = mapRange(getValue('Fade'), 0, 50);
  const hueRotate = mapRange(getValue('Temperature'), -100, 100);

  return `
    brightness(${brightness}%)
    contrast(${contrast}%)
    saturate(${saturate}%)
    sepia(${sepia}%)
    hue-rotate(${hueRotate}deg)
  `.trim();
};
