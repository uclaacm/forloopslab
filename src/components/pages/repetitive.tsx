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
import Robot from '../shared/Robot';
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
    // Create a new instruction based on the button clicked
    const newInstruction: { id: number; text: string } = {
      id: new Date().getTime(), //unique id that differentiates each instruction
      text: type,
    };
  
    // Add the new instruction to the instructions state
    setInstructions(prevInstructions => [...prevInstructions, newInstruction]);
  
    // Log the current instructions array after adding the new instruction
    console.log("Button clicked:", type);
    console.log("Current instructions:", instructions);
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
    let newCodes: (string | number)[] = [];
    for (let i = 0; i < instructions.length; i++) {
      if (instructions[i].text === 'Move Forward') {
        let numSteps = 1;
        while (
          i + 1 < instructions.length &&
          instructions[i + 1].text === 'Move Forward'
        ) {
          numSteps++;
          i++;
        }
        newCodes = newCodes.concat(numSteps);
      } else if (instructions[i].text === 'Turn Left') {
        newCodes = newCodes.concat('left');
      } else if (instructions[i].text === 'Turn Right') {
        newCodes = newCodes.concat('right');
      }
    }
    setCodes(newCodes);
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
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
  }, []);
  

  console.log(width);
  console.log(height);
 // Update calculateKeyframes to handle the "Move Forward" instruction
 const calculateKeyframes = (codedInstructionsProps: { id: number; text: string }[]) => {
  const xArr: number[] = [0];
  const yArr: number[] = [0];
  let direction: string = 'right'; // Initialize the direction
  const gridWidth: number = width / 6; // Calculate grid width
  const gridHeight: number = height / 4; // Calculate grid height

  codedInstructionsProps.forEach((instruction) => {
    const item = instruction.text;
    if (item === 'right' || item === 'left') {
      direction = item;
    } else if (item === 'Move Forward') {
      if (direction === 'right') {
        xArr.push(xArr[xArr.length - 1] + gridWidth);
        yArr.push(yArr[yArr.length - 1]);
      } else if (direction === 'left') {
        xArr.push(xArr[xArr.length - 1] - gridWidth);
        yArr.push(yArr[yArr.length - 1]);
      } else if (direction === 'down') {
        xArr.push(xArr[xArr.length - 1]);
        yArr.push(yArr[yArr.length - 1] + gridHeight);
      } else if (direction === 'up') {
        xArr.push(xArr[xArr.length - 1]);
        yArr.push(yArr[yArr.length - 1] - gridHeight);
      }
    } else if (item === 'Turn Left') {
      if (direction === 'right') {
        direction = 'up';
      } else if (direction === 'left') {
        direction = 'down';
      } else if (direction === 'down') {
        direction = 'right';
      } else if (direction === 'up') {
        direction = 'left';
      }
    } else if (item === 'Turn Right') {
      if (direction === 'right') {
        direction = 'down';
      } else if (direction === 'left') {
        direction = 'up';
      } else if (direction === 'down') {
        direction = 'left';
      } else if (direction === 'up') {
        direction = 'right';
      }
    }
  });

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
