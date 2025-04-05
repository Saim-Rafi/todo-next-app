"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import TodoToolbar from "./TodoToolbar";

export default function TodoEditor({ todo, onUpdate ,onDelete}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    debounceSave(e.target.value, description);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    debounceSave(title, e.target.value);
  };

  const debounceSave = (newTitle, newDescription) => {
    if (saveTimeout) clearTimeout(saveTimeout);

    const timeout = setTimeout(() => {
      saveChanges(newTitle, newDescription);
    }, 1000);

    setSaveTimeout(timeout);
  };

  const saveChanges = async (newTitle, newDescription) => {
    if (!todo) return;

    setSaving(true);
    try {
      const response = await axios.put(`/api/todos/${todo._id}`, {
        title: newTitle,
        description: newDescription,
      });
      onUpdate(response.data);
    } catch (error) {
      console.error("Error saving todo:", error);
    } finally {
      setSaving(false);
    }
  };

  //delete todo
  const handleDelete = async () => {
    if (!todo) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/todos/${todo._id}`);
      onDelete(todo._id); // Notify parent to remove from list
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (!todo) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        Select a todo to view and edit
      </div>
    );
  }

  return (
    <div className="p-6 w-full h-full relative">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="text-2xl font-bold w-full focus:outline-none"
        />
        <button
          className="ml-4 text-red-500 hover:text-red-700 font-medium transition"
          onClick={handleDelete}
        >
          DELETE
        </button>
      </div>

      <TodoToolbar />

      <textarea
        value={description}
        onChange={handleDescriptionChange}
        className="w-full h-64 focus:outline-none resize-none"
      />

      {saving && (
        <div className="absolute bottom-2 right-2 text-sm text-gray-400">
          Saving...
        </div>
      )}
    </div>
  );
}
