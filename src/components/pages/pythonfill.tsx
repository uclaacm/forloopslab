/*eslint-disable quotes*/
import { faRotateLeft, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

import Dropdown from "react-dropdown";
import { Link, useLocation } from "react-router-dom";
import "react-dropdown/style.css";
import "../../styles/generalDropdown.scss";

import "../../styles/app.scss";
import "../../styles/levelSelect.scss";
import "../../styles/pythonfill.scss";
//import { Boxes } from "../shared/Boxes";
import { Maze } from "../shared/maze";
import { Robot } from "../shared/Robot";

//const boxes = Boxes(4, 6);

function SampleSyntax() {
  return (
    <div className="sampleSyntax">
      <div>
        <span style={{ color: "#F08000" }}>for </span>steps
        <span style={{ color: "#F08000" }}> in </span>
        <span style={{ color: "#EC5800" }}>range</span>(
        <span style={{ color: "#89CFF0" }}>3</span>):
      </div>
      <div style={{ marginLeft: 25 }}>moveForward()</div>
    </div>
  );
}

//PseudoCode
function PseudoCode({ arr }: any) {
  function MoveForward(props: { steps: JSX.Element | string }) {
    return <div>Move forward {props.steps} times</div>;
  }
  function Turn(props: { direction: string }) {
    return <div>Turn {props.direction}</div>;
  }
  return (
    <div className="codeCard">
      {arr.map((element: string) => {
        if (element === "left" || element === "right") {
          return <Turn key={arr.indexOf(element)} direction={element} />;
        }
        return <MoveForward key={arr.indexOf(element)} steps={element} />;
      })}
    </div>
  );
}

//Python Code Fill
interface MoveTurnFillProps {
  onChange: (value: string, index: number) => void;
  index: number;
}
function TurnFill(props: MoveTurnFillProps): JSX.Element {
  return (
    <div className="line">
      <Dropdown
        placeholder=""
        options={["turnRight()", "turnLeft()"]}
        arrowClosed={<span className="arrow-closed" />}
        arrowOpen={<span className="arrow-open" />}
        onChange={(option) => props.onChange(option.value, props.index)}
      />
      ;
    </div>
  );
}

function MoveComponentSyntax(props: { steps: JSX.Element | string }) {
  return (
    <div className="MoveComponentSyntax">
      <div>
        <span style={{ color: "#F08000" }}>for </span>steps
        <span style={{ color: "#F08000" }}> in </span>
        <span style={{ color: "#EC5800" }}>range</span>({props.steps}):
      </div>
      <div style={{ marginLeft: 25 }}>moveForward()</div>
    </div>
  );
}
function MoveFill(props: any): JSX.Element {
  return (
    <div className="line plain">
      <MoveComponentSyntax
        steps={
          <input
            className="forwardInput"
            onChange={(val) => props.onChange(val.target.value, props.index)}
          />
        }
      />
    </div>
  );
}

function PythonFill(props: { pages: string[] }): JSX.Element {
  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);

  const arrayOfPseudoCode = ["2", "right", "1", "left", "3", "right", "2"];
  const InitialFillValues = ["", "", "", "", "", "", ""];

  const [fillValues, setFillValues] = useState(InitialFillValues);
  const fillOnChange = (value: string, index: number) => {
    setFillValues({ ...fillValues, [index]: value });
  };

  const initCodes: (string | number)[] = [];
  const [codedInstructions, setCodes] = useState(initCodes);

  const handleRunClick = () => {
    setCodes(initCodes);
    //console.log(fillValues);
    for (let i = 0; i < 7; i++) {
      if (fillValues[i] == "turnLeft()") {
        setCodes((codes) => codes.concat("left"));
      } else if (fillValues[i] == "turnRight()") {
        setCodes((codes) => codes.concat("right"));
      } else {
        setCodes((codes) => codes.concat(parseInt(fillValues[i])));
      }
    }
  };

  const ResetBoard = () => {
    // setPosition(0,0, 'right')
    setFillValues(InitialFillValues);
    setCodes(initCodes);
  };

  useEffect(() => {
    console.log(codedInstructions);
  }, [codedInstructions]);

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
    let direction = "right";
    codedInstructionsProps.forEach((item) => {
      if (item == "right" || item == "left") {
        if (direction == "right") {
          if (item == "right") {
            direction = "down";
          } else {
            direction = "up";
          }
        } else if (direction == "down") {
          if (item == "right") {
            direction = "left";
          } else {
            direction = "right";
          }
        } else if (direction == "left") {
          if (item == "right") {
            direction = "up";
          } else {
            direction = "down";
          }
        } else if (direction == "up") {
          if (item == "right") {
            direction = "right";
          } else {
            direction = "left";
          }
        }
      } else {
        if (direction == "right") {
          xArr.push(xArr[xArr.length - 1] + +item * gridWidth);
          yArr.push(yArr[yArr.length - 1]);
        } else if (direction == "left") {
          xArr.push(xArr[xArr.length - 1] - +item * gridWidth);
          yArr.push(yArr[yArr.length - 1]);
        } else if (direction == "down") {
          xArr.push(xArr[xArr.length - 1]);
          yArr.push(yArr[yArr.length - 1] + +item * gridHeight);
        } else if (direction == "up") {
          xArr.push(xArr[xArr.length - 1]);
          yArr.push(yArr[yArr.length - 1] - +item * gridHeight);
        }
      }
    });
    return [xArr, yArr];
  };
  return (
    <div className="frame wideSplit">
      <div id="sidebar">
        <div id="level-title">Python Fill</div>
        <div id="instructions">
          A for loop in Python allows you to repeat instructions multiple times.
          For example, if you want to move forward 3 times, you can write:
        </div>
        <div id="content">
          <div id="sample-code">
            <SampleSyntax />
          </div>
          <div>
            Fill in the blanks in the code to match the instructions on the
            left.
          </div>
          <div id="bottom-content">
            <PseudoCode arr={arrayOfPseudoCode} />
            <div className="codeCard">
              {arrayOfPseudoCode.map((element: string, idx:number) => {
                if (element === "left" || element === "right") {
                  return (
                    <TurnFill
                      key={arrayOfPseudoCode.indexOf(element)}
                      onChange={fillOnChange}
                      index={idx}
                    />
                  );
                }
                return (
                  <MoveFill
                    key={arrayOfPseudoCode.indexOf(element)}
                    onChange={fillOnChange}
                    index={idx}
                  />
                );
              })}
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
            <Maze
              rows={4}
              cols={6}
              boxCoords={[
                [0, 3],
                [1, 1],
                [2, 0],
                [2, 3],
                [2, 4],
                [3, 4],
              ]}
            />
            <Robot keyframes={calculateKeyframes(codedInstructions)}></Robot>
          </div>
        </div>
        <div className="main-section">
          <div id="footer">made with ♥ by acm.teachla</div>
          <div id="buttons">
            <button id="run" className="control-btn" onClick={handleRunClick}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button id="reset" className="control-btn" onClick={ResetBoard}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PythonFill;
/*eslint-enable quotes*/
