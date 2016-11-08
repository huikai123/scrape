// grab the articles as a json
$.getJSON('/articles', function(data) {
  // for each one
  for (var i = 0; i<data.length; i++){
    // display the apropos information on the page
    //$('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].headline + '<br />'+ data[i].summary + '</p>');
      $('.panel-title').append('<p data-id="' + data[i]._id + '">'+ data[i].headline);
      $('.panel-body').append(data[i].summary + '</p>');
  }
});


// whenever someone clicks a delete button
$('.delete').on('click', function(){
  // empty the notes from the note section
  $('p').empty();
  // save the id from the p tag
  var thisId = $(this).attr('data-id');

  // now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // with that done, add the note information to the page
    .done(function( data ) {
      console.log(data);
      // the title of the article
      $('#notes').append('<h2>' + data.headline + '</h2>'); 
      // an input to enter a new title
      $('#notes').append('<input id="headlineinput" name="headline" >'); 
      // a textarea to add a new note body
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>'); 
      // a button to submit a new note, with the id of the article saved to it
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      // if there's a note in the article
      if(data.note){
        // place the title of the note in the title input
        $('#titleinput').val(data.note.headline);
        // place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
});

// when you click the savenote button
$('.save').on('click', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      headline: $('#titleinput').val(), // value taken from title input
      body: $('#bodyinput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
      $('#notes').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val("");
  $('#bodyinput').val("");
});