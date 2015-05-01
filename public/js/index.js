$(function() {
  $('#shortenForm').submit(function(e) {
    if(this.url.value !== '') {
      $.get("/shorten?url="+encodeURIComponent(this.url.value), function(data) {
        $('#resultUrl').html(data);
        $('#resultUrl').attr('href', data);
        $('#result').show();
      });
      this.url.value = '';
    }
    return false;
  });
});
