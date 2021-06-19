class VideoFilterView {
    _filter

    get filter() {
        return this._filter;
    }

    constructor(container, model) {
        this.createFilterElement(container, model);
    }

    createFilterElement(container, model) {
        let fdiv=document.createElement("div");
        container.appendChild(fdiv);
        let text=document.createTextNode(model.name+": 0" +model.unit);
        fdiv.appendChild(text);
        this._filter=document.createElement("input");
        this._filter.type="range";
        this._filter.className="filterRange";
        this._filter.min=0;
        this._filter.max=model.maxValue;
        this._filter.defaultValue=model.defaultValue;
        fdiv.appendChild(this._filter);
        // elem.addEventListener("input",setFilter);
        text=document.createTextNode(" " + model.maxValue+model.unit);
        fdiv.appendChild(text);
    }

    resetFilterValue(value)
    {
        this._filter.value = value
    }

}
