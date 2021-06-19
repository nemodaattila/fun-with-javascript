/**
 * model class for WebCameraHandler
 */
class WebCameraHandlerModel {

    /**
     * filter source data for the VideoFilter classes to be created
     * format : [(int)default value, (string) unit measure, (int) maxvalue(optional, default 100)]
     * @type {{sepia: [number, string], brightness: [number, string, number], invert: [number, string], saturate: [number, string, number], "hue-rotate": [number, string, number], contrast: [number, string, number], blur: [number, string, number], greyscale: [number, string], opacity: [number, string, number]}}
     * @private
     */
    _filters =
        {
            blur: [0, "px", 25],
            brightness: [100, '%', 200],
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
