import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';

// YOUR BACKEND URL – works in dev and production
const API = 'https://backend-vercel-111.vercel.app/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(API);
      setTodos(data);
    } catch (e) {
      alert('Failed to load todos. Check backend URL.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async (formData) => {
    const { data } = await axios.post(API, formData);
    setTodos([data, ...todos]);
  };

  const updateTodo = async (id, formData) => {
    const { data } = await axios.put(`${API}/${id}`, formData);
    setTodos(todos.map(t => t._id === id ? data : t));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(t => t._id === id);
    const fd = new FormData();
    fd.append('completed', !todo.completed);
    await updateTodo(id, fd);
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>My Todos</h1>

      <TodoForm onSubmit={addTodo} />

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading…</p>
      ) : (
        <TodoList
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          onToggle={toggleComplete}
        />
      )}
    </div>
  );
}

export default App;