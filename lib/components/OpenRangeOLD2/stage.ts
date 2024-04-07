import {
  Component,
  EntityComponentSystem,
} from 'javascript-entity-component-system'

export default class Stage {
  stage: Component
  style: Record<string, string>

  constructor(ecs: EntityComponentSystem, styles: Record<string, string>) {
    this.style = styles
    this.stage = ecs.getComponent('stage')
  }

  create(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { className, ...restProps } = props

    const div = document.createElement('div')
    const canvas = document.createElement('canvas')

    document.body.appendChild(div)
    div.appendChild(canvas)

    this.stage.state.div = div
    this.stage.state.canvas = canvas

    this.stage.state.div.setAttribute('id', 'open-range')
    this.stage.state.div.className = className
      ? className + ' ' + this.style['open-range']
      : this.style['open-range']

    for (const [key, value] of Object.entries(restProps)) {
      if (typeof value === 'function') {
        const eventName = key.replace(/^on/, '').toLowerCase()
        this.stage.state.div.addEventListener(eventName, value)
        continue
      }

      this.stage.state.div.setAttribute(key, value)
    }

    this.stage.state.div = div
    this.stage.state.canvas = canvas
  }
}
