import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Boxes} from '../shared/Boxes';
import { Maze } from '../shared/maze';
import { Robot } from '../shared/Robot';

import '../../styles/app.scss';
import '../../styles/pseudochoice.scss';
import '../../styles/levelSelect.scss';

const boxes = Boxes(4,6);

interface MultipleChoiceProps {
  choiceNum: number;
  arr: (string|number)[];
  onChoice: (array:(string|number)[]) => void;
}

function MoveForward(props: {steps:string | number}){
  return(
    <div className='instruction'>
      Move forward <span className='code'>{props.steps}</span> times
    </div>
  );
}

function Turn(props: {direction:string}){
  return(
    <div className='instruction'>
      Turn <span className='code'>{props.direction}</span>
    </div>
  );
}
function MultipleChoice(props:MultipleChoiceProps):JSX.Element{
  return(
    <div>
      <button onClick = {() => props.onChoice(props.arr)} className="selectBtn">
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

function PseudoChoice(props: {
  pages: string[]
}): JSX.Element {

  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);


  const init:(string|number)[] = [];
  const [instructions, setInstructions] = useState(init);

  const handleChoiceClick = (arr:(string|number)[]) => {
    setInstructions(arr);
  };

  useEffect(() => { console.log(instructions); }, [instructions]);

  const calculateKeyframes = (codedInstructionsProps: (string | number)[]) => {
    const xArr = [0];
    const yArr = [0];
    let direction = 'right';
    codedInstructionsProps.forEach((item) => {
      if (item == 'right' || item == 'left'){
        if (direction == 'right'){
          if (item=='right'){
            direction = 'down';
          }
          else{
            direction = 'up';
          }
        }
        else if (direction == 'down'){
          if (item=='right'){
            direction = 'left';
          }
          else{
            direction = 'right';
          }
        }
        else if (direction == 'left'){
          if (item=='right'){
            direction = 'up';
          }
          else{
            direction = 'down';
          }
        }
        else if (direction == 'up'){
          if (item=='right'){
            direction = 'right';
          }
          else{
            direction = 'left';
          }
        }
      }
      else{
        if (direction == 'right'){
          xArr.push(xArr[xArr.length - 1] + (+item*100));
          yArr.push(yArr[yArr.length - 1]);
        }
        else if (direction == 'left'){
          xArr.push(xArr[xArr.length - 1] - (+item*100));
          yArr.push(yArr[yArr.length - 1]);
        }
        else if (direction == 'down'){
          xArr.push(xArr[xArr.length - 1]);
          yArr.push(yArr[yArr.length - 1] + (+item*100));
        }
        else if (direction == 'up'){
          xArr.push(xArr[xArr.length - 1]);
          yArr.push(yArr[yArr.length - 1] - (+item*100));
        }
      }
    });
    return [xArr, yArr];
  };
  return (
    <div className="frame wideSplit">
      <div id="sidebar">
        <div id="level-title">Pseudo Choice</div>
        <div id="instructions">Give the robot instructions to navigate the maze. Make sure you don&apos;t run into any obstacles!</div>
        <div id="contentPC">
          <MultipleChoice choiceNum = {1} arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']} onChoice = {handleChoiceClick}/>
          <MultipleChoice choiceNum = {2} arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']} onChoice = {handleChoiceClick}/>
          <MultipleChoice choiceNum = {3} arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']} onChoice = {handleChoiceClick}/>

        </div>
      </div>
      <div id="main">

        <div className="main-section">
          <div id="title">LoopBots</div>
          <div className="level-select">
            {currPage != 0 && <Link to={props.pages[currPage-1]} className="level-select-button left">&#9664;</Link>}
            Level {currPage+1} of 5
            {currPage != props.pages.length - 1 && <Link to={props.pages[currPage+1]} className="level-select-button right">&#9654;</Link>}
          </div>
        </div>
        <div id="content">
          <Maze rows={4} cols={6} boxCoords={boxes}/>
          <Robot keyframes={calculateKeyframes(instructions)}></Robot>
        </div>
        <div className="main-section">
          <div id="footer">made with ♥ by acm.teachla</div>
        </div>
      </div>
    </div>
  );
}

export default PseudoChoice;
