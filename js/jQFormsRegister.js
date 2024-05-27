$(document).ready(function() {
   // Prevent default form submission
   $('#registration-form').submit(function(e) {
    e.preventDefault();

      // AJAX request to jQFormsAddUser.php
      $.ajax({
        type: "POST",
        url: "../php/jQFormsAddUser.php",
        data: $(this).serialize(),
        dataType: "json",
        success: function(response) {
          console.log(response)
          if (response.success) {
            alert('Registration successful');
            window.location.href = '../index.html'; // Redirect to index.htm
          } else {
            alert(response.error);
          }
        },
        error: function() {
          alert('An error occurred. Please try again.');
        }
      })
  });

  $("#registration-form").validate({
    rules: {
      firstname: {
        required: true,
        minlength: 2
      },
      lastname: {
        required: true,
        minlength: 2
      },
      username: {
        required: true,
        minlength: 4
      },
      password: {
        required: true,
        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
      },
      confirmPassword: {
        required: true,
        equalTo: "#password"
      },
      email:{
        required:true,
        email: true
      },
      phone: {
        phoneUS: true,           //additional method: phoneUS
        digits: true             //digits

    },
    },
    messages: {
      firstname: {
        required: "Please enter your first name",
        minlength: "Your first name must be at least 2 characters long"
      },
      lastname: {
        required: "Please enter your last name",
        minlength: "Your last name must be at least 2 characters long"
      },
      username: {
        required: "Please enter a username",
        minlength: "Your username must be at least 4 characters long"
      },
      password: {
        required: "Please enter a password",
        pattern: "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long"
      },
      confirmPassword: {
        required: "Please confirm your password",
        equalTo: "Your passwords do not match"
      },
      email:{
        required: "Please enter your email address",
        email: "Please enter a valid email address"
      },
      phone: {
        phoneUS: "Only 10 digits number",
        digits: "Please enter US phone number(10 digits)"
    },
    errorPlacement: function (error, element) {
      error.appendTo(element.parent());
    }
    },
  });
});

