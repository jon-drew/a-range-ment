$(document).ready(function(){
// Posts contents of form to database
$('#event_details').submit(function(event){
  event.preventDefault();
  let newEvent = $(this).serializeArray();
  let timeslots = [];

  $('#time-table .time-row').each(function()
  {
    let time_slot = {};
    time_slot['start'] = $(this).find("#start-time").html();
    time_slot['end'] = $(this).find("#end-time").html();

    timeslots.push(time_slot);

  });
  console.log(timeslots);
  newEvent.push({name: 'timeslots', value:JSON.stringify(timeslots)});
  console.log(newEvent);

  $.ajax({
    url: '/api/events',
    method: 'POST',
    data: newEvent,
    success: function(response) {
      var res = JSON.parse(response);
      console.log(res);
      $("#success-conf").html(`<p>${res.event_url}</p>`);
      // $(`<p>${res.event_url}</p>`).appendTo("#success-conf");
      $("#success-conf").show();
     }
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
     $("#invi_img").show();
    // $('#event').animate({
   // 'marginLeft' : "+=210px"
 // });
   $("#create_event_button").hide();
   $('#creator_name').focus();
  }
   });

 $( "#add_time" ).click(function() {
   const start_time = moment($("#start_date").val()).format('LLL');
   const end_time = moment($("#end_date").val()).format('LLL');
   const current_time = moment().format('LLL');
   console.log(start_time);
   console.log(end_time);
   console.log(current_time);
   if ('#start_date'.diff(moment()) < 0) {
     alert("Start Time can not be in the past.");
   } else if (end_time < current_time) {
     alert("End Time can not be in the past.");
   } else if (end_time < start_time) {
     alert("End Time can not be earlier than Start Time.");
   } else {
   const table_row = `<tr class="time-row">
                        <td id="start-time">${start_time}</td>
                        <td id="end-time">${end_time}</td>
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