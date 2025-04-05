import connectDB from "@/lib/Db";
import Todo from "@/lib/models/Todo";
import { NextResponse } from "next/server";

export async function GET(request) {
  console.log("GET /api/todos called"); // Log entry point

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Connected to database successfully");

    // Check if model is registered properly
    console.log("Todo model:", Todo.modelName);

    const todos = await Todo.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log("Todos fetched:", todos.length);

    const total = await Todo.countDocuments({});

    console.log("Total todos:", total);

    return NextResponse.json({
      todos,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in GET /api/todos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function GET() {
//   return NextResponse.json({ message: 'API is working' });
// }

export async function POST() {
  try {
    console.log("🔥 POST /api/todos called");
    await connectDB();
    console.log("✅ Connected to DB");

    const todo = new Todo({
      title: "New Additions",
      description: "To stay representative of framework & new example apps.",
    });

    console.log("📝 Saving todo:", todo);
    await todo.save();

    console.log("✅ Todo saved:", todo);
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/todos error:", error.message);
    console.error(error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

