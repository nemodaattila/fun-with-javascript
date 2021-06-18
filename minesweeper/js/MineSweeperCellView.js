class MineSweeperCellView {

    _cell

    constructor(parent,addbr) {
        this._cell=document.createElement("span");
        this._cell.className="mSCell";
        parent.appendChild(this._cell)
        if (addbr) parent.appendChild(document.createElement("br"));
    }

    get cell() {
        return this._cell;
    }
}
