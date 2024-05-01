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

  return (
    <div>
      <AddTodoForm onAdd={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default Home;
