
// Note: This javascript file references functions from the util.js file

$(document).ready(function () {

    const $titleInput = $("#new-story-title");
    const $bodyTextarea = $("#new-story-body");
    const $categorySelect = $("#new-story-category");
    const $storyListDiv = $(".user-stories");
    const formTitle = "Add Story";

    function getCurrentUser() {
        return $(".current-user").data("userid");
    }

    // Call API to get all stories from the db
    async function getStories() {
        return $.ajax({
            url: "/api/stories",
            method: "GET"
        });
    }

    function renderStories(stories) {
        $storyListDiv.empty();
        if (!Array.isArray(stories)) {
            // No stories loaded
            return;
        }
        stories.forEach(story => {
            const dateCreated = moment(story.createdAt);
            const formattedDate = dateCreated.format("dddd, MMMM Do YYYY");
            const storyHTML = `
            <div class="card">
                <div class="card-action">
                    <span class="story-title teal-text">${story.title}</span>
                    <label>by ${story.User.name} on ${formattedDate}</label>
                </div>
                <div class="card-content">
                    ${story.body}
                </div>
            </div>`;
            $storyListDiv.append($(storyHTML));
        });
    }

    // Gets stories from the db and renders them on the panel
    async function fetchAndRenderStories() {
        try {
            const stories = await getStories();
            renderStories(stories);
        } catch (error) {
            handleError(error);
        }
    }

    // Call API to create a new story - if successful, redirect to the homepage
    function createStory(userData) {
        $.post("/api/stories", userData)
            .then(function () {
                window.location.replace("/");
            })
            .catch(function (error) {
                if (error.status === 401) {
                    return showMessage("Please sign in to add a new story!", formTitle);
                }
                handleError(error);
            });
    }

    // Event handler for post button click - create new post
    function postButtonClick() {
        const newStory = {
            title: $titleInput.val().trim(),
            body: $bodyTextarea.val().trim(),
            CategoryId: $categorySelect.val(),
            UserId: getCurrentUser()
        };

        if (!newStory.title || !newStory.body) {
            return showMessage("Please enter a title and story!", formTitle);
        }

        createStory(newStory);
    }

    // Clear story form data
    function clearStoryForm() {
        $titleInput.val("");
        $bodyTextarea.val("");
        $categorySelect.val($("#new-story-category option:first").val());
        $categorySelect.formSelect();
    }

    // Event handlers
    $(".btn-post").on("click", postButtonClick);
    $(".btn-clear").on("click", clearStoryForm);

    // Initialize controls
    $('.collapsible').collapsible();
    $categorySelect.formSelect();

    // Gets and renders the list of stories
    fetchAndRenderStories();
});