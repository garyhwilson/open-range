import cow_eat from '../../assets/cow_eat.png'
import cow_shadow from '../../assets/cow_shadow.png'
import cow_walk from '../../assets/cow_walk.png'

export interface ISprite {
  name: string
  src: string
  image: HTMLImageElement
  loaded: boolean
}

const sprites: ISprite[] = [
  {
    name: 'cow_eat',
    src: cow_eat,
    image: new Image(),
    loaded: false,
  },
  {
    name: 'cow_walk',
    src: cow_walk,
    image: new Image(),
    loaded: false,
  },
  {
    name: 'cow_shadow',
    src: cow_shadow,
    image: new Image(),
    loaded: false,
  },
]

export default sprites
