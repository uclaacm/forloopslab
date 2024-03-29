import {
  faRotateLeft,
  faPlay,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Boxes } from '../shared/Boxes';
import { Maze } from '../shared/maze';
import { Robot } from '../shared/Robot';
// import {Robot,SetMove, SetDirection, SetPosition} from '../shared/Robot';

import '../../styles/app.scss';
import '../../styles/levelSelect.scss';
import '../../styles/repetitive.scss';

const boxes = Boxes(4, 6);

function Repetitive(props: { pages: string[] }): JSX.Element {
  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);

  const [instructions, setInstructions] = useState<
  { id: number; text: string }[]
  >([]);

  const initCodes: (string | number)[] = [];
  const [codedInstructions, setCodes] = useState(initCodes);

  const handleClick = (type: string) => {
    const newInstruction: { id: number; text: string } = {
      id: new Date().getTime(), //unique id that differentiates each instruction
      text: type,
    };

    setInstructions(instructions.concat(newInstruction));
  };

  const deleteInstruction = (id: number) => {
    const updatedInstructions = instructions.filter(
      //filters out the the element that has the passed in id
      (instruction: { id: number; text: string }) => instruction.id !== id,
    );
    setInstructions(updatedInstructions);
  };

  const renderInstructions = instructions.map(
    (instruction: { id: number; text: string }) => {
      return (
        <div className="code-instruction" key={instruction.id}>
          {instruction.text}
          <button
            className="close-btn"
            onClick={() => deleteInstruction(instruction.id)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      );
    },
  );

  const handleRunClick = () => {
    setCodes(initCodes);
    for (let i = 0; i < instructions.length; i++) {
      if (instructions[i].text == 'Move Forward') {
        let numSteps = 1;
        while (
          i + 1 < instructions.length &&
          instructions[i + 1].text == 'Move Forward'
        ) {
          numSteps++;
          i++;
        }
        setCodes((codes) => codes.concat(numSteps));
      }
      if (instructions[i].text == 'Turn Left') {
        setCodes((codes) => codes.concat('left'));
      } else if (instructions[i].text == 'Turn Right') {
        setCodes((codes) => codes.concat('right'));
      }
    }
  };

  const reset = () => {
    console.log('reset');
    setCodes(initCodes);
    setInstructions([]);
  };

  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  console.log(width);
  console.log(height);
  const calculateKeyframes = (codedInstructionsProps: (string | number)[]) => {
    const xArr = [0];
    const yArr = [0];
    // let gridWidth = Math.min(180, screen.width / 8.2);
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
    console.log(screen.width);
    console.log(gridWidth);
    return [xArr, yArr];
  };

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="level-title">Repetitive</div>
        <div id="instructions">
          Give the robot instructions to navigate the maze. Make sure you
          don&apos;t run into any obstacles!
        </div>
        <div id="content">
          <div id="Repetitive">
            <div id="code-instructions">{renderInstructions}</div>
            <div>
              <button
                className="repetitive-btn wide"
                onClick={() => {
                  handleClick('Move Forward');
                }}
              >
                Move Forward
              </button>
            </div>
            <div className="repetitive-btn-group">
              <button
                className="repetitive-btn"
                style={{ marginRight: '0.5vw' }}
                onClick={() => {
                  handleClick('Turn Left');
                }}
              >
                Turn Left
              </button>
              <button
                className="repetitive-btn"
                onClick={() => {
                  handleClick('Turn Right');
                }}
              >
                Turn Right
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="main">
        <div className="main-section">
          <div id="title">LoopBots</div>
          <div className="level-select">
            {currPage != 0 && (
              <Link
                to={props.pages[currPage - 1]}
                className="level-select-button left"
              >
                &#9664;
              </Link>
            )}
            Level {currPage + 1} of 5
            {currPage != props.pages.length - 1 && (
              <Link
                to={props.pages[currPage + 1]}
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

export default Repetitive;
