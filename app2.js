var omdbKey = "f2ddb033";

function returnMovie() {

  var searchTerm = $("#userinputsearch").val().trim();
  var queryURLBase = "https://www.omdbapi.com/?t=" + searchTerm + "&apikey=" + omdbKey;

  $("#postersection").empty();
  $("#movieinfosection").empty();  

  $.ajax({
    url: queryURLBase,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var poster = response.Poster;
    var pOne = $("<img>").attr("src", poster);
    var actors = response.Actors;
    var pTwo = $("<p>").text("Actors: " + actors);
    var runtime = response.Runtime;
    var pThree = $("<p>").text("Runtime: " + runtime);
    var rating = response.Rated;
    var pFour = $("<p>").text("Rating: " + rating);
    $("#postersection").append(pOne);
    $("#movieinfosection").append(pTwo);
    $("#movieinfosection").append(pThree);
    $("#movieinfosection").append(pFour);
  })


  var queryURLYoutube = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80&maxResults=1&q=" + searchTerm + " trailer";

  $.ajax({
    url: queryURLYoutube,
    method: "GET"
  }).done(function(response) {
    var video = "https://www.youtube.com/embed/" + response.items[0].id.videoId;
    var pFive = $("<iframe>").attr("src", video);
    $("#postersection").append(pFive);
    console.log(response);
    console.log(video);
  })
}

$(document).on("click", ".input-group-addon", returnMovie);

// youtube key = AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80

//Testing git push by Baraka.