import { RandomGraph } from "./graph.js"

const graph = new RandomGraph()
graph.buildGraph(5)
window.graph = graph
