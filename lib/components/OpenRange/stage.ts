export default class Stage {
  style: Record<string, string>;
  div: HTMLDivElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(styles: Record<string, string>) {
    this.style = styles;
    this.div = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  create(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { className, ...restProps } = props;
  
    const div = document.createElement('div');
    div.className = className ? className + ' ' + this.style['open-range'] : this.style['open-range'];
    
    for (const [key, value] of Object.entries(restProps)) {
      if (typeof value === 'function') {
        const eventName = key.replace(/^on/, '').toLowerCase();
        div.addEventListener(eventName, value);
        continue;
      }
      
      div.setAttribute(key, value);
    }
  
    div.appendChild(this.canvas);
  
    return div
  }
}