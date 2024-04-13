import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

// Get incomplete todo
export async function GET() {
    console.log("Fetching incomplete todos from database...");
    const returned_response = await prisma.todos.findMany({
        where:{todo_completed: false}
      });
    console.log("Fetched all incomplete todos!")
    return NextResponse.json({data: returned_response})
}
