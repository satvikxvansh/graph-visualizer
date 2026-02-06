import { useState } from "react";
import GraphForce2D from "./components/GraphForce2D";
import CytoGraph from "./components/CytoGraph";
import VisNetwork from "./components/VisNetwork";
import { matrixToGraph, listToGraph, arrayListToGraph } from "./lib/graphParse";
import Tooltip from "./components/Tooltip"

export default function App() {
  const [mode, setMode] = useState("matrix"); // matrix or list
  const [directed, setDirected] = useState(false);
  const [raw, setRaw] = useState("0 1 0\n1 0 1\n0 1 0");
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }

  let nodes = [];
  let links = [];
  try {
    if (mode === "matrix") {
      const mat = raw
        .trim()
        .split(/\n+/)
        .map((r) => r.trim().split(/\s+/).map(Number));
      ({ nodes, links } = matrixToGraph(mat, directed));
      console.log(mat);
      console.log({ nodes, links });
      // console.log(mat);
    } else if(mode === "List") {
      const lines = raw.trim().split(/\n+/);
      console.log("here :");
      console.log(lines);
      ({ nodes, links } = listToGraph(lines, directed));
    }else if (mode === "arrayList") {
      // Parse JSON array format: [[1,2,3],[0,2],[0,1,3],[0,2]]
      const adjList = JSON.parse(raw);
      ({ nodes, links } = arrayListToGraph(adjList, directed));
    }
  } catch{
    // optionally show parse error in UI
  }

  return (
    <div className="flex">
      <div className="flex flex-col flex-none p-7 border-r border-gray-500">
        <h3 className="text-3xl font-semibold">Input Section</h3>
        <div>
          <p className="font-semibold mt-5 mb-2">Input type: </p>
          <div className="flex flex-col justify-around gap-2">
            <label class="flex items-center space-x-3 cursor-pointer text-lg text-gray-800 p-4 border-2 border-gray-200 rounded-lg has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition-all">
              <input type="radio" checked={mode === "matrix"} onChange={() => setMode("matrix")} class="sr-only peer" />
              <span class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 peer-checked:border-blue-600 peer-checked:bg-blue-600">
                <span class="w-2.5 h-2.5 rounded-full bg-white scale-0 transition-transform duration-200 peer-checked:scale-100"></span>
              </span>
              <span>Matrix</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer text-lg text-gray-800 p-4 border-2 border-gray-200 rounded-lg has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition-all">
              <input type="radio" checked={mode === "list"} onChange={() => setMode("list")} class="sr-only peer" />
              <span class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 peer-checked:border-blue-600 peer-checked:bg-blue-600">
                <span class="w-2.5 h-2.5 rounded-full bg-white scale-0 transition-transform duration-200 peer-checked:scale-100"></span>
              </span>
              <span>List</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer text-lg text-gray-800 p-4 border-2 border-gray-200 rounded-lg has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition-all">
              <input type="radio" checked={mode === "arrayList"} onChange={() => setMode("arrayList")} class="sr-only peer" />
              <span class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 peer-checked:border-blue-600 peer-checked:bg-blue-600">
                <span class="w-2.5 h-2.5 rounded-full bg-white scale-0 transition-transform duration-200 peer-checked:scale-100"></span>
              </span>
              <span>Array List (Best for Leetcode)</span>
            </label>
          </div>
        </div>
        <div>
          {/* checkbox */}
          <label className=" mt-10 flex items-center space-x-3 cursor-pointer text-lg text-gray-800 p-4 select-none border-2 border-gray-200 rounded-lg has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition-all">
            <input type="checkbox" className="sr-only peer" checked={directed} onChange={(e) => setDirected(e.target.checked)} />
            <div className="w-6 h-6 rounded-md border-2 border-gray-300 flex items-center justify-center
                      transition-all duration-200
                      peer-checked:border-blue-600 peer-checked:bg-blue-600">
              <svg
                className="w-4 h-4 text-white scale-0 transition-transform duration-200 origin-center
                     peer-checked:scale-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-gray-700">Directed</span>
          </label>
        </div>

        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          class=" border-1 rounded-xl p-2 w-full h-60 mt-2 font-mono"
        />

        <p class="text-s text-neutral-900">How to enter?</p>
        <p class="text-xs text-neutral-600">
          Matrix: rows of numbers <br />
          List: lines like "0: 1(2), 3" or "A - B, C" with optional weights in parentheses.
        </p>
      </div>

      <div className="flex flex-1">
        <div className="flex flex-col bg-gray-200 text-gray-500">
          <div className="flex justify-between m-3 text-xl">
            <div>Playground</div>
            <div>
              <label htmlFor="dropdown">Change View: </label>
              <select className="bg-white px-2 py-1 rounded-lg border-blue-400 border-1 focus:outline-none" id="dropdown" value={selectedValue} onChange={handleChange}>
                <option value="option1">GraphForce2D</option>
                <option value="option2">CytoGraph</option>
                <option value="option3">VisNetwork</option>
              </select>
            </div>
          </div>
          <div className="">
            {selectedValue==="option1" && <GraphForce2D nodes={nodes} links={links} directed={directed} />}
            {selectedValue==="option2" && <CytoGraph nodes={nodes} links={links} />}
            {selectedValue==="option3" && <VisNetwork nodes={nodes} links={links} directed={directed} />}
          </div>
        </div>
      </div>
    </div>
  );
}
