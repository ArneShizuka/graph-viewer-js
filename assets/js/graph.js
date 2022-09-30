export class RandomGraph {
    constructor() {
        this.graph = cytoscape({
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
    }

    addNodes(numNodes) {
        for (let i = 0; i < numNodes; i++) {
            this.graph.add({
                group: "nodes",
                data: { id: `n${i}` },
                position: { x: Math.floor(i / 2) * 100, y: (i % 3) * 100 },
            })
        }
    }

    addEdges(edgeProb) {
        this.graph.nodes().forEach((e1) => {
            this.graph.nodes().forEach((e2) => {
                if (Math.random() < edgeProb) {
                    this.graph.add({
                        group: "edges",
                        data: {
                            id: `e${this.graph.edges().length}`,
                            source: e1.id(),
                            target: e2.id(),
                            timestamp: Math.floor(Math.random() * 30),
                        },
                    })
                }
            })
        })
    }

    buildGraph(numNodes = 10, edgeProb = 0.25) {
        this.addNodes(numNodes)
        this.addEdges(edgeProb)
        this.graph.center()
        this.graph.fit(100)
    }

    dfs(startNode, visited = new Set()) {
        if (visited.has(startNode)) return
        let current = this.graph.$(`#${startNode}`)
        console.log(startNode)
        visited.add(startNode)
        let neighbors = current
            .neighborhood("edge")
            .filter((e) => {
                return (
                    e.data("source") == startNode &&
                    e.data("target") != startNode
                )
            })
            .map((e) => {
                return e.data("target")
            })
        neighbors.forEach((neighbor) => {
            this.dfs(neighbor, visited)
        })
    }
}
