import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useSelector } from "react-redux";

const containerStyles = {
  height: "calc(100vh - 5rem)",
};


const ViewHierarchy = () => {
  const hierarchyState = useSelector((state) => state.hierarchy.hierarchy);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    if (hierarchyState) {
      setTreeData(transformHierarchyToD3Format(hierarchyState));
    }
  }, [hierarchyState]);

  const transformHierarchyToD3Format = (data) => {
    const processNode = (node) => ({
      name: node.title,
      value: node.value,
      children: node.children?.map(processNode) || [],
    });

    return processNode(data);
  };

  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <rect width="300" height="50" x="-150" y="-25" fill="lightblue" stroke="transparent" />
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
          translate={{ x: 200, y: 40 }}
          nodeSize={{ x: 200, y: 100 }}
          separation={{ siblings: 2, nonSiblings: 2 }}
          renderCustomNodeElement={renderCustomNode}
          zoom={0.4}
        />
      )}
    </div>
  );
};

export default ViewHierarchy;
