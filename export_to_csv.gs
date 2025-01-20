function exportToCSV() {
  var form = FormApp.getActiveForm();
  var items = form.getItems();
  
  var csvContent = "Question,Option 1,Option 2,Option 3,Option 4,Option 5,Option 6,Option 7,Correct Answer\n";

  items.forEach(function(item) {
    var question = item.getTitle().replace(",", ".").trim();
    var options = ["", "", "", "", "", "", ""]; // Tối đa 7 đáp án
    var correctAnswers = [];

    if (item.getType() == FormApp.ItemType.MULTIPLE_CHOICE) {
      var choices = item.asMultipleChoiceItem().getChoices();
      choices.forEach(function(choice, index) {
        if (index < options.length) {
          options[index] = choice.getValue().replace(",", ".").trim();
        }
        if (choice.isCorrectAnswer()) {
          correctAnswers.push(choice.getValue().replace(",", ".").trim());
        }
      });
    } else if (item.getType() == FormApp.ItemType.CHECKBOX) {
      var choices = item.asCheckboxItem().getChoices();
      choices.forEach(function(choice, index) {
        if (index < options.length) {
          options[index] = choice.getValue().replace(",", ".").trim();
        }
        if (choice.isCorrectAnswer()) {
          correctAnswers.push(choice.getValue().replace(",", ".").trim());
        }
      });
    }

    // Thêm câu hỏi và đáp án vào nội dung CSV
    csvContent += [
      `${question}`,
      `${options[0]}`,
      `${options[1]}`,
      `${options[2]}`,
      `${options[3]}`,
      `${options[4]}`,
      `${options[5]}`,
      `${options[6]}`,
      `${correctAnswers.join(";")}`
    ].join(",") + "\n";
  });

  var file = DriveApp.createFile("hoc_sau.csv", csvContent);
  Logger.log("File CSV đã được tạo: " + file.getUrl());
}
