import connectDB from "../../../db";
import Todo from "../../../models/Todo";

connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const todos = await Todo.find({});
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
