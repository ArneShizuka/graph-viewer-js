const buildGraph = () => {
    const cy = cytoscape({
        container: document.getElementById("cy"),
        layout: { name: "preset" },
        style: [
            {
                selector: "node",
                style: {
                    label: "data(id)",
                },
            },
            {
                selector: "edge",
                style: {
                    label: "data(timestamp)",
                    width: 3,
                    "line-color": "#ccc",
                    "target-arrow-color": "#ccc",
                    "target-arrow-shape": "triangle",
                    "curve-style": "bezier",
                },
            },
        ],
    })

    return cy
}

const addNodes = (graph, numNodes) => {
    for (let i = 0; i < numNodes; i++) {
        graph.add({
            group: "nodes",
            data: { id: `n${i}` },
            position: { x: Math.floor(i / 2) * 100, y: (i % 3) * 100 },
        })
    }
}

const addEdges = (graph, edgeProb) => {
    graph.nodes().forEach((e1) => {
        graph.nodes().forEach((e2) => {
            if (Math.random() < edgeProb) {
                graph.add({
                    group: "edges",
                    data: {
                        id: `e${graph.edges().length}`,
                        source: e1.data("id"),
                        target: e2.data("id"),
                        timestamp: Math.floor(Math.random() * 30),
                    },
                })
            }
        })
    })
}

const randomGraph = (numNodes = 10, edgeProb = 0.25) => {
    const graph = buildGraph()
    addNodes(graph, numNodes)
    addEdges(graph, edgeProb)
    return graph
}

const dfs = (graph, startNode, visited = new Set()) => {
    if (visited.has(startNode)) return
    console.log(startNode)
    visited.add(startNode)
    neighbors = cy
        .$(`#${startNode}`)
        .neighborhood("edge")
        .filter((e) => {
            return (
                e.data("source") == startNode && e.data("target") != startNode
            )
        })
        .map((e) => {
            return e.data("target")
        })
    neighbors.forEach((neighbor) => {
        dfs(graph, neighbor, visited)
    })
}

const cy = randomGraph(5)
cy.center()
cy.fit((padding = 100))
