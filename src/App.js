import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;

/**
 * disable all buttons except 0-9 and "-" sign when empty
 *
 * division must be floored
 *
 * when the last element is a number, all buttons will be enabled
 *
 * if "=" is pressed should compute the answer only if the last digit is a number
 *
 * "=" must be disabled if the las character is not a number
 *
 * if the last character is an operator and it is pressed another operator, it must be replaced, unless it is the "-" operator
 *
 * if the two last character are an operator (* or /) and the "-" operator, it must be ignored
 *
 * if the two last characters are an operator and the "0" the next number will replace the "0"
 *
 * if any number is divided by "0" the result should be "" empty like "C" pressed
 *
 * if the "=" was pressed and the result is shown, the next key will:
 *      - if a number: replace the screen value
 *      - if an operator: be added after the number
 *
 */

const Calculator = () => {
  const [screen, setScreen] = useState("");

  const reset = () => setScreen("");

  const equals = () => setScreen((screen) => eval(screen));

  //const

  const onPress = (option) => {
    setScreen((screen) => screen + option);
  };

  return (
    <div className="calculator">
      <div className="output">{screen}</div>
      <div className="buttons">
        <button onClick={() => onPress("0")} className="digit-0">
          0
        </button>
        <button onClick={() => onPress("1")} className="digit-1">
          1
        </button>
        <button onClick={() => onPress("2")} className="digit-2">
          2
        </button>
        <button onClick={() => onPress("3")} className="digit-3">
          3
        </button>
        <button onClick={() => onPress("4")} className="digit-4">
          4
        </button>
        <button onClick={() => onPress("5")} className="digit-5">
          5
        </button>
        <button onClick={() => onPress("6")} className="digit-6">
          6
        </button>
        <button onClick={() => onPress("7")} className="digit-7">
          7
        </button>
        <button onClick={() => onPress("8")} className="digit-8">
          8
        </button>
        <button onClick={() => onPress("9")} className="digit-9">
          9
        </button>
        <button
          onClick={() => onPress("+")}
          className="op-add"
          disabled={!screen}
        >
          +
        </button>
        <button onClick={() => onPress("-")} className="op-sub">
          -
        </button>
        <button onClick={() => onPress("*")} class="op-mul" disabled={!screen}>
          *
        </button>
        <button onClick={() => onPress("/")} class="op-div" disabled={!screen}>
          /
        </button>
        <button
          onClick={equals}
          class="eq"
          disabled={!screen || isNaN(screen[screen.length - 1])}
        >
          =
        </button>
        <button onClick={reset} class="clear" disabled={!screen}>
          C
        </button>
      </div>
    </div>
  );
};
