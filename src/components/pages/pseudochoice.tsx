import React from 'react';

// interface PseudoChoiceProps {
//   onCorrect: () => void;
// }

function MoveTurnComponent(input){
  return(
    <><div>
      <p>Move forward {input.number} times</p>
    </div>
    <div>
      <p>Turn {input.direction}</p>
    </div></>
  );
}

function AllChoices(input){
  return(
    <div>
      <button>
        <MoveTurnComponent
          number= {input.number1}
          direction= {input.direction1}
        />
        <MoveTurnComponent
          number= {input.number2}
          direction= {input.direction2}
        />
        <MoveTurnComponent
          number= {input.number3}
          direction= {input.direction3}
        />
        <MoveTurnComponent
          number= {input.number4}
          direction= {input.direction4}
        />
        <MoveTurnComponent
          number= {input.number5}
          direction= {input.direction5}
        />
      </button>
    </div>
  );
}

function PseudoChoice(): JSX.Element {
  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">INSERT SIDEBAR CONTENT HERE
          <AllChoices
            number1 = "3"
            direction1 = "right"
            number2 = "4"
            direction2 = "left"
            number3= "3"
            direction3 = "right"
            number4 = "2"
            direction4 = "right"
            number5 = "0"
            direction5 = "left"
          />
          <AllChoices
            number1 = "2"
            direction1 = "right"
            number2 = "3"
            direction2 = "right"
            number3= "5"
            direction3 = "right"
            number4 = "1"
            direction4 = "left"
            number5 = "6"
            direction5 = "left"
          />
          <AllChoices
            number1 = "1"
            direction1 = "left"
            number2 = "5"
            direction2 = "left"
            number3= "3"
            direction3 = "left"
            number4 = "4"
            direction4 = "right"
            number5 = "1"
            direction5 = "left"
          />
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

export default PseudoChoice;