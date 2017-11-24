
// Shows contents of users table on left side
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.user_email).appendTo($("body"));
    }
  });;
});

// Shows contents of events table on left side of screen
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/events"
  }).done((events) => {
    for(user of events) {
      $("<div>").text(user.event_title).appendTo($("body"));
    }
  });
});


$(document).ready(function(){
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