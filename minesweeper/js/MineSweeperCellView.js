class MineSweeperCellView {

    _cell

    constructor(parent,addbr) {
        let _cell=document.createElement("span");
        _cell.className="mSCell";
        parent.appendChild(_cell)
        if (addbr) parent.appendChild(document.createElement("br"));
    }

    get cell() {
        return this._cell;
    }
}
