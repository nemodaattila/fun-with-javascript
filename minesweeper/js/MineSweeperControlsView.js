class MineSweeperControlsView {

    _rows;
    _cols;
    _mineCount;
    _newGameButton;

    get rows() {
        return this._rows;
    }

    get cols() {
        return this._cols;
    }

    get mineCount() {
        return this._mineCount;
    }

    get newGameButton() {
        return this._newGameButton;
    }

    setContainerHTMLElements(rows,cols,mineCount,newGameButton,mineField)
    {
        this._rows = document.getElementById(rows);
        this._cols = document.getElementById(cols);
        this._mineCount = document.getElementById(mineCount);
        this._newGameButton = document.getElementById(newGameButton);
    }

    emptyFieldContainer(mineField)
    {
        mineField = document.getElementById(mineField)
        while (mineField.firstChild) {
            console.log(mineField.firstChild)
            mineField.removeChild(mineField.lastChild);
        }
    }

}
