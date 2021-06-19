class VideoFilter
{
        _model
        _view
        constructor(name, data, container) {
             this._model = new VideoFilterModel(name, data);
             this._view = new VideoFilterView(container, this._model)
        }
}
