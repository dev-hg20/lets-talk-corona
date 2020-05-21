
// Note: This javascript file references functions from the util.js file

$(document).ready(function () {

  const $usernameInput = $("input#name-input");
  const $passwordInput = $("input#password-input");
  const formTitle = "Sign in";

  // Call API to log the user in
  async function loginUser(userData) {
    return $.ajax({
      url: "/api/login",
      method: "POST",
      data: userData,
    });
  }

  // Event handler for login form submit - validate user details and redirect to the homepage
  async function submitLoginForm(event) {
    try {
      event.preventDefault();
      const userData = {
        name: $usernameInput.val().trim(),
        password: $passwordInput.val().trim()
      };

      if (!userData.name || !userData.password) {
        return showMessage("Please enter a user name and password!", formTitle);
      }

      result = await loginUser(userData);
      if (result) {
        window.location.replace("/");
      }
    } catch (error) {
      if (error.status === 401) {
        return showMessage("Incorrect user name or password!", formTitle);
      }
      handleError(error);
    }
  }

  // Event Handlers
  $("form.login").on("submit", submitLoginForm);

});
