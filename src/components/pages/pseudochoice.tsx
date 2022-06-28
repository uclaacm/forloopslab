import React from 'react';

// interface PseudoChoiceProps {
//   onCorrect: () => void;
// }

function MoveForward(props:number){
  return(
    <div>
      <p>Move forward {props.steps} times</p>
    </div>
  );
}

function Turn(props:string){
  return(
    <div>
      <p>Turn {props.direction}</p>
    </div>
  );
}
function MultipleChoice({arr}:any){
  return(
    <div>
      <button>
        {arr.map((element: any) =>{
        //turn instructions
          if(element === 'left' || element === 'right'){
            return <Turn key = {arr.indexOf(element)} direction = {element}/>;
          }
          //move instructions
          return <MoveForward key = {arr.indexOf(element)} steps = {element}/>;
        })}
      </button>
    </div>
  );
}

function PseudoChoice(): JSX.Element {
  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">INSERT SIDEBAR CONTENT HERE
          <MultipleChoice arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']}/>
          <MultipleChoice arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']}/>
          <MultipleChoice arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']}/>
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

export default PseudoChoice;