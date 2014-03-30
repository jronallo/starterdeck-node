window.onkeypress = presentation_keypress_check;

function presentation_keypress_check(aEvent){
  if ( aEvent.keyCode == 110) {
    aEvent.preventDefault();
    var notes = document.getElementsByClassName('note');
    for (var i=0; i < notes.length; i++){
      notes[i].style.display = (notes[i].style.display == 'none' || !notes[i].style.display) ? 'block' : 'none';
    }
  } else if ( aEvent.keyCode == 97) {
    aEvent.preventDefault();
    var handouts = document.getElementsByClassName('handout');
    for (var i=0; i < handouts.length; i++){
      handouts[i].style.display = (handouts[i].style.display == 'none' || !handouts[i].style.display) ? 'block' : 'none';
    }
  }
}


// websockety stuff
function changeAudienceSlide(){
  // YKK: redo this if statement here
  // if (jQuery('#audience-participation').is(':visible')) {
    var current_slide_number = parseInt(location.hash.replace(/^#/,''));
    var current_slide_id = $("section:nth-of-type("+ current_slide_number +")").id;
    var data = {currentSlideNumber: current_slide_number, currentSlideId: current_slide_id};
    console.log(data);
    socket.emit('presentation', data);
  // }
}

jQuery( document ).ready(function() {
    changeAudienceSlide();
});

// onhashchange send messages to audience
window.addEventListener("hashchange", function(){
  changeAudienceSlide();
}, false);


// sockets
var host = location.protocol + '//' + location.host;
var socket = io.connect(host);
var initial_connection_count = 0;

socket.emit('subscribe', {room: 'all'});
socket.emit('subscribe', {room: 'audience'});

socket.on('update', function(data){
  console.log(data);
});

// Listen for something from the audience
socket.on('audience', function(data){
  if ('connection' in data) {
    jQuery('#websocket-logo').show();
    initial_connection_count += 1;
    jQuery('#counter').html(initial_connection_count);
  }

  if ('message' in data && 'id' in data) {
    if (data.message.match(/^[0-9a-zA-Z'"!\.\s\?]*$/)) {
      jQuery('#' + data.id + 's').prepend('<div>'+ data.message +'</div>');
    } else {
      console.log(data.message);
    }
  }
  // if ('question' in data) {
  //   jQuery('#closing-questions').prepend('<div>'+ data.question +'</div>');
  // }

});