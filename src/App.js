import "./styles.css";
import Todo from "./Todo/Todo";
import { Counter } from "./Counter/Counter";

export default function App() {
  return (
    <div className="App">
      <h1>Counter App</h1>
      <Counter />
      <h1>Todo</h1>
      <Todo />
    </div>
  );
}
