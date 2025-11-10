import { useState } from 'react';

export default function TodoForm({ onSubmit }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const fd = new FormData();
    fd.append('text', text);
    if (image) fd.append('image', image);
    if (pdf) fd.append('pdf', pdf);

    onSubmit(fd);

    setText('');
    setImage(null);
    setPdf(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,.1)',
      marginBottom: '2rem'
    }}>
      <input
        placeholder="What needs to be done?"
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem' }}
      />

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <label style={{ cursor: 'pointer', background: '#007bff', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px' }}>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display: 'none' }} />
          {image ? `Image: ${image.name}` : 'Add Image'}
        </label>

        <label style={{ cursor: 'pointer', background: '#28a745', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px' }}>
          <input type="file" accept=".pdf" onChange={e => setPdf(e.target.files[0])} style={{ display: 'none' }} />
          {pdf ? `PDF: ${pdf.name}` : 'Add PDF'}
        </label>

        <button type="submit" style={{
          background: '#ffc107', border: 'none', padding: '0.5rem 1.5rem',
          borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
        }}>
          Add Todo
        </button>
      </div>
    </form>
  );
}