export function Boxes(rows:number, cols:number): JSX.Element[][]{
  let boxCoords: JSX.Element[][] = [];
  let solved = 'f';
  //checks if the maze is solvable
  function PathExists(arr, sr:number, sc:number){
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
          PathExists(arr, sr+1, sc);
        }
        if (sc < cols-1){
          PathExists(arr, sr, sc+1);
        }
        if (sr > 0){
          PathExists(arr, sr-1, sc);
        }
        if (sc > 0){
          PathExists(arr, sr, sc-1);
        }
      }
    }
  }
  //generates random positions for the boxes
  function RandomPosition(arr){
    const x = Math.floor(Math.random()* rows);
    const y = Math.floor(Math.random()* cols);
    if (arr[x][y]=='S'|| arr[x][y]=='E' || arr[x][y] =='B'){
      return RandomPosition(arr);
    }
    boxCoords.push([x,y]);
    return arr[x][y] = 'B';
  }
  //creates the grid
  function GenerateMaze(){
    const arr = Array(rows).fill().map(()=> Array(cols).fill().map(()=>'.'));
    arr[0][0] = 'S';
    arr[rows-1][cols-1] = 'E';
    for (let i=0; i < cols+2; i++){
      RandomPosition(arr);
    }

    PathExists(arr, 0, 0);
    if (solved=='t'){
      return arr;
    }
    else{
      boxCoords=[];
      GenerateMaze();
    }
    return arr;
  }

  GenerateMaze();
  return(
    boxCoords
  );
}
