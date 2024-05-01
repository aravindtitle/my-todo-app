// pages/api/todos/index.js
import connectDB from "../../../db";
import Todo from "../../../models/Todo";

connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch todos
  } else if (req.method === "POST") {
    // Add new todo
    const { text } = req.body;
    try {
      const todo = await Todo.create({ text });
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
