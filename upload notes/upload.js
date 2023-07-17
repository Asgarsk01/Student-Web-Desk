function divideMarks(input) {
  var value = parseInt(input.value);
  if (!isNaN(value)) {
    input.value = value / 2;
  }
}
// Retrieve data from local storage if available
window.addEventListener('DOMContentLoaded', function() {
    var savedData = localStorage.getItem('studentData');
    if (savedData) {
      var data = JSON.parse(savedData);
      populateRows(data);
    }
  });
  
  // Function to populate rows with saved data
  function populateRows(data) {
    var rows = document.querySelectorAll('tbody tr');
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var cells = rows[i].querySelectorAll('textarea');
      for (var j = 0; j < row.length; j++) {
        cells[j].value = row[j];
      }
      calculateTotal(cells); // Calculate total for each row
    }
  }
  
  // Function to save data to local storage
  function saveData() {
    var rows = document.querySelectorAll('tbody tr');
    var data = [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var cells = row.querySelectorAll('textarea');
      var rowData = [];
      for (var j = 0; j < cells.length; j++) {
        rowData.push(cells[j].value);
      }
      data.push(rowData);
    }
    localStorage.setItem('studentData', JSON.stringify(data));
  }
  
  // Event listener to save data when a change occurs in any textarea
  var textareas = document.querySelectorAll('textarea');
  for (var i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener('input', function() {
      saveData();
      calculateTotal(this.parentNode.parentNode.querySelectorAll('textarea'));
    });
  }
  
  // Function to calculate the total for each row
  function calculateTotal(rowCells) {
    var totalCell = rowCells[rowCells.length - 1];
    var sum = 0;
    for (var i = 2; i < rowCells.length - 1; i++) {
      var value = parseFloat(rowCells[i].value);
      if (!isNaN(value)) {
        sum += value/2;
      }
    }
    totalCell.value = sum;
  }
  