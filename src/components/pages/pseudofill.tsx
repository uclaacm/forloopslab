import { faRotateLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import '../../styles/pseudofill.scss';
import Dropdown from 'react-dropdown';
import {Boxes} from '../shared/Boxes';
import { Maze } from '../shared/maze';

import 'react-dropdown/style.css';
import '../../styles/generalDropdown.scss';

import { Link, useLocation } from 'react-router-dom';


import '../../styles/app.scss';
import '../../styles/levelSelect.scss';

const boxes = Boxes(4,6);
interface MoveFillProps {
  onChange: (value:string, index:number) => void;
  index: number;
}

interface TurnFillProps {
  onChange: (value:string, index:number) => void;
  index: number;
}

function MoveFill(props:MoveFillProps): JSX.Element {
  return (
    <div className='line'>
      <div>Move forward</div>
      <input className="forwardInput" onChange={(val) => props.onChange(val.target.value, props.index)}></input>
      <div>steps</div>
    </div>
  );
}

function TurnFill(props:TurnFillProps): JSX.Element {
  return (
    <div className='line'>
      <div>Turn</div>
      <div style={{marginLeft: 10}}>
        <Dropdown
          placeholder=""
          options={['right','left']}
          arrowClosed={<span className="arrow-closed" />}
          arrowOpen={<span className="arrow-open" />}
          onChange={(option) => props.onChange(option.value, props.index)}
        />
      </div>
    </div>
  );
}

function PseudoFill(props: {
  pages: string[]
}): JSX.Element {

  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);

  const initialFillValues = ['','','',''];
  const initialDropValues = ['','','',''];

  const [fillValues, setFillValues] = useState(initialFillValues);
  const [dropValues, setDropValues] = useState(initialDropValues);

  const fillOnChange = (value:string, index:number) => {
    setFillValues({...fillValues, [index]: value});
  };

  const dropOnChange = (value:string, index:number) => {
    setDropValues({...dropValues, [index]: value});
  };


  const initCodes:(string | number)[] = [];
  const [codedInstructions, setCodes] = useState(initCodes);


  const handleRunClick = () => {
    setCodes(initCodes);
    for (let i = 0; i < 4; i++) {
      setCodes(codes => codes.concat(parseInt(fillValues[i])));
      setCodes(codes => codes.concat(dropValues[i]));
    }
  };

  useEffect(() => { console.log(codedInstructions); }, [codedInstructions]);

  const indices = [0,1,2,3];

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="level-title">Pseudo Fill</div>
        <div id="instructions">Give the robot instructions to navigate the maze. Make sure you don&apos;t run into any obstacles!</div>
        <div id="side-content">
          {indices.map((item) => {
            return(
              <div key={item}>
                <MoveFill onChange={fillOnChange} index={item}/>
                <TurnFill onChange={dropOnChange} index={item}/>
              </div>
            );
          })}
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
          <Maze rows={4} cols={6} boxCoords={boxes}/>
          {codedInstructions.map((item,idx) => {
            return (
              <div key={idx}>{item}</div>
            );
          })}
        </div>
        <div className="main-section">
          <div id="footer">made with ♥ by acm.teachla</div>
          <div id="buttons">
            <button id="run" className='control-btn' onClick={handleRunClick}>
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

export default PseudoFill;

