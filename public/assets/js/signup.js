
// Note: This javascript file references functions from the util.js file

$(document).ready(function () {

  const $usernameInput = $("input#name-input");
  const $passwordInput = $("input#password-input");
  const formTitle = "Create User Account";

  // Call API to log the user in - if successful, redirect to the homepage
  function signUpUser(userData) {
    $.post("/api/signup", userData)
      .then(function () {
        window.location.replace("/");
      })
      .catch(function (error) {
        handleError(error);
      });
  }

  // Event handler for sign up form submit - validate user details
  function submitSignupForm(event) {
    event.preventDefault();
    const userData = {
      name: $usernameInput.val().trim(),
      password: $passwordInput.val().trim()
    };

    if (!userData.name || !userData.password) {
      return showMessage("Please enter a user name and password!", formTitle);
    }

    signUpUser(userData);
  }

  // Event Handlers
  $("form.signup").on("submit", submitSignupForm);

});
