import { faRotateLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { GeneralDropdown } from '../shared/generalDropdown';

import '../../styles/app.scss';
import '../../styles/levelSelect.scss';


function Repetitive(props: {
  pages: string[]
}): JSX.Element {

  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);

//sample code portion
function ForLoopSyntax(props:any){
  return(
    <div>
      <div>for steps in range({props.steps}):</div>
      <div>moveForward()</div>
    </div>
  );
}

//PseudoCode
function PseudoCode({arr}:any){
  function MoveForward(props:any){
    return(
      <div>
        <p>Move forward {props.steps} times</p>
      </div>
    );
  }
  function Turn(props:any){
    return(
      <div>
        Turn {props.direction}
      </div>
    );
  }
  return(
    <div>
      {arr.map((element) =>{
        if(element === 'left' || element === 'right'){
          return <Turn key = {arr.indexOf(element)} direction = {element}/>;
        }
        return <MoveForward key = {arr.indexOf(element)} steps = {element}/>;
      })}
    </div>
  );
}

//Python Code Fill
interface MoveTurnFillProps {
  onChange: (value:string, index:number) => void;
  index: number;
}
function TurnFill(props:MoveTurnFillProps): JSX.Element {
  return (
    <div className='line'>
      <GeneralDropdown options={['turnRight()','turnLeft()']} onChange={(value) => props.onChange(value, props.index)} position="top"/>
    </div>
  );
}
function MoveFill(props:MoveFillProps): JSX.Element {
  return (
    <div className='line'>
      <ForLoopSyntax steps = {<input placeholder="3" onChange={(val) => props.onChange(val.target.value, props.index)}/>}/>
    </div>
  );
}

function PythonFill(): JSX.Element {
  const arrayOfPseudoCode = ['3','left', '2', 'right', '1'];
  const InitialFillValues = ['','','','',''];
  const [fillValues, setFillValues] = useState(InitialFillValues);
  const fillOnChange = (value:string, index:number) => {
    setFillValues({...fillValues, [index]: value});
  };
  return (
    <div className="frame">
      <div id="sidebar">
        <div id="level-title">Python Type</div>
        <div id="instructions">A for loop in Python allows you to repeat instructions multiple times. For example, if you want to move forward 3 times, you can write:</div>
        <div id="content">
          <div id = "sample-code">
            <ForLoopSyntax steps = '3'/>
          </div>
          <div id = "pseudocode">
            <PseudoCode arr = {arrayOfPseudoCode}/>
          </div>
          <div id = "python-fill">
            {arrayOfPseudoCode.map((element: any) =>{
              if(element === 'left' || element === 'right'){
                return (
                  <TurnFill key={arrayOfPseudoCode.indexOf(element)}
                    onChange = {fillOnChange} index ={arrayOfPseudoCode.indexOf(element)}/>
                );
              }
              return <MoveFill key={arrayOfPseudoCode.indexOf(element)}
                onChange = {fillOnChange} index ={arrayOfPseudoCode.indexOf(element)}/>;
            })}
          </div>
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
         {/* placeholder values for testing purposes */}
        <div>{fillValues[0]}</div>
        <div>{fillValues[1]}</div>
        <div>{fillValues[2]}</div>
        <div>{fillValues[3]}</div>
        <div>{fillValues[4]}</div>
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


export default PythonFill;
