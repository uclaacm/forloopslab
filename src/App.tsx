import './assets/WestwoodSans-Regular.ttf';
import './styles/app.scss';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

import PseudoChoice from './components/pages/pseudochoice';
import PseudoFill from './components/pages/pseudofill';
import PythonFill from './components/pages/pythonfill';
import PythonType from './components/pages/pythontype';
import Repetitive from './components/pages/repetitive';


function App(): JSX.Element {

  const pages = ['/',  '/pseudofill', '/pseudochoice', '/pythonfill', '/pythontype'];

  return (
    <Router>
      <div id="app-container">
        <Routes>
          <Route path="/" element = {<Repetitive pages={pages}/>}/>
          <Route path="/pseudofill" element = {<PseudoFill pages={pages}/>}/>
          <Route path="/pseudochoice" element = {<PseudoChoice pages={pages}/>}/>
          <Route path="/pythonfill" element = {<PythonFill pages={pages}/>}/>
          <Route path="/pythontype" element = {<PythonType pages={pages}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
