import { connectDB } from "@/lib/config/Db";
import { NextResponse } from "next/server";

const LoadDB = async()=>{
    await connectDB();
}

LoadDB();


export async function GET(request){
    return NextResponse.json({msg:"get method hint"}) 
}