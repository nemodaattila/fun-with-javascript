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

    getFilterState()
    {
        return this.filterOnOffButton.value;
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
        this._filterHtmlElement.innerHTML="";
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
        this._filterOnOffButton.innerText="Szúrő bekapcsol";
    }

    setFilterOnVideo(filterData)
    {

        this.video.style.filter="";
        let tempFilter=[];

        for (let i=0;i< this.filterRanges.length;i++)
        {
            if (this.filterRanges[i].value!=filterData[1][i][2])
                tempFilter.push(filterData[0][i] + "("+this.filterRanges[i].value+filterData[1][i][3]+")");
        }
        tempFilter=tempFilter.join(" ");
        if (tempFilter.length==0) tempFilter="";
        this.video.style.filter=tempFilter;
        this.context.filter=tempFilter
    }

    createSnapshot()
    {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.context.drawImage(this.video,0,0,this.canvas.width,this.canvas.height);
        this.imgSaveButton.disabled=false;
        this.imgSaveButton.firstChild.href=this.canvas.toDataURL('image/png');
        }
}
