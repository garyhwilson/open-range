import { useEffect } from 'react';

import cow_eat from '../../assets/cow_eat.png';
import cow_walk from '../../assets/cow_walk.png';
import cow_shadow from '../../assets/cow_shadow.png';

import { Main } from './Main';

import styles from './styles.module.css';

function createStage(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props;

  const div = document.createElement('div');
  div.className = className ? className + ' ' + styles['open-range'] : styles['open-range'];
  
  for (const [key, value] of Object.entries(restProps)) {
    if (typeof value === 'function') {
      const eventName = key.replace(/^on/, '').toLowerCase();
      div.addEventListener(eventName, value);
      continue;
    }
    
    div.setAttribute(key, value);
  }

  const canvas = document.createElement('canvas');

  div.appendChild(canvas);

  return {
    div,
    canvas,
    ctx: canvas.getContext('2d')!,
  };
}

export function OpenRange(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  useEffect(() => {
    const stage = createStage(props);
    document.body.appendChild(stage.div);

    window.addEventListener('resize', () => {
      stage.canvas.width = stage.canvas.parentElement!.offsetWidth;
      stage.canvas.height = stage.canvas.parentElement!.offsetHeight;
    });

    window.dispatchEvent(new Event('resize'));

    const imagePaths = [cow_eat, cow_walk, cow_shadow];
    const images = imagePaths.map((path) => {
      const img = new Image();
      img.src = path;
      // TODO: I need the asset manager
      return img;
    });
    const main = new Main(stage.canvas, stage.ctx, images);
    main.start();

    return () => {
      window.removeEventListener('resize', () => {});
      document.body.removeChild(stage.div);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <></>;
}
