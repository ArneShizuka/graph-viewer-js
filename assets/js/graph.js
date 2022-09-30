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

    dfs(startNode) {
        let stack = [startNode]
        let visited = new Set()

        while (stack.length > 0) {
            const current = stack.pop()
            if (visited.has(current)) continue
            visited.add(current)
            let neighbors = this.graph
                .$id(current)
                .neighborhood("edge")
                .filter((e) => {
                    return (
                        e.data("source") == current &&
                        e.data("target") != current
                    )
                })
                .map((e) => {
                    return e.data("target")
                })
            neighbors.forEach((neighbor) => {
                stack.push(neighbor)
            })
        }

        return Array.from(visited)
    }
}
