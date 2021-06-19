class VideoFilterModel {
    _name
    _maxValue;
    _defaultValue;
    _unit;

    constructor(name, [defaultValue, unit, maxValue = 100]) {
        this._name = name
        this._defaultValue = defaultValue
        this._unit = unit
        this._maxValue = maxValue
    }
}
