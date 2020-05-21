
// Note: This javascript file references functions from the util.js file

$(document).ready(function () {

  const $usernameInput = $("#name-input");
  const $fullNameInput = $("#full-name-input");
  const $passwordInput = $("#password-input");
  const $passwordConfirmInput = $("#password-confirm-input");
  const formTitle = "Create User Account";

  // Call API to log the user in
  async function signUpUser(userData) {
    return $.ajax({
      url: "/api/signup",
      method: "POST",
      data: userData,
    });
  }

  // Event handler for sign up form submit - create user and redirect to the homepage
  async function submitSignupForm(event) {
    try {
      event.preventDefault();
      const userData = {
        name: $usernameInput.val().trim(),
        password: $passwordInput.val(),
        fullName: $fullNameInput.val()
      };
      const confirmPassword = $passwordConfirmInput.val();

      if (!userData.name || !userData.fullName || !userData.password) {
        return showMessage("Please enter your name, user name and password!", formTitle);
      }

      if (userData.password !== confirmPassword) {
        return showMessage("Password does not match the confirm password!", formTitle);
      }

      result = await signUpUser(userData);
      if (result) {
        window.location.replace("/");
      }
    } catch (error) {
      handleError(error);
    }
  }

  // Event Handlers
  $("form.signup").on("submit", submitSignupForm);

});
