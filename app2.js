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
    // $("#movieinfosection").append(pFive);
    console.log(response);
    console.log(video);
  })
}

function randomMovie() {

  $("#postersection").empty();
  $("#movieinfosection").empty();

  var imdbTop = Math.floor(Math.random() * 247);
  console.log(movieList[imdbTop]);
  var queryURLBase = "https://www.omdbapi.com/?t=" + movieList[imdbTop] + "&apikey=" + omdbKey;

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


  var queryURLYoutube = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80&maxResults=1&q=" + movieList[imdbTop] + " trailer";

  $.ajax({
    url: queryURLYoutube,
    method: "GET"
  }).done(function(response) {
    var video = "https://www.youtube.com/embed/" + response.items[0].id.videoId;
    var pFive = $("<iframe>").attr("src", video);
    $("#movieinfosection").append(pFive);
    console.log(response);
  })
}

$(document).on("click", ".input-group-addon", returnMovie);

// youtube key = AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80

//Testing Area for Baraka
$(document).on("click", "#dislikebutton", randomMovie);
// youtube key = AIzaSyC45ynEdLhjV2bjYjpFRLPA2vtD89f3m80

var movieList = ["The Shawshank Redemption",
"The Godfather",
"The Godfather: Part II",
"The Dark Knight",
"12 Angry Men",
"Schindler's List",
"Pulp Fiction",
"The Lord of the Rings: The Return of the King",
"The Good, the Bad and the Ugly",
"Fight Club",
"The Lord of the Rings: The Fellowship of the Ring",
"Forrest Gump",
"Star Wars: Episode V - The Empire Strikes Back",
"Inception",
"The Lord of the Rings: The Two Towers",
"One Flew Over the Cuckoo's Nest",
"Goodfellas",
"The Matrix",
"Seven Samurai",
"Star Wars: Episode IV - A New Hope",
"City of God",
"Se7en",
"The Silence of the Lambs",
"It's a Wonderful Life",
"Life Is Beautiful",
"The Usual Suspects",
"Léon: The Professional",
"Spirited Away",
"Saving Private Ryan",
"Coco",
"American History X",
"Interstellar",
"Once Upon a Time in the West",
"The Green Mile",
"Psycho",
"Casablanca",
"City Lights",
"The Intouchables",
"Modern Times",
"The Pianist",
"Raiders of the Lost Ark",
"The Departed",
"Terminator 2",
"Rear Window",
"Back to the Future",
"Whiplash",
"Gladiator",
"The Lion King",
"The Prestige",
"Memento",
"Apocalypse Now",
"Alien",
"The Great Dictator",
"Sunset Boulevard",
"Cinema Paradiso",
"The Lives of Others",
"Grave of the Fireflies",
"Paths of Glory",
"Django Unchained",
"The Shining",
"WALL·E",
"American Beauty",
"Princess Mononoke",
"The Dark Knight Rises",
"Oldboy",
"Witness for the Prosecution",
"Aliens",
"Once Upon a Time in America",
"Das Boot",
"Dangal",
"Citizen Kane",
"Vertigo",
"North by Northwest",
"Braveheart",
"Star Wars: Episode VI - Return of the Jedi",
"Reservoir Dogs",
"M",
"Your Name",
"Requiem for a Dream",
"Like Stars on Earth",
"Amélie",
"A Clockwork Orange",
"Blade Runner 2049",
"Lawrence of Arabia",
"Amadeus",
"Double Indemnity",
"Eternal Sunshine of the Spotless Mind",
"Taxi Driver",
"To Kill a Mockingbird",
"Full Metal Jacket",
"Singin' in the Rain",
"2001: A Space Odyssey",
"3 Idiots",
"Toy Story",
"The Sting",
"Toy Story 3",
"Inglourious Basterds",
"Bicycle Thieves",
"The Kid",
"Snatch",
"Monty Python and the Holy Grail",
"Good Will Hunting",
"The Hunt",
"For a Few Dollars More",
"Scarface",
"Confidential",
"The Apartment",
"Metropolis",
"A Separation",
"Rashomon",
"Indiana Jones and the Last Crusade",
"Yojimbo",
"All About Eve",
"Up",
"Batman Begins",
"My Father and My Son",
"Some Like It Hot",
"The Treasure of the Sierra Madre",
"Unforgiven",
"Downfall",
"Die Hard",
"Heat",
"Raging Bull",
"The Third Man",
"Children of Heaven",
"The Great Escape",
"Ikiru",
"Chinatown",
"Pan's Labyrinth",
"Incendies",
"My Neighbor Totoro",
"Ran",
"Judgment at Nuremberg",
"The Gold Rush",
"The Secret in Their Eyes",
"Howl's Moving Castle",
"Inside Out",
"The Bridge on the River Kwai",
"On the Waterfront",
"The Seventh Seal",
"Room",
"Lock, Stock and Two Smoking Barrels",
"Smith Goes to Washington",
"A Beautiful Mind",
"Casino",
"Blade Runner",
"The Elephant Man",
"V for Vendetta",
"The Wolf of Wall Street",
"Wild Strawberries",
"The General",
"Warrior",
"Dial M for Murder",
"Trainspotting",
"Gran Torino",
"Gone with the Wind",
"The Deer Hunter",
"The Sixth Sense",
"Fargo",
"No Country for Old Men",
"Sunrise",
"The Thing",
"Finding Nemo",
"The Big Lebowski",
"There Will Be Blood",
"Tokyo Story",
"The Bandit",
"Andrei Rublev",
"Cool Hand Luke",
"Come and See",
"Rebecca",
"Kill Bill: 1",
"Hacksaw Ridge",
"How to Train Your Dragon",
"Rang De Basanti",
"Mary and Max",
"Gone Girl",
"Shutter Island",
"The Passion of Joan of Arc",
"Dunkirk",
"Into the Wild",
"Life of Brian",
"It Happened One Night",
"Wild Tales",
"La La Land",
"Platoon",
"Logan",
"Hotel Rwanda",
"Network",
"In the Name of the Father",
"The Wages of Fear",
"Stand by Me",
"Rush",
"The Grand Budapest Hotel",
"Ben-Hur",
"A Wednesday",
"Persona",
"Jurassic Park",
"The 400 Blows",
"Memories of Murder",
"12 Years a Slave",
"Million Dollar Baby",
"Mad Max: Fury Road",
"Spotlight",
"Stalker",
"The Truman Show",
"Amores Perros",
"Butch Cassidy and the Sundance Kid",
"Thor: Ragnarok",
"Hachi: A Dog's Tale",
"Before Sunrise",
"Nausicaä of the Valley of the Wind",
"The Princess Bride",
"The Maltese Falcon",
"Prisoners",
"The Nights of Cabiria",
"Harry Potter and the Deathly Hallows: Part 2",
"Paper Moon",
"Catch Me If You Can",
"Rocky",
"The Grapes of Wrath",
"Diabolique",
"Monsters,",
"Touch of Evil",
"Gandhi",
"Donnie Darko",
"Barry Lyndon",
"The Terminator",
"Annie Hall",
"Groundhog Day",
"The Bourne Ultimatum",
"The Wizard of Oz",
"La Haine",
"8½",
"Jaws",
"The Best Years of Our Lives",
"Munna Bhai M.B.(2003)  8.0",
"Infernal Affairs",
"In the Mood for Love",
"Twelve Monkeys",
"The Help",
"Dead Poets Society",
"Paris, Texas",
"Beauty and the Beast",
"Dog Day Afternoon",
"Castle in the Sky",
"Three Colors: Red",
"The Mirror",
"Pirates of the Caribbean: The Curse of the Black Pearl"];
