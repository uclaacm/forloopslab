import { useState } from 'react';
import '../../styles/pseudofill.scss';
import { GeneralDropdown } from '../shared/generalDropdown';

// interface PseudoFillProps {
// onCorrect: () => void;
// }

function PseudoFill(): JSX.Element {

  const [fillValue1, setFillValue1] = useState('');
  const [fillValue2, setFillValue2] = useState('');
  const [fillValue3, setFillValue3] = useState('');
  const [fillValue4, setFillValue4] = useState('');
  const [dropValue1, setDropValue1] = useState('');
  const [dropValue2, setDropValue2] = useState('');
  const [dropValue3, setDropValue3] = useState('');
  const [dropValue4, setDropValue4] = useState('');

  const fillOnChange1 = (value:string) => { setFillValue1(value); };
  const fillOnChange2 = (value:string) => { setFillValue2(value); };
  const fillOnChange3 = (value:string) => { setFillValue3(value); };
  const fillOnChange4 = (value:string) => { setFillValue4(value); };

  const dropOnChange1 = (value:string) => { setDropValue1(value); };
  const dropOnChange2 = (value:string) => { setDropValue2(value); };
  const dropOnChange3 = (value:string) => { setDropValue3(value); };
  const dropOnChange4 = (value:string) => { setDropValue4(value); };

  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">
          <div className='line'>
            <div>Move forward</div>
            <input placeholder="3" onChange={(val) => fillOnChange1(val.target.value)}></input>
            <div>steps</div>
          </div>
          <div className='line'>
            <div>Turn</div>
            <div>
              <GeneralDropdown options={['right','left','up', 'down']} onChange={(value) => dropOnChange1(value)} position="top"/>
            </div>
          </div>
          <div className='line'>
            <div>Move forward</div>
            <input placeholder="3" onChange={(val) => fillOnChange2(val.target.value)}></input>
            <div>steps</div>
          </div>
          <div className='line'>
            <div>Turn</div>
            <div>
              <GeneralDropdown options={['right','left','up', 'down']} onChange={(value) => dropOnChange2(value)} position="top"/>
            </div>
          </div>
          <div className='line'>
            <div>Move forward</div>
            <input placeholder="3" onChange={(val) => fillOnChange3(val.target.value)}></input>
            <div>steps</div>
          </div>
          <div className='line'>
            <div>Turn</div>
            <div>
              <GeneralDropdown options={['right','left','up', 'down']} onChange={(value) => dropOnChange3(value)} position="top"/>
            </div>
          </div>
          <div className='line'>
            <div>Move forward</div>
            <input placeholder="3" onChange={(val) => fillOnChange4(val.target.value)}></input>
            <div>steps</div>
          </div>
          <div className='line'>
            <div>Turn</div>
            <div>
              <GeneralDropdown options={['right','left','up', 'down']} onChange={(value) => dropOnChange4(value)} position="top"/>
            </div>
          </div>
        </div>
        <button id="run">Run</button>
        <button id="reset">Reset</button>
        <button id="continue">Continue</button>
      </div>
      <div id="main">
        <div>{fillValue1}</div>
        <div>{dropValue1}</div>
        <div>{fillValue2}</div>
        <div>{dropValue2}</div>
        <div>{fillValue3}</div>
        <div>{dropValue3}</div>
        <div>{fillValue4}</div>
        <div>{dropValue4}</div>
      </div>
    </div>

  );
}

export default PseudoFill;

