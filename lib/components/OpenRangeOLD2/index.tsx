import React from 'react'

import { EntityComponentSystem } from 'javascript-entity-component-system'

import {
  collisionComponent,
  cowSpriteComponent,
  movementComponent,
  stageComponent,
} from './components'
import { MainLoop } from './main_loop'
import { cowDrawProcessor } from './processors'
import sprites, { ISprite } from './sprites'
import Stage from './stage'
import styles from './styles.module.css'

export class OpenRange extends React.Component {
  ecs: EntityComponentSystem

  constructor(props: any) {
    super(props)

    this.ecs = new EntityComponentSystem()
    this.ecs.addComponent(stageComponent)
    this.ecs.addComponent(movementComponent)
    this.ecs.addComponent(collisionComponent)
    this.ecs.addComponent(cowSpriteComponent)
    this.ecs.addProcessor(cowDrawProcessor)
  }

  componentDidMount() {
    const stage = new Stage(this.ecs, styles)
    stage.create(this.props)

    this.loadSprites()
    window.addEventListener('resize', this.handleResize)
    window.dispatchEvent(new Event('resize'))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    document.body.removeChild(stageComponent.state.div)
  }

  loadSprites() {
    sprites.map((sprite: ISprite) => {
      sprite.image.src = sprite.src
      sprite.image.onload = () => {
        sprite.loaded = true
        const count = sprites.reduce(
          (acc, cur) => (cur.loaded ? ++acc : acc),
          0,
        )
        if (count === sprites.length) {
          const canvas = stageComponent.state.canvas
          const ctx = canvas.getContext('2d')!
          const mainLoop = new MainLoop(
            stageComponent.state.canvas,
            ctx,
            sprites,
          )
          mainLoop.start(this.ecs)
        }
      }
    })
  }

  handleResize = () => {
    if (stageComponent.state) {
      stageComponent.state.canvas.width = stageComponent.state.div.offsetWidth
      stageComponent.state.canvas.height = stageComponent.state.div.offsetHeight
    }
  }

  render() {
    return <></>
  }
}

/*
import { useEffect } from 'react'

import { MainLoop } from './main_loop'
import sprites from './sprites'
import style from './styles.module.css'

export function OpenRange(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  useEffect(() => {
    const { className, ...restProps } = props
    const div = document.createElement('div')

    div.className = className
      ? className + ' ' + style['open-range']
      : style['open-range']

    for (const [key, value] of Object.entries(restProps)) {
      if (typeof value === 'function') {
        const eventName = key.replace(/^on/, '').toLowerCase()
        div.addEventListener(eventName, value)
        continue
      }

      div.setAttribute(key, value)
    }

    const canvas = document.createElement('canvas')
    div.appendChild(canvas)

    document.body.appendChild(div)

    window.addEventListener('resize', () => {
      canvas.width = canvas.parentElement!.offsetWidth
      canvas.height = canvas.parentElement!.offsetHeight
    })

    window.dispatchEvent(new Event('resize'))

    sprites.map((sprite) => {
      sprite.image.src = sprite.src
      sprite.image.onload = () => {
        sprite.loaded = true
        const count = sprites.reduce(
          (acc, cur) => (cur.loaded ? ++acc : acc),
          0,
        )
        if (count === sprites.length) {
          const mainLoop = new MainLoop(
            canvas,
            canvas.getContext('2d')!,
            sprites,
          )
          mainLoop.start()
        }
      }

      return sprite.image
    })

    return () => {
      window.removeEventListener('resize', () => {})
      document.body.removeChild(div)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [])

  return <></>
}
*/
