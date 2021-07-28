import TodoList from "./Todo/TodoList";
import React, { useEffect } from "react";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);
  function onChangeTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  function addTodo(title) {
    setTodos(todos.concat([{ title, id: Date.new, completed: false }]));
  }
  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React Tutorial</h1>
        <Modal></Modal>
        <AddTodo onCreate={addTodo}></AddTodo>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onChange={onChangeTodo}></TodoList>
        ) : loading ? null : (
          <p>No Todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}
export default App;
