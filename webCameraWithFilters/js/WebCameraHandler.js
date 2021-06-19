class WebCameraHandler{
    _view
    _model
    _filters =[]

    constructor() {
        if (!WebCameraHandler._instance) {
            WebCameraHandler._instance = this;
            this._view = new WebCameraHandlerView()
            this._model = new WebCameraHandlerModel()
            console.log(this)
        }
        return WebCameraHandler._instance;
    }

    webCamStream;

    init()
    {
        navigator.getUserMedia=(navigator.getUserMedia)||(navigator.webkitGetUserMedia)||(navigator.mozGetUserMedia)||
            (navigator.msGetUserMedia)||(navigator.oGetUserMedia);
    }


    setCtrlButtons(video,canvas, filterElement, videoStartButton,filterButton, snapshotButton, saveImgButton)
    {
        this._view.setCtrlButtons(video,canvas, filterElement, videoStartButton,filterButton, snapshotButton, saveImgButton)
        this.createFilterRanges();
        this.setCtrlActions()
    }

    createFilterRanges() {
        for (let key in this._model.filters)
        {
            this._filters.push(new VideoFilter(key, this._model._filters[key], this._view.filterHtmlElement));
        }
    }

    setCtrlActions()
    {
        this.addVideoHandling();
        this.addFilterHandling();
        this.addSnapShotHandling();
    }

    addVideoHandling()
    {

        this._view.videoStartStopButton.addEventListener("click",()=>                //stream elinditása
        {
            let state = this._view.videoStartStopButton.value;
            console.log(state)
            if (state==="stop")
            {
                if (navigator.getUserMedia)
                {
                    navigator.getUserMedia(
                        {
                            video:true,audio:false
                        },
                        stream=>
                        {
                            this._view.startVideo(stream)
                            this.webCamStream=stream.getTracks()[0];
                        },
                        error=>
                        {
                            alert("Hiba: " + error);
                        }
                    )
                }
            }
            else if (state==="start")             //stream leállítása
            {
                this._view.stopVideo()
                this.webCamStream.stop();
                this.resetFilters()
            }
        });
    }

    addFilterHandling()
    {
        // for (let key of this.controllerElements['filter'])
        // {
        //     key.addEventListener("input", () => this.view.setFilterOnVideo(this.model.getFilterData()))
        // }

        this._view.filterOnOffButton.addEventListener("click",()=> {
            let state = this._view.filterOnOffButton.value;
            console.log(state);
            if (state === 'off') {
                 this._view.displayFilter();

            }
            else if (state === 'on')
            {
                this.resetFilters()
            }
        })
    }

    resetFilters()
    {
        this._view.hideFilter();
        for (let filter of this._filters)
        {
            filter.reset();
        }
        this.filterChanged()
    }

    addSnapShotHandling()
    {
        this._view.snapShotButton.addEventListener("click",()=> {
            this._view.createSnapshot();
        })
    }

    filterChanged() {
        let filterStyle=[];
        for (let filter of this._filters)
        {
            let value = filter.getActualFilterValue();
            console.log(value)
            if (value !== undefined) filterStyle.push(value)
        }
        filterStyle = filterStyle.join(" ");
        this._view.setFilterOnVideo(filterStyle)
    }
}

