import { useEffect } from 'react'

import {
  Component,
  Entity,
  EntityComponentSystem,
  Processor,
} from 'javascript-entity-component-system'

import cow_eat from '../../assets/cow_eat.png'
import cow_shadow from '../../assets/cow_shadow.png'
import cow_walk from '../../assets/cow_walk.png'
//import sprites, { ISprite } from './sprites'
import style from './styles.module.css'

type OpenRangeProps = {
  className?: string
  fadeSpeed?: number
  visible?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const fadeInSpeedClass = ['', ' or-fadeInFast', ' or-fadeIn', ' or-fadeInSlow']

export const OpenRange = (props: OpenRangeProps) => {
  const { className, fadeSpeed, visible = true, ...restProps } = props

  const div = document.createElement('div')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  let Bessie: Entity

  //#region ECS SETUP
  const ecs = new EntityComponentSystem()

  const movementComponent: Component = {
    name: 'movement',
    state: {
      x: 0,
      y: 0,
      speed: 1,
      direction: [0, 0],
    },
  }

  const cowSpriteComponent: Component = {
    name: 'cow',
    state: {
      currentState: 'idle',
      sprites: [
        {
          name: 'cow_idle',
          src: cow_eat,
          image: new Image(),
          loaded: false,
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
          name: 'cow_eat',
          src: cow_eat,
          image: new Image(),
          loaded: false,
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
          name: 'cow_walk',
          src: cow_walk,
          image: new Image(),
          loaded: false,
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
          name: 'cow_shadow',
          src: cow_shadow,
          image: new Image(),
          loaded: false,
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

  const collisionComponent: Component = {
    name: 'collision',
    state: {
      x: 64,
      y: 64,
      radius: 47,
      collision: false,
    },
  }

  const cowDrawProcessor: Processor = {
    name: 'cow_draw_processor',
    required: ['cow', 'movement', 'collision'],
    update(entity: Entity, components: Component[]) {
      const [cow, movement] = components

      const sprite = cow.state.sprites.find(
        (value: any) => value.name === `cow_${cow.state.currentState}`,
      )
      if (!sprite) return

      ctx.globalAlpha = 1
      ctx.drawImage(
        sprite.image,
        0,
        0,
        128,
        128,
        movement.state.x,
        movement.state.y,
        sprite.frameW,
        sprite.frameH,
      )
    },
  }

  const registerEcs = () => {
    ecs.addComponent(movementComponent)
    ecs.addComponent(collisionComponent)
    ecs.addComponent(cowSpriteComponent)

    ecs.addProcessor(cowDrawProcessor)

    Bessie = ecs.createEntity(
      'Bessie',
      ['cow', 'movement', 'collision'],
      ['cow_draw_processor'],
    )

    ecs.addEntity(Bessie)
  }
  //#endregion

  const gameloop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ecs.update()
    requestAnimationFrame(gameloop)
  }

  const handleResize = () => {
    canvas.width = div.offsetWidth
    canvas.height = div.offsetHeight
  }

  useEffect(() => {
    if (visible) {
      //#region CREATE STAGE
      div.className = className
        ? className + ' ' + style['open-range']
        : style['open-range']

      div.className += fadeInSpeedClass[fadeSpeed || 0]

      for (const [key, value] of Object.entries(restProps)) {
        if (typeof value === 'function') {
          const eventName = key.replace(/^on/, '').toLowerCase()
          div.addEventListener(eventName, value)
          continue
        }

        div.setAttribute(key, value)
      }

      div.appendChild(canvas)

      document.body.appendChild(div)

      window.addEventListener('resize', handleResize)
      //#endregion

      registerEcs()

      //#region LOAD SPRITES
      const sprites = Bessie.components.find(
        (value: any) => value.name === 'cow',
      )!.state.sprites
      sprites.map((sprite: any) => {
        sprite.image = new Image()
        sprite.image.src = sprite.src
        sprite.image.onload = () => {
          sprite.loaded = true
          const count = sprites.reduce(
            (acc, cur) => (cur.loaded ? ++acc : acc),
            0,
          )
          if (count === sprites.length) {
            gameloop()
          }
        }
      })
      //#endregion
    } else {
      //#region REMOVE STAGE
      window.removeEventListener('resize', handleResize)

      const div = document.getElementsByClassName('open-range')
      if (!div[0]) return

      for (let i = 0; i < div.length; i++) {
        document.body.removeChild(div[i])
      }
      //#endregion
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return <></>
}
