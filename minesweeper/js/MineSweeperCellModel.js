/**
 * model for MineSweeperCell
 */
class MineSweeperCellModel {

    /**
     * coordinates of the cell in the game field (row, columns), both from 0
     * @private [int, int]
     */
    _coordinates

    /**
     * shows that the cell contains a mine or now
     * @type {boolean}
     * @private
     */
    _isMine = false;

    /**
     * shows that the cell has been clicked or not
     * @type {boolean}
     * @private
     */
    _clickedOn = false;

    /**
     * shows the count of surrounding mines
     * @type {number}
     * @private
     */
    _surroundingMineCount = 0;

    get surroundingMineCount() {
        return this._surroundingMineCount;
    }

    set surroundingMineCount(value) {
        this._surroundingMineCount = value;
    }

    get clickedOn() {
        return this._clickedOn;
    }

    set clickedOn(value) {
        this._clickedOn = value;
    }

    get isMine() {
        return this._isMine;
    }

    set isMine(value) {
        this._isMine = value;
    }

    get coordinates() {
        return this._coordinates;
    }

    constructor(index) {
        this._coordinates = index
    }
}

