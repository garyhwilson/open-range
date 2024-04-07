import {
  Component,
  Entity,
  Processor,
} from 'javascript-entity-component-system'

export const cowDrawProcessor: Processor = {
  name: 'cow_draw_processor',
  required: ['stage', 'movement', 'collision', 'cow'],
  update(entity: Entity, components: Component[], processor: Processor) {
    const [stage, movement, collision] = components

    if (entity.name === 'foo') {
      console.log(entity, components, processor, stage, movement, collision)
    }

    console.log(stage.state.div)
    const canvas = stage.state.canvas
    const ctx = canvas.getContext('2d')

    ctx.translate(movement.state.x, movement.state.y)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 128, 128)
    ctx.translate(movement.state.x, movement.state.y)
  },
}
