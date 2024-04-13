import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function POST(request) {
    const returned_response = await request.json()
    console.log(returned_response.taskName)
    console.log(returned_response.taskDescription)
    console.log("Adding todo to the DB...")
    const createTodo = await prisma.todos.create({
        data: {
          todo_name: returned_response.taskName,
          todo_description: returned_response.taskDescription, 
        },
      })
    console.log("Added todo to the DB!")
    return NextResponse.json({data: returned_response})
}
