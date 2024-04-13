import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function PUT(req, res) {
    const todoID  = await req.json();
    
    console.log("Updating todo in the db")
    const updateTodo = await prisma.todos.update({
        where: {
            todo_id: todoID,
        },
        data: {
            todo_completed: true,
        },
    })
    console.log("Updated todo in the DB")
    return NextResponse.json({ data: updateTodo })
}