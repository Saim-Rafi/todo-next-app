"use client";

import { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import axios from "axios";

export default function TodoList({ onSelectTodo, selectedTodoId ,onDeleteTodo}) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTodos = async (page = 1) => {
    try {
      setLoading(true);

      console.log("Fetching todos for page:", page);

      const response = await axios.get(`/api/todos?page=${page}&limit=10`);

      console.log("Response:", response.data);
      console.log("Full response:", response);

      const fetchedTodos = Array.isArray(response.data.todos)
        ? response.data.todos
        : [];

      if (!response.data) {
        throw new Error("No data received from API");
      }

      setTodos(fetchedTodos);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || page);
    } catch (error) {
      console.error("Error fetching todos:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config, // Shows the request config
        stack: error.stack,
      });
      setTodos([]);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    try {
      const response = await axios.post("/api/todos",{
        title:"New Additions",
        description:"To stay representative of framework & new example apps.",
      });
      setTodos([response.data, ...todos]);
      onSelectTodo(response.data);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchTodos(newPage);
    }
  };

  const handleDeleteTodo = async (deletedId) => {
    try {
      await axios.delete(`/api/todos/${deletedId}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== deletedId));
      onDeleteTodo?.(deletedId); // call parent's delete handler
    } catch (error) {
      console.error("Error deleting todo:", error);
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
