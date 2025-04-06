"use client";

import { useEffect, useState } from "react";
import TodoList from "./Components/TodoList";
import TodoEditor from "./Components/TodoEditor";

export default function Home() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTodos = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/todos?page=${page}&limit=10`);
      const data = await response.json();

      setTodos(Array.isArray(data.todos) ? data.todos : []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSelectTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setSelectedTodo(updatedTodo);

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (deletedId) => {
    if (selectedTodo && selectedTodo._id === deletedId) {
      setSelectedTodo(null);
    }

    //remove the todo from the todolist
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== deletedId));
  };

  return (
    <main className="flex min-h-screen">
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h1 className="text-3xl font-extrabold">TODO</h1>
        </div>
        <TodoList
          todos={todos}
          loading={loading}
          fetchTodos={fetchTodos}
          currentPage={currentPage}
          totalPages={totalPages}
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

