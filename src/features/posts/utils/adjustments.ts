export interface Adjustment {
  name: string;
  min: number;
  max: number;
  value: number;
}

export const adjustments: Adjustment[] = [
  {
    name: 'Brightness',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Contrast',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Fade',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Saturation',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Temperature',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Vignette',
    min: 0,
    max: 100,
    value: 0,
  },
];
