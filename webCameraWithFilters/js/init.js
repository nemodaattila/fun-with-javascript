/**
 * initiates WebCameraHandler controller, sets parameters
 * @type {WebCameraHandler}
 */

let vch = new WebCameraHandler();
vch.setCtrlButtons("camVideo", "imageCanvas", "filterDiv", "webcamStartStop", "webcamFilter", "createSnapshot", "saveSnapshot");
vch.createFilterRanges()
