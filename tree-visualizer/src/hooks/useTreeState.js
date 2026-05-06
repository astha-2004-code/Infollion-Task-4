// src/hooks/useTreeState.js
import { useState, useCallback } from 'react';
import { INITIAL_TREE, getAllIds } from '../utils/treeHelpers';

export function useTreeState() {
  const [tree, setTree] = useState(INITIAL_TREE);
  const [collapsed, setCollapsed] = useState({});

  const toggleCollapse = useCallback((id) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const collapseAll = useCallback(() => {
    const all = {};
    getAllIds(tree).forEach(id => (all[id] = true));
    setCollapsed(all);
  }, [tree]);

  const [selectedId, setSelectedId] = useState(null);
// return it too

  const expandAll = useCallback(() => setCollapsed({}), []);

  return { tree, setTree, collapsed, toggleCollapse, collapseAll, expandAll, selectedId, setSelectedId };
}