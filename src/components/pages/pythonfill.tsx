import '../../styles/pythonfill.scss';
import SyntaxHighLighter from 'react-syntax-highlighter';

// interface PythonFillProps {
//   onCorrect: () => void;
// }

function PythonFill(): JSX.Element {

  /*const code: lineOfCode[] = [
    [
      { ['for']: Color.Orange },
      { ['steps']: Color.White },
      { ['in range']: Color.Orange },
      { ['(']: Color.White },
      { ['3']: Color.Blue },
      { ['):']: Color.White},
    ]
  ]*/

  const codeContent = ['for steps in range(3):', ' moveForward()', 'turnLeft()'];

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">
          <div>Write code to help the robot navigate through the maze. Use the example below to help you.</div>
          <div id="code">
            {codeContent.map((item, index) => {
              let indents: any = 0;
              for (let i = 0; i < item.length; i++) {
                if (item[i] == ' ') indents += 1;
                else break;
              }
              return (
                <SyntaxHighLighter
                  key={index}
                  language={'python'}
                  style={{ marginLeft: indents }}
                  useInlineStyles={false}
                >
                  {item}
                </SyntaxHighLighter>
              );
            },
            )}
          </div>
          <div>Your code here: </div>
          <input></input>
        </div>
        <button id="run">Run</button>
        <button id="reset">Reset</button>
        <button id="continue">Continue</button>
      </div>
      <div id="main">
      INSERT MAIN CONTENT HERE
      </div>
    </div>
  );
}

export default PythonFill;

