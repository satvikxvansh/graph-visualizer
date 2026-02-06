// src/components/GraphForce2D.jsx
import React, { useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function GraphForce2D({ nodes, links, directed = false }) {
  const data = useMemo(() => ({ nodes, links }), [nodes, links]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ForceGraph2D
        graphData={data}
        width={window.innerWidth * 0.7} // or calculate dynamically
        height={window.innerHeight - 100}
        nodeLabel={(n) => n.label ?? String(n.id)}
        linkLabel={(l) => (l.weight != null ? `w=${l.weight}` : "")}
        linkDirectionalArrowLength={directed ? 6 : 0}
        linkDirectionalArrowRelPos={0.9}
        linkWidth={(l) => (l.weight ? Math.max(1, Math.min(6, l.weight)) : 1)}
      />
    </div>
  );
}
