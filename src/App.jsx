import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [score, setScore] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bf, setBf] = useState('');
  const [colorTXT, setColorTXT] = useState('rgb(255, 138, 138)');
  const [table, setTable] = useState(['transparent', 'transparent', 'transparent', 'transparent', 'transparent']);

  const elementRef = useRef(null);
  const [progressWidth, setProgressWidth] = useState(0);

  const updateWidth = () => {
    if (elementRef.current) {
      setProgressWidth(elementRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    if (!elementRef.current) return;

    updateWidth(); // initial

    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  const calculateScore = () => {
    setTable(['transparent', 'transparent', 'transparent', 'transparent', 'transparent']);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const f = parseFloat(bf);

    if (isNaN(w) || isNaN(h) || isNaN(f)) {
      alert("Please fill in all values correctly.");
      return;
    }

    const amScore = (weight - (weight * f / 100)) / (height * height) * (100 - f) / 100;
    setScore(amScore.toFixed(2));

    if (amScore < 13) {
      setColorTXT('rgb(255, 138, 138)');
      setTable(['rgb(255, 138, 138)', 'transparent', 'transparent', 'transparent', 'transparent']);
    } else if (amScore < 15) {
      setColorTXT('rgb(255, 216, 45)');
      setTable(['transparent', 'rgb(255, 216, 45)', 'transparent', 'transparent', 'transparent']);
    } else if (amScore < 17.5) {
      setColorTXT('rgb(121, 255, 139)');
      setTable(['transparent', 'transparent', 'rgb(121, 255, 139)', 'transparent', 'transparent']);
    } else if (amScore < 19.5) {
      setColorTXT('rgb(89, 128, 255)');
      setTable(['transparent', 'transparent', 'transparent', 'rgb(89, 128, 255)', 'transparent']);
    } else {
      setColorTXT('rgb(207, 106, 253)');
      setTable(['transparent', 'transparent', 'transparent', 'transparent', 'rgb(207, 106, 253)']);
    }
  };

  return (
    <>
      <div className='container'>
        <div>
          <h1>Adjusted Muscle Score Calculator</h1>
        </div>
        <div className='main'>
          <div className='user-info'>
            <div className='info-div'>
              <p>Weight (kg)</p>
              <input type='number' value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className='info-div'>
              <p>Height (m)</p>
              <input type='number' value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className='info-div'>
              <p>Body Fat %</p>
              <input type='number' value={bf} onChange={(e) => setBf(e.target.value)} />
            </div>
            <button onClick={calculateScore}>CALCULATE</button>
          </div>

          <div>
            <table>
              <thead>
                <tr>
                  <th>AMS Score</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: table[0] }}>
                  <td>&lt; 13</td>
                  <td>Lean but underdeveloped</td>
                </tr>
                <tr style={{ backgroundColor: table[1] }}>
                  <td>13–15</td>
                  <td>Average gym-goer</td>
                </tr>
                <tr style={{ backgroundColor: table[2] }}>
                  <td>15–17.5</td>
                  <td>Well-trained and lean</td>
                </tr>
                <tr style={{ backgroundColor: table[3] }}>
                  <td>17.5–19.5</td>
                  <td>Strong natural physique</td>
                </tr>
                <tr style={{ backgroundColor: table[4] }}>
                  <td>&gt; 19.5</td>
                  <td>Elite or possibly enhanced</td>
                </tr>
              </tbody>
            </table>
            <div className='score'>
              <h1>Your score is: <span style={{ color: colorTXT }}>{score}</span></h1>
            </div>
          </div>
        </div>

        <div className='progress'>
          <div className='progress-bar' ref={elementRef}>
            <div
              id='indicator'
              style={{
                position: 'absolute',
                top: '-25px',
                fontSize: '20px',
                fontWeight: '900',
                left: `calc(${(progressWidth) * ((11.5384615 * score - 138) / 100)}px - 10px)`, // Just as an example: center
              }}
            >
              &#9660;
            </div>
          </div>
          <div className='progress-num'>
            <span>13</span>
            <span>15</span>
            <span>17.5</span>
            <span>19.5</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
