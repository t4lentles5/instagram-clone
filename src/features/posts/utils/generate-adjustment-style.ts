import { Adjustment } from './adjustments';

const mapRange = (value: number, min: number, max: number) => {
  return min + ((value + 100) / 200) * (max - min);
};

export const generateFilterStyle = (adjustments: Adjustment[]) => {
  const getValue = (name: string) =>
    adjustments.find((adj) => adj.name === name)?.value ?? 0;

  const filters: string[] = [];

  const brightnessVal = getValue('Brightness');
  if (brightnessVal !== 0) {
    const mapped = mapRange(brightnessVal, 100, 200);
    filters.push(`brightness(${mapped}%)`);
  }

  const contrastVal = getValue('Contrast');
  if (contrastVal !== 0) {
    const mapped = mapRange(contrastVal, 100, 200);
    filters.push(`contrast(${mapped}%)`);
  }

  const saturationVal = getValue('Saturation');
  if (saturationVal !== 0) {
    const mapped = mapRange(saturationVal, 100, 200);
    filters.push(`saturate(${mapped}%)`);
  }

  const fadeVal = getValue('Fade');
  if (fadeVal !== 0) {
    const mapped = mapRange(fadeVal, 0, 100);
    filters.push(`sepia(${mapped}%)`);
  }

  const tempVal = getValue('Temperature');
  if (tempVal !== 0) {
    const mapped = mapRange(tempVal, -100, 100);
    filters.push(`hue-rotate(${mapped}deg)`);
  }

  return filters.join(' ');
};
