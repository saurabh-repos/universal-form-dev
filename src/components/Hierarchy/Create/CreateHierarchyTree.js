import {
  addHierarchy,
  setHierarchyCreatedTrue,
  updateHierarchy,
} from "@/redux/store/slices/hierarchySlice";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const operatorOptions = [">", "<", "=", "!=", ">=", "<="];

function CreateHierarchyTree() {
  const newHierarchy = {
    id: 1,
    title: "Form",
    condition: {
      field: "",
      operator: "",
      value: "",
    },
    children: [],
    expanded: true,
    value: [],
    type: "root",
  };
  const hierarchyState = useSelector((state) => state.hierarchy.hierarchy);
  const isCreated = useSelector((state) => state.hierarchy.isCreated);
  const dispatch = useDispatch();
  const [nodes, setNodes] = useState([]);
  const [nodeIdCounter, setNodeIdCounter] = useState(2);
  const [addingNode, setAddingNode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hierarchyType, setHierarchyType] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [conditionValue, setConditionValue] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([
    "Other",
    "Field A",
    "Field B",
  ]);
  const [hierarchyOptions, setHierarchyOptions] = useState([
    "Category",
    "Value",
  ]);
  const [fieldOptions, setFieldOptions] = useState([
    "Other",
    "Type A",
    "Type B",
  ]);

  useEffect(() => {
    if (!isCreated) {
      dispatch(addHierarchy({ hierarchy: newHierarchy }));

      dispatch(setHierarchyCreatedTrue());
    }
  }, [isCreated, dispatch]);

  useEffect(() => {
    setNodes([hierarchyState]);
  }, [hierarchyState]);

  useEffect(() => {
    console.log("Updated Nodes Structure:", JSON.stringify(nodes, null, 2));
  }, [nodes]);

  const addChildNode = (id) => {
    const newId = nodeIdCounter;
    setNodeIdCounter(newId + 1);
    setNodes((prevNodes) => {
      const addNode = (node) => {
        if (node.id === id) {
          const newType = node.type === "category" ? "type" : "category";
          let newCategory =
            node.type === "category"
              ? `${selectedField} ${selectedOperator} ${conditionValue}`
              : selectedCategory;
          let newCondition =
            node.type === "category"
              ? {
                  field: selectedField,
                  operator: selectedOperator,
                  value: conditionValue,
                }
              : {
                  field: "",
                  operator: "",
                  value: "",
                };
          node.value = [];
          node.children.push({
            id: newId,
            title: newCategory,
            condition: newCondition,
            children: [],
            expanded: true,
            value: [],
            type: newType,
          });
          node.expanded = true;
        } else {
          node.children.forEach(addNode);
        }
      };

      const newNodes = JSON.parse(JSON.stringify(prevNodes));
      newNodes.forEach(addNode);
      dispatch(updateHierarchy({ hierarchy: newNodes[0] }));
      return newNodes;
    });

    // Reset state
    setAddingNode(null);
    setSelectedCategory("");
    setSelectedField("");
    setSelectedOperator("");
    setConditionValue("");
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
      const updatedNodes = removeNode(prevNodes);
      dispatch(updateHierarchy({ hierarchy: updatedNodes[0] }));
      return updatedNodes;
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

  const updateNodeValue = (id, newValue) => {
    setNodes((prevNodes) => {
      const updateNode = (node) => {
        if (node.id === id) {
          node.value = Array.isArray(node.value)
            ? [...node.value, newValue]
            : [newValue];
        } else {
          node.children.forEach(updateNode);
        }
      };

      const newNodes = JSON.parse(JSON.stringify(prevNodes));
      newNodes.forEach(updateNode);
      dispatch(updateHierarchy({ hierarchy: newNodes[0] })); // Dispatch updated hierarchy
      return newNodes;
    });
  };

  const renderNodes = (node) => {
    return (
      <div
        key={node.title}
        className="ml-6 pl-6 border-l-2 border-gray-300 mt-2 transition-all duration-300"
      >
        <div className="flex items-center">
          {node?.children?.length > 0 && (
            <span
              className="cursor-pointer hover:bg-gray-200 transition-colors duration-300 p-2 rounded-full"
              onClick={() => toggleChildren(node.id)}
            >
              {node.expanded ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          )}
          <span className="block p-2 bg-gray-100 rounded-md ml-2">
            {node.title}
          </span>

          {addingNode === node.id ? (
            <div className="ml-4 flex flex-wrap items-center space-x-2">
              {node.type === "root" && (
                <>
                  <select
                    className="px-2 py-1 border rounded-md"
                    value={hierarchyType}
                    onChange={(e) => setHierarchyType(e.target.value)}
                  >
                    <option value="">Select Hierarchy Type</option>
                    {hierarchyOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {hierarchyType === "Category" && (
                    <select
                      className="px-2 py-1 border rounded-md"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              )}
              {node.type === "type" && (
                <select
                  className="px-2 py-1 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {node.type === "category" && (
                <>
                  <select
                    className="px-2 py-1 border rounded-md"
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                  >
                    <option value="">Select Field</option>
                    {fieldOptions.map((field, index) => (
                      <option key={index} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>

                  <select
                    className="px-2 py-1 border rounded-md"
                    value={selectedOperator}
                    onChange={(e) => setSelectedOperator(e.target.value)}
                  >
                    <option value="">Select Operator</option>
                    {operatorOptions.map((operator, index) => (
                      <option key={index} value={operator}>
                        {operator}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Enter Value"
                    className="px-2 py-1 border rounded-md"
                    value={conditionValue}
                    onChange={(e) => setConditionValue(e.target.value)}
                  />
                </>
              )}

              <button
                onClick={() => addChildNode(node.id)}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                Add
              </button>
            </div>
          ) : (
            <>
              {node.id == 1 && node.children.length > 0 ? null : (
                <>
                  <button
                    onClick={() => setAddingNode(node.id)}
                    className="ml-4"
                  >
                    <MdOutlineAddCircle className="text-green-500 hover:text-green-600 transition-colors duration-300 h-6 w-6" />
                  </button>

                  <button onClick={() => deleteNode(node.id)} className="ml-2">
                    <MdDeleteForever className="text-red-500 hover:text-red-600 transition-colors duration-300 h-6 w-6" />
                  </button>
                </>
              )}
            </>
          )}
        </div>
        {node?.children?.length === 0 && (
          <div className="ml-10 mt-2">
            {node.value.map((val, index) => (
              <span key={index} className="mr-2 p-1 bg-gray-200 rounded-md">
                {val}
              </span>
            ))}
            <input
              type="text"
              placeholder="Enter value"
              className="px-2 py-1 border rounded-md"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  updateNodeValue(node.id, e.target.value.trim());
                  e.target.value = "";
                }
              }}
            />
          </div>
        )}

        {node.expanded && node.children.length > 0 && (
          <div className="mt-4 transition-all duration-300">
            {node.children.map(renderNodes)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start p-4">
      {nodes.map(renderNodes)}
    </div>
  );
}

export default CreateHierarchyTree;
