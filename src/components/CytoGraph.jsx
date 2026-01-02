import React, { useMemo } from "react";
import CytoscapeComponent from "react-cytoscapejs";

export default function CytoGraph({ nodes, links }) {
  const elements = useMemo(
    () => [
      ...nodes.map((n) => ({ data: { id: String(n.id), label: n.label ?? String(n.id) } })),
      ...links.map((l) => ({
        data: {
          id: `${l.source}-${l.target}`,
          source: String(l.source),
          target: String(l.target),
          weight: l.weight,
        },
      })),
    ],
    [nodes, links]
  );

  const stylesheet = [
    { selector: "node", style: { label: "data(label)", "text-valign": "center", "background-color": "#4e79a7" } },
    { selector: "edge", style: { width: 2, "curve-style": "bezier", "target-arrow-shape": "triangle" } },
  ];

  return (
    <CytoscapeComponent
      elements={elements}
      stylesheet={stylesheet}
      layout={{ name: "cose" }}
      style={{ width: "100%", height: "700px" }}
    />
  );
}
