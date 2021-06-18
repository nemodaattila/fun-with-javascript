class MineSweeperService {

    _cells = [];

    // mineAround;
    // mineCoord;
    _mouseDownTime;
    _mouseUpTime;
    _isFirstClick;
    _isGameEnded;
    _rowCount;
    _colCount;
    _mineCount;

    _correctClickCount;
    // clickResult;

    constructor() {

        if (!MineSweeperService._instance) {
            MineSweeperService._instance = this;
        }
        return MineSweeperService._instance;
    }

    newGame(mineField, rowCount, colCount, mineCount) {
        console.log([mineField, rowCount, colCount, mineCount])
        this._mineCount = mineCount;
        this._rowCount = rowCount;
        this._colCount = colCount
        this.createCells(mineField)
        this._correctClickCount = 0;
        this._mouseDownIndex = null;
        this._mouseUpTime = null;
        this._isFirstClick = true;
        this._isGameEnded = false;
    }

    createCells(mineField) {
        this._cells = [];

        for (let i = 0; i < this._rowCount; i++) {
            for (let j = 0; j < this._colCount; j++) {
                if (this._cells[i] === undefined)
                    this._cells[i] = [];
                this._cells[i][j] = new MineSweeperCell([i, j], mineField, j === this._colCount - 1)
            }
        }
        console.log(document.getElementById(mineField))
    }



    mouseLeftClicked(index) {
        if (this._isFirstClick === true) {
            this._isFirstClick = false;
            let mineCoords = this.randomiseMines(index)
            this.calculateSurroundingMineCount(mineCoords)
            this.f
        }
        if (!this._isGameEnded)
        this.clickOnFieldPoint(index)
    }



    randomiseMines(firstClickedCell) {
        let tempCoord;
        let mineCoords = [];
        for (let i = 0; i < this._mineCount; i++)              //alna koordináták kisorsolása
        {
            tempCoord = [Math.floor((Math.random() * this._colCount)), Math.floor((Math.random() * this._rowCount))];
            let ind = mineCoords.findIndex((coord) => {
                return (coord[0] === tempCoord[0]) && (coord[1] === tempCoord[1]);
            });
            if ((ind === -1) && (!((tempCoord[0] === firstClickedCell[0]) && (tempCoord[1] === firstClickedCell[1])))) {
                mineCoords.push(tempCoord);
                this._cells[tempCoord[0]][tempCoord[1]].setMineTrue();
            } else {
                i--;
            }
        }
        return mineCoords
    }

    calculateSurroundingMineCount(mineCoords) {
        console.log(mineCoords)

        for (let i = 0; i < this._colCount; i++) {
            for (let j = 0; j < this._rowCount; j++) {
                let c = 0;
                let ind = mineCoords.findIndex((coord) => {
                    return (coord[0] === i) && (coord[1] === j);
                });
                if (ind === -1) {
                    for (let k = i - 1; k < i + 2; k++) {
                        for (let l = j - 1; l < j + 2; l++) {
                            if ((k >= 0) && (k < this._colCount) && (l >= 0) && (l < this._rowCount)) {
                                if (!((i === k) && (l === j))) {
                                    let ind2 = mineCoords.findIndex((coord) => {
                                        return (coord[0] === k) && (coord[1] === l);
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

    clickOnFieldPoint([coord1, coord2])                       ///mezőre kattintás eseménye
    {
        let [clickedOn, surroundingMines] = this._cells[coord1][coord2].checkClickedOn()
        if (clickedOn)
        {
            return;
        }
        let survived = this._cells[coord1][coord2].clickHappened();
        if (survived)
        {
            this._correctClickCount++;
            let win = this.checkWin()
            if (!win && surroundingMines === null)
            {
                this.checkSurroundingCells([coord1, coord2])
            }
        }
        else this.gameEnd()

    }

    checkSurroundingCells(coords)                                 //kattintorr mező körüli mezőket vizsgálja meg (mintha azokra is rákattintanánk)
    {
        for (let k=coords[0]-1;k<coords[0]+2;k++)
        {
            for (let l=coords[1]-1;l<coords[1]+2;l++)
            {
                if ((k>=0)&&(k<this._colCount)&&(l>=0)&&(l<this._rowCount))
                    this.clickOnFieldPoint([k,l]);
            }
        }
    }

    checkWin() {

        if (this._correctClickCount === (this._colCount*this._rowCount-this._mineCount))
        {
            this._isGameEnded=true;                                      //akkor van vége a jázéknak, ha a kattintott mezők száma egyenlő a NEM aknás mezők számával
            alert("you win")
            return true
        }
        return false
    }

    gameEnd()
    {
        this._isGameEnded = true;
        alert("you lost")
    }

}
