$(document).ready(function() {
    // Prevent default form submission
    $('#login-form').submit(function(e) {
      e.preventDefault();

      let email = $('#email').val();
      let password = $('#password').val();

      //Javascript Validation
      if (email.trim() === '' || password.trim() === '') {
        alert('Please enter email and password');
        return;
      }

      // AJAX request to jQFormsLogin.php
      $.ajax({
        type: "POST",
        url: "../php/jQFormsLogin.php",
        data: $(this).serialize(),
        dataType: "json",
        success: function(response) {
          console.log(response)
          if (response.success) {
            alert('Login successful');
            window.location.href = '../index.html'; // Redirect to index.html
          } else {
            alert(response.error);
          }
        },
        error: function() {
          alert('An error occurred. Please try again.');
        }
      })
    });

    $("#login-form").validate({
      rules: {
        email:{
          required:true,
          email: true
        },
        password: {
          required: true,
          pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        }
      },
      messages: {
        email:{
          required: "Please enter your email address",
          email: "Please enter a valid email address"
        },
        password: {
          required: "Please enter your password.",
          pattern: "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long"

        }
      },
      errorPlacement: function (error, element) {
        error.insertAfter(element); // Display error message after the input element
      }
    })
  });