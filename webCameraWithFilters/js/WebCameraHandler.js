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
        // this.addSnapShotHandling();
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
                console.log(this)
                this._view.hideFilter();
            }
        })
    }

    static addSnapShotHandling()
    {
        this.controllerElements['buttons'][2].addEventListener("click",()=> {
            this.view.createSnapshot();
        })
    }


}

