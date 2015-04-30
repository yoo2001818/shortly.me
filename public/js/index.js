function generateText(form) {
  $.get("/generate/"+form.textType.value, function(data) {
    $('#results').html(data);
  });
}
