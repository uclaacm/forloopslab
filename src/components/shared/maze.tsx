import '../../styles/maze.scss';
import boxImg from '../../assets/smallbox.svg';

interface MazeProps {
  rows: number;
  cols: number;
}

export function Maze(props:MazeProps):JSX.Element {
  let boxCoords: number[][] = [];
  let solved = 'f';
  //checks if the maze is solvable
  function PathExists(arr, rows:number, cols:number, sr:number, sc:number){
    if(arr[sr][sc] == 'E'){
      solved = 't';
    }
    else if (arr[sr][sc] == 'S' || arr[sr][sc] == '.'){
      if (solved == 't'){
        return;
      }
      else{
        arr[sr][sc] = '*';
        if (sr < rows-1){
          PathExists(arr, rows, cols, sr+1, sc);
        }
        if (sc < cols-1){
          PathExists(arr, rows, cols, sr, sc+1);
        }
        if (sr > 0){
          PathExists(arr, rows, cols, sr-1, sc);
        }
        if (sc > 0){
          PathExists(arr, rows, cols, sr, sc-1);
        }
      }
    }
  }
  //generates random positions for the boxes
  function RandomPosition(arr,rows:number,columns:number){
    const x = Math.floor(Math.random()* rows);
    const y = Math.floor(Math.random()* columns);
    if (arr[x][y]=='S'|| arr[x][y]=='E' || arr[x][y] =='B'){
      return RandomPosition(arr,rows,columns);
    }
    console.log(x,y)
    boxCoords.push([x,y]);
    return arr[x][y] = 'B';
  }
  //creates the grid
  function GenerateMaze(rows:number,columns:number){
    const arr = Array(rows).fill().map(()=> Array(columns).fill().map(()=>'.'));
    arr[0][0] = 'S';
    arr[rows-1][columns-1] = 'E';
    for (let i=0; i < columns; i++){
      RandomPosition(arr, rows, columns);
    }

    PathExists(arr, rows, columns, 0, 0);
    if (solved=='t'){
      console.log(arr)
      return arr;
    }
    else{
      boxCoords=[];
      GenerateMaze(rows, columns);
    }
    return arr;
  }

  GenerateMaze(props.rows, props.cols);
  const squares:JSX.Element[][] = [];
  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < props.cols; j++) {
      if (!squares[i]) {
        squares[i] = [<div key={i}>{i},{j}</div>];
      }
      else {
        squares[i].push(<div key={i}>{i},{j}</div>);
      }
    }
  }

  for (let i = 0; i < boxCoords.length; i++) {
    const r = boxCoords[i][0];
    const c = boxCoords[i][1];
    squares[r][c] = <div><img src={boxImg} alt="cardboard box"></img></div>;
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