export function matrixToGraph(mat, directed = false, labels) {
  const n = mat.length;

  const nodes = Array.from({ length: n }, (_, i) => ({ id: i, label: labels && labels
  [i] ? labels[i] : String(i) }));

  const links = [];
  for (let i = 0; i < n; i++) {
    if (mat[i].length !== n) throw new Error("Matrix must be square");
    for (let j = 0; j < n; j++) {
      const w = mat[i][j];
      if (!w) continue;
      if (!directed && j < i) continue; // to avoid duplicates for undirected
      links.push({ source: i, target: j, weight: w !== 1 ? w : undefined });
    }
  }
  return { nodes, links };
}

export function listToGraph(lines, directed = false) {
  const nodeSet = new Set();
  const links = [];
  const seen = new Set(); // for undirected dedup

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const parts = line.split(/:|->/);
    const lhs = parts[0];
    const rhsRaw = parts[1] || "";
    const u = lhs.trim();
    nodeSet.add(u);
    const rhs = rhsRaw.trim();
    if (!rhs) continue;

    for (const tok of rhs.split(",")) {
      const t = tok.trim();
      if (!t) continue;
      const m = t.match(/^([^\(]+)(?:\(([^)]+)\))?$/);
      if (!m) continue;
      const v = m[1].trim();
      const w = m[2] != null ? Number(m[2]) : undefined;
      nodeSet.add(v);
      if (!directed) {
        const a = u < v ? u : v;
        const b = u < v ? v : u;
        const key = `${a}|${b}`;
        if (seen.has(key)) continue;
        seen.add(key);
      }
      links.push({ source: u, target: v, weight: w });
    }
  }
  const nodes = Array.from(nodeSet).map((id) => ({ id, label: id }));
  return { nodes, links };
}
