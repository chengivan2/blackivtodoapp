import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

// Get deleted todo
export async function GET() {
    console.log("Fetching deleted todos from database...");
    const returned_response = await prisma.deletedtodos.findMany({
        take: -10
      });
    console.log("Fetched all deleted todos!")
    console.log(typeof returned_response);
    return NextResponse.json({data: returned_response})
}
