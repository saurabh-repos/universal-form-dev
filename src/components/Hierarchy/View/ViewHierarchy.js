import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";

const containerStyles = {
//   width: "100vw",
  height: "100vh",
};

const ViewHierarchy = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("hierarchyData");
    if (data) {
      const hierarchyData = JSON.parse(data);
      setTreeData(transformHierarchyToD3Format(hierarchyData));
    }
  }, []);

  const transformHierarchyToD3Format = (data) => {
    const processNode = (node) => ({
      name: node.category,
      value: node.value,
      children: node.children?.map(processNode) || [],
    });

    return data.length ? processNode(data[0]) : null;
  };

  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <rect width="300" height="50" x="-150" y="-25" fill="lightblue" stroke="blue" />
      <text fill="black" x="0" y="0" textAnchor="middle" alignmentBaseline="middle">{nodeDatum.name}</text>
      {nodeDatum.value && nodeDatum.value.length > 0 && (
        <foreignObject width="300" height="50" x="-150" y="15">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ border: "1px solid black", padding: "5px", backgroundColor: "white" }}>
            {nodeDatum.value.join(", ")}
          </div>
        </foreignObject>
      )}
    </g>
  );

  return (
    <div style={containerStyles}>
      {treeData && (
        <Tree
          data={treeData}
          orientation="vertical"
          translate={{ x: 200, y: 100 }}
          nodeSize={{ x: 200, y: 100 }}
          separation={{ siblings: 2, nonSiblings: 2 }}
          renderCustomNodeElement={renderCustomNode}
        />
      )}
    </div>
  );
};

export default ViewHierarchy;
