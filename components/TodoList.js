// components/TodoList.js
import React from "react";

const TodoList = ({ todos, onToggle }) => {
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <span onClick={() => onToggle(todo._id)}>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
