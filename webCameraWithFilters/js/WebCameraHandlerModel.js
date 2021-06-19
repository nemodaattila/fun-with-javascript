class WebCameraHandlerModel {

    //default value, label , max
    _filters =
        {
            blur:  [0, "px", 25],
            brightness: [100, '%',200],
            contrast: [100, "%", 300],
            greyscale: [0, "%"],
            'hue-rotate': [0, "deg", 360],
            invert: [0, "%"],
            opacity: [100, "%", 100],
            saturate: [100, "%", 200],
            sepia: [0, "%"],
        }

    get filters() {
        return this._filters;
    }
}
