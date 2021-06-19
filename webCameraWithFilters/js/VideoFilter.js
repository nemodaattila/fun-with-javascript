class VideoFilter {
    _model
    _view

    constructor(name, data, container) {
        this._model = new VideoFilterModel(name, data);
        this._view = new VideoFilterView(container, this._model)
        this.addEventToFilters()
    }

    addEventToFilters() {
        this._view.filter.addEventListener("input",()=>{
            this._model.actualValue=this._view.filter.value;
            new WebCameraHandler().filterChanged();
        })
    }

    getActualFilterValue()
    {

        if (parseInt(this._model.defaultValue) === parseInt(this._model.actualValue))
        {
            return;
        }
        else
        {
            return this._model.name+"("+this._model.actualValue + this._model.unit +")"
        }
    }

    reset()
    {
        this._model.resetActualValue();
        this._view.resetFilterValue(this._model.actualValue)
    }
}
