import { Component } from 'javascript-entity-component-system'

export const stageComponent: Component = {
  name: 'stage',
  state: {
    div: null,
    canvas: null,
  },
}

export const movementComponent: Component = {
  name: 'movement',
  state: {
    x: 0,
    y: 0,
    speed: 1,
    direction: [0, 0],
  },
}

export const cowSpriteComponent: Component = {
  name: 'cow',
  state: {
    sprites: [
      {
        spriteName: 'cow_idle',
        frameW: 128,
        frameH: 128,
        spriteSheet: [
          { name: 'up', row: 0, frames: [0] },
          { name: 'left', row: 1, frames: [0] },
          { name: 'down', row: 2, frames: [0] },
          { name: 'right', row: 3, frames: [0] },
        ],
      },
      {
        spriteName: 'cow_eat',
        frameW: 128,
        frameH: 128,
        spriteSheet: [
          { name: 'up', row: 0, frames: [0, 1, 2, 3] },
          { name: 'left', row: 1, frames: [0, 1, 2, 3] },
          { name: 'down', row: 2, frames: [0, 1, 2, 3] },
          { name: 'right', row: 3, frames: [0, 1, 2, 3] },
        ],
      },
      {
        spriteName: 'cow_walk',
        frameW: 128,
        frameH: 128,
        spriteSheet: [
          { name: 'up', row: 0, frames: [0, 1, 2, 3] },
          { name: 'left', row: 1, frames: [0, 1, 2, 3] },
          { name: 'down', row: 2, frames: [0, 1, 2, 3] },
          { name: 'right', row: 3, frames: [0, 1, 2, 3] },
        ],
      },
      {
        spriteName: 'cow_shadow',
        frameW: 128,
        frameH: 128,
        spriteSheet: [
          { name: 'up', row: 0, frames: [0] },
          { name: 'left', row: 1, frames: [0] },
          { name: 'down', row: 2, frames: [0] },
          { name: 'right', row: 3, frames: [0] },
        ],
      },
    ],
  },
}

export const collisionComponent: Component = {
  name: 'collision',
  state: {
    x: 64,
    y: 64,
    radius: 47,
    collision: false,
  },
}
