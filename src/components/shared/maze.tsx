import React from 'react';
import '../../styles/maze.scss';
import boxImg from '../../assets/smallbox.svg';

interface MazeProps {
  rows: number;
  cols: number;
  boxCoords: number[][];
}

export function Maze(props: MazeProps): JSX.Element {
  const squares: JSX.Element[][] = [];

  // Fill squares array with empty squares
  for (let i = 0; i < props.rows; i++) {
    squares.push([]);
    for (let j = 0; j < props.cols; j++) {
      squares[i].push(<div className="box" key={`${i}-${j}`} />);
    }
  }

  // Add boxes to specified positions
  for (let i = 0; i < props.boxCoords.length; i++) {
    const [r, c] = props.boxCoords[i];
    squares[r][c] = (
      <div className="box" key={`${r}-${c}`}>
        <img src={boxImg} alt="cardboard box" />
      </div>
    );
  }

  const mazeStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.cols}, auto)`,
  };

  return (
    <div className="maze-container" style={mazeStyle}>
      {squares.map((row, rowIndex) => row.map((square, colIndex) => square))}
    </div>
  );
}
