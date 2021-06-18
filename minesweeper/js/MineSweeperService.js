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
    _mouseDownIndex;
    _mouseUpIndex;

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

    mouseDownOnCell(index) {
        this._mouseDownTime = new Date().valueOf();
        this._mouseDownIndex = index
    }

    mouseUpOnCell(index) {
        this._mouseUpTime = new Date().valueOf();
        this._mouseUpIndex = index
        if (this._mouseDownIndex === this._mouseUpIndex) {
            if (this._isFirstClick === true) {
                this._isFirstClick = false;
                let mineCoords = this.randomiseMines()
                this.calculateSurroundingMineCount(mineCoords)
            }
            this.clickedOnField(index, this._mouseUpTime - this._mouseDownTime > 200)
        }
    }

    clickedOnField(coord, isDouble) {
        console.log([coord, isDouble])
        this.clickResult = [];
        if (!this._isGameEnded) {
            if (isDouble) {
                this._cells[coord[0]][coord[1]].doubleClick();
            }

            if (!isDouble) this.clickOnFieldPoint(coord)
            console.log(this.clickResult)

        }
        return this.clickResult;
    }

    randomiseMines() {
        let tempCoord;
        let mineCoords = [];
        let first = this._mouseDownIndex;
        for (let i = 0; i < this._mineCount; i++)              //alna koordináták kisorsolása
        {
            tempCoord = [Math.floor((Math.random() * this._colCount)), Math.floor((Math.random() * this._rowCount))];
            let ind = mineCoords.findIndex((coord) => {
                return (coord[0] === tempCoord[0]) && (coord[1] === tempCoord[1]);
            });
            if ((ind === -1) && (!((tempCoord[0] === first[0]) && (tempCoord[1] === first[1])))) {
                mineCoords.push(tempCoord);
                this._cells[tempCoord[0]][tempCoord[1]].setMineTrue();
                console.log(this._cells[tempCoord[0]][tempCoord[1]])
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
        if (this._cells[coord1][coord2].clickedOn())
        {
            return;
        }
        console.log('click')
        this.this._cells[coord1][coord2].clickHappened();

        if (ind === -1)                                    //ha nem...
        {
            let ind3 = this.mineCoord.findIndex((coord) =>                     //kattintott mező akna?
            {
                return (coord[0] === fp[0]) && (coord[1] === fp[1]);
            });
            if (ind3 === -1)                                                       //ha nem, kiirja hány akna van körülötte
            {
                this.clickedFieldPoint.push(fp);
                this.clickResult.push([fp, this.mineAround[fp[0]][fp[1]]]);
                if (this.mineAround[fp[0]][fp[1]] == null)                                        //ha egy akna sincs körülötte elszürkíti, és a környező mezőket is metgvizsgálja (mint,ha rákattintanánk)
                {
                    this.showMineAround(fp)
                }
            } else {
                this.isGameEnded = true;
                this.clickResult = "lost";
            }
        }
    }

}
