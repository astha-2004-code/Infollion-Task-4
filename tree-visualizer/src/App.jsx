import { useState, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from 'reactflow';

import 'reactflow/dist/style.css';

import TreeNode from './components/TreeNode';
import AddNodeModal from './components/AddNodeModal';

import { useTreeState } from './hooks/useTreeState';

import {
  treeToFlow,
  addChildToNode,
  deleteNodeById,
} from './utils/treeHelpers';

const nodeTypes = {
  treeNode: TreeNode,
};

export default function App() {
  const {
    tree,
    setTree,
    collapsed,
    toggleCollapse,
    collapseAll,
    expandAll,
  } = useTreeState();

  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const idRef = useRef(100);

  const { nodes, edges } = treeToFlow(tree, collapsed);

  const nodesWithCallbacks = nodes.map((n) => ({
    ...n,
    data: {
      ...n.data,
      onToggle: toggleCollapse,
      onSelect: (id) =>
        setSelectedId((s) => (s === id ? null : id)),
      isSelected: n.id === selectedId,
      isMatch: false,
    },
  }));

  function handleAdd(label) {
    const newNode = {
      id: `node_${idRef.current++}`,
      label,
      children: [],
    };

    setTree((t) =>
      addChildToNode(t, selectedId, newNode)
    );

    setShowModal(false);
  }

  function handleDelete() {
    if (!selectedId || selectedId === 'root') return;

    setTree((t) =>
      deleteNodeById(t, selectedId)
    );

    setSelectedId(null);
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#0f172a',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: 8,
        }}
      >
        <button
          onClick={expandAll}
          style={btnStyle('#10b981')}
        >
          Expand All
        </button>

        <button
          onClick={collapseAll}
          style={btnStyle('#f59e0b')}
        >
          Collapse All
        </button>

        <button
          onClick={() =>
            selectedId && setShowModal(true)
          }
          disabled={!selectedId}
          style={btnStyle(
            selectedId
              ? '#2563eb'
              : '#374151'
          )}
        >
          + Add Child
        </button>

        <button
          onClick={handleDelete}
          disabled={
            !selectedId || selectedId === 'root'
          }
          style={btnStyle(
            selectedId &&
              selectedId !== 'root'
              ? '#ef4444'
              : '#374151'
          )}
        >
          🗑 Delete
        </button>
      </div>

      <ReactFlow
        nodes={nodesWithCallbacks}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background
          color="#1e293b"
          gap={24}
        />

        <Controls />

        <MiniMap />
      </ReactFlow>

      {showModal && (
        <AddNodeModal
          parentLabel={selectedId}
          onAdd={handleAdd}
          onClose={() =>
            setShowModal(false)
          }
        />
      )}
    </div>
  );
}

function btnStyle(bg) {
  return {
    padding: '8px 16px',
    borderRadius: 8,
    border: 'none',
    background: bg,
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  };
}