import { ZombieModelSrc } from '../constants';

export const generateZombies = () => {
  const scale = '0.5 0.5 0.5';
  const offset = '0 0 0';
  return [
    {
      id: 1,
      src: ZombieModelSrc,
      position: '25 0 5',
      rotation: '0 0 0',
      scale,
      offset,
    },
    {
      id: 2,
      src: ZombieModelSrc,
      position: '65 0 15',
      rotation: '0 -90 0',
      scale,
      offset,
    },
    {
      id: 3,
      src: ZombieModelSrc,
      position: '25 0 35',
      rotation: '0 90 0',
      scale,
      offset,
    },
    {
      id: 4,
      src: ZombieModelSrc,
      position: '60 0 45',
      rotation: '0 180 0',
      scale,
      offset,
    },
  ];
};
