// pages/index.js
import React, { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleAddTodo = (text) => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((newTodo) => setTodos([...todos, newTodo]))
      .catch((error) => console.error("Error adding todo:", error));
  };

  const handleToggleTodo = (id, completed) => {
    fetch(`/api/todos/${id}/toggle`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }), // Toggle the completed status
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === updatedTodo._id
            ? { ...todo, completed: updatedTodo.completed }
            : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("Error toggling todo:", error));
  };

  return (
    <div>
      <p>TodlList</p>
      <AddTodoForm onAdd={handleAddTodo} />
      <TodoList todos={todos} onToggle={handleToggleTodo} />
    </div>
  );
};

export default Home;
