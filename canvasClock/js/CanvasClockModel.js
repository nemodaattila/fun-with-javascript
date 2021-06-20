/**
 * model for CanvasClock
 */
class CanvasClockModel {

    /**
     * string | time in text format -> 11:22:33
     * @private
     */
    _timeInText;

    /**
     * array | time in array format ->[11,22,33]
     * @private
     */
    _timeInArray;

    /**
     * length of the hands of the clock
     * @type {number}
     * @private
     */
    _clockHandLength = 100;

    /**
     * array | data for the minute markers at the perimeter of the clock | format: {[coordinateX, coordinateY], marker length}[]
     * @type {[]}
     * @private
     */
    _clockMarkerData = [];

    get clockMarkerData() {
        return this._clockMarkerData;
    }

    get clockHandLength() {
        return this._clockHandLength;
    }

    get timeInText() {
        return this._timeInText;
    }

    get timeInArray() {
        return this._timeInArray;
    }

    constructor() {
        this.calculateClockMarkerData()
    }

    /**
     * calculates data for the minute markers at the perimeter of the clock (60 - one for every minute) | format: {[coordinateX, coordinateY], marker length}[]
     */
    calculateClockMarkerData() {
        for (let beta = 0; beta < 360; beta += 6) {
            this._clockMarkerData.push({
                coordinates: MathHelper.countHypotenuseCoordsInTriangle(beta, this.clockHandLength),
                markerStart: (beta % 5 === 0 ? 0.8 : 0.9)
            })
        }
    }

    /**
     * calculates coordinates for clock hands based on actual time
     * @param actualTime DateTime | actual time
     */
    calculateDataForClock(actualTime) {
        this._timeInText = actualTime.toLocaleTimeString();
        this._timeInArray = (actualTime.toLocaleTimeString().split(":"));
        this._timeInArray.map(value => parseInt(value))
        this._timeInArray[2] *= 6;
        this._timeInArray[1] = this._timeInArray[1] * 6 + (this._timeInArray[2] / 60);
        if (this._timeInArray[0] > 12) this._timeInArray[0] -= 12;
        this._timeInArray[0] = this._timeInArray[0] * 30 + this._timeInArray[1] / 12;
        this._timeInArray = this._timeInArray.map(value => {
            return MathHelper.countHypotenuseCoordsInTriangle(value, this.clockHandLength)
        })
    }
}
