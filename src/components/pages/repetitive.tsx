import React, {useState} from 'react';
import '../../styles/app.scss';

// interface RepetitiveProps {
//   onCorrect: () => void;
// }

class Instruction {
  constructor(type:any, count:any){
    this.type = type; //type of instruction: Move or Turn
    this.count = count; //keeps track of the the number of instructions to execute
  }
}
//component for display of all isntructions
function DisplayCount(props:any){
  return (
    <div className = "displayCount">
      <p>{props.name}</p>
    </div>
  );
}

function Repetitive(): JSX.Element {
  const [, setNumClicks] = useState(0); //keep track of number of instructions
  const[counts, setCounts]= useState([]); //array of classes instructions

  const handleClick = (arg:any) => {
    //increment the instruction counter if button is clicked
    let count:any;
    setNumClicks((prev)=>{
      count = prev+1;
      return count;
    });
    //add new count to the array if button is clicked
    setCounts((prev) => {
      const newArr = prev.slice();
      const item = new Instruction(arg,count);
      newArr.push(item);
      return newArr;
    });
  };

  const renderCounts = counts.map((counter)=>{
    return <DisplayCount key = {counter.count} name = {counter.type}/>;
  });

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">
          <div id="Repetitive">
        <div>
          {renderCounts}
        </div>
        <div>
          <button onClick = {
            ()=>{handleClick('Move Forward');}
          }>Move Forward</button>
        </div>
        <div>
          <button onClick = {
            ()=>{handleClick('Turn Left');}
          }>Turn Left</button>
          <button onClick = {
            ()=>{handleClick('Turn Right');}
          }>Turn Right</button>
        </div>
        </div>
        <button id="run">Run</button>
        <button id="reset">Reset</button>
        <button id="continue">Continue</button>
      </div>
      <div id="main">
      INSERT MAIN CONTENT HERE
      </div>
    </div>
  );
}

export default Repetitive;

