$(document).ready(function() {

  var omdbKey = "f2ddb033";
  // Create empty arrays to store the liked and disliked movies from firebase
  var likedMoviesArray = [];
  var dislikedMoviesArray = [];

  // Create a database
  var database = firebase.database();
  // Call the database to render to the HTML
  database.ref().on("value", function (snap) {
    // Get the current user's email from the DOM: This was added by auth.js during login
    // var currentUserEmail = $("#current-user-email").attr("current-user-email");
    var currentUser = firebase.auth().currentUser;
    var currentUserEmail = currentUser.email;
    // Update the likedMoviesArray and dislikedMoviesArray using firebase data
    likedMoviesArray = snap.val().likedMovies;
    dislikedMoviesArray = snap.val().dislikedMovies;
    // console.log(currentUserEmail);
    // Append movies from the likedMoviesArray to the DOM in the playlist page
    likedMoviesArray.forEach(element => {
      // console.log(currentUserEmail);
      //Only append movies where the second element matches the email of the currently logged in user
      if (element[2] == currentUserEmail) {
        if (element[0] != "") {

          $("#likedMovies").append('<div class="col-sm-4"> <img src="'+ element[1] + '" class="image-responsive"/></div>');
        }

      }
    });
    // Append movies from the dislikedMoviesArray to the DOM in the playlist page
    // dislikedMoviesArray.forEach(element => {
    //   //Only append movies where the second element matches the email of the currently logged in user
    //   if (element[1] == currentUserEmail) {
    //     if (element[0] != "") {
    //       $("#dislikedMovies").append("<li>" + element[0] + "</li>");
    //     }

    //   }
    // });
  });

  // $("#likedMovies").click(function(){
  //   $("#dislikedMovies").text("<li>" + element[0] + "</li>");
  // });

var omdbKey = "f2ddb033";
var rating;
var randomMovieRating;
var currentUserAge;


function returnMovie() {

  $("#likebutton").show();
  $("#dislikebutton").show();
  $("#next").hide();
  // Grab the current user's age:
  currentUserAge = parseInt($("#current-user-age").attr("current-user-age"));
  var currentUserEmail = $("#current-user-email").attr("current-user-email");
  // Grab the search term:
  var searchTerm = $(".form-control").val().trim();
  // Create the query:
  var queryURLBase = "https://www.omdbapi.com/?t=" + searchTerm + "&apikey=" + omdbKey;

  // Empty movie and poster sections:
  $("#movieinfosection").empty();
  $("#postersection").empty();

  // Do an ajax call to the Open Movie Database API using the search term above:
  $.ajax({
    url: queryURLBase,
    method: "GET"
  }).done(function(response) {
    //console.log(response);
    var poster = response.Poster;
    var pOne = $("<img>").attr("src", poster);
    var actors = response.Actors;
    var pTwo = $("<p>").text("Actors: " + actors);
    var runtime = response.Runtime;
    var pThree = $("<p>").text("Runtime: " + runtime);
    rating = response.Rated;
    var pFour = $("<p>").text("Rating: " + rating);
    var plot = response.Plot;
    var pFive = $("<p>").text("Plot: " + plot);

    //Check Age:
    //1. First, we check if the movie is not rated R
    if (response.Rated != "R"){
      //If not, we show everything
      $("#movieinfosection").empty();
      $("#postersection").append(pOne);
      $("#movieinfosection").append(pTwo);
      $("#movieinfosection").append(pThree);
      $("#movieinfosection").append(pFour);
      $("#movieinfosection").append(pFive);
    }else{
      //2. If it is rated R, we check the age of the user. If the user is 18 or older:
      if (currentUserAge >= 18) {
        //We show everything else
        $("#movieinfosection").empty();
        $("#postersection").append(pOne);
        $("#movieinfosection").append(pTwo);
        $("#movieinfosection").append(pThree);
        $("#movieinfosection").append(pFour);
        $("#movieinfosection").append(pFive);
      }else{
        //Else, we show a modal: TODO//Create a modal and replace with console.log
        console.log("You are younger than 18, we can't show you the result as the movie is rated R.");
        $("#movieinfosection").empty();
        $("#postersection").empty();
        $("#movieinfosection").css("background", "black").html("<h1>You are younger than 18, we can't show you the result as the movie is rated R. Keep ")
        $("#likebutton").hide();
        $("#dislikebutton").hide();
        $("#next").show();
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
      $("#trailer").append(pFive);
    } else {
      //2. If it is rated R, we check the age of the user. If the user is 18 or older:
      if (currentUserAge >= 18) {
        //We show everything else
        $("#trailer").append(pFive);
      } else {
        //Else, we show a modal: TODO//Create a modal and replace with console
        //console.log("You are younger than 18, we can't show you the result as the movie is rated R.");
        $("#movieinfosection").empty();
        $("#postersection").empty();
        $("#movieinfosection").css("background", "black").html("<h1>You are younger than 18, we can't show you the result as the movie is rated R.</h1>");

      }
    };
  })
};

  var randomMovieName;
  var randomMoviePoster;
  if (randomMovieName == undefined) {
    randomMovieName = '';
  }
  var dislikedMoviesArray;
  var likedMoviesArray;

function randomMovie() {

  $("#likebutton").show();
  $("#dislikebutton").show();
  $("#next").hide();

  // Get the current user's age:
  var currentUserAge = parseInt($("#current-user-age").attr("current-user-age"));
  var currentUserEmail = $("#current-user-email").attr("current-user-email");
  console.log(currentUserAge);

    $("#postersection").empty();
    $("#movieinfosection").empty();

  var imdbTop = Math.floor(Math.random() * 15);
  console.log(movieList[imdbTop]);
  var queryURLBase = "https://www.omdbapi.com/?t=" + movieList[imdbTop].name + "&apikey=" + omdbKey;

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
    var plot = response.Plot;
    var pFive = $("<p>").text("Plot: " + plot);
    $("#postersection").append(pOne);
    $("#movieinfosection").append(pTwo);
    $("#movieinfosection").append(pThree);
    $("#movieinfosection").append(pFour);
    $("#movieinfosection").append(pFive);


    randomMovieRating = response.Rated;
    var pFour = $("<p>").text("Rating: " + randomMovieRating);
    randomMovieName = response.Title;
    randomMoviePoster = response.Poster;
    //Check Age:
    //1. First, we check if the movie is not rated R
    if (randomMovieRating != "R") {
      console.log(randomMovieName);
      //If not, we show everything
      $("#movieinfosection").empty();
      // $("#movieinfosection").append($("<p id='title'>").text("Title: " + response.Title));
      $("#postersection").append(pOne);
      $("#movieinfosection").append(pTwo);
      $("#movieinfosection").append(pThree);
      $("#movieinfosection").append(pFour);
      $("#movieinfosection").append(pFive);
    } else {
      //2. If it is rated R, we check the age of the user. If the user is 18 or older:
      if (currentUserAge >= 18) {
        //We show everything else
        $("#movieinfosection").empty();
        // $("#movieinfosection").append($("<p id='title'>").text("Title: " + response.Title));
        $("#postersection").append(pOne);
        $("#movieinfosection").append(pTwo);
        $("#movieinfosection").append(pThree);
        $("#movieinfosection").append(pFour);
        $("#movieinfosection").append(pFive);
      } else {
        //Else, we show a modal: TODO//Create a modal and replace with console.log
        console.log("You are younger than 18, we can't show you the result as the movie is rated R.");
        $("#movieinfosection").empty();
        $("#postersection").empty();
        $("#movieinfosection").css("background", "black").html("<h1>You are younger than 18, we can't show you this random movie as it is rated R. Keep HUNTING</h1>");
        $("#likebutton").hide();
        $("#dislikebutton").hide();
        $("#next").show();
      }
    };
  });
  var queryURLYoutube = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80&maxResults=1&q=" + movieList[imdbTop].name + " trailer";

    $.ajax({
      url: queryURLYoutube,
      method: "GET"
    }).done(function(response) {
      var video = "https://www.youtube.com/embed/" + response.items[0].id.videoId;
      var pFive = $("<iframe>").attr("src", video);
      //1. First, we check if the movie is not rated R
      if (randomMovieRating != "R") {
        //If not, we show everything
        $("#trailer").append(pFive);
      } else if (randomMovieRating === "R" && currentUserAge >= 18) {
        $("#trailer").append(pFive);
      }
        else {
        //Else, we show a modal: TODO//Create a modal and replace with console
        console.log("You are younger than 18, we can't show you the result as the movie is rated R.");
        $("#movieinfosection").empty();
        $("#postersection").empty();
        $("#movieinfosection").css("background", "black").html("<h1>You are younger than 18, we can't show you this random movie as it is rated R. Keep HUNTING</h1></h1>");
        $("#trailer").empty();
      }
      //console.log(response);
    });

    // Save Movie Title to Firebase based on like or dislike
    //Get the id of the clicked button:
    var clickedButton = this.id;
    //alert(movieName);
    if (clickedButton === "likebutton") {
      console.log(`You liked ${randomMovieName}`);
      console.log("The current email is " + currentUserEmail);
      database = firebase.database();
      likedMoviesArray.push([randomMovieName, randomMoviePoster, currentUserEmail]);
      database.ref().update({ "likedMovies": likedMoviesArray});
    }

    if (clickedButton === "dislikebutton") {
      console.log(`You DISLIKED ${randomMovieName}`);
      database = firebase.database();
      dislikedMoviesArray.push([randomMovieName, randomMoviePoster, currentUserEmail]);
      database.ref().update({ "dislikedMovies": dislikedMoviesArray});
    }

  }

  $(document).on("click", ".glyphicon-search", returnMovie);
  $(".glyphicon-search").click(function() {
    console.log($("#searchinput").val().trim());
  });

//Testing Area for Baraka
$(document).on("click", "#dislikebutton", randomMovie);
$(document).on("click", "#likebutton", randomMovie);
$(document).on("click", "#next", randomMovie);


  //Testing Area for Baraka
  // youtube key = AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80
    // Save Movie Title to Firebase based on like or dislike
    //Get the id of the clicked button:
    var clickedButton = this.id;
    //alert(movieName);
    if (clickedButton === "likebutton") {
      console.log(`You liked ${randomMovieName}`);
      console.log("The current email is " + currentUserEmail);
      database = firebase.database();
      likedMoviesArray.push([randomMovieName,  currentUserEmail]);
      database.ref().update({ "likedMovies": likedMoviesArray});
    }

    if (clickedButton === "dislikebutton") {
      console.log(`You DISLIKED ${randomMovieName}`);
      database = firebase.database();
      dislikedMoviesArray.push([randomMovieName, currentUserEmail]);
      database.ref().update({ "dislikedMovies": dislikedMoviesArray});
    }


  // youtube key = AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80

  //Testing Area for Baraka
var movieList = [
{name: "The Shawshank Redemption",
rating: "R"},
{name: "The Godfather",
rating: "R"},
{name: "The Godfather: Part II",
rating: "PG-13"},
{name: "The Dark Knight",
rating: "R"},
{name: "12 Angry Men",
rating: "A"},
{name: "Schindler's List",
rating: "R"},
{name: "Pulp Fiction",
rating: "R"},
{name: "The Lord of the Rings: The Return of the King",
rating: "PG-13"},
{name: "The Good, the Bad and the Ugly",
rating: "R"},
{name: "Fight Club",
rating: "R"},
{name: "The Lord of the Rings: The Fellowship of the Ring",
rating: "PG-13"},
{name: "Forrest Gump",
rating: "PG-13"},
{name: "Inception",
rating: "PG-13"},
{name: "Spirited Away",
rating: "PG"},
{name: "Life Is Beautiful",
rating: "PG-13"}
];
});









// "The Lord of the Rings: The Fellowship of the Ring",
// "Forrest Gump",
// "Star Wars: Episode V - The Empire Strikes Back",
// "Inception",
// "The Lord of the Rings: The Two Towers",
// "One Flew Over the Cuckoo's Nest",
// "Goodfellas",
// "The Matrix",
// "Seven Samurai",
// "Star Wars: Episode IV - A New Hope",
// "City of God",
// "Se7en",
// "The Silence of the Lambs",
// "It's a Wonderful Life",
// "Life Is Beautiful",
// "The Usual Suspects",
// "Léon: The Professional",
// "Spirited Away",
// "Saving Private Ryan",
// "Coco"];
