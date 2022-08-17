import { Link, useLocation } from 'react-router-dom';

import '../../styles/app.scss';
import '../../styles/pseudochoice.scss';
import '../../styles/levelSelect.scss';

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
function MultipleChoice({arr}:{arr: (number|string)[]}): JSX.Element{
  return(
    <button className="selectBtn">
      {arr.map((element: string | number) =>{
        //turn instructions
        if(element === 'left' || element === 'right'){
          return <Turn key = {arr.indexOf(element)} direction = {element}/>;
        }
        //move instructions
        return <MoveForward key = {arr.indexOf(element)} steps = {element}/>;
      })}
    </button>
  );
}

function PseudoChoice(props: {
  pages: string[]
}): JSX.Element {

  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);

  return (
    <div className="frame wideSplit">
      <div id="sidebar">
        <div id="level-title">Pseudo Choice</div>
        <div id="instructions">Give the robot instructions to navigate the maze. Make sure you don&apos;t run into any obstacles!</div>
        <div id="contentPC">
          <MultipleChoice arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']}/>
          <MultipleChoice arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']}/>
          <MultipleChoice arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']}/>
        </div>
      </div>
      <div id="main">
        <div className="main-section">
          <div id="title">LoopBots</div>
          <div className="level-select">
            {currPage != 0 && <Link to={props.pages[currPage-1]} className="level-select-button left">&#9664;</Link>}
            Level {currPage+1} of 6
            {currPage != props.pages.length - 1 && <Link to={props.pages[currPage+1]} className="level-select-button right">&#9654;</Link>}
          </div>
        </div>
        <div id="content">
        INSERT MAIN CONTENT HERE
        </div>
        <div className="main-section">
          <div id="footer">made with ♥ by acm.teachla</div>
        </div>
      </div>
    </div>
  );
}

export default PseudoChoice;
