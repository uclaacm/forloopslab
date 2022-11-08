import { faRotateLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/pythontype.scss';
import {Boxes} from '../shared/Boxes';
import { Maze } from '../shared/maze';
import { Robot } from '../shared/Robot';
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
            Level {currPage+1} of 5
            {currPage != props.pages.length - 1 && <Link to={props.pages[currPage+1]} className="level-select-button right">&#9654;</Link>}
          </div>
        </div>
        <div id="content">
          <Maze rows={4} cols={6} boxCoords={boxes}/>
          {/* <Robot keyframes={calculateKeyframes(codedInstructions)}></Robot> */}
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

