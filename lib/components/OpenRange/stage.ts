export default class Stage {
  style: Record<string, string>;
  div: HTMLDivElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(styles: Record<string, string>) {
    this.style = styles;
    this.div = {} as HTMLDivElement;
    this.canvas = {} as HTMLCanvasElement;
    this.ctx = {} as CanvasRenderingContext2D;
  }

  create(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { className, ...restProps } = props;

    this.div = document.createElement('div');
    this.div.className = className
      ? className + ' ' + this.style['open-range']
      : this.style['open-range'];

    for (const [key, value] of Object.entries(restProps)) {
      if (typeof value === 'function') {
        const eventName = key.replace(/^on/, '').toLowerCase();
        this.div.addEventListener(eventName, value);
        continue;
      }

      this.div.setAttribute(key, value);
    }

    this.canvas = document.createElement('canvas');
    this.div.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    return {
      div: this.div,
      canvas: this.canvas,
      ctx: this.ctx,
    };
  }
}
