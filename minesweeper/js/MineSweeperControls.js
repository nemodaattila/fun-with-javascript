class MineSweeperControls{
    _mineFieldContainer;

    constructor() {
        if (!MineSweeperControls._instance) {
            MineSweeperControls._instance = this;
        }
        return MineSweeperControls._instance;
    }

    initMineSweeper(rows, cols, mineCount, newGameButton, mineField)
    {
        this._mineFieldContainer = mineField;
        this.view.setContainerHTMLElements(rows,cols,mineCount,newGameButton)
        this.view.newGameButton.addEventListener("click", ()=>
        {
            new MineSweeperService(this._mineFieldContainer, this.view.rows, this.view.cols, this.view.mineCount)
        })
    }

}
