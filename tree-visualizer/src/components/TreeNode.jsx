import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export default function TreeNode({ data }) {
  const {
    label,
    hasChildren,
    isCollapsed,
    nodeId,
    onToggle,
    isSelected,
    onSelect,
    isMatch,
  } = data;

  const [hovered, setHovered] = useState(false);

  const bg = isSelected
    ? '#4f8ef7'
    : isMatch
    ? '#f7c948'
    : hovered
    ? '#3b5998'
    : nodeId === 'root'
    ? '#2563eb'
    : '#334155';

  const textColor = isMatch && !isSelected ? '#1a1a1a' : '#fff';

  return (
    <div
      onClick={() => onSelect(nodeId)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '8px 14px',
        borderRadius: 8,
        background: bg,
        color: textColor,
        fontFamily: 'monospace',
        fontWeight: 600,
        fontSize: 13,
        border: isSelected
          ? '2px solid #93c5fd'
          : isMatch
          ? '2px solid #f59e0b'
          : '2px solid transparent',
        boxShadow: isSelected
          ? '0 0 0 3px rgba(99,179,237,0.3)'
          : '0 2px 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 80,
        transition: 'all 0.2s',
        userSelect: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#475569' }}
      />

      <span>{label}</span>

      {hasChildren && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onToggle(nodeId);
          }}
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            transform: isCollapsed
              ? 'rotate(-90deg)'
              : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          ▾
        </span>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#475569' }}
      />
    </div>
  );
}