$(document).ready(function () {

   $("#myModal").modal('show');

    var userName, dob, age, userEmail, userPassword;

    // Initialize Firebase
    var config
     = {
        apiKey: "AIzaSyD6nYJpi1UtXV7JEzgAY5tiL6cNptngPZk",
        authDomain: "freebay-dbbdc.firebaseapp.com",
        databaseURL: "https://freebay-dbbdc.firebaseio.com",
        projectId: "freebay-dbbdc",
        storageBucket: "freebay-dbbdc.appspot.com",
        messagingSenderId: "328886904095"
    };
    firebase.initializeApp(config);
    // Create a database
    var database = firebase.database();

    // Get elements

    const txtEmail = $("#txtEmail");
    const txtPassword = $("#txtPassword");
    const txtAge = $("#txtAge");
    const btnLogin = $("#btnLogin");
    const btnSignUp = $("#btnSignUp");
    const btnLogout = $("#btnLogout");

    // Add login event
    btnLogin.click(e => {
     event.preventDefault();
        console.log("LoggedIn");


        //Get values
        const email = txtEmail.val();
        const password = txtPassword.val();
        const age = txtAge.val();


        //Sign in
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise
            .then(function (firebaseUser) {
              event.preventDefault();
                //If the user exist
                if (firebaseUser) {
                    //Remove the hidden class from the input
                    $(".close").click();
                    btnLogout.removeClass("hide");
                    btnSignUp.addClass("hide");
                    console.log("The user is NOW logged in");





                    //Get the user's age from the db

                    //1. First, get the user's email address
                    var currentUser = firebase.auth().currentUser;
                    var currentUserEmail;
                    //Check if we have a user
                    if (currentUser != null) {
                        //Get the user's email
                        currentUserEmail = currentUser.email;
                        //Get the user email from the database
                        database.ref().on("child_added", function (childSnapshot) {
                            //console.log(childSnapshot.val());
                            //Show the search bar and the result section:
                            // $(".trailersection").removeClass("hidden");
                            $(".signinsection").addClass("hidden");

                            if (childSnapshot.val().email === currentUserEmail) {
                                if (childSnapshot.val().age >= 18) {
                                    console.log("The user is over 18");
                                    // $(".jumbotron, .mainsectionarea").removeClass("hide");
                                    //$("#current-user-age").text(childSnapshot.val().age);
                                    $("#current-user-age").attr("current-user-age", childSnapshot.val().age);
                                    $("#current-user-email").attr("current-user-email", childSnapshot.val().email);
                                } else {
                                    console.log("The user is NOT 18 yet");
                                    //Add the 'current-user-age' attribute to the span, to be used when the user searches for movies in the app2.js
                                    $("#current-user-age").attr("current-user-age", childSnapshot.val().age);
                                    $("#current-user-email").attr("current-user-email", childSnapshot.val().email);
                                }
                            }
                        });
                        console.log("CURRENT USER'S EMAIL ADDRESS IS: " + currentUserEmail);
                    }
                    //console.log("CURRENT USER'S EMAIL ADDRESS IS: " + firebaseUser.Aa.ca.email);

                } else {
                    console.log("The user is not logged in");
                    btnLogout.addClass("hide");
                    btnSignUp.removeClass("hide");
                }
            })
            .catch(function (e) {
                //Show message if we couldn't authenticate
                console.log(e.message);
                console.log("SORRY, WE COULDN'T SIGN YOU IN. CHECK YOUR EMAIL OR PASSWORD");
                $(".modal-body").text("SORRY, WE COULDN'T SIGN YOU IN. CHECK YOUR EMAIL OR PASSWORD");
                $(".modal-body").append(btnLogin);

            });
        $(".form-control").val("");

    });

    $("#create-account").click(function(){
        $(".ageField").removeClass("hidden");
        btnSignUp.removeClass("hidden");
    });

    // Add signup event
    btnSignUp.click(e => {

        console.log("Sign Up Button Clicked");

        //Get values
        const email = txtEmail.val();
        const password = txtPassword.val();
        const age = txtAge.val();

        //Sign in:
        //TODO: Make sure the email is validated
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);
        console.log(email);
        promise
            .then(function (firebaseUser) {
                //console.log(firebaseUser);
                if (firebaseUser) {
                    console.log(firebaseUser);
                    console.log("User successfully signup!");
                    // Add user to the RealTime Database

                    //Add to the database
                    database.ref().push({
                        email: email,
                        age: parseInt(age)
                    });
                    //Remove the hidden class from the input
                    btnLogout.removeClass("hide");
                    btnSignUp.addClass("hide");
                    $(".trailersection").removeClass("hidden");
                    console.log("Foo");
                    $(".signinsection").addClass("hidden");

                    // Get the user's Age

                    //Check if user is over 18 and show them the needed info
                } else {
                    console.log("There was an error signing up the user!");
                    btnLogout.addClass("hide");
                    btnSignUp.removeClass("hide");
                }
                //Only after a user is able to sign up, clear the input fields.
                $(".form-control").val("");
            })
            .catch(function (e) {
                console.log("FIREBASE MESSAGE: " + e.message);
                console.log("MY MESSAGE: There was an error signing up the user- SECOND ERROR!");
            });



    });

    // Add Logout event
    btnLogout.click(e => {
        //This will signout the currently authenticated user
        console.log("Sing Out");
        btnLogout.addClass("hide");
        btnSignUp.removeClass("hide");
        firebase.auth().signOut();
        $(".jumbotron, #mainsectionarea").addClass("hide");
        $("#postersection").empty();
        $("#movieinfosection").empty();
    });

    // //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            //Inform that the user is logged in:
            //console.log("The user is CURRENTLY logged in");
            var currentUser = firebase.auth().currentUser;
            var currentUserEmail;
            //Check if we have a user
            if (currentUser != null) {
                //Get the user's email
                currentUserEmail = currentUser.email;
                //Get the user email from the database
                database.ref().on("child_added", function (childSnapshot) {
                    //console.log(childSnapshot.val());

                    if (childSnapshot.val().email === currentUserEmail) {
                        if (childSnapshot.val().age >= 18) {
                            console.log("The user is LOGGED IN and is over 18");

                        } else {
                            console.log("The user is LOGGED IN and is NOT 18 yet");
                        }
                    }
                });
                //console.log("CURRENT USER'S EMAIL ADDRESS IS: " + currentUserEmail);
                //$("h2").text("You are currently logged in as: " + childSnapshot.val().email);
            }
            //Remove the hidden class from the input
            btnLogout.removeClass("hide");
            btnSignUp.addClass("hide");
        } else {
            console.log("The user is not logged in, showing Login or Logout Section");
        }
    });





















































































































    // // When a user clicks on 'Sign UP', Add user to the database. All users can sign up
    // $("#sign-up").click(function (e) {//TODO: Find out from Veena what she called the SignUp button:
    //     e.preventDefault();

    //     // Get data from the user:
    //     userName = $("#userName").val().trim();
    //     // userName = "gbmahili";
    //     userEmail = $("#userEmail").val().trim();
    //     // userEmail = "georgesmahili@gmail.com";
    //     userPassword = $("#userPassword").val().trim();
    //     // userPassword = "test";
    //     userDOB = $("#userDOB").val().trim();
    //     // userDOB = "05/03/2000";//This value will be taken from the input

    //     // Object to store the user's info for the Firebase:
    //     var userProfile = {
    //         userName : userName,
    //         userPassword : userPassword,
    //         userEmail : userEmail,
    //         userDOB : userDOB
    //     };
    //     //Push collected information to the database:
    //     database.ref().push(userProfile);
    //     //we are emptying the input values
    //     $(".form-control").val("");
    // });

    // // //TO DO:
    // // // When working on the sign-in script, check the user's age.
    // // //if they are under 18, restrict them from R-rated movies after they sign in
    // // database.ref().on("child_added", function (childSnapshot) {

    // //     //DB Data
    // //     var usersData = childSnapshot.val();
    // //     console.log(usersData);
    // //     // Calculate age based on date of birth provided by the user:
    // //     userAge = parseInt(moment(usersData.userDOB, "MM/DD/YYYY").month(0).from(moment().month(0)).split(" ")[0]);
    // //     console.log(userAge);
    // // });
});