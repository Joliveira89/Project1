$(document).ready(function () {
    // alert('foo');
    var userName, dob, age, userEmail, userPassword;

    // userName = $("#userName").val().trim();
    // userPassword = $("#userPassword").val().trim();
    // dob = $("#dob").val().trim();

    age = parseInt(moment("05/03/1982", "MM/DD/YYYY").month(0).from(moment().month(0)).split(" ")[0]);
    console.log(typeof age);
});