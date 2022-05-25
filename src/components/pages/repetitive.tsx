import React from 'react';
import '../../styles/app.scss';

// interface RepetitiveProps {
//   onCorrect: () => void;
// }

function Repetitive(): JSX.Element {
  const[instructions, setInstructions] = React.useState([]);

  const handleClick = (type:string) => {
    const newInstruction = {
      id: new Date().getTime(), //unique id that differentiates each instruction
      text: type,
    };

    setInstructions([...instructions].concat(newInstruction));
  };

  const deleteInstruction = (id:number) =>{
    const updatedInstructions = [...instructions].filter(
      (instruction) => instruction.id !== id); //filters out the the element that has the passed in id
    setInstructions(updatedInstructions);
  };

  const renderInstructions = instructions.map((instruction)=> {
    return<div key = {instruction.id}>
      {instruction.text}
      <button onClick = {()=> deleteInstruction(instruction.id)}>x</button>
    </div>;
  });


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
          <button id="run">Run</button>
          <button id="reset">Reset</button>
          <button id="continue">Continue</button>
        </div>
        <div id="main">
        </div>
      </div>
    </div>
  );
}

export default Repetitive;