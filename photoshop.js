// variables to change

// activeDov is the Photoshop file
var activeDoc = app.activeDocument;

// VARIABLES TO CHANGE //
// Point to the Photoshop layer that is your SmartObject
var smartObjLayer = activeDoc.layers[0];
if (smartObjLayer.kind != "LayerKind.SMARTOBJECT")
  alert("Oops, that is not a Smart Object.");
// Point to the file to add into the Smart Object.
// If you have a folder with multiple images, you can loop through the folder and iteratively set imgPath to image[i],
// where image is an array of images in your folder.
var imgPath = "path/to/file";
//

var myFile = new File(imgPath);

if (smartObjLayer.kind == "LayerKind.SMARTOBJECT") {
  psdOpts = new PhotoshopSaveOptions();
  psdOpts.embedColorProfile = true;
  psdOpts.alphaChannels = true;
  psdOpts.layers = true;
  psdOpts.spotColors = true;
  smartObjLayer = replaceContents(myFile, smartObjLayer);

  var jpgOpts = new JPEGSaveOptions();
  jpgOpts.quality = 10;
  jpgOpts.embedColorProfile = true;
  jpgOpts.matte = MatteType.NONE;

  var toFile = new File(imgPath + "_photoshop");
  activeDoc.saveAs(toFile, jpgOpts, true);

  function replaceContents(newFile, theSO) {
    app.activeDocument.activeLayer = theSO;
    var idplacedLayerReplaceContents = stringIDToTypeID(
      "placedLayerReplaceContents"
    );
    var desc244 = new ActionDescriptor();
    desc244.putPath(charIDToTypeID("null"), new File(newFile));
    executeAction(idplacedLayerReplaceContents, desc244, DialogModes.NO);
    return app.activeDocument.activeLayer;
  }
}
