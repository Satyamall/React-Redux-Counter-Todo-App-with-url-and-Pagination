import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  removeTodo,
  toggleTodo
} from "../redux/actions";
import Pagination from "./Pagination";

function TodoItem({ title, status, onDelete, id, onToggle }) {
  return (
    <div style={{ display: "flex", padding: "1rem", gap: "2rem" }}>
      <div>{title}</div>
      <div>{`${status}`}</div>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onToggle(id)}>Toggle Status</button>
    </div>
  );
}

function TodoList() {
  const { todos, isLoading, isError } = useSelector(
    (state) => state,
    shallowEqual
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const changePageTo = (num) => {
    if (num <= 1) {
      setPage(1);
      return;
    }
    setPage(num);
  };
  const perPage = 3;
  // lowerBound
  // upperBound

  const getTodos = (page) => {
    // pre fetch
    const requestAction = getTodosRequest();
    dispatch(requestAction);
    return fetch(`https://json-server-mocker-masai.herokuapp.com/tasks`)
      .then((res) => res.json())
      .then((res) => {
        //success
        const successAction = getTodosSuccess(res);
        dispatch(successAction);
      })
      .catch((res) => {
        // failure
        const failureAction = getTodosFailure();
        dispatch(failureAction);
      });
  };

  useEffect(() => {
    getTodos(page);
  }, [page]);

  const handleDelete = (id) => {
    const action = removeTodo(id);
    dispatch(action);
  };

  const handleToggle = (id) => {
    const action = toggleTodo(id);
    dispatch(action);
  };

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}
      {isError && <h3> Something went wrong!</h3>}
      {todos
        .filter((_, i) => i >= (page - 1) * perPage && i < page * perPage)
        .map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      <div>
        <Pagination
          currentPage={page}
          onClickCallback={(page) => changePageTo(page)}
          total={Math.ceil(todos.length / perPage)}
        />
      </div>
    </div>
  );
}

export default TodoList;
