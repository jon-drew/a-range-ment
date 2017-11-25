$(document).ready(function() {
  
   $('#invi-submit').on('click',function(event){
    event.preventDefault();
    const name = $("#part-name").val();
    const email = $("#part-email").val();

    if ($("#invi-details input:checkbox:checked").length > 0)
      {
        var checked = true;
      }
    else
      {
        var checked = false;
      }
    
    if (name === null || name === '' || email === null || email === '' || checked === false) {
      alert("You are missing some important fields. Please fill to proceed.");
    }
  });

});