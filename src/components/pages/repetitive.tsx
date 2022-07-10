import { faRotateLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

import '../../styles/app.scss';
import '../../styles/levelSelect.scss';

function Repetitive(props: {
  pages: string[],
}): JSX.Element {

  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);
  
  const[instructions, setInstructions] = React.useState([]);

  const handleClick = (type:string) => {
    const newInstruction = {
      id: new Date().getTime(), //unique id that differentiates each instruction
      text: type,
    };

    setInstructions(instructions.concat(newInstruction));
  };

  const deleteInstruction = (id:number) =>{
    const updatedInstructions = instructions.filter(
      (instruction) => instruction.id !== id); //filters out the the element that has the passed in id
    setInstructions(updatedInstructions);
  };

  const renderInstructions = instructions.map((instruction)=> {
    return<div key = {instruction.id}>
      {instruction.text}
      <button onClick = {()=> deleteInstruction(instruction.id)}>x</button>
    </div>;
  });

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="level-title">Repetitive</div>
        <div id="instructions">Give the robot instructions to navigate the maze. Make sure you don&apos;t run into any obstacles!</div>
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
          <div id="Repetitive">
            <div>
              {renderInstructions}
            </div>
            <div>
              <button onClick = {()=>{handleClick('Move Forward');}}>Move Forward</button>
            </div>
            <div>
              <button onClick = {()=>{handleClick('Turn Left');}}>Turn Left</button>
              <button onClick = {()=>{handleClick('Turn Right');}}>Turn Right</button>
            </div>
          </div>
          <button id="run">Run</button>
          <button id="reset">Reset</button>
          <button id="continue">Continue</button>
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