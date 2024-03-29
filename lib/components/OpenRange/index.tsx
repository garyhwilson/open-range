import { useEffect } from 'react';

import styles from './styles.module.css';

export function OpenRange(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props;
  console.log(restProps)

  useEffect(() => {
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

    document.body.appendChild(div);

    window.addEventListener('resize', () => {
      canvas.width = canvas.parentElement!.offsetWidth;
      canvas.height = canvas.parentElement!.offsetHeight;
    });

    window.dispatchEvent(new Event('resize'));

    return () => {
      document.body.removeChild(div);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <></>;
}
