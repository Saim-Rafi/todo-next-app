
"use client";

import TodoCard from "./TodoCard";
import { toast } from 'react-toastify';


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
  // const handleCreateTodo = async () => {
  //   try {
  //     const response = await fetch("/api/todos", {
  //       method: "POST",
  //     });

  //     const newTodo = await response.json();
  //     fetchTodos(currentPage); // Refresh list after creation
  //     onSelectTodo(newTodo);
  //   } catch (error) {
  //     console.error("Error creating todo:", error);
  //   }
  // };

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
      fetchTodos(currentPage); // Refresh list
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

  // const handleDeleteTodo = async (deletedId) => {
  //   try {
  //     await fetch(`/api/todos/${deletedId}`, {
  //       method: "DELETE",
  //     });
  //     onDeleteTodo?.(deletedId);
  //     fetchTodos(currentPage); // Refresh list after deletion
  //   } catch (error) {
  //     console.error("Error deleting todo:", error);
  //   }
  // };

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

  return (
    <div className="w-full max-w-md p-4">
      <div className="flex justify-between items-center mb-4">
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
          />
          <span className="absolute left-3 top-2">🔍</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <>
          <div>
            {Array.isArray(todos) && todos.length > 0 ? (
              todos.map((todo) => (
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  isSelected={selectedTodoId === todo._id}
                  onClick={() => onSelectTodo(todo)}
                />
              ))
            ) : (
              <div className="text-center py-4">No todos found</div>
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

