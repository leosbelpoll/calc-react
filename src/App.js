import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
const pattern = /^\d+$/;

/**
 * (OK) disable all buttons except 0-9 and "-" sign when empty
 *
 * (OK) division must be floored
 *
 * (Ok) when the last element is a number, all buttons will be enabled
 *
 * (Ok) if "=" is pressed should compute the answer only if the last digit is a number
 *
 * (Ok)  "=" must be disabled if the las character is not a number
 *
 * (Ok) if the last character is an operator and it is pressed another operator, it must be replaced, unless it is the "-" operator
 *
 * if the two last character are an operator (* or /) and the "-" operator, it must be ignored
 *
 * if the two last characters are an operator and the "0" the next number will replace the "0"
 *
 * (Ok) if any number is divided by "0" the result should be "" empty like "C" pressed
 *
 * if the "=" was pressed and the result is shown, the next key will:
 *      - if a number: replace the screen value
 *      - if an operator: be added after the number
 *
 */

const Calculator = () => {
  const [screen, setScreen] = useState("");

  const reset = () => setScreen("");

  const equals = () => {
    const operators = [""]
    for (const element of screen) {
      const actual = operators[operators.length-1]
      if(pattern.test(actual + element)) {
          operators[operators.length-1] = operators[operators.length-1]+ element
      } else {
        if((/^-\d*$/.test(actual)) && (operators[operators.length-2] == "*" || operators[operators.length-2] === "/") && pattern.test(element)) {
          operators[operators.length-1] = operators[operators.length-1]+ element
        }else {
          operators.push(element)
        }
      }
    }
    const result = resultOperation(operators)
    setScreen(_ => result.toString());
  }

  const resultOperation = (operators) => {
    if(operators.length < 3 || operators[0] === ""){
      return operators[0]
    }
    const result = calculate(operators[0], operators[1], operators[2])
    return resultOperation([result].concat(operators.splice(3)))
  }

  const calculate = (n1, operator, n2) => {
    const prev = parseFloat(n1)
    const current = parseFloat(n2)
    if (isNaN(prev) || isNaN(current)) return
    switch (operator) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        return  current !== 0 ? Math.floor(prev/current) : "";
      default:
        return 0
    }
  }

  const onPress = (option) => {
    if(!pattern.test(screen[screen.length -1]) && !pattern.test(option)) {
      if(option === "-" && (screen[screen.length -1] === "*" || screen[screen.length -1] === "/"))
        setScreen((screen) => screen + option);
      setScreen((screen) => screen.slice(0, -1) + option);
    } if(screen[screen.length -1] == 0 && !pattern.test(screen[screen.length -2])) {
      setScreen((screen) => screen.slice(0, -1) + option);
    } else {
      setScreen((screen) => screen + option);
    }
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
