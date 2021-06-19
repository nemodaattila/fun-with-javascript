/**
 * model class for VideoFilter
 */
class VideoFilterModel {

    /**
     * string | name of the filter type, eg: sepia
     * @private
     */
    _name

    /**
     * int | maximum value of the filter and the html range
     * @private
     */
    _maxValue;

    /**
     * int | default value of the filter and the html range
     * @private
     */
    _defaultValue;

    /**
     * string | unit measure of the filter eg: sepia-> %, blur ->px
     * @private
     */
    _unit;

    /**
     * int | default value of the filter and the html range
     * @private
     */
    _actualValue;

    get actualValue() {
        return this._actualValue;
    }

    set actualValue(value) {
        this._actualValue = value;
    }

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
        this._actualValue = this._defaultValue
    }

    /**
     * changes the actual value to default value (reset)
     */
    resetActualValue() {
        this._actualValue = this._defaultValue
    }
}
