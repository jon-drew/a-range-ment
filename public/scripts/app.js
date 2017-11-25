$(document).ready(function(){

// Posts contents of form to database
$('#event_details').submit(function(event){
  event.preventDefault();
  let newEvent = $(this).serialize();
  console.log($(this));
  $.ajax({
    url: '/api/events',
    method: 'POST',
    data: newEvent
  });
});

 $("#create_event_button").click(function(){
   const $formContainer = $(this).closest(".event_details-container");
   console.log("###EVENT FORM", $formContainer.length);
   $formContainer.addClass("expanded");
   const text = $("#title").val();
   console.log(text);
   if (text === null || text === '') {
     alert("Title can't be empty");
   }else {
    $( "#calender" ).replaceWith( $("#event_detail_section").css("display", "inline") );
    $('#event').animate({
   'marginLeft' : "+=410px"
 });
   $("#create_event_button").hide();
   $('#creator_name').focus();
  }
   });
 $( "#add_time" ).click(function() {
   const start_time = $("#start_date").val();
   const end_time = $("#end_date").val();
   const current_time = moment().format('lLT');

   console.log(start_time);
   console.log(end_time);
   console.log(current_time);

   if (start_time < current_time) {
     alert("Start Time can not be in the past.");
   } else if (end_time < current_time) {
     alert("End Time can not be in the past.");
   } else if (end_time < start_time) {
     alert("End Time can not be earlier than Start Time.");
   } else {
   const table_row = `<tr>
                        <td>${start_time}</td>
                        <td>${end_time}</td>
                        <td><button type="button" class="btn btn-warning delete-button">Delete</button></td>
                      </tr>`;

   $("#table-body").append(table_row);
   $("#time-table").show();
   $( "#datetimepicker1" ).data("DateTimePicker").clear();
   $( "#datetimepicker2" ).data("DateTimePicker").clear();
  }
});

 $(document).on('click', '.delete-button', function() {
   $(this).closest('tr').remove();
 });

});