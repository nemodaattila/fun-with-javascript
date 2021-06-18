/**
 *  handles the input html elements of the MineSweeper
 */
class MineSweeperControls {
    /**
     * view - MineSweeperControlsView
     * @private
     */
    _view;

    constructor() {
        if (!MineSweeperControls._instance) {
            MineSweeperControls._instance = this;
            this._view = new MineSweeperControlsView()
        }
        return MineSweeperControls._instance;
    }

    /**
     * configuration of html input elements and adding event listener to the new game button
     * @param rowInput string - id of input for setting row count
     * @param columnInput string -  id of input for setting col count
     * @param mineCountInput string - id of input for setting mine count
     * @param newGameButton string - id of input for new game button
     * @param mineField string - id of the game's container element
     */
    initMineSweeper(rowInput, columnInput, mineCountInput, newGameButton, mineField) {
        this._view.setContainerHTMLElements(rowInput, columnInput, mineCountInput, newGameButton)
        this._view.newGameButton.addEventListener("click", () => {
            this._view.emptyFieldContainer(mineField)
            let msc = new MineSweeperService()
            msc.newGame(mineField, parseInt(this._view.rowInput.value), parseInt(this._view.columnInput.value), parseInt(this._view.mineCountInput.value))
        })
    }
}
