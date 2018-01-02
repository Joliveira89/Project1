var omdbKey = "f2ddb033";

function returnMovie() {
  var currentUserAge = parseInt($("#current-user-age").attr("current-user-age"));

  var searchTerm = $("#userinputsearch").val().trim();
  var queryURLBase = "https://www.omdbapi.com/?t=" + searchTerm + "&apikey=" + omdbKey;

  
  $("#movieinfosection").empty();  
  $("#postersection").empty();

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
    rating = response.Rated;
    var pFour = $("<p>").text("Rating: " + rating);

    //Run the checkAgeFirst()
    //checkAgeFirst();
    //1. First, we check if the movie is not rated R
    if (rating != "R"){
      //If not, we show everything      
      $("#postersection").append(pOne);
      $("#movieinfosection").empty();
      $("#movieinfosection").append(pTwo);
      $("#movieinfosection").append(pThree);
      $("#movieinfosection").append(pFour);
    }else{
      //2. If it is rated R, we check the age of the user. If the user is 18 or older:
      if (currentUserAge >= 18) {
        //We show everything else
        $("#postersection").append(pOne);
        $("#movieinfosection").empty();
        $("#movieinfosection").append(pTwo);
        $("#movieinfosection").append(pThree);
        $("#movieinfosection").append(pFour);
      }else{
        //Else, we show a modal: TODO//Create a modal and replace with console.log
        console.log("You are younger than 18, we can't show you the result as the movie is rated R.");
        $("#movieinfosection").empty();
        $("#movieinfosection").css("background", "#fafafa").html("<h1>You are younger than 18, we can't show you the result as the movie is rated R.");
        $("#postersection").empty();
      }      
    }
    
  });


  var queryURLYoutube = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80&maxResults=1&q=" + searchTerm + " trailer";

  $.ajax({
    url: queryURLYoutube,
    method: "GET"
  }).done(function(response) {
    var video = "https://www.youtube.com/embed/" + response.items[0].id.videoId;
    var pFive = $("<iframe>").attr("src", video);
    //1. First, we check if the movie is not rated R
    if (rating != "R") {
      //If not, we show everything  
      $("#postersection").append(pFive);
    } else {
      //2. If it is rated R, we check the age of the user. If the user is 18 or older:
      if (currentUserAge >= 18) {
        //We show everything else
        $("#postersection").append(pFive);
      } else {
        //Else, we show a modal: TODO//Create a modal and replace with console
        console.log("You are younger than 18, we can't show you the result as the movie is rated R.");
        $("#movieinfosection").empty();
        $("#movieinfosection").css("background", "#fafafa").html("<h1>You are younger than 18, we can't show you the result as the movie is rated R.");
        $("#postersection").empty();
      }
    }   
    console.log(response);
    console.log(video);
  })
}

$(document).on("click", ".input-group-addon", returnMovie);

// youtube key = AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80

//Testing Area for Baraka