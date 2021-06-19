class VideoFilterModel {
    _name
    _maxValue;
    _defaultValue;
    _unit;

    get name() {
        return this._name;
    }

    get defaultValue() {
        return this._defaultValue;
    }

    get unit() {
        return this._unit;
    }

    get maxValue() {
        return this._maxValue;
    }

    constructor(name, [defaultValue, unit, maxValue = 100]) {
        this._name = name
        this._defaultValue = defaultValue
        this._unit = unit
        this._maxValue = maxValue
    }
}
