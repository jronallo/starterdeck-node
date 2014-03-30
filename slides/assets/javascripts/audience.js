var host = location.protocol + '//' + location.host;
var socket = io.connect(host);
// socket.emit('subscribe', {room: 'all'});
socket.emit('subscribe', {room: 'presentation'});

socket.on('update', function(data){
  console.log(data);
});

// done on initial connection
socket.on('news', function(data) {
  console.log(data);
  $('#first').show();
  $('#first').css('background-color', '#eee');
  socket.emit('audience', { connection: 'true' });
});

// messages from presentation
socket.on('presentation', function(data){
  //FIXME: enable before real thing.
  // $('section').hide();

  $('section').css('background-color', 'white');
  console.log(data);
  if ('currentSlideId' in data) {
    // Once we get to this slide just show all the audience slides
    if (data.currentSlideId === "links") {
      $('section').show();
    }

    if (data.currentSlideId === "gaming-lab") {
      $('audio#laser')[0].play();
      window.setTimeout(function(){
        $('audio#laser')[0].currentTime = 0;
        $('audio#laser')[0].play();
      }, 500);
    }

    var slide_id = '#' + data.currentSlideId;
    if ($(slide_id).length > 0) {
      $(slide_id).prevAll().show();
      $(slide_id).show();

      // If autoadvance isn't checked then done scroll
      if ($('#autoadvance').prop('checked')) {
        $("html,body").animate({scrollTop: $(slide_id).offset().top}, 200);
      }

      $(slide_id).css('background-color', '#eee');
    }
  }
});

$( document ).ready(function() {
    $('section').each(function(index, elem){
      $(elem).append('<div class="slide_number"><div>'+ elem.id +'</div></div>');
    });

    // simple chat application
    $('form#chat,form#question').on('submit', function(e){
      var input_value = $(this).find('input').val();
      var idy = this.id;
      var truncated_value = input_value.substring(0,140);
      console.log(truncated_value);
      socket.emit('audience', {id: idy, message: truncated_value});
      $(this).parent().find('.submit_message').show();
      $(this).remove();
      e.preventDefault();
    });

});