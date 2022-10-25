export class DirectedGraph {
    constructor() {
        this.graph = cytoscape({
            container: document.getElementById("cy"),
        })

        this.layoutOptions = {
            name: "cose",
            padding: 200,
            randomize: true,
            componentSpacing: 100,
        }

        this.styleOptions = [
            {
                selector: "node",
                style: {
                    label: "data(id)",
                },
            },
            {
                selector: "edge",
                style: {
                    // label: "data(timestamp)",
                    width: 3,
                    "line-color": "#ccc",
                    "target-arrow-color": "#ccc",
                    "target-arrow-shape": "triangle",
                    "curve-style": "bezier",
                },
            },
        ]

        this.graph.style(this.styleOptions)
    }

    addNodes(nodes) {
        Array.from(nodes).forEach((node) => {
            this.graph.add({
                group: "nodes",
                data: { id: node },
            })
        })
    }

    addEdges(adjList) {
        let edgeNum = 0
        for (let startNode in adjList) {
            Array.from(adjList[startNode]).forEach((endNode) => {
                this.graph.add({
                    group: "edges",
                    data: {
                        id: `e${edgeNum++}`,
                        source: startNode,
                        target: endNode,
                    },
                })
            })
        }
    }

    buildGraph(adjList) {
        this.addNodes(Object.keys(adjList))
        this.addEdges(adjList)
        this.graph.layout(this.layoutOptions).run()
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

        this.renderVisit(Array.from(visited))
    }

    bfs(startNode) {
        let queue = [startNode]
        let visited = new Set()

        while (queue.length > 0) {
            const current = queue.shift()
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
                queue.push(neighbor)
            })
        }

        this.renderVisit(Array.from(visited))
    }

    renderVisit(nodes) {
        nodes.forEach((node, index) => {
            setTimeout(() => {
                this.graph.$id(node).style("background-color", "red")
            }, index * 1000)
        })
    }
}
