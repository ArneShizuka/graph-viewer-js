import { DirectedGraph } from "./graph.js"

const graph = new DirectedGraph()
window.graph = graph

const file = document.getElementById("file")
file.addEventListener("change", (e) => {
    let reader = new FileReader()
    reader.onload = (e) => {
        let adjList = JSON.parse(e.target.result)
        graph.buildGraph(adjList)
    }
    reader.readAsText(e.target.files[0])
})
