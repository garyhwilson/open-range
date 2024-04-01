import { EntityComponentSystem } from 'javascript-entity-component-system';
import {
  Component,
  Entity,
  Processor,
} from 'javascript-entity-component-system';

export class Main {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  images: HTMLImageElement[];
  width: number;
  height: number;
  fps: number;
  interval: number;
  startTime: number;
  previousTime: number;
  currentTime: number;
  deltaTime: number;
  positionComponent: Component;
  collisionComponent: Component;
  cowComponent: Component;
  actorDrawProcessor: Processor;
  Cow: Entity;
  ecs: EntityComponentSystem;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    images: HTMLImageElement[],
  ) {
    this.canvas = canvas;
    this.ctx = context;
    this.images = images;
    this.width = canvas.width;
    this.height = canvas.height;
    this.fps = 5;
    this.interval = Math.floor(1000 / this.fps);
    this.startTime = performance.now();
    this.previousTime = this.startTime;
    this.currentTime = 0;
    this.deltaTime = 0;

    this.ecs = new EntityComponentSystem();

    this.Cow = {} as Entity;

    this.positionComponent = {
      name: 'position',
      state: {
        x: 0,
        y: 0,
      },
    };

    this.collisionComponent = {
      name: 'collision',
      state: {
        collisionX: false,
        collisionY: false,
        collisionWidth: 0,
        collisionHeight: 0,
      },
    };

    this.cowComponent = {
      name: 'cow',
      state: {
        width: 128,
        height: 128,
        speed: 1,
      },
    };

    this.actorDrawProcessor = {
      name: 'actor_draw_processor',
      required: ['position', 'cow'],
      update(entity: Entity, components: Component[], processor: Processor) {
        console.log(entity, components, processor);
        const [position, cow] = components;

        context.drawImage(
          images[0],
          position.state.x,
          position.state.y,
          cow.state.width,
          cow.state.width,
        );
      },
    };
  }

  start() {
    this.ecs.addComponent(this.positionComponent);
    this.ecs.addComponent(this.collisionComponent);

    this.ecs.addProcessor(this.actorDrawProcessor);

    this.Cow = this.ecs.createEntity(
      'Cow',
      ['position', 'collision'],
      ['actor_draw_processor'],
    );

    this.ecs.addEntity(this.Cow);

    this.gameLoop();
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ecs.update();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
