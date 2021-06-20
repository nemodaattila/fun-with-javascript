/**
 * view for CanvasClock
 */
class CanvasClockView{

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
    _handColor = ["green","red","black"];

    /**
     * line width of the hands of the clock (hour, minute, second)
     * @type {string[]}
     * @private
     */
    _handWidth = [3,2,1]

    /**
     *
     * @param htmlID
     */
    setCanvas(htmlID)
    {
        this._canvas=document.getElementById(htmlID)
        this._context= this._canvas.getContext("2d")
        console.dir(this._canvas)
        this._summary = this._canvas.previousElementSibling;
    }

    getIsParentOpen()
    {
        return this._canvas.parentNode.open;
    }

    startPaint()
    {
        this._context.save();
        this._context.translate(200,200);
    }

    stopPaint()
    {
        this._context.restore();
    }

    paintClock(model)
    {
        this._context.clearRect(-200, -200, this._canvas.width, this._canvas.height);

        this.paintClockFrame(model.clockMarkerData)
        this.drawTimeInText(model.timeInText)
        this.drawClockHands(model)
    }

    paintClockFrame(markerData)
    {

        for (let {'coordinates': coordinates, 'markerStart': markerStart} of markerData)
        {
            this._context.beginPath();
            this._context.strokeStyle="black";
            this._context.lineWidth=1;
            this._context.moveTo(coordinates[0]*markerStart,coordinates[1]*markerStart);
            this._context.lineTo(coordinates[0],coordinates[1]);
            this._context.stroke();
            this._context.closePath();
        }

        this._context.beginPath();
        this._context.strokeStyle="black";
        this._context.lineWidth=1;
        this._context.arc(0, 0, 100*1.1, 0, 2 * Math.PI);
        this._context.stroke();
        this._context.closePath();
    }

    drawClockHands(model)                            //óramutatók megrajzolása
    {
            console.log(model.timeInArray)

        for (let key in model.timeInArray)
        {
            this._context.beginPath();
            this._context.strokeStyle=this._handColor[key];
            this._context.lineWidth=this._handWidth[key];
            this._context.moveTo(0,0);
            this._context.lineTo(model.timeInArray[key][0],model.timeInArray[key][1]);

            this._context.stroke();
            this._context.closePath();
        }

    }


    drawTimeInText(timeInText) {
        this._context.beginPath();
        this._context.font="30pt Arial";

        let twidth= this._context.measureText(timeInText).width;
        twidth=0-twidth;
        this._context.fillText(timeInText,twidth/2,-150);
        this._context.closePath();
    }
}
