"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";

function TreeCreator() {
  const [nodes, setNodes] = useState([
    { id: 1, name: "Root", children: [], expanded: true },
  ]);
  const [nodeIdCounter, setNodeIdCounter] = useState(2);

  const addChildNode = (parentId) => {
    const newNode = {
      id: nodeIdCounter,
      name: `Node ${nodeIdCounter}`,
      children: [],
      expanded: true,
    };

    setNodes((prevNodes) => {
      const addNode = (node) => {
        if (node.id === parentId) {
          node.children.push(newNode);
          node.expanded = true;
        } else {
          node.children.forEach(addNode);
        }
      };

      const newNodes = JSON.parse(JSON.stringify(prevNodes));
      newNodes.forEach(addNode);
      return newNodes;
    });

    setNodeIdCounter((prev) => prev + 1);
  };

  const deleteNode = (id) => {
    setNodes((prevNodes) => {
      const removeNode = (nodes) => {
        return nodes
          .filter((node) => node.id !== id)
          .map((node) => ({
            ...node,
            children: removeNode(node.children),
          }));
      };
      return removeNode(prevNodes);
    });
  };

  const toggleChildren = (id) => {
    setNodes((prevNodes) => {
      const toggleNode = (node) => {
        if (node.id === id) {
          node.expanded = !node.expanded;
        } else {
          node.children.forEach(toggleNode);
        }
      };

      const newNodes = JSON.parse(JSON.stringify(prevNodes));
      newNodes.forEach(toggleNode);
      return newNodes;
    });
  };

  const renderNodes = (node) => {
    return (
      <div key={node.id} className="ml-6 pl-4 border-l-2 border-gray-300 mt-2">
        <div className="flex items-center">
          {node.children.length > 0 && (
            <button onClick={() => toggleChildren(node.id)} className="mr-2">
              {node.expanded ? <FaChevronDown /> : <FaChevronRight />}
            </button>
          )}
          <span className="bg-gray-100 p-2 rounded">{node.name}</span>
          <button
            onClick={() => addChildNode(node.id)}
            className="ml-2 text-green-500"
          >
            <MdOutlineAddCircle />
          </button>
          <button
            onClick={() => deleteNode(node.id)}
            className="ml-2 text-red-500"
          >
            <MdDeleteForever />
          </button>
        </div>
        {node.expanded && (
          <div className="ml-4">{node.children.map(renderNodes)}</div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      {nodes.map(renderNodes)}
    </div>
  );
}

export default TreeCreator;

