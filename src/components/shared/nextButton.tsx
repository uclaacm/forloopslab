import '../../styles/nextButton.scss';
import {Link, useLocation} from 'react-router-dom';

interface NextButtonProps {
  isEnabled: boolean;
  onClick: () => void;
}


function NextButton(props:NextButtonProps): JSX.Element {
  let end = false;
  const pages = ['/','/pseudofill','/pseudochoice','/pythonfill','/pythontype','/bonus'];
  let nextPage = '/pseudofill';
  const location = useLocation();
  const current = location.pathname;
  if (current === '/bonus') {
    end = true;
  } else {
    nextPage = pages[pages.indexOf(current)+1];
  }
  if (end) {
    return (<div></div>);
  } else {
    return (
      <Link id="next-button-container" to={nextPage}>
        <button className= {`nextButton ${props.isEnabled ?' enabled':''}`} disabled={!props.isEnabled} onClick={props.onClick}>
          next
        </button>
      </Link>
    );
  }
}

export default NextButton;
