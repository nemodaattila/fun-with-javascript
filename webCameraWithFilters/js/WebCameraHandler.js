class WebCameraHandler{
    _view
    _model
    _filters

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

        }
    }

    static setCtrlActions()
    {
        this.addVideoHandling();
        this.addFilterHandling();
        this.addSnapShotHandling();
    }

    static addVideoHandling()
    {

        this.controllerElements['buttons'][0].addEventListener("click",()=>                //stream elinditása
        {
            let state = this.view.getVideoState()
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
                            this.view.startVideo(stream)
                            this.webCamStream=stream.getTracks()[0];
                        },
                        error=>
                        {
                            alert("Hiba: " + error);
                        }
                    )
                }
            }
            else if (state=="start")             //stream leállítása
            {
                this.view.stopVideo()
                this.webCamStream.stop();
            }
        });
    }

    static addFilterHandling()
    {
        for (let key of this.controllerElements['filter'])
        {
            key.addEventListener("input", () => this.view.setFilterOnVideo(this.model.getFilterData()))
        }


        this.controllerElements['buttons'][1].addEventListener("click",()=> {
            console.log(this.controllerElements['buttons'][1])
            let state = this.view.getFilterState()
            console.log(state);
            if (state === 'off') {
                 this.view.startFilter();

            }
            else if (state === 'on')
            {
                console.log(this)
                this.view.stopFilter(this.model.getFilterData());
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

