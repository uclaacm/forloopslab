import '../../styles/pythontype.scss';
import { Maze } from '../shared/maze';

// interface PythonTypeProps {
//   onCorrect: () => void;
// }

function PythonType(): JSX.Element {
  const codeContent = ['for steps in range(3):', ' moveForward()', 'turnLeft()'];

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">
          <div id="code">
            {codeContent.map((item) => {
              return (
                <div key={item}>{item}</div>
              );
            },
            )}
          </div>
          <div>Your code here: </div>
          <textarea id="code-input"></textarea>
        </div>
        <button id="run">Run</button>
        <button id="reset">Reset</button>
        <button id="continue">Continue</button>
      </div>
      <div id="main">
        <Maze rows={4} cols={5} boxCoords={[[1,1], [0,3], [2,0], [3,2]]} />
      </div>
    </div>
  );
}

export default PythonType;

