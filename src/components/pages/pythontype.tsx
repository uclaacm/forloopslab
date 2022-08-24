import { faRotateLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/pythontype.scss';
import {Boxes} from '../shared/Boxes';
import { Maze } from '../shared/maze';

import '../../styles/app.scss';
import '../../styles/levelSelect.scss';

function SampleSyntax(){
  return(
    <div className='sampleSyntax'>
      <div><span style = {{color: '#F08000'}}>for </span>steps
        <span style = {{color: '#F08000'}}> in </span>
        <span style = {{color: '#EC5800'}}>range</span>(
        <span style = {{color: '#89CFF0'}}>3</span>):</div>
      <div style={{marginLeft: 25}}>moveForward()</div>
      <div>turnForward()</div>
    </div>
  );
}

function PythonType(props: {
  pages: string[]
}): JSX.Element {

  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);


  const boxes = Boxes(4,5);
  // const codeContent = ['for steps in range(3):', ' moveForward()', 'turnLeft()'];

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="level-title">Python Type</div>
        <div id="instructions">Give the robot instructions to navigate the maze. Make sure you don&apos;t run into any obstacles!.</div>
        <div id="content">
          <div id="code">
            <SampleSyntax/>
          </div>
          <div>Your code here: </div>
          <textarea id="code-input" spellCheck="false" ></textarea>
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

export default PythonType;

