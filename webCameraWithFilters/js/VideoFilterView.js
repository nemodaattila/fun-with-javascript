/**
 * view class for VideoFilter
 */
class VideoFilterView {

    /**
     * html input range element for setting filter
     * @private
     */
    _filter

    get filter() {
        return this._filter;
    }

    constructor(container, model) {
        this.createFilterElement(container, model);
    }

    /**
     * creates the filter html range input element
     * @param container DOM Object | container for the filter
     * @param model VideoFilterModel data for the filter
     */
    createFilterElement(container, model) {
        let fDiv = document.createElement("div");
        container.appendChild(fDiv);
        let text = document.createTextNode(model.name + ": 0" + model.unit);
        fDiv.appendChild(text);
        this._filter = document.createElement("input");
        this._filter.type = "range";
        this._filter.className = "filterRange";
        this._filter.min = 0;
        this._filter.max = model.maxValue;
        this._filter.defaultValue = model.defaultValue;
        fDiv.appendChild(this._filter);
        text = document.createTextNode(" " + model.maxValue + model.unit);
        fDiv.appendChild(text);
    }

    /**
     * resets the filter to the given value
     * @param value int | value to be resetted to
     */
    resetFilterValue(value) {
        this._filter.value = value
    }

}
