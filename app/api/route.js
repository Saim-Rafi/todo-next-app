import { connectDB } from "@/lib/config/Db";
import { NextResponse } from "next/server";
import TodoModel from "@/lib/models/TodoModel";
export async function GET(request) {
  try {
    await connectDB();
    const todos = await TodoModel.find({});
    console.log("Todos fetched successfully:", todos);
    return NextResponse.json({ todos: todos });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { msg: "Title and Description are required" },
        { status: 400 }
      );
    }

    const todo = await TodoModel.create({ title, description });

    return NextResponse.json({ msg: "Todo Created", todo }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const mongoId = await request.nextUrl.searchParams.get("mongoId");
    await TodoModel.findByIdAndDelete(mongoId);
    return NextResponse.json({ msg: "Todo Deleted" });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
