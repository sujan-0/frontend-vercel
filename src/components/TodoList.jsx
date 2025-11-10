import { useState } from 'react';

export default function TodoList({ todos, onUpdate, onDelete, onToggle }) {
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const startEdit = (todo) => {
    setEditing(todo._id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    const fd = new FormData();
    fd.append('text', editText);
    onUpdate(editing, fd);
    setEditing(null);
  };

  if (todos.length === 0) {
    return <p style={{ textAlign: 'center', color: '#777' }}>No todos yet. Add one!</p>;
  }

  return (
    <div>
      {todos.map(todo => (
        <div key={todo._id} style={{
          background: '#fff',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 1px 4px rgba(0,0,0,.1)'
        }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id)}
            style={{ width: '1.2rem', height: '1.2rem' }}
          />

          {editing === todo._id ? (
            <input
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={e => e.key === 'Enter' && saveEdit()}
              autoFocus
              style={{ flex: 1, padding: '0.5rem', border: '1px solid #007bff', borderRadius: '4px' }}
            />
          ) : (
            <div style={{ flex: 1 }}>
              <p style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#111',
                fontSize: '1.1rem'
              }}>
                {todo.text}
              </p>

              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                {todo.imageUrl && <a href={todo.imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>Image</a>}
                {todo.pdfUrl && <a href={todo.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#28a745' }}>PDF</a>}
              </div>
            </div>
          )}

          <button onClick={() => startEdit(todo)} style={{
            background: '#ffc107', color: '#fff', border: 'none',
            padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer'
          }}>
            Edit
          </button>

          <button onClick={() => onDelete(todo._id)} style={{
            background: '#dc3545', color: '#fff', border: 'none',
            padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer'
          }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}