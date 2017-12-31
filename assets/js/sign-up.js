$(document).ready(function () {
    // alert('foo');
    var userName, dob, age, userEmail, userPassword;

    // Initialize Firebase
    var config = {
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

    // When a user clicks on 'Sign UP', Add user to the database. All users can sign up
    $("#sign-up").click(function (e) {//TODO: Find out from Veena what she called the SignUp button:
        e.preventDefault();

        // Get data from the user:
        userName = $("#userName").val().trim();
        // userName = "gbmahili";
        userEmail = $("#userEmail").val().trim();
        // userEmail = "georgesmahili@gmail.com";
        userPassword = $("#userPassword").val().trim();
        // userPassword = "test";
        userDOB = $("#userDOB").val().trim();
        // userDOB = "05/03/2000";//This value will be taken from the input
        
        // Object to store the user's info for the Firebase:
        var userProfile = {
            userName : userName,
            userPassword : userPassword,
            userEmail : userEmail,
            userDOB : userDOB
        };
        //Push collected information to the database:
        database.ref().push(userProfile);
        //we are emptying the input values 
        $(".form-control").val("");
        alert('foo');
    });

    //TO DO:
    // When working on the sign-in script, check the user's age.
    //if they are under 18, restrict them from R-rated movies after they sign in
    database.ref().on("child_added", function (childSnapshot) {

        //DB Data
        var usersData = childSnapshot.val();
        console.log(usersData);
        // Calculate age based on date of birth provided by the user: 
        userAge = parseInt(moment(usersData.userDOB, "MM/DD/YYYY").month(0).from(moment().month(0)).split(" ")[0]);
        console.log(userAge);
    });
    

});