import '../../styles/maze.scss';
import boxImg from '../../assets/smallbox.svg';

interface MazeProps {
  rows: number;
  cols: number;
  boxCoords:JSX.Element[][];
}

export function Maze(props:MazeProps):JSX.Element {
  // const [move, SetMove] = React.useState(false);
  const squares:JSX.Element[][] = [];
  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < props.cols; j++) {
      if (!squares[i]) {
        squares[i] = [<div className = "box" key={`${i}-${j}`}><img className="hidden" src={boxImg} alt="cardboard box"></img></div>];
      }
      else {
        squares[i].push(<div className = "box" key={`${i}-${j}`}><img src={boxImg} className="hidden" alt="cardboard box"></img></div>);
      }
    }
  }
  for (let i = 0; i < props.boxCoords.length; i++) {
    const r = props.boxCoords[i][0];
    const c = props.boxCoords[i][1];
    squares[r][c] = <div className = "box"><img src={boxImg} alt="cardboard box"></img></div>;
  }

  const mazeStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.cols}, auto)`,
  };

  return (
    <div className="maze-container" style={mazeStyle}>
      {squares}
    </div>
  );
}