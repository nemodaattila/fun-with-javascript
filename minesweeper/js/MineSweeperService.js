class MineSweeperService {

    _cells=[];

    constructor(mineField, rowCount, colCount, mineCount) {
        this.createCells(mineField, rowCount, colCount, mineCount)
    }

    createCells(mineField, rowCount, colCount, mineCount) {
        this._cells=[];
          for (let i = 0; i<rowCount; i++)
          {
              for (let j = 0; j<colCount; j++)
              {
                this._cells[i][j]=new MineSweeperCell([i,j],mineField)
              }

          }
    }
}
