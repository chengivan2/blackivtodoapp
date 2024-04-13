import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

// Get completed todo
export async function GET() {
    console.log("Fetching completed todos from database...");
    const returned_response = await prisma.todos.findMany({
        where:{todo_completed: true}
      });
    console.log("Fetched all completed todos!")
    return NextResponse.json({data: returned_response})
}
