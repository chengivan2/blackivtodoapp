import React from 'react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Upcomingtasks() {
  console.log("Fetching todos...");
  const allTodos = await prisma.todos.findMany();
  console.log("Fetched todos");
  const allTodosLength = allTodos.length
  console.log("Done")
  return (
    <div>

    <div>
        <h3>Upcoming Tasks</h3>
    </div>

    <div className="class-list">
    {allTodosLength > 0 ?
      {allTodos} :
      <p>You need to add some tasks</p>
    }
        
    </div>

    </div>
  )
}
