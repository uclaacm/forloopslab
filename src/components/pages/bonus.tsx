import React from 'react';
import {Boxes} from '../shared/Boxes';
import { Maze } from '../shared/maze';
// interface BonusProps {
//   onCorrect: () => void;
// }
const boxes = Boxes(4,5);
function Bonus(): JSX.Element {
  return (
    <div className="frame">
      <div id="sidebar">
        <div id="logo">Logo</div>
        <div id="level-title">Level Title</div>
        <div id="instructions-title">Instructions</div>
        <div id="instructions">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
        <div id="content">INSERT SIDEBAR CONTENT HERE</div>
        <button id="run">Run</button>
        <button id="reset">Reset</button>
        <button id="continue">Continue</button>
      </div>
      <div id="main">
        <Maze rows={4} cols={5} boxCoords={boxes}/>
      </div>
    </div>
  );
}

export default Bonus;

