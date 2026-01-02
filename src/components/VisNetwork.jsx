import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";

export default function VisNetwork({ nodes, links, directed = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const visNodes = nodes.map((n) => ({ id: n.id, label: n.label ?? String(n.id) }));
    const visEdges = links.map((l) => ({
      from: l.source,
      to: l.target,
      arrows: directed ? "to" : undefined,
      width: l.weight ? Math.max(1, Math.min(6, l.weight)) : 1,
    }));
    const network = new Network(
      containerRef.current,
      { nodes: visNodes, edges: visEdges },
      { physics: { stabilization: true }, interaction: { hover: true } }
    );
    return () => network.destroy();
  }, [nodes, links, directed]);

  return <div ref={containerRef} style={{ width: "100%", height: 710 }} />;
}
