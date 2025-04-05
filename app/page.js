"use client";

import { useState } from "react";
import TodoList from "./Components/TodoList";
import TodoEditor from "./Components/TodoEditor";

export default function Home() {
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleSelectTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setSelectedTodo(updatedTodo);
  };
  const handleDeleteTodo = async (deletedId) => {
    // Clear the editor if the deleted todo is selected
    if (selectedTodo && selectedTodo._id === deletedId) {
      setSelectedTodo(null);
    }

    // Optionally, trigger a re-fetch in TodoList via a ref or state lift (more on this later)
  };

  return (
    <main className="flex min-h-screen">
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">TODO</h1>
        </div>
        <TodoList
          onSelectTodo={handleSelectTodo}
          selectedTodoId={selectedTodo?._id}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>

      <div className="w-2/3">
        <TodoEditor
          todo={selectedTodo}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </main>
  );
}
