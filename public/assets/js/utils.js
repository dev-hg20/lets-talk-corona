// This file contains utility functions available to all pages rendered in the application
// Note: Since these methods are not used locally, we need to turn off the no-unused-vars linting rule

/**
 * Shows the given message in a modal panel
 * @param {string} message the message to be displayed in the modal
 * @param {string} title the title to be displayed by the modal (defaults to the app name)
 */
// eslint-disable-next-line no-unused-vars
function showMessage(message, title = "Lets Talk Corona!") {
    $(".modal-header").text(title);
    $("#modal-message").html(message);
    $("#search-modal").modal({ opacity: 0.2 });
    $("#search-modal").modal("open");
}

/**
 * Shows an error message in a modal panel and logs it
 * @param {object} error the error object
 */
// eslint-disable-next-line no-unused-vars
function handleError(error) {
    console.error(error);
    let errorMessage = `${error.statusText} <br>`;
    if (error.responseJSON
        && Array.isArray(error.responseJSON.errors)
        && error.responseJSON.errors.length > 0) {
        errorMessage += error.responseJSON.errors[0].message;
    } else {
        errorMessage += (error.responseText) ? error.responseText : "";
    }
    showMessage(errorMessage, "Error!");
}

// Wait for document to be loaded before initilizing the modal dialog
$(document).ready(function () {
    // Initialize UI Elements
    $(".modal").modal();
});