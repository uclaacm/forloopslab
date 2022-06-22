import './assets/WestwoodSans-Regular.ttf';
import './styles/app.scss';
// import { useState } from 'react';
import {
  BrowserRouter as Router,
  // Route,
  // Routes,
} from 'react-router-dom';
//Remember to import tsx files for pages!
//Import components that are inside pages in page tsx files themselves
// import useSound from 'use-sound';
// import correctSound from './assets/sounds/correct-sound-effect.mp3';
import Bonus from './components/pages/bonus';
import PseudoChoice from './components/pages/pseudochoice';
import PseudoFill from './components/pages/pseudofill';
import PythonFill from './components/pages/pythonfill';
import PythonType from './components/pages/pythontype';
import Repetitive from './components/pages/repetitive';


function App(): JSX.Element {
  // const [enabled, setEnabled] = useState(false);

  // const [play] = useSound(correctSound);

  // const onCorrect = () => {
  //   play();
  //   setEnabled(true);
  // };

  // const pages = ['/',  '/pseudofill', '/pseudochoice', '/pythonfill', '/pythontype', '/bonus']

  return (
    <Router>
      <div id="app-container">
        <Repetitive/>
        <PseudoFill/>
        <PseudoChoice/>
        <PythonFill/>
        <PythonType/>
        <Bonus/>
        {/* <NextButton isEnabled={enabled} onClick={() => setEnabled(false)}/> */}
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
