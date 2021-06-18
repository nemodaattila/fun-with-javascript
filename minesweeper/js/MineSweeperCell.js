/**
 * controller of a MineSweeper Cell (can be clicked in the game, if a mine is there you die :))
 */
class MineSweeperCell {
    /**
     * model - MineSweeperModel
     * @private
     */
    _model

    /**
     * view MineSweeperView
     * @private
     */
    _view

    constructor(index, parent, addbr) {
        this._model = new MineSweeperCellModel(index)
        this._view = new MineSweeperCellView(document.getElementById(parent), addbr)
        this.addEventListenerToCell();
    }

    /**
     * sets the model's isMine property to true
     * so a mine is there :)
     */
    setMineTrue() {
        this._model.isMine = true
    }

    /**
     * sets the model's mineCountAround property
     * - this shows how many mines surround this cell
     * @param count number
     */
    setSurroundMineCount(count) {
        this._model._surroundingMineCount = count;
    }

    /**
     * adds events listeners to the cell
     * triggers and event when the left or the middle button of the mouse is clicked or released
     * event button - 0 or 1 respectively
     */
    addEventListenerToCell() {
        this._view.cell.addEventListener("mousedown", (event) => {
            console.dir(event.button)
            if (event.button === 1) {
                this.middleButtonclicked()
            }
            if (event.button === 0) {
                new MineSweeperService().mouseLeftClicked(this._model.index)
            }

        })
    }

    /**
     * in case of long pressed click (simulated right click)
     * if (not already clicked, changes the view of the cell to an icon (qustionmark, flag)
     */
    middleButtonclicked() {
        if (!this._model._clickedOn) {
            this._view.changeIcon();
        }
    }

    /**
     * returns that the cell was checked or not , AND the number of mines that surround the cell
     * @returns {any} [bool, int|null]
     */
    checkClickedOn() {
        return [this._model.clickedOn, this._model._surroundingMineCount];
    }

    /**
     * in case of simple click
     * if the cell is a mine displays it, else it displays the num og surrounding cells
     * @returns {boolean} false if the cells is a mine, true if not
     */
    clickHappened() {
        this._model.clickedOn = true
        if (this._model.isMine) {
            this._view.displayMine()
            return false;
        }
        this._view.displayClickResult(this._model.surroundingMineCount);
        return true
    }
}
