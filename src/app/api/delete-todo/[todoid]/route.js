import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function DELETE(request, {params}) {
  const todo_id = parseInt(params.todoid, 10);
  console.log("Deleting todo from the database...")

  const deleteTodo = await prisma.todos.delete({
    where: {
      todo_id
    }
  })
    
    console.log(`Deleted todo ${todo_id} from the database!`)
    return NextResponse.json(request)
}
