class MineSweeperControlsView {



    get rows() {
        return this._rows.value;
    }

    get cols() {
        return this._cols.value;
    }

    get mineCount() {
        return this._mineCount.value;
    }

    get newGameButton() {
        return this._newGameButton;
    }
    _rows;
    _cols;
    _mineCount;
    _newGameButton;
    // _parent;

    setContainerHTMLElements(rows,cols,mineCount,newGameButton,mineField)
    {
        this._rows = document.getElementById(rows);
        this._cols = document.getElementById(cols);
        this._mineCount = document.getElementById(mineCount);
        this._newGameButton = document.getElementById(newGameButton);

        // this._parent = this._rows.parentNode.parentNode;
        console.dir(this)
    }

}
