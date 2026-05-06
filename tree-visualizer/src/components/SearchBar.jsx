// src/components/SearchBar.jsx
export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>🔍</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search nodes..."
        style={{
          paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
          background: '#1e293b', border: '1px solid #334155', borderRadius: 8,
          color: '#f1f5f9', fontSize: 13, outline: 'none', width: 200,
          fontFamily: 'monospace',
        }}
      />
    </div>
  );
}