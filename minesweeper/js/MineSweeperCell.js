class MineSweeperCell {
    _model
    _view

    constructor(index, parent, addbr) {
        this._model = new MineSweeperCellModel(index)
        this._view = new MineSweeperCellView(document.getElementById(parent), addbr)
        this.addEventListenerToCell();
    }

    addEventListenerToCell() {
        this._view.cell.addEventListener("mousedown",() => {

            this.mouseDownOnField()
        })
        this._view.cell.addEventListener("mouseup",() => {
            this.mouseUpOnField()
        })
    }
}
