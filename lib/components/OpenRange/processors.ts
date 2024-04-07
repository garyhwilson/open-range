import {
  Component,
  Entity,
  Processor,
} from 'javascript-entity-component-system'

export const cowDrawProcessor: Processor = {
  name: 'cow_draw_processor',
  required: ['movement', 'collision', 'cow'],
  update(entity: Entity, components: Component[], processor: Processor) {
    const [stage, movement, collision] = components

    console.log(entity, components, processor, stage, movement, collision)
  },
}
