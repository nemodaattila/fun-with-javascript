/**
 * controller for managing camera video stream, creating and saving snapshot
 */
class WebCameraHandler {
    /**
     * WebCameraHandlerView
     * @private
     */
    _view

    /**
     * WebCameraHandlerModel
     * @private
     */
    _model

    /**
     * array of Video filter classes
     * @type {[]} VideoFilter[]
     * @private
     */
    _filters = []

    constructor() {
        if (!WebCameraHandler._instance) {
            WebCameraHandler._instance = this;
            this._view = new WebCameraHandlerView()
            this._model = new WebCameraHandlerModel()
            console.log(this)
        }
        return WebCameraHandler._instance;
    }

    /**
     * resource for streaming the camera recording | navigator.getUserMedia -> stream
     */
    webCamStream;

    /**
     * send html parameters to view for saving
     * @param video html ID for video element
     * @param canvas html ID for canvas element
     * @param filterElement html ID for container element of filters
     * @param videoStartButton html ID for video start/stop button
     * @param filterButton html ID for filter enabling/disabling button
     * @param snapshotButton html ID for snapshot creator button
     * @param saveImgButton html ID for snapshot creator button
     */
    setCtrlButtons(video, canvas, filterElement, videoStartButton, filterButton, snapshotButton, saveImgButton) {
        this._view.setCtrlButtons(video, canvas, filterElement, videoStartButton, filterButton, snapshotButton, saveImgButton)

    }

    /**
     * creates classes for all respective filters (source in model)
     */
    createFilterRanges() {
        for (let key in this._model.filters) {
            this._filters.push(new VideoFilter(key, this._model._filters[key], this._view.filterHtmlElement));
        }
        this.setCtrlActions()
    }

    /**
     * function calls for adding eventListener to buttons
     */
    setCtrlActions() {
        this.addVideoHandling();
        this.addFilterHandling();
        this.addSnapShotHandling();
    }

    /**
     * adds eventListener to video starter/stopper button (onclick)
     */
    addVideoHandling() {
        this._view.videoStartStopButton.addEventListener("click", () =>
        {
            let state = this._view.videoStartStopButton.value;
            if (state === "stop") {
                if (navigator.getUserMedia) {
                    navigator.getUserMedia(
                        {
                            video: true, audio: false
                        },
                        stream => {
                            this._view.startVideo(stream)
                            this.webCamStream = stream.getTracks()[0];
                        },
                        error => {
                            alert("Error: " + error);
                        }
                    )
                }
            } else if (state === "start")
            {
                this._view.stopVideo()
                this.webCamStream.stop();
                this.resetFilters()
            }
        });
    }

    /**
     * adds event listener to the filter enabler/disabler button (onclick)
     */
    addFilterHandling() {
        this._view.filterOnOffButton.addEventListener("click", () => {
            let state = this._view.filterOnOffButton.value;
            if (state === 'off') {
                this._view.displayFilter();
            } else if (state === 'on') {
                this.resetFilters()
            }
        })
    }

    /**
     * hides filters, resets filters to default, sets the style of the video and the image to none
     */
    resetFilters() {
        this._view.hideFilter();
        for (let filter of this._filters) {
            filter.reset();
        }
        this.changeVideoFilter()
    }

    /**
     * add event listener to the snapshot creator button (onclick)
     */
    addSnapShotHandling() {
        this._view.snapShotButton.addEventListener("click", () => {
            this._view.createSnapshot();
        })
    }

    /**
     * queries all filter (VideoFilter) for actual values
     * and set the style of the video to it
     */
    changeVideoFilter() {
        let filterStyle = [];
        for (let filter of this._filters) {
            let value = filter.getActualFilterValue();
            if (value !== undefined) filterStyle.push(value)
        }
        filterStyle = filterStyle.join(" ");
        this._view.setFilterOnVideo(filterStyle)
    }
}

