class CanvasClock
{
    timer;
    _model
    _view

    constructor() {
        this._model = new CanvasClockModel()
        this._view = new CanvasClockView()
    }

    setCanvas(htmlElement)
    {
        this._view.setCanvas(htmlElement);
        this.startPaint()
    }

    startPaint()
    {
        this._view.startPaint();
        this.timer = requestAnimationFrame(() => this.countDataForClock())
    }

    // addEventToSummary()
    // {
    //     let summary = this.view.summary
    //     summary.addEventListener("click",()=>
    //     {
    //         let isOpen = this.view.getIsParentOpen()
    //
    //         if (!isOpen)
    //         {
    //             this.view.startPaint();
    //             this.timer = requestAnimationFrame(() => this.countDataForClock())
    //         }
    //         else
    //         {   this.view.stopPaint()
    //             if (this.timer) cancelAnimationFrame(this.timer)
    //         }
    //     })
    //
    // }

    countDataForClock()
    {
        this._model.calculateDataForClock(new Date());
        this._view.paintClock(this._model)
        // this.view.paintClockFrame();
        // this.view.drawClockHands(this.model)
        this.timer = requestAnimationFrame(() => this.countDataForClock())
    }


}


