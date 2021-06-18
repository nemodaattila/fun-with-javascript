/**
 * handles the game itself
 * randomizes the coordinates of the mines, creates cells, handles click events, etc.
 */
class MineSweeperService {

    /**
     * array of cells, cells of the game (can be clicked on browser, may contain mine :))
     * @type {[]} MineSweeperCell
     * @private
     */
    _cells = [];

    /**
     * shows that the click was the first click of the game (needed for generating data)
     * @private boolean
     */
    _isFirstClick;

    /**
     * shows that the game is ongoing or ended (the game field cannot be clicked if false)
     * @private boolean
     */
    _isGameEnded;

    /**
     * count of rows in the player field
     * @private int
     */
    _rowCount;
    /**
     * count of columns in the player field
     * @private int
     */
    _columnCount;

    /**
     * count of mines hidden in the player field
     * @private int
     */
    _mineCount;

    /**
     * count of right clicks (not clicked on a mine) , needed for calculating the winning conditions
     * @private int
     */
    _correctClickCount;

    constructor() {
        if (!MineSweeperService._instance) {
            MineSweeperService._instance = this;
        }
        return MineSweeperService._instance;
    }

    /**
     * setting up the new game, setting some parameters to default
     * @param mineField string - html ID of the player field
     * @param rowCount int count of rows in the player field
     * @param columnCount int count of column in the player field
     * @param mineCount int count of hidden mines in the player field
     */
    newGame(mineField, rowCount, columnCount, mineCount) {
        this._mineCount = mineCount;
        this._rowCount = rowCount;
        this._columnCount = columnCount
        this.createCells(mineField)
        this._correctClickCount = 0;
        this._isFirstClick = true;
        this._isGameEnded = false;
    }

    /**
     * instantiation of player field cells (MineSweeperCell)
     * @param mineField string - html ID of the player field
     */
    createCells(mineField) {
        this._cells = [];
        for (let i = 0; i < this._rowCount; i++) {
            for (let j = 0; j < this._columnCount; j++) {
                if (this._cells[i] === undefined)
                    this._cells[i] = [];
                this._cells[i][j] = new MineSweeperCell([i, j], mineField, j === this._columnCount - 1)
            }
        }
    }

    /**
     * handles the mouse click event, generates data connected to mines at the start of the game
     * @param coordinates coordinates of the clicked cell(row, column)
     */
    mouseLeftClicked(coordinates) {
        if (this._isFirstClick === true) {
            this._isFirstClick = false;
            let mineCoords = this.randomiseMines(coordinates)
            this.calculateSurroundingMineCount(mineCoords)
        }
        if (!this._isGameEnded)
            this.clickOnFieldPoint(coordinates)
    }

    /**
     * randomizes the coordinates of the mines (never the same as the first clicked cell)
     * @param firstClickedCell coordinates of the first clicked cell(row, column)
     * @returns {*[]} array of coordinates of mines
     */
    randomiseMines(firstClickedCell) {
        let tempCoordinates;
        let mineCoordinates = [];
        for (let i = 0; i < this._mineCount; i++)
        {
            tempCoordinates = [Math.floor((Math.random() * this._columnCount)), Math.floor((Math.random() * this._rowCount))];
            let ind = mineCoordinates.findIndex((coordinates) => {
                return (coordinates[0] === tempCoordinates[0]) && (coordinates[1] === tempCoordinates[1]);
            });
            if ((ind === -1) && (!((tempCoordinates[0] === firstClickedCell[0]) && (tempCoordinates[1] === firstClickedCell[1])))) {
                mineCoordinates.push(tempCoordinates);
                this._cells[tempCoordinates[0]][tempCoordinates[1]].setMineTrue();
            } else {
                i--;
            }
        }
        return mineCoordinates
    }

    /**
     * count the surrounding mines for all cells based on the coordinates of mines
     * @param mineCoordinates array of coordinates of mines
     */
    calculateSurroundingMineCount(mineCoordinates) {
        for (let i = 0; i < this._columnCount; i++) {
            for (let j = 0; j < this._rowCount; j++) {
                let c = 0;
                let ind = mineCoordinates.findIndex((coordinates) => {
                    return (coordinates[0] === i) && (coordinates[1] === j);
                });
                if (ind === -1) {
                    for (let k = i - 1; k < i + 2; k++) {
                        for (let l = j - 1; l < j + 2; l++) {
                            if ((k >= 0) && (k < this._columnCount) && (l >= 0) && (l < this._rowCount)) {
                                if (!((i === k) && (l === j))) {
                                    let ind2 = mineCoordinates.findIndex((coordinates) => {
                                        return (coordinates[0] === k) && (coordinates[1] === l);
                                    });
                                    if (ind2 !== -1) c++;
                                }
                            }
                        }
                    }
                }
                if (c === 0) c = null;
                this._cells[i][j].setSurroundMineCount(c);
            }
        }
    }

    /**
     * checks the clicked cell -
     * was it clicked on earlier
     * is it a mine
     * if not - call the surround checker function
     * @param coordinate1 clicked cell's coordinate for row
     * @param coordinate2 clicked cell's coordinate for column
     */
    clickOnFieldPoint([coordinate1, coordinate2])
    {
        let [clickedOn, surroundingMines] = this._cells[coordinate1][coordinate2].checkClickedOn()
        if (clickedOn) {
            return;
        }
        let survived = this._cells[coordinate1][coordinate2].clickHappened();
        if (survived) {
            this._correctClickCount++;
            let win = this.checkWin()
            if (!win && surroundingMines === null) {
                this.checkSurroundingCells([coordinate1, coordinate2])
            }
        } else this.gameEnd()

    }

    /**
     * calls for checking the clicked cells surrounding cells (as if clicked on those)
     * @param coords coordinates of the clicked cell
     */
    checkSurroundingCells(coords)
    {
        for (let k = coords[0] - 1; k < coords[0] + 2; k++) {
            for (let l = coords[1] - 1; l < coords[1] + 2; l++) {
                if ((k >= 0) && (k < this._columnCount) && (l >= 0) && (l < this._rowCount))
                    this.clickOnFieldPoint([k, l]);
            }
        }
    }

    /**
     * checks the conditions for winning, disables interacting on the game field
     * @returns {boolean} true if won, false if not
     */
    checkWin() {

        if (this._correctClickCount === (this._columnCount * this._rowCount - this._mineCount)) {
            this._isGameEnded = true;
            alert("you win")
            return true
        }
        return false
    }

    /**
     * disables interacting on the game field
     */
    gameEnd() {
        this._isGameEnded = true;
        alert("you lost")
    }

}
