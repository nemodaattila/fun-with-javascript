class MineSweeperControls{
    _view;
    constructor() {
        if (!MineSweeperControls._instance) {
            MineSweeperControls._instance = this;
            this._view = new MineSweeperControlsView()
        }
        return MineSweeperControls._instance;
    }

    initMineSweeper(rows, cols, mineCount, newGameButton, mineField)
    {
        this._view.setContainerHTMLElements(rows,cols,mineCount,newGameButton)
        this._view.newGameButton.addEventListener("click", ()=>
        {
            let msc = new MineSweeperService()
            msc.newGame(mineField, this._view.rows.value, this._view.cols.value, this._view.mineCount.value)
        })
    }

}
