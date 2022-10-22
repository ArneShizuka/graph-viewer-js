import { RandomGraph } from "./graph.js"

const graph = new RandomGraph()
graph.buildGraph(5)
window.graph = graph

document.getElementById("file").addEventListener("change", (e) => {
    let reader = new FileReader()
    reader.onload = (e) => {
        let adjList = JSON.parse(e.target.result)
        graph.buildGraph(adjList)
    }
    reader.readAsText(e.target.files[0])
})
