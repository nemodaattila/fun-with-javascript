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

    changeIcon()
    {
        if (this._cell.className ==="mSCell")
        {
            this._cell.className="mSCell flag";
        }
        else
        if (this._cell.className === "mSCell flag")
        {
            this._cell.className="mSCell question";
        }
        else
        if (this._cell.className === "mSCell question")
        {
            this._cell.className="mSCell";
        }
    }

    displayMine()
    {
        this._cell.className="mSCell mine";
    }

    displayClickResult(count)
    {
        if (count === null ) {
            this._cell.style.backgroundColor = "grey";
        }
        if (count>0)
        {
            this._cell.style.backgroundColor = "green";
            this._cell.innerHTML = count;
        }
    }
}
