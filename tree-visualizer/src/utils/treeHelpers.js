// src/utils/treeHelpers.js

export const INITIAL_TREE = {
  id: 'root',
  label: 'Root',
  children: [
    {
      id: 'a',
      label: 'A',
      children: [
        { id: 'a1', label: 'A1', children: [] },
        { id: 'a2', label: 'A2', children: [] },
      ],
    },
    {
      id: 'b',
      label: 'B',
      children: [
        { id: 'b1', label: 'B1', children: [] },
        { id: 'b2', label: 'B2', children: [] },
      ],
    },
  ],
};

// Add a child node to a specific parent
export function addChildToNode(tree, parentId, newNode) {
  if (tree.id === parentId) {
    return {
      ...tree,
      children: [...tree.children, newNode],
    };
  }

  return {
    ...tree,
    children: tree.children.map((c) =>
      addChildToNode(c, parentId, newNode)
    ),
  };
}

// Remove a node by id
export function deleteNodeById(tree, targetId) {
  return {
    ...tree,
    children: tree.children
      .filter((c) => c.id !== targetId)
      .map((c) => deleteNodeById(c, targetId)),
  };
}

// Flatten all node ids (for collapse-all)
export function getAllIds(node, acc = []) {
  acc.push(node.id);

  node.children.forEach((c) =>
    getAllIds(c, acc)
  );

  return acc;
}

// Convert tree → React Flow nodes + edges
// Uses a simple recursive x/y layout

const NODE_W = 120;
const NODE_H = 40;
const H_GAP = 30;
const V_GAP = 80;

export function treeToFlow(
  node,
  collapsed,
  x = 0,
  y = 0
) {
  const nodes = [];
  const edges = [];

  _layout(
    node,
    collapsed,
    x,
    y,
    nodes,
    edges
  );

  return { nodes, edges };
}

//let _idCounter = 0;

function _subtreeWidth(node, collapsed) {
  if (
    !node.children.length ||
    collapsed[node.id]
  ) {
    return NODE_W;
  }

  const childWidths = node.children.map((c) =>
    _subtreeWidth(c, collapsed)
  );

  const total =
    childWidths.reduce((a, b) => a + b, 0) +
    H_GAP * (node.children.length - 1);

  return Math.max(total, NODE_W);
}

function _layout(
  node,
  collapsed,
  cx,
  y,
  nodes,
  edges
) {
  nodes.push({
    id: node.id,
    type: 'treeNode',

    position: {
      x: cx - NODE_W / 2,
      y,
    },

    data: {
      label: node.label,
      hasChildren: node.children.length > 0,
      isCollapsed: !!collapsed[node.id],
      nodeId: node.id,
    },
  });

  if (
    !node.children.length ||
    collapsed[node.id]
  ) {
    return;
  }

  const childWidths = node.children.map((c) =>
    _subtreeWidth(c, collapsed)
  );

  const totalW =
    childWidths.reduce((a, b) => a + b, 0) +
    H_GAP * (node.children.length - 1);

  let startX = cx - totalW / 2;

  node.children.forEach((child, i) => {
    const childCx =
      startX + childWidths[i] / 2;

    edges.push({
      id: `e-${node.id}-${child.id}`,
      source: node.id,
      target: child.id,
      type: 'smoothstep',

      style: {
        stroke: '#475569',
        strokeWidth: 1.5,
      },
    });

    _layout(
      child,
      collapsed,
      childCx,
      y + NODE_H + V_GAP,
      nodes,
      edges
    );

    startX += childWidths[i] + H_GAP;
  });
}