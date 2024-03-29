import { useState } from 'react';

import { OpenRange } from '../lib/main';

import './App.css';

function App() {
  const [fadeIn, setFadeIn] = useState(0);
  const [visible, setVisible] = useState(false);

  const fadeInSpeedClass = [
    '',
    ' or-fadeInFast',
    ' or-fadeIn',
    ' or-fadeInSlow',
  ];

  return (
    <div className="or-demo">
      <h1>Open Range</h1>
      <form>
        <div className="form-fields">
          <label className="form-control">
            <input
              type="radio"
              value={0}
              checked={fadeIn === 0}
              onChange={() => setFadeIn(0)}
            />
            No Fade In
          </label>
          <label className="form-control">
            <input
              type="radio"
              value={1}
              checked={fadeIn === 1}
              onChange={() => setFadeIn(1)}
            />
            Fade In Fast
          </label>
          <label className="form-control">
            <input
              type="radio"
              value={2}
              checked={fadeIn === 2}
              onChange={() => setFadeIn(2)}
            />
            Fade In Medium
          </label>
          <label className="form-control">
            <input
              type="radio"
              value={3}
              checked={fadeIn === 3}
              onChange={() => setFadeIn(3)}
            />
            Fade In Slow
          </label>
        </div>
      </form>
      <button className="button" onClick={() => setVisible(true)}>Show</button>
      {visible ? (
        <OpenRange
          className={`open-range${fadeInSpeedClass[fadeIn]}`}
          onClick={() => setVisible(false)}
        />
      ) : null}
    </div>
  );
}

export default App;
