"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rbt_1 = require("./rbt");
const myRBTree = new rbt_1.RBTree();
myRBTree.insert(7);
myRBTree.insert(15);
myRBTree.insert(11);
myRBTree.insert(20);
myRBTree.insert(30);
myRBTree.insert(50);
myRBTree.insert(45);
function visualizeTree() {
    const container = document.getElementById("tree-container");
    container.innerHTML = ''; // Limpiar contenedor
    function createNodeElement(node) {
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.classList.add(node.getColor() === "RED" ? 'red' : 'black');
        nodeElement.innerText = node.getData().toString();
        return nodeElement;
    }
    function drawTree(node, parentElement) {
        if (!node || node === myRBTree.getLeaf())
            return;
        const nodeElement = createNodeElement(node);
        parentElement.appendChild(nodeElement);
        const childContainer = document.createElement('div');
        childContainer.style.display = 'flex';
        childContainer.style.justifyContent = 'center';
        drawTree(node.getLeftChild(), childContainer);
        drawTree(node.getRightChild(), childContainer);
        parentElement.appendChild(childContainer);
    }
    const rootElement = document.createElement('div');
    rootElement.classList.add('tree-root');
    container.appendChild(rootElement);
    drawTree(myRBTree.getRoot(), rootElement);
}
visualizeTree();
