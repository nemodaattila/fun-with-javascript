class MineSweeperControlsView {

    /**
     * DOM Object - input element for setting row number
     * @private
     */
    _rowInput;

    /**
     * DOM Object - input element for setting column number
     * @private
     */
    _columnInput;

    /**
     * DOM Object - input element for setting mine number
     * @private
     */
    _mineCountInput;

    /**
     * DOM Object - element for setting new game button
     * @private
     */
    _newGameButton;

    get rowInput() {
        return this._rowInput;
    }

    get columnInput() {
        return this._columnInput;
    }

    get mineCountInput() {
        return this._mineCountInput;
    }

    get newGameButton() {
        return this._newGameButton;
    }

    /**
     * setting HTML element based in html ID attribute
     * @param rowInput string - html id of row input element
     * @param columnInput  string - html id of column input element
     * @param mineCountInput string - html id of mine input element
     * @param newGameButton string - html id of new game button element
     */
    setContainerHTMLElements(rowInput, columnInput, mineCountInput, newGameButton) {
        this._rowInput = document.getElementById(rowInput);
        this._columnInput = document.getElementById(columnInput);
        this._mineCountInput = document.getElementById(mineCountInput);
        this._newGameButton = document.getElementById(newGameButton);
    }

    /**
     * empties the player field based on html ID
     * @param mineField string - html id
     */
    emptyFieldContainer(mineField) {
        mineField = document.getElementById(mineField)
        while (mineField.firstChild) {
            mineField.removeChild(mineField.lastChild);
        }
    }

}
