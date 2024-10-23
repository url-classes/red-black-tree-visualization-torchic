"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRBT = void 0;
class NodeRBT {
    constructor(data, isLeaf) {
        this.data = data;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }
    getData() {
        return this.data;
    }
    setFather(newFather) {
        this.father = newFather;
    }
    getFather() {
        return this.father;
    }
    setLeftChild(newChild) {
        this.leftChild = newChild;
    }
    getLeftChild() {
        return this.leftChild;
    }
    setRightChild(newChild) {
        this.rightChild = newChild;
    }
    getRightChild() {
        return this.rightChild;
    }
    setNodeAsRed() {
        this.color = "RED";
    }
    setNodeAsBlack() {
        this.color = "BLACK";
    }
    getColor() {
        return this.color;
    }
}
exports.NodeRBT = NodeRBT;
