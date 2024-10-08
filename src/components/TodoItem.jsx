

import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  // State to manage whether the todo item is in edit mode and the current text.
  const [isEditing, setIsEditing] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  // Access functions from the TodoContext
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  // Function to handle editing the todo item
  const handleEdit = () => {
    if (isEditing) {
      // Update the todo item with the new message
      updateTodo(todo.id, { ...todo, todo: todoMsg });
    }
    // Toggle the edit mode after saving
    setIsEditing(!isEditing);
  };

  // Function to handle toggling completion status
  const handleToggleCompleted = () => {
    toggleComplete(todo.id);
  };

  // Function to handle deleting the todo item
  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'
      }`}
    >
      {/* Checkbox to mark the todo as completed */}
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={handleToggleCompleted}
      />

      {/* Input field for todo text, editable based on isEditing state */}
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isEditing ? 'border-black/10 px-2' : 'border-transparent'
        } ${todo.completed ? 'line-through' : ''}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isEditing} // Make input read-only unless in edit mode
      />

      {/* Button to toggle edit/save mode */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={handleEdit}
        disabled={todo.completed} // Disable editing if todo is completed
      >
        {isEditing ? '📁' : '✏️'}
      </button>

      {/* Button to delete the todo item */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={handleDelete}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
