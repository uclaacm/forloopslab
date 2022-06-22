import { faRotateLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
// import { faPlay } from '@fortawesome/free-solid-svg-icons'

// import { Link, useLocation } from 'react-router-dom';
import '../../styles/app.scss';
import '../../styles/levelSelect.scss';
// interface RepetitiveProps {
//   onCorrect: () => void;
// }


function Repetitive(): JSX.Element {

  // const location = useLocation();
  // const current = location.pathname;
  // const currPage = props.pages.indexOf(current);

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="level-title">Level Title</div>
        <div id="instructions">Give the robot instructions to navigate the maze. Make sure you don&apos;t run into any obstacles!</div>
      </div>
      <div id="main">
        <div className="main-section">
          <div id="title">LoopBots</div>
          <div className="level-select">
            <Link to={{}} className="level-select-button left">&#9664;</Link>
            Level 1 of 6
            <Link to={{}} className="level-select-button right">&#9654;</Link>
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

export default Repetitive;

