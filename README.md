# Tree View Visualizer – Infollion Task 4

This project is a **Tree Structure Visualizer** built using **React Flow**.  
It renders hierarchical tree data with proper spacing, parent-child relationships, and dynamic expand/collapse functionality.

The project was implemented according to the requirements provided in the **Infollion Task 4 PDF**.

---

# Live Deployment

🔗 https://infollion-task-4.vercel.app

---

# Implemented Features

## Core Features Implemented

### 1. Proper Tree Layout
- Nodes are arranged in a clean tree structure
- Siblings have proper spacing
- No overlapping between nodes

### 2. Parent Center Alignment
- Parent nodes are automatically centered above their children

### 3. Parent-Child Edges
- Edges visually connect parent and child nodes

### 4. Expand / Collapse Functionality
- Any node with children can be expanded or collapsed
- Hidden subtrees are removed from view dynamically

### 5. Dynamic Layout Recalculation
- Tree layout automatically adjusts after expanding/collapsing nodes

---

# Additional Features Implemented

- Add Child Node functionality
- Delete Node functionality
- Zoom and Pan support
- Interactive UI controls
- Responsive layout updates

---

# Technologies Used

- React.js
- React Flow
- JavaScript
- CSS

---

# Project Setup Instructions

## Prerequisites

Install the following before running the project:

### 1. Node.js
Download and install:  
https://nodejs.org/

### 2. npm
npm comes pre-installed with Node.js

Verify installation:

```bash
node -v
npm -v
```

---

# Installation & Running the Project

## Clone the Repository

```bash
git clone https://github.com/astha-2004-code/Infollion-Task-4.git
```

## Move into the Project Folder

```bash
cd Infollion-Task-4
```

## Install Dependencies

```bash
npm install
```

## Start the Development Server

```bash
npm start
```

---

# Folder Structure

```plaintext
src/
│
├── components/
│   ├── TreeNode.jsx
│   └── AddNodeModal.jsx
│
├── hooks/
│   └── useTreeState.js
│
├── utils/
│   └── treeHelpers.js
│
├── App.jsx
├── index.js
└── index.css
```

---

# Author

**Astha Jha**  
National Institute of Technology Delhi (NIT Delhi)
