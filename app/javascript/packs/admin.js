require("jquery")
require("datatables")
require("select2")

$(document).ready(function(){
  $('table.datatables').DataTable();
  $('select').select2();
});