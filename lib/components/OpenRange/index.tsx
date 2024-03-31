import { useEffect } from 'react';

import { Main } from './main';
import sprites, { ISprite } from './sprites';
import Stage from './stage';
import styles from './styles.module.css';

export function OpenRange(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  useEffect(() => {
    const stage = new Stage(styles);
    const div = stage.create(props);

    document.body.appendChild(div);

    window.addEventListener('resize', () => {
      stage.canvas.width = stage.canvas.parentElement!.offsetWidth;
      stage.canvas.height = stage.canvas.parentElement!.offsetHeight;
    });

    window.dispatchEvent(new Event('resize'));

    const images = sprites.map((sprite: ISprite) => {
      const img = new Image();
      img.onload = () => {
        sprite.loaded = true;
        const count = sprites.reduce(
          (acc, cur) => (cur.loaded ? ++acc : acc),
          0,
        );
        if (count === sprites.length) {
          const main = new Main(stage.canvas, stage.ctx, images);
          main.start();
        }
      };

      img.src = sprite.src;
      return img;
    });

    return () => {
      window.removeEventListener('resize', () => {});
      document.body.removeChild(div);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, []);

  return <></>;
}
