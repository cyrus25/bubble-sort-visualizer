import "./styles.css";
import { useState } from "react";
import randomColor from "randomcolor";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const getData = () => {
    return Array.from({ length: 10 }, () => {
      return {
        value: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
        color: randomColor(),
        id: uuidv4()
      };
    });
  };

  const [bars, setBars] = useState(getData());

  const shuffleBars = () => {
    setBars(getData());
  };
  const task = (array, i, j) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        resolve();
      }, 200);
    });
  };
  const sortArray = async () => {
    const array = [...bars];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        if (array[j].value > array[j + 1].value) {
          await task(array, i, j);
          setBars([...array]);
        }
      }
    }
  };
  return (
    <div className="App">
      <button className="btn-start" onClick={sortArray}>
        Sort
      </button>
      <button className="btn-restart" onClick={shuffleBars}>
        Shuffle Bars
      </button>
      <div className="bars-container">
        {bars.map(({ id, value, color }) => (
          <div
            key={id}
            style={{
              backgroundColor: color,
              height: value + "px",
              width: "100px",
              marginRight: "10px"
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
