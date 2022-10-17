import { faRotateLeft, faPlay, faXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {Boxes} from '../shared/Boxes';
import {Maze} from '../shared/maze';
import {Robot, MoveRobot, setPosition} from '../shared/Robot';

import '../../styles/app.scss';
import '../../styles/levelSelect.scss';
import '../../styles/repetitive.scss';

const boxes = Boxes(4,6);

function Repetitive(props: {
  pages: string[],
}): JSX.Element {

  const location = useLocation();
  const current = location.pathname;
  const currPage = props.pages.indexOf(current);

  const[instructions, setInstructions] = useState<{id: number, text: string}[]>([]);

  const initCodes:(string | number)[] = [];
  const [codedInstructions, setCodes] = useState(initCodes);

  const handleClick = (type:string) => {
    const newInstruction : {id: number, text: string} = {
      id: new Date().getTime(), //unique id that differentiates each instruction
      text: type,
    };

    setInstructions(instructions.concat(newInstruction));
  };

  const deleteInstruction = (id:number) =>{
    const updatedInstructions = instructions.filter(
      //filters out the the element that has the passed in id
      (instruction: {id: number, text: string}) => instruction.id !== id);
    setInstructions(updatedInstructions);
  };

  const renderInstructions = instructions.map((instruction: {id: number, text: string})=> {
    return<div className='code-instruction' key = {instruction.id}>
      {instruction.text}
      <button className="close-btn" onClick = {()=> deleteInstruction(instruction.id)}><FontAwesomeIcon icon={faXmark} /></button>
    </div>;
  });

  const handleRunClick = () => {
    setCodes(initCodes);
    for (let i = 0; i < instructions.length; i++) {
      if(instructions[i].text == 'Move Forward') {
        let numSteps = 1;
        while (i+1 < instructions.length && instructions[i+1].text == 'Move Forward') {
          numSteps++;
          i++;
        }
        setCodes(codes => codes.concat(numSteps));
      }
      if (instructions[i].text == 'Turn Left') {
        setCodes(codes => codes.concat('left'));
      }
      else if (instructions[i].text == 'Turn Right') {
        setCodes(codes => codes.concat('right'));
      }
    }
  };
  const ResetBoard = () => {
    setPosition(0,0, 'right')
    setInstructions([])
    setCodes(initCodes)
  }
  console.log(instructions)
  console.log(codedInstructions)
  return (
    <div className="frame">
      <div id="sidebar">
        <div id="level-title">Repetitive</div>
        <div id="instructions">Give the robot instructions to navigate the maze. Make sure you don&apos;t run into any obstacles!</div>
        <div id="content">
          <div id="Repetitive">
            <div id="code-instructions">
              {renderInstructions}
            </div>
            <div>
              <button className='repetitive-btn wide' onClick = {()=>{handleClick('Move Forward');}}>Move Forward</button>
            </div>
            <div className='repetitive-btn-group'>
              <button className='repetitive-btn' style={{marginRight: '0.5vw'}} onClick = {()=>{handleClick('Turn Left');}}>Turn Left</button>
              <button className='repetitive-btn' onClick = {()=>{handleClick('Turn Right');}}>Turn Right</button>
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
        <div className="main-section">
          <div className = 'maze'>
            <Maze rows={4} cols={6} boxCoords={boxes}/>
            <Robot arr = {codedInstructions}></Robot>
            {/* {codedInstructions.map((item)=>{
              return(
                <Robot value = {item}></Robot>
              )
            })} */}
          </div>

        </div>
        <div className="main-section">
          <div id="footer">made with ♥ by acm.teachla</div>
          <div id="buttons">
            <button id="run" className='control-btn' onClick={handleRunClick}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button id="reset" className='control-btn' onClick={ResetBoard}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Repetitive;