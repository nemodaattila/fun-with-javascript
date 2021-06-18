class MineSweeperCell {
    _model
    _view

    constructor(index, parent) {
        this._model = new MineSweeperCellModel(index)
        this._view = new MineSweeperCellView(parent)
    }

}
