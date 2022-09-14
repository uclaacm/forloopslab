import { motion } from 'framer-motion';
import robotRight from '../../assets/RobotDemo.svg';

//moves robot to certain position
let moveX = 0;
let moveY = 0;
//position of the robot before it moves
let robotX = 0;
let robotY = 0;
//keeps track of the position so that we can set robotX and robotY properly
let prevX = 0;
let prevY = 0;
let direction = 'right';

export function MoveRobot(item:string|number){
  if (item == 'right' || item == 'left'){
    if (direction == 'right'){
      if (item=='right'){
        direction = 'down';
      }
      else{
        direction = 'up';
      }
    }
    else if (direction == 'down'){
      if (item=='right'){
        direction = 'left';
      }
      else{
        direction = 'right';
      }
    }
    else if (direction == 'left'){
      if (item=='right'){
        direction = 'up';
      }
      else{
        direction = 'down';
      }
    }
    else if (direction == 'up'){
      if (item=='right'){
        direction = 'right';
      }
      else{
        direction = 'left';
      }
    }
  }
  else{
    if (direction == 'right'){
      robotX = prevX;
      moveX += (+item*100);
      prevX = moveX;
    }
    else if (direction == 'left'){
      robotX = prevX;
      moveX -= (+item*100);
      prevX = moveX;
    }
    else if (direction == 'down'){
      robotY = prevY;
      moveY += (+item*112);
      prevY = moveY;
    }
    else if (direction == 'up'){
      robotY = prevY;
      moveY -= (+item*112);
      prevY = moveY;
    }
  }
}

export function Robot(props: {arr: (string|number)[]}):JSX.Element{
  {props.arr.map((item) => {
    MoveRobot(item);
    console.log('robotX:' + robotX);
    console.log('robotY:' + robotY);
    console.log('moveX:' + moveX);
    console.log('moveY:' + moveY);
    console.log('prevX:' + prevX);
    console.log('prevY:' + prevY);
    console.log(direction);
    console.log(props.arr);
    props.arr.shift();
  });}
  return(
    <motion.img
      initial = {{x: `${robotX}%`, y: `${robotY}%`}}
      animate = {{x: `${moveX}%`, y: `${moveY}%`}}
      className = "robot"
      src = {robotRight}
      alt = "robot">
    </motion.img>
  );
}