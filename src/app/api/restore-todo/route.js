import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function POST(req, res) {
  const todoID = await req.json();

  try {

    console.log(`Finding deleted todo ${todoID}...`);
    // Get the deleted todo from the deltedtodos table
    const deletedTodo = await prisma.deletedtodos.findUnique({
      where: {
        deletedtodo_id: todoID,
      },
    });
    console.log(`Found deleted todo "${deletedTodo.deletedtodo_name}"!`)

    // Insert the deleted todo into the todos table
    console.log(`Restoring todo "${deletedTodo.deletedtodo_name}"...!`);
    await prisma.todos.create({
      data: {
        todo_id: deletedTodo.original_todo_id,
        todo_name: deletedTodo.deletedtodo_name,
        todo_description: deletedTodo.deletedtodo_description,
        todo_completed: deletedTodo.deletedtodo_completed,
      },
    });
    console.log(`Restored todo "${deletedTodo.deletedtodo_name}"!`);

    // Delete the deleted todo from the deletedtodos table
    console.log(`Deleting todo "${deletedTodo.deletedtodo_name}"...`);
    await prisma.deletedtodos.delete({
      where: { deletedtodo_id: todoID },
    });
    console.log(`Deleted todo "${deletedTodo.deletedtodo_name}"!`);

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
