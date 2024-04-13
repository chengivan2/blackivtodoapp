import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function POST(req, res) {
  const { todoID } = req.body;
  const todoId = parseInt(todoID, 10)

  try {
    
    console.log(`Finding todo ${todoId}...`)
    console.log(req.body)
    console.log(`todoId: ${todoId}`)
    console.log(`todoID: ${todoID}`)
    console.log(typeof todoId)
    // Get the todo from the todos table
    const todo = await prisma.todos.findUnique({
      where: {
        todo_id: todoID,
      },
    });
    console.log("Found todo!")

    // Insert the todo into the deletedtodos table
    await prisma.deletedtodos.create({
      data: {
        original_todo_id: todo.todo_id,
        deletedtodo_name: todo.todo_name,
        deletedtodo_description: todo.todo_description,
        deletedtodo_completed: todo.todo_completed,
      },
    });

    
    // Delete the todo from the todos table
    await prisma.todos.delete({
      where: { todo_id: todoID },
    });

    return res.json(
      { key: "value" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(req)
}
