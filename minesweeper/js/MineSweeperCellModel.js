class MineSweeperCellModel {

    _index
    _isMine = false;
    _clickedOn = false;
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

    constructor(index) {
        this._index = index
    }

    get index() {
        return this._index;
    }
}

