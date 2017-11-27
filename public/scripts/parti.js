$(document).ready(function() {

   $('#invi-submit').on('click',function(event){
    event.preventDefault();
    const name = $("#part-name").val();
    const email = $("#part-email").val();
    const invitor_email = $("#invitor-email").html();
    const event_title = $("#event-title").html();

    let timeslots = [];

    $("#invi-details input:checkbox:checked").each(function() {
        let time_slot = {};
        time_slot['start_time'] = $(this).parent().siblings("#start-time").html();
        time_slot['end_time'] = $(this).parent().siblings("#end-time").html();
        timeslots.push(time_slot);
    });

    console.log(name);
    console.log(email);
    console.log(invitor_email);
    console.log(event_title);
    console.log(timeslots);

    

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
    else {
      $.ajax({
    url: '/send_confirmation',
    method: 'POST',
    data: {
      participant_name: name, 
      participant_email: email,
      invitor_email: invitor_email,
      event_title: event_title,
      timeslots: timeslots
    },
    success: function(response) {
      alert(JSON.parse(response).result);
     }
    });
    }
  });

});