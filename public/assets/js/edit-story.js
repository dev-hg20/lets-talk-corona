
// Note: This javascript file references functions from the util.js file

$(document).ready(function () {

    const $titleInput = $("#edit-story-title");
    const $bodyTextarea = $("#edit-story-body");
    const $categorySelect = $("#edit-story-category");
    const formTitle = "Update Story";
    const currentUserId = $(".edit-story").data("userid");
    const currentCallbackPage = $(".edit-story").data("callback-page");
    const selectedCategoryId = $(".edit-story").data("selected-category");

    // This page can be called from the homepage OR the user-profile page
    // Callback page refers to the page it needs to redirect to when completed
    const CallbackPage = {
        UserProfile: "user-profile",
        Homepage: "homepage"
    };

    // Call API to update story
    async function updateStory(userData) {
        const result = await $.ajax({
            url: "/api/stories",
            method: "PUT",
            data: userData
        });

        //Check if records updated successfuly
        if (result !== undefined
            && result.length > 0 && result[0] === 1) {
            return true;
        }
        return false;
    }

    // Returns the relative path to the current callback page
    function getCallbackPage() {
        if (currentCallbackPage === CallbackPage.UserProfile) {
            // User Profile mode
            return "/profile";
        }
        // return current category
        if (selectedCategoryId > 0) {
            // Load by category
            return `/?category=${selectedCategoryId}`;
        }
        // return application homepage
        return "/";
    }

    // Event handler for save button click - if successful, redirect to the calling page
    async function saveButtonClick(event) {
        try {
            event.preventDefault();
            const selectedStory = {
                id: $(this).data("story-id"),
                title: $titleInput.val().trim(),
                body: $bodyTextarea.val().trim(),
                CategoryId: $categorySelect.val(),
                UserId: currentUserId
            };

            if (!selectedStory.title || !selectedStory.body) {
                return showMessage("Please enter a title and story!", formTitle);
            }

            if (await updateStory(selectedStory)) {
                // Display status and wait 2 seconds before redirecting to homepage
                displayStatus("Story updated!");
                setTimeout(() => {
                    window.location.replace(getCallbackPage());
                }, 2000);
                return;
            }
            return showMessage("Unable to update this story - story not found!", formTitle);
        } catch (error) {
            if (error.status === 401) {
                return showMessage("Please sign in to update this story!", formTitle);
            }
            handleError(error);
        }
    }

    // Event handler for cancel button click - redirect to the calling page
    function cancelButtonClick() {
        window.location.replace(getCallbackPage());
    }

    // Event handlers
    $(".btn-save").on("click", saveButtonClick);
    $(".btn-cancel").on("click", cancelButtonClick);

    // Initialize controls -- load category
    $categorySelect.val($categorySelect.data("selected"));
    $categorySelect.formSelect();
});