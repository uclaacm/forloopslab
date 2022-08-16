import { useState, useEffect } from 'react';
import { Maze } from '../shared/maze';

// interface PseudoChoiceProps {
//   onCorrect: () => void;
// }

interface MultipleChoiceProps {
  choiceNum: number;
  arr: (string|number)[];
  onChoice: (array:(string|number)[]) => void;
}

function MoveForward(props:number){
  return(
    <div>
      Move forward {props.steps} times
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
function MultipleChoice(props:MultipleChoiceProps):JSX.Element{
  return(
    <div>
      <button onClick = {() => props.onChoice(props.arr)}>
        {props.arr.map((element:(string|number), idx) =>{
        //turn instructions
          if(element === 'left' || element === 'right'){
            return <Turn key = {`${props.choiceNum}_${idx}`} direction = {element}/>;
          }
          //move instructions
          return <MoveForward key = {`${props.choiceNum}_${idx}`} steps = {element}/>;
        })}
      </button>
    </div>
  );
}

function PseudoChoice(): JSX.Element {
  const init:(string|number)[] = [];
  const [instructions, setInstructions] = useState(init);

  const handleChoiceClick = (arr:(string|number)[]) => {
    setInstructions(arr);
  };

  useEffect(() => { console.log(instructions); }, [instructions]);

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">INSERT SIDEBAR CONTENT HERE
          <MultipleChoice choiceNum = {1} arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']} onChoice = {handleChoiceClick}/>
          <MultipleChoice choiceNum = {2} arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']} onChoice = {handleChoiceClick}/>
          <MultipleChoice choiceNum = {3} arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']} onChoice = {handleChoiceClick}/>
        </div>
        <button id="run">Run</button>
        <button id="reset">Reset</button>
        <button id="continue">Continue</button>
      </div>
      <div id="main">
        <Maze rows={4} cols={5}/>
      </div>
    </div>
  );
}

export default PseudoChoice;