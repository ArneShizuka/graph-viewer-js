const cy = cytoscape({
    container: document.getElementById('cy'),

    layout: { name: 'preset' },

    style: [
        {
            selector: 'node',
            style: {
                'label': 'data(id)'
            }
        },
        {
            selector: 'edge',
            style: {
                'label': 'data(timestamp)',
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }
    ]

})

const addNodes = (numNodes) => {
    for (let i = 0; i < numNodes; i++) {
        cy.add({ group: 'nodes', data: { id: `n${i}` }, position: { x: Math.floor(i / 2) * 100, y: (i % 3) * 100 } })
    }
}

const addEdges = (edgeProb) => {
    cy.nodes().forEach(e1 => {
        cy.nodes().forEach(e2 => {
            if (Math.random() < edgeProb) {
                cy.add({ group: 'edges', data: { id: `e${cy.edges().length}`, source: e1.data('id'), target: e2.data('id'), timestamp: Math.floor(Math.random() * 30) } })
            }
        })
    })
}

addNodes(10)
addEdges(0.25)

cy.center()
cy.fit(padding = 100)