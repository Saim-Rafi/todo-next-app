"use client";

import { useState } from "react";
import TodoCard from "./TodoCard";
import { toast } from "react-toastify";

export default function TodoList({
  todos,
  loading,
  fetchTodos,
  onSelectTodo,
  selectedTodoId,
  onDeleteTodo,
  currentPage,
  totalPages,
}) {
  const [search, setSearch] = useState("");
  const handleCreateTodo = async () => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const newTodo = await response.json();
      toast.success("Todo created!");
      fetchTodos(currentPage);
      onSelectTodo(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Error creating todo.");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchTodos(newPage);
    }
  };

  const handleDeleteTodo = async (deletedId) => {
    try {
      const response = await fetch(`/api/todos/${deletedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      toast.info("Todo deleted.");
      onDeleteTodo?.(deletedId);
      fetchTodos(currentPage);
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Error deleting todo.");
    }
  };

  //search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //filter todo based on the search
  const filteredTodos = Array.isArray(todos)
    ? todos.filter(
        (todo) =>
          todo.title?.toLowerCase().includes(search.toLowerCase()) ||
          todo.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="w-full max-w-md p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <button
          onClick={handleCreateTodo}
          className="bg-black text-white px-4 py-2 rounded-md flex items-center"
        >
          <span className="mr-2">+</span>
          TODO
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-4 py-2 pl-10"
            value={search}
            onChange={handleSearch}
          />
          <span className="absolute left-3 top-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="25"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <>
          <div>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  isSelected={selectedTodoId === todo._id}
                  onClick={() => onSelectTodo(todo)}
                />
              ))
            ) : (
              <div className="text-center py-4">
                {search ? "No matching todos found" : "No todos found"}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                &lt;
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
