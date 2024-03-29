import { faRotateLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useLayoutEffect, useRef } from 'react';
import '../../styles/pseudofill.scss';
import Dropdown from 'react-dropdown';
import { Link, useLocation } from 'react-router-dom';
import { Boxes } from '../shared/Boxes';
import { Maze } from '../shared/maze';
import { Robot } from '../shared/Robot';

import 'react-dropdown/style.css';
import '../../styles/generalDropdown.scss';

import '../../styles/app.scss';
import '../../styles/levelSelect.scss';

const boxes = Boxes(4, 6);

function PseudoFill(mainProps: { pages: string[] }): JSX.Element {
  const location = useLocation();
  const current = location.pathname;
  const currPage = mainProps.pages.indexOf(current);

  const initialFillValues = ['', '', '', ''];
  const initialDropValues = ['', '', '', ''];

  const [fillValues, setFillValues] = useState(initialFillValues);
  const [dropValues, setDropValues] = useState(initialDropValues);

  interface MoveFillProps {
    onChange: (value: string, index: number) => void;
    index: number;
  }

  interface TurnFillProps {
    onChange: (value: string, index: number) => void;
    index: number;
  }

  function MoveFill(props: MoveFillProps): JSX.Element {
    return (
      <div className="line">
        <div>Move forward</div>
        <input
          className="forwardInput"
          value={fillValues[props.index]}
          onChange={(val) => props.onChange(val.target.value, props.index)}
        ></input>
        <div>steps</div>
      </div>
    );
  }

  function TurnFill(props: TurnFillProps): JSX.Element {
    return (
      <div className="line">
        <div>Turn</div>
        <div style={{ marginLeft: 10 }}>
          <Dropdown
            placeholder=""
            value={dropValues[props.index]}
            options={['right', 'left']}
            arrowClosed={<span className="arrow-closed" />}
            arrowOpen={<span className="arrow-open" />}
            onChange={(option) => props.onChange(option.value, props.index)}
          />
        </div>
      </div>
    );
  }

  const fillOnChange = (value: string, index: number) => {
    setFillValues({ ...fillValues, [index]: value });
  };

  const dropOnChange = (value: string, index: number) => {
    setDropValues({ ...dropValues, [index]: value });
  };

  const initCodes: (string | number)[] = [];
  const [codedInstructions, setCodes] = useState(initCodes);
  const indices = [0, 1, 2, 3];

  const handleRunClick = () => {
    setCodes(initCodes);
    for (let i = 0; i < 4; i++) {
      setCodes((codes) => codes.concat(parseInt(fillValues[i])));
      setCodes((codes) => codes.concat(dropValues[i]));
    }
  };

  const reset = () => {
    console.log('reset');
    setCodes(initCodes);
    setFillValues(initialFillValues);
    setDropValues(initialDropValues);
  };

  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  const calculateKeyframes = (codedInstructionsProps: (string | number)[]) => {
    const xArr = [0];
    const yArr = [0];
    const gridWidth = width / 6;
    const gridHeight = height / 4;
    let direction = 'right';
    codedInstructionsProps.forEach((item) => {
      if (item == 'right' || item == 'left') {
        if (direction == 'right') {
          if (item == 'right') {
            direction = 'down';
          } else {
            direction = 'up';
          }
        } else if (direction == 'down') {
          if (item == 'right') {
            direction = 'left';
          } else {
            direction = 'right';
          }
        } else if (direction == 'left') {
          if (item == 'right') {
            direction = 'up';
          } else {
            direction = 'down';
          }
        } else if (direction == 'up') {
          if (item == 'right') {
            direction = 'right';
          } else {
            direction = 'left';
          }
        }
      } else {
        if (direction == 'right') {
          xArr.push(xArr[xArr.length - 1] + +item * gridWidth);
          yArr.push(yArr[yArr.length - 1]);
        } else if (direction == 'left') {
          xArr.push(xArr[xArr.length - 1] - +item * gridWidth);
          yArr.push(yArr[yArr.length - 1]);
        } else if (direction == 'down') {
          xArr.push(xArr[xArr.length - 1]);
          yArr.push(yArr[yArr.length - 1] + +item * gridHeight);
        } else if (direction == 'up') {
          xArr.push(xArr[xArr.length - 1]);
          yArr.push(yArr[yArr.length - 1] - +item * gridHeight);
        }
      }
    });
    return [xArr, yArr];
  };

  console.log(codedInstructions);
  return (
    <div className="frame">
      <div id="sidebar">
        <div id="level-title">Pseudo Fill</div>
        <div id="instructions">
          Give the robot instructions to navigate the maze. Make sure you
          don&apos;t run into any obstacles!
        </div>
        <div id="side-content">
          {indices.map((item) => {
            return (
              <div key={item}>
                <MoveFill onChange={fillOnChange} index={item} />
                <TurnFill onChange={dropOnChange} index={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div id="main">
        <div className="main-section">
          <div id="title">LoopBots</div>
          <div className="level-select">
            {currPage != 0 && (
              <Link
                to={mainProps.pages[currPage - 1]}
                className="level-select-button left"
              >
                &#9664;
              </Link>
            )}
            Level {currPage + 1} of 5
            {currPage != mainProps.pages.length - 1 && (
              <Link
                to={mainProps.pages[currPage + 1]}
                className="level-select-button right"
              >
                &#9654;
              </Link>
            )}
          </div>
        </div>
        <div className="main-section">
          <div className="maze" ref={ref}>
            <Maze rows={4} cols={6} boxCoords={boxes} />
            <Robot keyframes={calculateKeyframes(codedInstructions)}></Robot>
          </div>
        </div>
        <div className="main-section">
          <div id="footer">made with ♥ by acm.teachla</div>
          <div id="buttons">
            <button id="run" className="control-btn" onClick={handleRunClick}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button id="reset" className="control-btn" onClick={reset}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PseudoFill;
