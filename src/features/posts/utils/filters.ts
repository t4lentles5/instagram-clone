export interface Filter {
  name: string;
  filterStyle: string;
}

export const filters: Filter[] = [
  {
    name: 'Aden',
    filterStyle: 'brightness(120%) contrast(90%) sepia(40%)',
  },
  {
    name: 'Clarendon',
    filterStyle: 'brightness(125%) contrast(130%) saturate(150%)',
  },
  {
    name: 'Crema',
    filterStyle: 'brightness(110%) contrast(105%) sepia(30%)',
  },
  {
    name: 'Gingham',
    filterStyle: 'brightness(115%) contrast(90%) sepia(50%)',
  },
  {
    name: 'Juno',
    filterStyle: 'brightness(110%) contrast(125%) saturate(160%)',
  },
  {
    name: 'Lark',
    filterStyle: 'brightness(120%) contrast(105%) saturate(130%)',
  },
  {
    name: 'Ludwig',
    filterStyle: 'brightness(115%) contrast(100%) sepia(10%)',
  },
  {
    name: 'Moon',
    filterStyle: 'grayscale(100%) contrast(120%) brightness(105%)',
  },
  {
    name: 'Original',
    filterStyle: 'none',
  },
  {
    name: 'Perpetua',
    filterStyle: 'brightness(120%) saturate(130%)',
  },
  {
    name: 'Reyes',
    filterStyle: 'brightness(110%) contrast(90%) sepia(35%)',
  },
  {
    name: 'Slumber',
    filterStyle: 'brightness(115%) saturate(90%) sepia(40%)',
  },
];
