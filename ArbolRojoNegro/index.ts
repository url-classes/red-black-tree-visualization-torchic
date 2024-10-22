import { RBTree } from "./rbt";

const myRBTree: RBTree = new RBTree();
myRBTree.insert(7);
myRBTree.insert(15);
myRBTree.insert(11);
myRBTree.insert(20);
myRBTree.insert(30);
myRBTree.insert(50);
myRBTree.insert(45);
myRBTree.printAll();

let node_search = myRBTree.search(30);
if (node_search !== null) {
    console.log("Nodo encontrado:", node_search.getData());
} else {
    console.log("Nodo no encontrado");
}

myRBTree.delete(50);
myRBTree.delete(30);
myRBTree.printAll();

let node = myRBTree.search(30);
if (node !== null) {
    console.log("Nodo encontrado:", node.getData());
} else {
    console.log("Nodo no encontrado");
}