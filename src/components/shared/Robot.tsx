// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import robotRight from "../../assets/RobotDemo.svg";

// export function Robot(props: {
//   keyframes: (string | number)[][];
// }): JSX.Element {
//   const [xArr, setXArr] = useState<(string | number)[]>([0]);
//   const [yArr, setYArr] = useState<(string | number)[]>([0]);

//   useEffect(() => {
//     if (props.keyframes) {
//       setXArr(props.keyframes[0]);
//       setYArr(props.keyframes[1]);
//     }
//   }, [props.keyframes]);

//   if (JSON.stringify(xArr) === JSON.stringify([0]) && JSON.stringify(yArr) === JSON.stringify([0])) {
//     return <img className="robot" src={robotRight} alt="robot" />;
//   } else {
//     return (
//       <motion.img
//         animate={{
//           x: xArr,
//           y: yArr
//         }}
//         className="robot"
//         src={robotRight}
//         alt="robot"
//       />
//     );
//   }
// }



// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import robotRight from "../../assets/RobotDemo.svg";

// export function Robot(props: {
//   keyframes: (string | number)[][];
// }): JSX.Element {
//   const [xArr, setXArr] = useState<(string | number)[]>([0]);
//   const [yArr, setYArr] = useState<(string | number)[]>([0]);

//   useEffect(() => {
//     if (props.keyframes) {
//       setXArr(props.keyframes[0]);
//       setYArr(props.keyframes[1]);
//     }
//   }, [props.keyframes]);

//   if (JSON.stringify(xArr) === JSON.stringify([0]) && JSON.stringify(yArr) === JSON.stringify([0])) {
//     return <img className="robot" src={robotRight} alt="robot" />;
//   } else {
//     return (
//       <motion.img
//         animate={{
//           x: xArr.map(value => parseInt(value.toString())), // Convert string values to integers
//           y: yArr.map(value => parseInt(value.toString())) // Convert string values to integers
//         }}
//         className="robot"
//         src={robotRight}
//         alt="robot"
//       />
//     );
//   }
// }
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import robotRight from "../../assets/RobotDemo.svg";

function Robot(props: {
  keyframes: (string | number)[][];
}): JSX.Element {
  const [xArr, setXArr] = useState<(string | number)[]>([0]);
  const [yArr, setYArr] = useState<(string | number)[]>([0]);

  useEffect(() => {
    if (props.keyframes) {
      setXArr(props.keyframes[0]);
      setYArr(props.keyframes[1]);
    }
  }, [props.keyframes]);

  return (
    <motion.img
      animate={{
        x: xArr.map(value => parseInt(value.toString())), // Convert string values to integers
        y: yArr.map(value => parseInt(value.toString())) // Convert string values to integers
      }}
      className="robot"
      src={robotRight}
      alt="robot"
    />
  );
}

export default Robot;

