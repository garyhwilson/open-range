import { EntityComponentSystem } from 'javascript-entity-component-system'

import { ISprite } from './sprites'

export class MainLoop {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private sprites: ISprite[]

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    sprites: ISprite[],
  ) {
    this.canvas = canvas
    this.context = context
    this.sprites = sprites
  }

  public start(ecs: EntityComponentSystem) {
    const cow = ecs.createEntity(
      'cow',
      ['stage', 'movement', 'collision', 'cow'],
      ['cow_draw_processor'],
    )

    ecs.addEntity(cow)

    //console.log(Math.random(), this.canvas, this.context, this.sprites)
    const gameloop = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      ecs.update()
      requestAnimationFrame(gameloop)
    }
    gameloop()
  }
}
