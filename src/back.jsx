import RefExample from "./RefExample";
// class Square extends React.Component {

//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  UNSAFE_componentWillMount() {
    console.log("Board => componentWillMount");
  }

  componentDidMount() {
    console.log("Board => componentDidMount");
  }
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.handleClick(i);
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      message: "This is initial message",
      todo: {},
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({ message: "This is an updated message" });
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())

      .then((json) => {
        this.setState({ todo: json });
      });
  }

  componentDidMount() {
    console.log(document.getElementsByClassName("game"));
    console.log("Game => componentDidMount");
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game Start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }
    const { todo } = this.state;

    console.log(todo);

    return (
      <div
        className="game"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p>{this.state.message}</p>
        <div>
          <p>API call :</p>
          Todo title : <p>{todo.title}</p>
          Todo completed : <p>{todo.completed === true ? "true" : "false"}</p>
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            handleClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
function Welcome(props) {
  return <h1>Haiii {props.name}</h1>;
}

function ChildComponent() {
  useEffect(() => {
    setTimeout(() => {
      console.log("Child Component");
    }, 0);
  }, []);
  return <h1>{"Child Component"}</h1>;
}

function ParentComponent() {
  useEffect(() => {
    setTimeout(() => {
      console.log("Parent Component");
    }, 0);
  }, []);
  return (
    <div>
      <h1>{"Parent Component"}</h1>
      <ChildComponent />
    </div>
  );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      post: [],
    };
  }

  UNSAFE_componentWillMount() {
    setInterval(() => {
      this.setState({
        post: [
          {
            name: "John",
          },
          {
            name: "Suresh",
          },
        ],
      });
    }, 1000);
  }

  componentDidMount() {
    console.log("Mounted");
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    console.log("UnMounted");
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggle: true,
      showWarning: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isToggle: !this.state.isToggle,
    });
  }

  handleToggleClick() {
    this.setState((state) => ({
      showWarning: !state.showWarning,
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />{" "}
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? "Hide" : "Show"}
        </button>
        <button onClick={this.handleClick}>
          {this.state.isToggle ? "ON" : "OFF"}
        </button>
      </div>
    );
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (![]) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function WarningBanner(props) {
  useEffect(() => {
    if (props.warn) {
      console.log("Warning Banner");
    }
  }, [props.warn]);
  if (!props.warn) {
    return null;
  }
  return <div className="warning">Warning!</div>;
}

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "John",
    };
  }
  static getDerivedStateFromProps(props, state) {
    console.log({ props, state });
    if (props.name !== state.name) {
      return {
        name: props.name,
      };
    }
    return null;
  }
  render() {
    return <h1>Hello World {this.state.name}</h1>;
  }
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {
      temperature: "",
      scale: "c",
    };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <>
        <TemperatureInput
          scale="f"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="c"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />{" "}
      </>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}