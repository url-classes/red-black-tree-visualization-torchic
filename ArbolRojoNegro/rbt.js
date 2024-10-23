"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBTree = void 0;
const node_rbt_1 = require("./node_rbt");
class RBTree {
    constructor() {
        this.leaf = new node_rbt_1.NodeRBT(0, true);
        this.root = this.leaf;
    }
    fixInsert(testNode) {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            // si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // significa que el tío es el hijo derecho del abuelo de testNode
                let uncle = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                }
                else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            }
            else {
                // significa que el tío es el hijo izquierdo del abuelo de testNode
                let uncle = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                }
                else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }
    leftRotate(x) {
        let y = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }
    rightRotate(x) {
        let y = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }
    printNode(nodo) {
        if (nodo.getLeftChild() !== this.leaf)
            this.printNode(nodo.getLeftChild());
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
        if ((nodo === null || nodo === void 0 ? void 0 : nodo.getRightChild()) !== this.leaf)
            this.printNode(nodo.getRightChild());
    }
    printAll() {
        this.printNode(this.root);
    }
    insert(data) {
        // Inserción normal de BST
        let newNode = new node_rbt_1.NodeRBT(data);
        let parent = this.leaf;
        let current = this.root;
        // Los RBT por la propiedad 5 inserta un nodo hoja a los hijos izquierdo y derecho
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        // Continua inserción normal de BST
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            }
            else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        }
        else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        }
        else {
            parent.setRightChild(newNode);
        }
        // Propiedades del RBT
        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack();
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;
        // corregir inserción
        this.fixInsert(newNode);
    }
    search(data) {
        let current = this.root;
        while (current !== this.leaf) {
            if (data === current.getData()) {
                return current; // nodo encontrado
            }
            else if (data < current.getData()) {
                current = current.getLeftChild();
            }
            else {
                current = current.getRightChild();
            }
        }
        return null; // nodo no encontrado
    }
    delete(data) {
        let nodeToDelete = this.search(data);
        if (nodeToDelete === null) {
            console.log("El nodo no existe en el árbol");
            return;
        }
        let y = nodeToDelete;
        let yOriginalColor = y.getColor();
        let x;
        if (nodeToDelete.getLeftChild() === this.leaf) {
            x = nodeToDelete.getRightChild();
            this.transplant(nodeToDelete, nodeToDelete.getRightChild());
        }
        else if (nodeToDelete.getRightChild() === this.leaf) {
            x = nodeToDelete.getLeftChild();
            this.transplant(nodeToDelete, nodeToDelete.getLeftChild());
        }
        else {
            y = this.minimum(nodeToDelete.getRightChild());
            yOriginalColor = y.getColor();
            x = y.getRightChild();
            if (y.getFather() === nodeToDelete) {
                x.setFather(y);
            }
            else {
                this.transplant(y, y.getRightChild());
                y.setRightChild(nodeToDelete.getRightChild());
                y.getRightChild().setFather(y);
            }
            this.transplant(nodeToDelete, y);
            y.setLeftChild(nodeToDelete.getLeftChild());
            y.getLeftChild().setFather(y);
            // aqui se corrige el color del nodo
            if (nodeToDelete.getColor() === "BLACK") {
                y.setNodeAsBlack();
            }
            else {
                y.setNodeAsRed();
            }
        }
        if (yOriginalColor === "BLACK") {
            this.fixDelete(x);
        }
    }
    transplant(u, v) {
        if (u.getFather() === this.leaf) {
            this.root = v;
        }
        else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        }
        else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }
    minimum(node) {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }
    fixDelete(testNode) {
        while (testNode !== this.root && testNode.getColor() === "BLACK") {
            if (testNode === testNode.getFather().getLeftChild()) {
                let uncle = testNode.getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    uncle.setNodeAsBlack();
                    testNode.getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather());
                    uncle = testNode.getFather().getRightChild();
                }
                if (uncle.getLeftChild().getColor() === "BLACK" && uncle.getRightChild().getColor() === "BLACK") {
                    uncle.setNodeAsRed();
                    testNode = testNode.getFather();
                }
                else {
                    if (uncle.getRightChild().getColor() === "BLACK") {
                        uncle.getLeftChild().setNodeAsBlack();
                        uncle.setNodeAsRed();
                        this.rightRotate(uncle);
                        uncle = testNode.getFather().getRightChild();
                    }
                    uncle.setNodeAsBlack();
                    testNode.getFather().setNodeAsBlack();
                    uncle.getRightChild().setNodeAsBlack();
                    this.leftRotate(testNode.getFather());
                    testNode = this.root;
                }
            }
            else {
                let uncle = testNode.getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    uncle.setNodeAsBlack();
                    testNode.getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather());
                    uncle = testNode.getFather().getLeftChild();
                }
                if (uncle.getRightChild().getColor() === "BLACK" && uncle.getLeftChild().getColor() === "BLACK") {
                    uncle.setNodeAsRed();
                    testNode = testNode.getFather();
                }
                else {
                    if (uncle.getLeftChild().getColor() === "BLACK") {
                        uncle.getRightChild().setNodeAsBlack();
                        uncle.setNodeAsRed();
                        this.leftRotate(uncle);
                        uncle = testNode.getFather().getLeftChild();
                    }
                    uncle.setNodeAsBlack();
                    testNode.getFather().setNodeAsBlack();
                    uncle.getLeftChild().setNodeAsBlack();
                    this.rightRotate(testNode.getFather());
                    testNode = this.root;
                }
            }
        }
        testNode.setNodeAsBlack();
    }
    // Método para mostrar el árbol
    getRoot() {
        return this.root;
    }
    getLeaf() {
        return this.leaf;
    }
}
exports.RBTree = RBTree;
