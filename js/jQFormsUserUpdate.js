$(document).ready(function () {
  //Get the user information and populate them in form
  $.get("../php/getUsername.php", function (data) {
    let userInfo = JSON.parse(data);
    $("#firstname").val(userInfo.firstname);
    $("#lastname").val(userInfo.lastname);
    $("#username").val(userInfo.username);
    $("#email").val(userInfo.email);
    $("#dob").val(userInfo.dob);
    $("#gender").val(userInfo.gender);
    $("#phone").val(userInfo.phone);
  });

  // Animation function
  function animateForm() {
    // Add your animation here, for example:
    $(".container").animate(
      {
        opacity: 0.25,
        left: "+=50",
        height: "toggle",
      },
      2000,
      function () {
        // Animation complete, redirect to index.html
        window.location.href = "../index.html"; // Redirect to index.html
      }
    );
  }

  // Initialize the button widget
  $("#update-button").button();
  // Prevent default form submission
  $("#update-button").click(function (e) {
    e.preventDefault();

    console.log($("#userupdate-form").serialize());
    // AJAX request to jQFormsUserUpdate.php
    $.ajax({
      type: "POST",
      url: "../php/jQFormsUpdateUser.php",
      data: $("#userupdate-form").serialize(),
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.success) {
          alert("User Information Updated Successfully!");
          setTimeout(function () {
            animateForm();
          }, 2000);
        } else {
          alert(response.error);
        }
      },
      error: function () {
        alert("An error occurred. Please try again.");
      },
    });
  });

  $("#userupdate-form").validate({
    rules: {
      firstname: {
        required: true,
        minlength: 2,
      },
      lastname: {
        required: true,
        minlength: 2,
      },
      username: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        phoneUS: true, //additional method: phoneUS
        digits: true, //digits
      },
    },
    messages: {
      firstname: {
        required: "Please enter your first name",
        minlength: "Your first name must be at least 2 characters long",
      },
      lastname: {
        required: "Please enter your last name",
        minlength: "Your last name must be at least 2 characters long",
      },
      username: {
        required: "Please enter a username",
        minlength: "Your username must be at least 2 characters long",
      },
      email: {
        required: "Please enter your email address",
        email: "Please enter a valid email address",
      },
      phone: {
        phoneUS: "Only 10 digits number",
        digits: "Please enter US phone number(10 digits)",
      },
      errorPlacement: function (error, element) {
        error.appendTo(element.parent());
      },
    },
  });
});
