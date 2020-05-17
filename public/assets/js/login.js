
// Note: This javascript file references functions from the util.js file

$(document).ready(function () {

  const $usernameInput = $("input#name-input");
  const $passwordInput = $("input#password-input");
  const formTitle = "Sign in";

  // Call API to log the user in - if successful, redirect to the homepage
  function loginUser(userData) {
    $.post("/api/login", userData)
      .then(function () {
        window.location.replace("/");
      })
      .catch(function (error) {
        if (error.status === 401) {
          return showMessage("Incorrect user name or password!", formTitle);
        }
        handleError(error);
      });
  }

  // Event handler for login form submit - validate user details
  function submitLoginForm(event) {
    event.preventDefault();
    const userData = {
      name: $usernameInput.val().trim(),
      password: $passwordInput.val().trim()
    };

    if (!userData.name || !userData.password) {
      return showMessage("Please enter a user name and password!", formTitle);
    }

    loginUser(userData);
  }

  // Event Handlers
  $("form.login").on("submit", submitLoginForm);

});
