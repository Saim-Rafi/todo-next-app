import connectDB from '@/lib/db';
import Todo from '@/lib/models/Todo';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const limit = parseInt(url.searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  try {
    await connectDB();
    const todos = await Todo.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Todo.countDocuments({});
    
    return NextResponse.json({
      todos,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    await connectDB();
    const todo = new Todo();
    await todo.save();
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}