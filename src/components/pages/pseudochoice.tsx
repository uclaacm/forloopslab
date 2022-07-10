import { faRotateLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

import '../../styles/app.scss';
import '../../styles/levelSelect.scss';


function Repetitive(props: {
  pages: string[]
}): JSX.Element {

  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);

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
        <div id="level-title">Pseudo Choice</div>
        <div id="instructions">Give the robot instructions to navigate the maze. Make sure you don&apos;t run into any obstacles!</div>
        <div id="content">
          <MultipleChoice arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']}/>
          <MultipleChoice arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']}/>
          <MultipleChoice arr = {[3, 'right', 4, 'left', 3, 'right', 2, 'right', 0, 'left']}/>
        </div>
        <button id="run">Run</button>
        <button id="reset">Reset</button>
        <button id="continue">Continue</button>
      </div>
      <div id="main">
        <div className="main-section">
          <div id="title">LoopBots</div>
          <div className="level-select">
            {currPage != 0 && <Link to={props.pages[currPage-1]} className="level-select-button left">&#9664;</Link>}
            Level 1 of 6
            {currPage != props.pages.length - 1 && <Link to={props.pages[currPage+1]} className="level-select-button right">&#9654;</Link>}
          </div>
        </div>
        <div id="content">
        INSERT MAIN CONTENT HERE
        </div>
        <div className="main-section">
          <div id="footer">made with ♥ by acm.teachla</div>
          <div id="buttons">
            <button id="run" className='control-btn'>
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button id="reset" className='control-btn'>
              <FontAwesomeIcon icon={faRotateLeft} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PseudoChoice;
