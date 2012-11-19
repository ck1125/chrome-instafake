
function errorHandler(e) {
  console.error(e);
}

function displayPath(fileEntry) {
  chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
    document.querySelector('#file_path').value = path;
  });
}

function readFileEntry(fileEntry, callback) {
  fileEntry.file(function(file) {
    var reader = new FileReader();

    reader.onerror = errorHandler;
    reader.onload = function(e) {
      callback(e.target.result);
    };

    reader.readAsDataURL(file);
  });
}

function writeFileEntry(writableEntry, opt_blob, callback) {
  if (!writableEntry) {
    output.textContent = 'Nothing selected.';
    return;
  }

  writableEntry.createWriter(function(writer) {

    writer.onerror = errorHandler;
    writer.onwriteend = callback;

    // If we have data, write it to the file. Otherwise, just use the file we
    // loaded.
    if (opt_blob) {
      writer.write(opt_blob);
    } else {
      chosenFileEntry.file(function(file) {
        writer.write(file);
      });
    }
  }, errorHandler);
}

var chosenFileEntry = null;
var writeFileButton = document.querySelector('#write_file');
var chooseFileButton = document.querySelector('#choose_file');
var saveFileButton = document.querySelector('#save_file');
var output = document.querySelector('output');
var img = document.querySelector('img');


chooseFileButton.addEventListener('click', function(e) {
  var accepts = [{
    extensions: ['jpg','png']
  }];
  chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function(readOnlyEntry) {
    if (!readOnlyEntry) {
      output.textContent = 'No file selected.';
      return;
    }

    chosenFileEntry = readOnlyEntry;

    chosenFileEntry.file(function(file) {
      readFileEntry(readOnlyEntry, function(result) {
        img.src = result;
      });
      // Update display.
      writeFileButton.disabled = false;
      saveFileButton.disabled = false;
	  $('.advisory').css('display','none');
      displayPath(chosenFileEntry);
    });
  });
});


saveFileButton.addEventListener('click', function(e) {
  var config = {type: 'saveFile', suggestedName: chosenFileEntry.name};
  chrome.fileSystem.chooseEntry(config, function(writableEntry) {
    
	var imageData = img.src.split(',');
	var imageDataDecoded = Base64Binary.decode(imageData[1]);

	var mimeType = imageData[0].replace(';base64','');
	mimeType = mimeType.replace('data:','');
	var blob = new Blob([imageDataDecoded], {type: mimeType});
	
    writeFileEntry(writableEntry, blob, function(e) {
      output.textContent = 'Write complete :)';
    });
  });
});

// Support dropping a single file onto this app.
var dnd = new DnDFileController('body', function(data) {
  var item = data.items[0];
  if (!item.type.match('image/*')) {
    output.textContent = "Sorry. That's not an image file.";
    return;
  }

  chosenFileEntry = item.webkitGetAsEntry();
  readFileEntry(chosenFileEntry, function(result) {
    img.src = result;

  });
  // Update display.
  $('.advisory').css('display','none');
  writeFileButton.disabled = false;
  saveFileButton.disabled = false;
  displayPath(chosenFileEntry);

});
