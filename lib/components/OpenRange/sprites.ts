import cow_eat from '../../assets/cow_eat.png';
import cow_shadow from '../../assets/cow_shadow.png';
import cow_walk from '../../assets/cow_walk.png';

export interface ISprite {
  name: string;
  src: string;
  loaded: boolean;
}

const sprites: ISprite[] = [
  {
    name: 'cow_eat',
    src: cow_eat,
    loaded: false,
  },
  {
    name: 'cow_walk',
    src: cow_walk,
    loaded: false,
  },
  {
    name: 'cow_shadow',
    src: cow_shadow,
    loaded: false,
  },
];

export default sprites;
