import { useState } from "react";
import { OpenRange } from "../lib/main";

function App() {
  enum fadeInSpeed {
    NONE,
    FAST,
    MEDIUM,
    SLOW,
  }

  const [visible, setVisible] = useState(false);
  const [fadeIn, setFadeIn] = useState(0);

  const handleOnClick = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && !fadeIn ? (
        <OpenRange onClick={handleOnClick} />
      ) : (
        visible ? <OpenRange
          onClick={handleOnClick}
          className={`${
            fadeIn ? `fadeIn ${fadeIn && fadeInSpeed[fadeIn].toLowerCase()}` : ""
          }`}
        /> : null
      )}
      <select onChange={(e) => setFadeIn(parseInt(e.target.value))}>
        <option value={fadeInSpeed.NONE}>No Fade</option>
        <option value={fadeInSpeed.FAST}>Fast</option>
        <option value={fadeInSpeed.MEDIUM}>Medium</option>
        <option value={fadeInSpeed.SLOW}>Slow</option>
      </select>
      <button onClick={() => setVisible(!visible)}>Display Open Range</button>
    </>
  );
}

export default App;
