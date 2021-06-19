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
        console.log(this)
    }

    createFilterRanges(filters)
    {
        console.log(filters)
        console.dir(this.filterOnOffButton)
        let elem;
        let fdiv;
        for (let key in filters[0])         //filterek megjelenítése
        {
            fdiv=document.createElement("div");
            this.filterHtmlElem.appendChild(fdiv);
            let text=document.createTextNode(filters[0][key]+": " + filters[1][key][0]+filters[1][key][3]);
            fdiv.appendChild(text);
            elem=document.createElement("input");
            elem.type="range";
            elem.className="filterrange";
            elem.min=filters[1][key][0];
            elem.max=filters[1][key][1];
            elem.defaultValue=filters[1][key][2];
            fdiv.appendChild(elem);
            this.filterRanges.push(elem)
            // elem.addEventListener("input",setFilter);
            text=document.createTextNode(" " + filters[1][key][1]+filters[1][key][3]);
            fdiv.appendChild(text);
        }
        return this.filterRanges;
    }



    getVideoState()
    {
        return this.videoStartStopButton.value;
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

    startFilter(filters)
    {
        this.filterHtmlElem.hidden=false;
        this.filterOnOffButton.value="on";
        this.filterOnOffButton.innerText="Szúrő kikapcsol";

    }

    stopFilter(filterData)
    {

        for (let i=0;i< this.filterRanges.length;i++)
        {
            this.filterRanges[i].value=filterData[1][i][2]
        }
        this.setFilterOnVideo(filterData)

        this.canvas.style = "";
        this.filterHtmlElem.hidden=true;
        this.filterOnOffButton.value="off";
        this.filterOnOffButton.innerText="Szúrő bekapcsol";
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
