$(document).ready(function(){

// Posts contents of form to database
$('#event_details').submit(function(event){
  alert("Button clicked")
  console.log('blah', this)
  event.preventDefault();
  let newEvent = $(this).serialize();
  console.log(newEvent);
  $.ajax( {
    url: '/api/events',
    method: 'POST',
    datatype: 'string',
    data: newEvent
  });
});

// Shows contents of users table on bottom of screen
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/events"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.user_email).appendTo($("body"));
    }
  });
});


  $("#create_event_button").click(function(){
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

    const table_row = `<tr>
                         <td>${start_time}</td>
                         <td>${end_time}</td>
                         <td><button type="button" class="btn btn-warning delete-button">Delete</button></td>
                       </tr>`;

    $("#table-body").append(table_row);
    $("#time-table").show();
    $( "#datetimepicker1" ).data("DateTimePicker").clear();
    $( "#datetimepicker2" ).data("DateTimePicker").clear();
});

$(document).on('click', '.delete-button', function() {
  $(this).closest('tr').remove();
});

  });