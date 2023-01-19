// activeDov is the Photoshop file
var activeDoc = app.activeDocument;

// point to the Smart Object layer to update in the existing file
var smartObjLayer = activeDoc.layers[0];

// point to the image to add to smartObjLayer
var imgPath = "path/to/file";
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
