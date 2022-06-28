import { useState } from 'react';
import '../../styles/pseudofill.scss';
import { GeneralDropdown } from '../shared/generalDropdown';

// interface PseudoFillProps {
// onCorrect: () => void;
// }

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
      <input placeholder="3" onChange={(val) => props.onChange(val.target.value, props.index)}></input>
      <div>steps</div>
    </div>
  );
}

function TurnFill(props:TurnFillProps): JSX.Element {
  return (
    <div className='line'>
      <div>Turn</div>
      <div>
        <GeneralDropdown options={['right','left','up', 'down']} onChange={(value) => props.onChange(value, props.index)} position="top"/>
      </div>
    </div>
  );
}

function PseudoFill(): JSX.Element {

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

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">
          <MoveFill onChange={fillOnChange} index={0}/>
          <TurnFill onChange={dropOnChange} index={0}/>
          <MoveFill onChange={fillOnChange} index={1}/>
          <TurnFill onChange={dropOnChange} index={1}/>
          <MoveFill onChange={fillOnChange} index={2}/>
          <TurnFill onChange={dropOnChange} index={2}/>
          <MoveFill onChange={fillOnChange} index={3}/>
          <TurnFill onChange={dropOnChange} index={3}/>
        </div>
        <button id="run">Run</button>
        <button id="reset">Reset</button>
        <button id="continue">Continue</button>
      </div>
      <div id="main">
        <div>{fillValues[0]}</div>
        <div>{dropValues[0]}</div>
        <div>{fillValues[1]}</div>
        <div>{dropValues[1]}</div>
        <div>{fillValues[2]}</div>
        <div>{dropValues[2]}</div>
        <div>{fillValues[3]}</div>
        <div>{dropValues[3]}</div>
      </div>
    </div>

  );
}

export default PseudoFill;

