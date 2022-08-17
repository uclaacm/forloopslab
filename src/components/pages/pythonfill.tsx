import { faRotateLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
// import { GeneralDropdown } from '../shared/generalDropdown';

import Dropdown from 'react-dropdown';
import { Link, useLocation } from 'react-router-dom';
import 'react-dropdown/style.css';
import '../../styles/generalDropdown.scss';


import '../../styles/app.scss';
import '../../styles/levelSelect.scss';
import '../../styles/pythonfill.scss';

//sample code portion
function ForLoopSyntax(props: {steps:JSX.Element | string}){
  return(
    <div className='forLoopSyntax'>
      <div>for steps in range({props.steps}):</div>
      <div style={{marginLeft: 25}}>moveForward()</div>
    </div>
  );
}

//PseudoCode
function PseudoCode({arr}:any){
  function MoveForward(props: {steps:JSX.Element | string}){
    return(
      <div>
        Move forward {props.steps} times
      </div>
    );
  }
  function Turn(props: {direction: string}){
    return(
      <div>
        Turn {props.direction}
      </div>
    );
  }
  return(
    <div className="codeCard">
      {arr.map((element: string) =>{
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
    <div className='line' style={{marginLeft: 25}}>
      <Dropdown
        placeholder=""
        options={['turnRight()','turnLeft()']}
        arrowClosed={<span className="arrow-closed" />}
        arrowOpen={<span className="arrow-open" />}
        onChange={(option) => props.onChange(option.value, props.index)}
      />;
    </div>
  );
}
function MoveFill(props:any): JSX.Element {
  return (
    <div className='line plain'>
      <ForLoopSyntax steps = {<input className="forwardInput"  onChange={(val) => props.onChange(val.target.value, props.index)}/>}/>
    </div>
  );
}

function PythonFill(props: {
  pages: string[]
}): JSX.Element {

  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);

  const arrayOfPseudoCode = ['3','left', '2', 'right', '1'];
  const InitialFillValues = ['','','','',''];
  const [fillValues, setFillValues] = useState(InitialFillValues);
  const fillOnChange = (value:string, index:number) => {
    setFillValues({...fillValues, [index]: value});
  };
  return (
    <div className="frame wideSplit">
      <div id="sidebar">
        <div id="level-title">Python Fill</div>
        <div id="instructions">A for loop in Python allows you to repeat instructions multiple times. For example, if you want to move forward 3 times, you can write:</div>
        <div id="content">
          <div id = "sample-code">
            <ForLoopSyntax steps = '3'/>
          </div>
          <div>Fill in the blanks in the code to match the instructions on the left.</div>
          <div id="bottom-content">
            <PseudoCode arr = {arrayOfPseudoCode}/>
            <div className='codeCard'>
              {arrayOfPseudoCode.map((element: string) =>{
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
