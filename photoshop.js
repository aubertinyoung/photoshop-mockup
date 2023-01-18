// much of this code is inspired or provided by JJMack:
// https://community.adobe.com/t5/photoshop-ecosystem-discussions/
// batch-replace-smart-objects-v2/m-p/10324546/page/2#M227772

var fs = require("fs");

// activeDov is the Photoshop file
var activeDoc = app.activeDocument;

// point to the Smart Object layer to update in the existing file
var smartObjLayer = activeDoc.layers.filter(
  (item) => item.kind == "LayerKind.SMARTOBJECT"
);

// point to the image to add to smartObjLayer
var imgPath = "path/to/img";
var imageToAdd = new File(imgPath);

psdOpts = new PhotoshopSaveOptions();
psdOpts.embedColorProfile = true;
psdOpts.alphaChannels = true;
psdOpts.layers = true;
psdOpts.spotColors = true;

// images to iteratively add to Smart Object layer
var imgFolder = "path/to/img";
var files = fs.readdirSync(imgFolder);

if (files) {
  for (var i = 0; i < files.length; i++) {
    smartObjLayer = replaceContents(files, smartObjLayer);
    var newName = files.name.match(/(.*)\.[^\.]+$/)[1];
    var jpgOpts = new JPEGSaveOptions();
    jpgOpts.quality = 10;
    jpgOpts.embedColorProfile = true;
    jpgOpts.matte = MatteType.NONE;

    var toFile = new File(imgFolder + "/" + newName + ".jpg");
    activeDoc.saveAs(toFile, jpgOpts, true);
  }
}

////// replace contents //////

function replaceContents(newFile, smartObj) {
  app.activeDocument.activeLayer = smartObj;
  var idplacedLayerReplaceContents = stringIDToTypeID(
    "placedLayerReplaceContents"
  );
  var desc3 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  desc3.putPath(idnull, new File(newFile));
  var idPgNm = charIDToTypeID("PgNm");
  desc3.putInteger(idPgNm, 1);
  executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
  return app.activeDocument.activeLayer;
}
