function importFromCSV() {
  # https://drive.google.com/file/d/1G0SJnhV7_OOQs3amrGqkm9OuSZmwhSOd/view?usp=sharing
  var fileId = '1G0SJnhV7_OOQs3amrGqkm9OuSZmwhSOd';
  var file = DriveApp.getFileById(fileId);
  var csvContent = file.getBlob().getDataAsString();
  
  Logger.log("Raw CSV content:");
  Logger.log(csvContent);
  try {
    var rows = Utilities.parseCsv(csvContent);
    Logger.log("Parsed " + rows.length + " rows");

  } catch (e) {
    Logger.log("Lỗi khi parse CSV: " + e.message);
    Logger.log("Stack trace: " + e.stack);
    return;
  }

  Logger.log("Số hàng parse được: " + rows.length);
  if(rows.length > 0) {
    Logger.log("Header: " + JSON.stringify(rows[0]));
  }

  var form = FormApp.create('hoccc-sauuu');
  form.setIsQuiz(true);
  
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];

    var question = row[0];
    var options = row.slice(1, 8).filter(opt => opt !== "");
    var correctAnswers = row[8].split(";");

    if (correctAnswers.length > 1) {
      var item = form.addCheckboxItem();
    } else {
      var item = form.addMultipleChoiceItem();
    }

    item.setTitle(question)
        .setChoices(options.map(option => item.createChoice(option, correctAnswers.includes(option))))
        .showOtherOption(false);
  }
  
  Logger.log("Form đã được tạo: " + form.getEditUrl());
}
