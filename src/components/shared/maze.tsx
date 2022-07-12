import '../../styles/maze.scss';
import boxImg from '../../assets/smallbox.svg';

interface MazeProps {
    rows: number;
    cols: number;
    boxCoords: number[][];
}


export function Maze(props:MazeProps):JSX.Element {
    const squares:JSX.Element[][] = [];
    for (let i = 0; i < props.rows; i++) {
        for (let j = 0; j < props.cols; j++) {
            if (!squares[i]) {
                squares[i] = [<div>{i},{j}</div>];
            }
            else {
                squares[i].push(<div>{i},{j}</div>);
            }
        }
    }
    for (let i = 0; i < props.boxCoords.length; i++) {
        let r = props.boxCoords[i][0];
        let c = props.boxCoords[i][1];
        squares[r][c] = <div><img src={boxImg} alt="cardboard box"></img></div>
    }
    const mazeStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${props.cols}, auto)`,
    }
    return (
        <div className="maze-container" style={mazeStyle}>
            {squares}
        </div>
    );
}