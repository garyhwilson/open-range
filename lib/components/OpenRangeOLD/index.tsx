import React from 'react';

import { Main } from './main';
import sprites, { ISprite } from './sprites';
import Stage from './stage';
import styles from './styles.module.css';

export class OpenRange extends React.Component {
  stage: any;

  constructor(props: any) {
    super(props);
    const stage = new Stage(styles);
    this.stage = stage.create(this.props);
  }

  componentDidMount() {
    document.body.appendChild(this.stage.div);
    this.loadSprites();
    window.addEventListener('resize', this.handleResize);
    window.dispatchEvent(new Event('resize'));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.body.removeChild(this.stage.div);
  }

  loadSprites() {
    const images = sprites.map((sprite: ISprite) => {
      const img = new Image();
      img.onload = () => {
        sprite.loaded = true;
        const count = sprites.reduce(
          (acc, cur) => (cur.loaded ? ++acc : acc),
          0,
        );
        if (count === sprites.length) {
          const main = new Main(this.stage.canvas, this.stage.ctx, images);
          main.start();
        }
      };

      img.src = sprite.src;
      return img;
    });
  }

  handleResize = () => {
    if (this.stage) {
      this.stage.canvas.width = this.stage.div.offsetWidth;
      this.stage.canvas.height = this.stage.div.offsetHeight;
    }
  };

  render() {
    return <></>;
  }
}
