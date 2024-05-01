// pages/api/todos/[id]/toggle.js
import connectDB from "../../../../db";
import Todo from "../../../../models/Todo";

connectDB();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { completed } = req.body;
    try {
      const todo = await Todo.findByIdAndUpdate(
        id,
        { completed },
        { new: true }
      );
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
