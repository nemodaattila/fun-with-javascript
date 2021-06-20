class CanvasClockModel {
    _timeInText;
    _timeInArray;
    _clockHandLength=100;
    _clockMarkerData=[];

    get clockMarkerData() {
        return this._clockMarkerData;
    }
    get clockHandLength() {
        return this._clockHandLength;
    }
    get timeInText() {
        return this._timeInText;
    }

    get timeInArray() {
        return this._timeInArray;
    }




    constructor() {
        this.calculateClockMarkerData()
    }


    calculateClockMarkerData()
    {
        for (let beta=0;beta<360;beta+=6)
        {
            this._clockMarkerData.push({coordinates: MathHelper.countHypotenuseCoordsInTriangle(beta, this.clockHandLength),markerStart:(beta%5===0?0.8:0.9)})
        }
    }

    calculateDataForClock(actualTime)
    {
        this._timeInText=actualTime.toLocaleTimeString();
        this._timeInArray=(actualTime.toLocaleTimeString().split(":"));
        this._timeInArray.map(value => value = parseInt(value))
        // for (let key in this._timeInArray){
        //     acttime[key]=parseInt(acttime[key]);
        // }
        console.log(this._timeInArray)
        this._timeInArray[2]*=6;
        this._timeInArray[1]=this._timeInArray[1]*6+(this._timeInArray[2]/60);
        if (this._timeInArray[0]>12) this._timeInArray[0]-=12;
        this._timeInArray[0]=this._timeInArray[0]*30+this._timeInArray[1]/12;



        // this._timeInArray.map(value => value = this.countAngle(value))
        console.log(this._timeInArray)
        for (let key in this._timeInArray)
        {
            this._timeInArray[key]=MathHelper.countHypotenuseCoordsInTriangle(this._timeInArray[key],this.clockHandLength);
        }
    }

    
}
