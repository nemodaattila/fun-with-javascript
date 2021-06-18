class MineSweeperCell {
    _model
    _view

    constructor(index, parent, addbr) {
        this._model = new MineSweeperCellModel(index)
        this._view = new MineSweeperCellView(document.getElementById(parent), addbr)
        this.addEventListenerToCell();
    }

    setMineTrue()
    {
        this._model.isMine=true
    }

    setSurroundMineCount(count)
    {
        this._model.mineCountAround=count;
    }

    addEventListenerToCell() {
        this._view.cell.addEventListener("mousedown",() => {
            new MineSweeperService().mouseDownOnCell(this._model.index)
        })
        this._view.cell.addEventListener("mouseup",() => {
            new MineSweeperService().mouseUpOnCell(this._model.index, this._model.isMine)
        })
    }
}
