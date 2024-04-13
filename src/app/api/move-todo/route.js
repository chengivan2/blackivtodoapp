import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function POST(req, res) {
  const todoID = await req.json();

  try {

    console.log(`Finding todo ${todoID}...`);
    // Get the todo from the todos table
    const todo = await prisma.todos.findUnique({
      where: {
        todo_id: todoID,
      },
    });
    console.log(`Found todo "${todo.todo_name}"!`)

    // Insert the todo into the deletedtodos table
    console.log(`Moving todo "${todo.todo_name}"...!`);
    await prisma.deletedtodos.create({
      data: {
        original_todo_id: todo.todo_id,
        deletedtodo_name: todo.todo_name,
        deletedtodo_description: todo.todo_description,
        deletedtodo_completed: todo.todo_completed,
      },
    });
    console.log(`Moved todo "${todo.todo_name}"!`);

    // Delete the todo from the todos table
    console.log(`Deleting todo "${todo.todo_name}"...`);
    await prisma.todos.delete({
      where: { todo_id: todoID },
    });
    console.log(`Deleted todo "${todo.todo_name}"!`);

    return NextResponse.json(
      { key: "value" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("FOUND ERROR!!!!!!!  READ ERROR -> !!!")
    console.log(error);
    console.log(" <- READ ERROR!!!!!!! FOUND ERROR !!!")
  }
  return NextResponse.json(req)
}
