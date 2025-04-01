"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import TypeModal from "./TypeModal";

const categoryOptions = ["Option 1", "Option 2"];

function TreeCreator() {
  const [nodes, setNodes] = useState(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addChildNode = (parentId) => {
    const newNode = {
      id: nodeIdCounter,
      title: `Node ${nodeIdCounter}`,
      condition: { field: "", operator: "", value: "" },
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
      addNode(newNodes);
      return newNodes;
    });

    setNodeIdCounter((prev) => prev + 1);
    setIsModalOpen(false);
  };

  const updateNodeValue = (id, newValue) => {
    setNodes((prevNodes) => {
      const updateNode = (node) => {
        if (node.id === id) {
          node.condition.value = newValue;
        } else {
          node.children.forEach(updateNode);
        }
      };

      const newNodes = JSON.parse(JSON.stringify(prevNodes));
      updateNode(newNodes);
      return newNodes;
    });

    setIsModalOpen(false);
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
      return removeNode([prevNodes])[0];
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
      toggleNode(newNodes);
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
          <span className="bg-gray-100 p-2 rounded">{node.title}</span>
          {/* <button
            onClick={() => {
              setSelectedNode(node);
              setIsModalOpen(true);
            }}
            className="ml-2 text-green-500"
          >
            <MdOutlineAddCircle />
          </button> */}
          <TypeModal
            onAddChild={() => addChildNode(selectedNode.id)}
            onAddValue={(value) => updateNodeValue(selectedNode.id, value)}
            onClose={() => setIsModalOpen(false)}
          />
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

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
    if (e.target.value) {
      setNodes({
        id: 1,
        title: `${e.target.value}`,
        condition: { field: "", operator: "", value: "" },
        children: [],
        expanded: true,
      });
    }
  };

  return (
    <div className="p-4">
      {!selectedCategory && (
        <div>
          <select
            className="px-2 py-1 border rounded-md"
            value={selectedCategory}
            onChange={handleCategorySelect}
          >
            <option value="">Select Category</option>
            {categoryOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedCategory && nodes && renderNodes(nodes)}

      {/* {isModalOpen && selectedNode && (
        <TypeModal
          onAddChild={() => addChildNode(selectedNode.id)}
          onAddValue={(value) => updateNodeValue(selectedNode.id, value)}
          onClose={() => setIsModalOpen(false)}
        />
      )} */}
    </div>
  );
}

export default TreeCreator;
