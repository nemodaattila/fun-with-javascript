class MineSweeperService {

    _cells = [];

    // mineAround;
    // mineCoord;
    _actTime;
    _lastTime;
    _isFirstClick;
    _isGameEnded;
    // clickResult;


    constructor() {

        if (!MineSweeperService._instance) {
            MineSweeperService._instance = this;
        }
        return MineSweeperService._instance;
    }

    newGame(mineField, rowCount, colCount, mineCount)
    {
        console.log([mineField, rowCount, colCount, mineCount])
        this.createCells(mineField, rowCount, colCount)
        this._actTime=null;
        this._lastTime=null;
        this._isFirstClick=true;
        this._isGameEnded=false;
    }

    createCells(mineField, rowCount, colCount) {
        this._cells = [];

        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++) {
                if (this._cells[i] === undefined)
                    this._cells[i] = [];
                this._cells[i][j] = new MineSweeperCell([i, j], mineField, j === colCount-1)
            }
        }
        console.log(document.getElementById(mineField))
    }
}
