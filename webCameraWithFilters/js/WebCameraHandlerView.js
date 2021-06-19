class WebCameraHandlerView {
    _videoStartStopButton;
    _filterOnOffButton;
    _snapShotButton;
    _imgSaveButton;
    _video;
    _canvas;
    _context;
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

    setCtrlButtons(video,canvas,filterElem, vidStart,filterbutton, snapshotbutton, saveimgbutton)
    {
        this._video = document.getElementById(video);
        this._canvas = document.getElementById(canvas);
        this._context=this._canvas.getContext("2d");
        this._filterHtmlElement =  document.getElementById(filterElem)
        this._videoStartStopButton = document.getElementById(vidStart);
        this._filterOnOffButton = document.getElementById(filterbutton);
        this._snapShotButton = document.getElementById(snapshotbutton);
        this._imgSaveButton= document.getElementById(saveimgbutton);
    }



    startVideo(stream)
    {
        this.videoStartStopButton.value="start";
        this.videoStartStopButton.innerText="Stop video";
        this._video.srcObject=stream;
        this._filterOnOffButton.disabled=false;
        this._snapShotButton.disabled=false;
    }

    stopVideo()
    {
        this._snapShotButton.disabled=true;
        this._filterHtmlElement.hidden=true;
        this._filterOnOffButton.disabled=true;
        this._filterOnOffButton.value="off";
        this._filterOnOffButton.innerText="Enable filter";
        this._videoStartStopButton.value="stop";
        this._videoStartStopButton.innerText="Start video";
    }

    displayFilter()
    {
        this.filterHtmlElement.hidden=false;
        this.filterOnOffButton.value="on";
        this.filterOnOffButton.innerText="Disable Filter";

    }

    hideFilter()
    {

        // for (let i=0;i< this.filterRanges.length;i++)
        // {
        //     this.filterRanges[i].value=filterData[1][i][2]
        // }
        // this.setFilterOnVideo(filterData)

        this._canvas.style = "";
        this._filterHtmlElement.hidden=true;
        this._filterOnOffButton.value="off";
        this._filterOnOffButton.innerText="Enable filter";
    }

    setFilterOnVideo(filterData)
    {
        this._video.style.filter='';
        console.log(filterData)
        console.log(this._video)
        this._video.style.filter=filterData;
        this._context.filter=filterData
    }

    createSnapshot()
    {
        this._context.clearRect(0,0,this._canvas.width,this._canvas.height);
        this._context.drawImage(this._video,0,0,this._canvas.width,this._canvas.height);
        this._imgSaveButton.disabled=false;
        this._imgSaveButton.firstChild.href=this._canvas.toDataURL('image/png');
    }
}
