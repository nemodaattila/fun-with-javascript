/**
 * view for WebCameraHandler
 */

class WebCameraHandlerView {

    /**
     * DOM object | button for starting/stopping video
     * @private
     */
    _videoStartStopButton;

    /**
     * DOM object | button for enabling/disabling filters
     * @private
     */
    _filterOnOffButton;

    /**
     * DOM object | button for creating snapshot
     * @private
     */
    _snapShotButton;

    /**
     * DOM object | button for saving snapshot to storage
     * @private
     */
    _imgSaveButton;

    /**
     * DOM object | video element
     * @private
     */
    _video;

    /**
     * DOM object | canvas element
     * @private
     */
    _canvas;

    /**
     * DOM object | 2d context of the canvas
     * @private
     */
    _context;

    /**
     * DOM object | container html element for filters
     * @private
     */
    _filterHtmlElement

    get filterHtmlElement() {
        return this._filterHtmlElement;
    }

    get videoStartStopButton() {
        return this._videoStartStopButton;
    }

    get filterOnOffButton() {
        return this._filterOnOffButton;
    }

    get snapShotButton() {
        return this._snapShotButton;
    }

    /**
     * setting HTML DOM elements based on ID, all string
     */
    setCtrlButtons(video, canvas, filterElem, vidStart, filterButton, snapshotButton, saveImgButton) {
        this._video = document.getElementById(video);
        this._canvas = document.getElementById(canvas);
        this._context = this._canvas.getContext("2d");
        this._filterHtmlElement = document.getElementById(filterElem)
        this._videoStartStopButton = document.getElementById(vidStart);
        this._filterOnOffButton = document.getElementById(filterButton);
        this._snapShotButton = document.getElementById(snapshotButton);
        this._imgSaveButton = document.getElementById(saveImgButton);

    }

    /**
     * display the video stream on the video HTML element
     * @param stream
     */
    startVideo(stream) {
        this.videoStartStopButton.value = "start";
        this.videoStartStopButton.innerText = "Stop video";
        this._video.srcObject = stream;
        this._filterOnOffButton.disabled = false;
        this._snapShotButton.disabled = false;
    }

    /**
     * stops the video stream, disables HTML elements
     */
    stopVideo() {
        this._snapShotButton.disabled = true;
        this._filterHtmlElement.hidden = true;
        this._filterOnOffButton.disabled = true;
        this._filterOnOffButton.value = "off";
        this._filterOnOffButton.innerText = "Enable filter";
        this._videoStartStopButton.value = "stop";
        this._videoStartStopButton.innerText = "Start video";
    }

    /**
     * displays the contents of filter container
     */
    displayFilter() {
        this.filterHtmlElement.hidden = false;
        this.filterOnOffButton.value = "on";
        this.filterOnOffButton.innerText = "Disable Filter";

    }

    /**
     * hides the content of the filter container, resets the style of the video and context element
     */
    hideFilter() {
        this._canvas.style.filter = "";
        this._context.filter = "";
        this._filterHtmlElement.hidden = true;
        this._filterOnOffButton.value = "off";
        this._filterOnOffButton.innerText = "Enable filter";
    }

    /**
     * sets the style of the video and the context element
     * @param filterData string | style parameters
     */
    setFilterOnVideo(filterData) {
        this._video.style.filter = '';
        if (filterData === '')
            filterData = 'none'
        this._video.style.filter = filterData;
        this._context.filter = filterData
    }

    /**
     * create a snapshot of the video, displays it in canvas context
     */
    createSnapshot() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);
        this._imgSaveButton.disabled = false;
        this._imgSaveButton.firstChild.href = this._canvas.toDataURL('image/png');
    }
}
