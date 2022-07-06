import React from 'react';

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
              /*let indents: any = 0;
              for (let i = 0; i < item.length; i++) {
                if (item[i] == ' ') indents += 1;
                else break;
              }*/
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
      INSERT MAIN CONTENT HERE
      </div>
    </div>
  );
}

export default PythonType;

