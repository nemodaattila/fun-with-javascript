/**
 * view for CanvasClock
 */
class CanvasClockView {

    /**
     * DOM Object | html element for canvas
     * @private
     */
    _canvas;

    /**
     * DOM Object | 2d context for _canvas
     * @private
     */
    _context;

    /**
     * colors of the hands of the clock (hour, minute, second)
     * @type {string[]}
     * @private
     */
    _handColor = ["green", "red", "black"];

    /**
     * line width of the hands of the clock (hour, minute, second)
     * @type {int[]}
     * @private
     */
    _handWidth = [3, 2, 1]

    /**
     * creates the canvas DOM object and sets the 2d context
     * @param htmlID
     */
    setCanvas(htmlID) {
        this._canvas = document.getElementById(htmlID)
        this._context = this._canvas.getContext("2d")
    }

    /**
     * sets the starter values of the canvas context
     */
    startPaint() {
        this._context.save();
        this._context.translate(200, 200);
    }

    /**
     * clears the canvas context, and calls displayer function for the parts of the clock
     * @param model CanvasClockModel
     */
    paintClock(model) {
        this._context.clearRect(-200, -200, this._canvas.width, this._canvas.height);
        this.paintClockFrame(model.clockMarkerData)
        this.drawTimeInText(model.timeInText)
        this.drawClockHands(model)
    }

    /**
     * paints the perimeter of clock - circular perimeter line and minute markers
     * @param markerData array 60 minute markers from model
     */
    paintClockFrame(markerData) {
        for (let {'coordinates': coordinates, 'markerStart': markerStart} of markerData) {
            this._context.beginPath();
            this._context.strokeStyle = "black";
            this._context.lineWidth = 1;
            this._context.moveTo(coordinates[0] * markerStart, coordinates[1] * markerStart);
            this._context.lineTo(coordinates[0], coordinates[1]);
            this._context.stroke();
            this._context.closePath();
        }
        this._context.beginPath();
        this._context.strokeStyle = "black";
        this._context.lineWidth = 1;
        this._context.arc(0, 0, 100 * 1.1, 0, 2 * Math.PI);
        this._context.stroke();
        this._context.closePath();
    }

    /**
     * draws the hands of the clock (3)
     * @param model CanvasClockModel
     */
    drawClockHands(model)
    {
        model.timeInArray.map((value, key)=>
        {
            this._context.beginPath();
            this._context.strokeStyle = this._handColor[key];
            this._context.lineWidth = this._handWidth[key];
            this._context.moveTo(0, 0);
            this._context.lineTo(value[0], value[1]);
            this._context.stroke();
            this._context.closePath();
        })

        for (let key in model.timeInArray) {


        }

    }

    /**
     * displays the time as text
     * @param timeInText string time
     */
    drawTimeInText(timeInText) {
        this._context.beginPath();
        this._context.font = "30pt Arial";
        let timeWidth = this._context.measureText(timeInText).width;
        timeWidth = 0 - timeWidth;
        this._context.fillText(timeInText, timeWidth / 2, -150);
        this._context.closePath();
    }
}
