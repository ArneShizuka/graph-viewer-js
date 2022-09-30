import { RandomGraph } from "./graph.js"

const graph = new RandomGraph()
graph.buildGraph(5)
graph.dfs("n0")
