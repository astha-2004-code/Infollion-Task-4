// src/components/AddNodeModal.jsx
import { useState } from 'react';

export default function AddNodeModal({ parentLabel, onAdd, onClose }) {
  const [label, setLabel] = useState('');

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div style={{
        background: '#1e293b', borderRadius: 12, padding: 24,
        border: '1px solid #334155', minWidth: 280,
      }}>
        <h3 style={{ color: '#f1f5f9', marginTop: 0, fontFamily: 'monospace' }}>
          Add child to <span style={{ color: '#4f8ef7' }}>{parentLabel}</span>
        </h3>
        <input
          autoFocus
          value={label}
          onChange={e => setLabel(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && label.trim()) onAdd(label.trim());
            if (e.key === 'Escape') onClose();
          }}
          placeholder="Node label..."
          style={{
            width: '100%', padding: '8px 12px', borderRadius: 8,
            border: '1px solid #475569', background: '#0f172a',
            color: '#f1f5f9', fontSize: 14, fontFamily: 'monospace',
            outline: 'none', boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button
            onClick={() => label.trim() && onAdd(label.trim())}
            style={{ flex: 1, padding: 8, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
          >Add</button>
          <button
            onClick={onClose}
            style={{ flex: 1, padding: 8, background: '#334155', color: '#cbd5e1', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
}