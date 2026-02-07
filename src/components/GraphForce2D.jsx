import React, { useMemo, useRef, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function GraphForce2D({ nodes, links, directed = false }) {
  const data = useMemo(() => ({ nodes, links }), [nodes, links]);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <ForceGraph2D
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        nodeLabel={(n) => n.label ?? String(n.id)}
        linkLabel={(l) => (l.weight != null ? `w=${l.weight}` : "")}
        linkDirectionalArrowLength={directed ? 6 : 0}
        linkDirectionalArrowRelPos={0.9}
        linkWidth={(l) => (l.weight ? Math.max(1, Math.min(6, l.weight)) : 1)}
      />
    </div>
  );
}
