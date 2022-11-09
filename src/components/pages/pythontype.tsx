import { faRotateLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/pythontype.scss';
import close from '../../assets/closeicon.svg';
import {Boxes} from '../shared/Boxes';
import { Maze } from '../shared/maze';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

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

  const [code, setCode] = useState('');
  const initMovement:(string | number)[] = [];
  const [movement, setMovement] = useState(initMovement);

  const [modalIsOpen, setIsOpen] = useState(false);

  /*const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      borderColor: 'white',
      padding: '20px',
      font: '$main-font',
    },
  };*/

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onChange = (value:string) => {
    setCode(value);
  };


  const handleRunClick = () => {
    setMovement(initMovement);
    const lines = code.split(/\r?\n/);
    //console.log(lines);

    const forRegex = /^\s*for\s+\w+\s+in\s+range\s*\(\s*\d+\s*\)\s*:\s*$/g;
    const moveForwardRegex = /^\s*moveForward\(\)\s*$/g;
    const numRegex = /\d+/g;
    const turnLeftRegex = /^\s*turnLeft\(\)\s*$/g;
    const turnRightRegex = /^\s*turnRight\(\)\s*$/g;

    let isValid = true;

    for (let i = 0; i < lines.length; i++) {
      const cur = lines[i];

      // if line matches with "for" regex expression:
      if (forRegex.test(cur)) {
        const arr = cur.match(numRegex);
        let numSteps = 0;
        if (arr){
          numSteps = parseInt(arr[0]);
        }
        setMovement(moves => moves.concat(numSteps));
        if (i+1 < lines.length && moveForwardRegex.test(lines[i+1])) {
          i++;
        }
        else {
          isValid = false;
          break;
        }
      }
      else if (turnLeftRegex.test(cur)){
        setMovement(moves => moves.concat('left'));
      }
      else if (turnRightRegex.test(cur)) {
        setMovement(moves => moves.concat('right'));
      }
      else {
        isValid = false;
        break;
      }
      /*if (cur.substring(0,3) == 'for') {
        // for steps in range(3)
        const numSteps = parseInt(cur.substring(19, cur.length - 2));
        setMovement(moves => moves.concat(numSteps));
      }
      else if (cur == 'turnLeft()') {
        setMovement(moves => moves.concat('left'));
      }
      else if (cur == 'turnRight()') {
        setMovement(moves => moves.concat('right'));
      }*/
    }
    console.log(isValid);
    if (!isValid){
      openModal();
    }
  };

  useEffect(() => { console.log(movement); }, [movement]);

  // const boxes = Boxes(4,5);
  // const codeContent = ['for steps in range(3):', ' moveForward()', 'turnLeft()'];

  return (
    <div className="frame">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
      >
        <h2 className="error-heading">Error</h2>
        <p>Hmm, looks like the robot can&apos;t understand your code!
          Take another look at the example and try again.</p>
        {/*<button onClick={closeModal} className='close-button'>x</button>*/}
        <img src={close} onClick={closeModal} className='close-button' width='15px' height='15px'></img>
      </Modal>
      <div id="sidebar">
        <div id="level-title">Python Type</div>
        <div id="instructions">Give the robot instructions to navigate the maze. Make sure you don&apos;t run into any obstacles!.</div>
        <div id="content">
          <div id="code">
            <SampleSyntax/>
          </div>
          <div>Your code here: </div>
          <CodeMirror
            value={code}
            height="200px"
            theme="dark"
            extensions={[python()]}
            onChange={onChange}
          />
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
          <Maze rows={4} cols={6} boxCoords={[[1,0],[1,1],[0,3],[1,3],[2,3],[3,1],[2,5]]}/>
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

export default PythonType;

