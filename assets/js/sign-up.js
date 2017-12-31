$(document).ready(function () {
    // alert('foo');
    var userName, dob, age, userEmail, userPassword;

    // userName = $("#userName").val().trim();
    // userPassword = $("#userPassword").val().trim();
    // dob = $("#dob").val().trim();
    //

    dob = "05/03/2000";//This value will be taken from the input
    age = parseInt(moment(dob, "MM/DD/YYYY").month(0).from(moment().month(0)).split(" ")[0]);
    console.log(age);

    // Object to store the user's info for the Firebase

    var userProfile = {};

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

});