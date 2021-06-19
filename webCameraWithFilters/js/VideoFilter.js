/**
 * controller class for Video filter, for example: sepia, contrast
 */
class VideoFilter {
    /**
     * VideoFilterModel
     * @private
     */
    _model

    /**
     * VideoFilterView
     * @private
     */
    _view

    constructor(name, data, container) {
        this._model = new VideoFilterModel(name, data);
        this._view = new VideoFilterView(container, this._model)
        this.addEventToFilters()
    }

    /**
     * add event on html range change, saves the new value, calls WebCamHandler function
     */
    addEventToFilters() {
        this._view.filter.addEventListener("input", () => {
            this._model.actualValue = parseInt(this._view.filter.value);
            new WebCameraHandler().changeVideoFilter();
        })
    }

    /**
     * returns the actual value of the filter (with name and unit measure) eg.: blur(2px)
     * only when defaultValue not equals actualValue (then null)
     * @returns {string | null}
     */
    getActualFilterValue() {
        if (parseInt(this._model.defaultValue) !== parseInt(this._model.actualValue)) {
            return this._model.name + "(" + this._model.actualValue + this._model.unit + ")"
        }
    }

    /**
     * resets the actualValue to defaultValue and resets the html change according to it
     */
    reset() {
        this._model.resetActualValue();
        this._view.resetFilterValue(this._model.actualValue)
    }
}
