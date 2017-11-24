$( 'document' ).ready(function() {
  console.log('parti!!!');
   $('#invi-submit').on('click',function(event){
    event.preventDefault();
    const text = $("#part-name").val();
    console.log("this is wporking", text);
    if (text === null || text === '') {
      alert("Tweet can not be empty");
    }
  });