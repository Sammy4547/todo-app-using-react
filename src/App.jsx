import { useState, useEffect } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

function App() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  // Function to update an existing todo
  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Function to toggle the completion status of a todo
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-300 text-black">
          <h1 className="text-2xl font-bold  text-center mb-8 mt-2">
            Write the Today Task
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop through todos and render TodoItem for each */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
