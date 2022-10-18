import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import robotRight from '../../assets/RobotDemo.svg';

// interface Frame {
//   x: (string|number)[],
//   y: (string|number)[]
// }

export function Robot(props: {keyframes: (string|number)[][]}):JSX.Element{
  // let xArr = [0]
  // let yArr = [0]
  // let direction = 'right';

  // function MoveRobot(item:string|number){
  //   //change direction
  //   if (item == 'right' || item == 'left'){
  //     if (direction == 'right'){
  //       if (item=='right'){
  //         direction = 'down';
  //       }
  //       else{
  //         direction = 'up';
  //       }
  //     }
  //     else if (direction == 'down'){
  //       if (item=='right'){
  //         direction = 'left';
  //       }
  //       else{
  //         direction = 'right';
  //       }
  //     }
  //     else if (direction == 'left'){
  //       if (item=='right'){
  //         direction = 'up';
  //       }
  //       else{
  //         direction = 'down';
  //       }
  //     }
  //     else if (direction == 'up'){
  //       if (item=='right'){
  //         direction = 'right';
  //       }
  //       else{
  //         direction = 'left';
  //       }
  //     }
  //   }
  //   else{
  //     if (direction == 'right'){
  //       xArr.push(xArr[xArr.length - 1] + (+item*100))
  //       yArr.push(yArr[yArr.length - 1])
  //     }
  //     else if (direction == 'left'){
  //       xArr.push(xArr[xArr.length - 1] - (+item*100))
  //       yArr.push(yArr[yArr.length - 1])
  //     }
  //     else if (direction == 'down'){
  //       xArr.push(xArr[xArr.length - 1])
  //       yArr.push(yArr[yArr.length - 1] + (+item*100))
  //     }
  //     else if (direction == 'up'){
  //       xArr.push(xArr[xArr.length - 1])
  //       yArr.push(yArr[yArr.length - 1] - (+item*100))
  //     }
  //   }
  // }

  // props.arr.forEach((item)=>{
  //   MoveRobot(item)
  // })
  // const [xArr,setXArr] = useState<(string|number)[]>([0]);
  // const [yArr,setYArr] = useState<(string|number)[]>([0]);
  // const [frames, setFrames] = useState<Frame>({
  //   x: [0],
  //   y: [0]
  // })

  const [test,setTest] = useState<(number)>(0);
  const [xArr,setXArr] = useState<(string|number)[]>([0]);
  const [yArr,setYArr] = useState<(string|number)[]>([0]);


  useEffect(() => {
    console.log('Keyframe updated!');
    //console.log(`(${props.keyframes[0]},${props.keyframes[1]})`)
    if(props.keyframes) {
      setXArr(props.keyframes[0]);
      setYArr(props.keyframes[1]);
    }

    // console.log(xArr)
    // console.log(yArr)
    // setFrames({
    //   x: props.keyframes[0],
    //   y: props.keyframes[1]
    // })
    // console.log(props.keyframes[1])
    setTest(test+1);
  }, [props.keyframes]);

  if(JSON.stringify(xArr) === JSON.stringify([0]) && JSON.stringify(yArr) === JSON.stringify([0])) {
    return(
      <img
        className = "robot"
        src = {robotRight}
        alt = "robot">
      </img>

    );
  }
  else {
    console.log(xArr, yArr);
    return(
      <motion.img
        animate = {{
          x: xArr,
          y: yArr,
          // x: [0, 0],
          // y: [0, 100]
        }}
        key={test}
        className = "robot"
        src = {robotRight}
        alt = "robot">
      </motion.img>

    );
  }

}