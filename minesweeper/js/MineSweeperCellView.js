/**
 * view for the MineSweeperCell controller
 */
class MineSweeperCellView {

    /**
     * container DOM Object -  HtmlElement
     * @private
     */
    _cellElement

    get cellElement() {
        return this._cellElement;
    }

    constructor(parent, addBr) {
        this._cellElement = document.createElement("span");
        this._cellElement.className = "mSCell";
        parent.appendChild(this._cellElement)
        if (addBr) parent.appendChild(document.createElement("br"));
    }

    /**
     * in case of middle mouse button click , changes the style of the view, therefore the displayed icon:
     * question mark, flag, or none
     */
    changeIcon() {
        if (this._cellElement.className === "mSCell") {
            this._cellElement.className = "mSCell flag";
        } else if (this._cellElement.className === "mSCell flag") {
            this._cellElement.className = "mSCell question";
        } else if (this._cellElement.className === "mSCell question") {
            this._cellElement.className = "mSCell";
        }
    }

    /**
     * displays the mine icon, if the cells contains a mine
     */
    displayMine() {
        this._cellElement.className = "mSCell mine";
    }

    /**
     * if the cells doesn't contains a mine:
     * if there are surrounding mines the color of the cell will be green, and will display the count of this
     * if there aren't the color of cell will be gray
     * @param count the count of surrounding mines
     */
    displayClickResult(count) {
        this._cellElement.className = "mSCell";
        if (count === null) {
            this._cellElement.style.backgroundColor = "grey";
        }
        if (count > 0) {
            this._cellElement.style.backgroundColor = "green";
            this._cellElement.innerHTML = count;
        }
    }
}
