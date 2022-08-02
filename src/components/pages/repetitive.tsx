import React from 'react';
import '../../styles/app.scss';
import { Maze } from '../shared/maze';

// interface RepetitiveProps {
//   onCorrect: () => void;
// }

function Repetitive(): JSX.Element {
  const[instructions, setInstructions] = React.useState([]);
  const initCodes:(string | number)[] = [];
  const [codedInstructions, setCodes] = React.useState(initCodes);

  const handleClick = (type:string) => {
    const newInstruction = {
      id: new Date().getTime(), //unique id that differentiates each instruction
      text: type,
    };

    setInstructions(instructions.concat(newInstruction));
  };

  const deleteInstruction = (id:number) =>{
    const updatedInstructions = instructions.filter(
      (instruction) => instruction.id !== id); //filters out the the element that has the passed in id
    setInstructions(updatedInstructions);
  };

  const renderInstructions = instructions.map((instruction)=> {
    return<div key = {instruction.id}>
      {instruction.text}
      <button onClick = {()=> deleteInstruction(instruction.id)}>x</button>
    </div>;
  });

  const handleRunClick = () => {
    setCodes(initCodes);
    for (let i = 0; i < instructions.length; i++) {
      if(instructions[i].text == 'Move Forward') {
        let numSteps = 1;
        while (i+1 < instructions.length && instructions[i+1].text == 'Move Forward') {
          numSteps++;
          i++;
        }
        setCodes(codes => codes.concat(numSteps));
      }
      if (instructions[i].text == 'Turn Left') {
        setCodes(codes => codes.concat('left'));
      }
      else if (instructions[i].text == 'Turn Right') {
        setCodes(codes => codes.concat('right'));
      }
    }
  };

  // testing purposes
  // React.useEffect(() => { console.log(codedInstructions); }, [codedInstructions]);


  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">
          <div id="Repetitive">
            <div>
              {renderInstructions}
            </div>
            <div>
              <button onClick = {()=>{handleClick('Move Forward');}}>Move Forward</button>
            </div>
            <div>
              <button onClick = {()=>{handleClick('Turn Left');}}>Turn Left</button>
              <button onClick = {()=>{handleClick('Turn Right');}}>Turn Right</button>
            </div>
          </div>
          <button id="run" onClick={handleRunClick}>Run</button>
          <button id="reset">Reset</button>
          <button id="continue">Continue</button>
        </div>
      </div>
      <div id="main">
        {codedInstructions.map((item,idx) => {
          return (
            <div key={idx}>{item}</div>
          );
        })}
        <Maze rows={4} cols={5} />
      </div>
    </div>
  );
}

export default Repetitive;