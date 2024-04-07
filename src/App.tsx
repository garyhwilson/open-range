import { useState } from 'react'

import { OpenRange } from '../lib/main'
import './App.css'

function App() {
  const [fadeSpeed, setFadeSpeed] = useState(0)
  const [visible, setVisible] = useState(false)

  return (
    <div className="or-demo">
      <h1>Open Range</h1>
      <form>
        <div className="form-fields">
          <label className="form-control">
            <input
              type="radio"
              value={0}
              checked={fadeSpeed === 0}
              onChange={() => setFadeSpeed(0)}
            />
            No Fade In
          </label>
          <label className="form-control">
            <input
              type="radio"
              value={1}
              checked={fadeSpeed === 1}
              onChange={() => setFadeSpeed(1)}
            />
            Fade In Fast
          </label>
          <label className="form-control">
            <input
              type="radio"
              value={2}
              checked={fadeSpeed === 2}
              onChange={() => setFadeSpeed(2)}
            />
            Fade In Medium
          </label>
          <label className="form-control">
            <input
              type="radio"
              value={3}
              checked={fadeSpeed === 3}
              onChange={() => setFadeSpeed(3)}
            />
            Fade In Slow
          </label>
        </div>
      </form>
      <button className="button" onClick={() => setVisible(true)}>
        Show
      </button>
      <OpenRange
        className={`open-range`}
        fadeSpeed={fadeSpeed}
        visible={visible}
        onClick={() => setVisible(false)}
      />
    </div>
  )
}

export default App
