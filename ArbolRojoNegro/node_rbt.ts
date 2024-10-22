export class NodeRBT {
    private data: number;
    private father!: NodeRBT; // NodeRBT* es un apuntador
    private leftChild!: NodeRBT; // "!" significa que el atributo no será inicializado en el constructor ...
    private rightChild!: NodeRBT; // ... pero que sí se inicializará en otra parte
    private color: string;

    constructor(data: number, isLeaf?: boolean) {
        this.data = data;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }

    public getData(): number {
        return this.data;
    }

    public setFather(newFather: NodeRBT): void {
        this.father = newFather;
    }

    public getFather(): NodeRBT {
        return this.father;
    }

    public setLeftChild(newChild: NodeRBT): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeRBT {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeRBT): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeRBT {
        return this.rightChild;
    }

    public setNodeAsRed(): void {
        this.color = "RED";
    }

    public setNodeAsBlack(): void {
        this.color = "BLACK";
    }

    public getColor(): string {
        return this.color;
    }
}
