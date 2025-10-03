import React, { useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function GraphForce2D({ nodes, links, directed = false }) {
  const data = useMemo(() => ({ nodes, links }), [nodes, links]);
  return (
    <ForceGraph2D
      graphData={data}
      nodeLabel={(n) => n.label ?? String(n.id)}
      linkLabel={(l) => (l.weight != null ? `w=${l.weight}` : "")}
      linkDirectionalArrowLength={directed ? 6 : 0}
      linkDirectionalArrowRelPos={0.9}
      linkWidth={(l) => (l.weight ? Math.max(1, Math.min(6, l.weight)) : 1)}
    />
  );
}