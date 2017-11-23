



$("#start_date").on("submit",function(event){

 event.preventDefault();
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


});

/*$(document).ready(function(){



  $("#create_event_button").click(function(){
    const text = $("#title").val();
    console.log(text);
    if (text === null || text === '') {
      alert("Title can't be empty");
    }else {
     $( "#calender" ).replaceWith( $("#event_detail_section").css("display", "inline") );
      $("#create_event_button").hide();
     $('#invitee_name').focus();
   }
    });






  });*/

