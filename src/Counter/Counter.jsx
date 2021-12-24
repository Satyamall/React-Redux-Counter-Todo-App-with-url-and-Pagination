import { addCounter, reduceCounter } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addCounter(1));
  };

  const handleReduce = () => {
    dispatch(reduceCounter(1));
  };

  return (
    <>
      <h1> Counter: {counter} </h1>
      <div>
        <button onClick={handleAdd}>ADD</button>
        <button onClick={handleReduce}>REDUCE</button>
      </div>
    </>
  );
};

export { Counter };
