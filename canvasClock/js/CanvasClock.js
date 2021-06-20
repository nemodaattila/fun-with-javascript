/**
 * controller for displaying a clock on a canvas
 */

class CanvasClock {
    /**
     * pointer for animation (requestAnimationFrame)
     */
    timer;

    /**
     * CanvasClockModel
     * @private
     */
    _model

    /**
     * canvasClockView
     * @private
     */
    _view

    constructor() {
        this._model = new CanvasClockModel()
        this._view = new CanvasClockView()
    }

    /**
     * sets the view's container html element, calls animation start
     * @param htmlElement string - id of the html container element
     */
    setCanvas(htmlElement) {
        this._view.setCanvas(htmlElement);
        this.startPaint()
    }

    /**
     * starts the animation
     */
    startPaint() {
        this._view.startPaint();
        this.timer = requestAnimationFrame(() => this.countDataForClock())
    }

    /**
     * passes Date() to model to calculate clock hand coordinates,
     * passes model to view to display clock
     */
    countDataForClock() {
        this._model.calculateDataForClock(new Date());
        this._view.paintClock(this._model)
        this.timer = requestAnimationFrame(() => this.countDataForClock())
    }
}
