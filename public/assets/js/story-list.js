// Note: This javascript file references functions from the util.js file
// It is responsible for displaying the story list and providing the
// new / remove / edit story functions.
// It is used by the homepage AND the user-profile page

$(document).ready(function () {
  const $titleInput = $("#new-story-title");
  const $bodyTextarea = $("#new-story-body");
  const $categorySelect = $("#new-story-category");
  const $storyListDiv = $(".user-stories");
  const formTitle = "Add Story";
  const selectedCategoryId = $storyListDiv.data("selected-category");
  const currentUserId = $storyListDiv.data("userid");
  const currentPageMode = $storyListDiv.data("page-mode");

  // Page display mode - homepage or the user-profile page
  const pageMode = {
    UserProfile: "user-profile",
    Homepage: "homepage"
  };

  // Returns the query url for fetching list of stories based on the
  // page the user is on and the category selected
  function getStoryListUrl() {
    if (currentPageMode === pageMode.UserProfile) {
      // User Profile mode - return user stories
      return "/api/user/stories/";
    }
    // Story list is being displayed in the homepage
    if (selectedCategoryId > 0) {
      // Load stories by category
      return `/api/stories/category/${selectedCategoryId}`;
    }
    // Load all stories
    return "/api/stories/";
  }

  // Call API to get stories from the db based on the current selection
  async function getStories() {
    let queryUrl = getStoryListUrl();
    return $.ajax({
      url: queryUrl,
      method: "GET",
    });
  }

  // Call API to create a new story
  async function createStory(userData) {
    const result = await $.ajax({
      url: "/api/stories",
      method: "POST",
      data: userData,
    });

    //Check if records updated successfuly
    if (result !== undefined && result.id > 0) {
      return true;
    }
    return false;
  }

  // Call API to delete a story
  async function deleteStory(storyId) {
    const result = await $.ajax({
      url: `/api/stories/${storyId}`,
      method: "DELETE",
    });
    //Check if records updated successfuly
    if (result !== undefined && result > 0) {
      return true;
    }
    return false;
  }

  // Clear story form data
  function clearStoryForm() {
    $titleInput.val("");
    $bodyTextarea.val("");
    M.textareaAutoResize($bodyTextarea);
    if (selectedCategoryId > 0) {
      // Set current category
      $categorySelect.val(selectedCategoryId);
      $categorySelect.prop("disabled", true);
      $categorySelect.formSelect();
    } else {
      $categorySelect.prop("selectedIndex", 0);
      $categorySelect.prop("disabled", false);
      $categorySelect.formSelect();
    }
  }

  // This function renders the given stories collection onto the UI
  function renderStories(stories) {
    $storyListDiv.empty();
    if (!Array.isArray(stories)) {
      // No stories loaded
      return;
    }
    stories.forEach((story) => {
      const dateCreated = moment(story.createdAt);
      const formattedDate = dateCreated.format("ddd, MMMM D");
      const formattedTime = dateCreated.format("h:mm a");
      const setVisibility = story.UserId === currentUserId ? "" : "hide";
      let storyByUser = (currentPageMode === pageMode.UserProfile) ? "" : ` by ${story.User.name}`;
      const storyHTML = `
            <div class="card" data-story-id="${story.id}">
                <div class="story-header row">
                    <div class="col s8 m10">
                        <span class="story-title teal-text">${story.title}</span>
                        <label>${storyByUser} on ${formattedDate} at ${formattedTime}</label>
                    </div>
                    <div class="col s4 m2 right-align">
                        <a class="teal-text edit-story ${setVisibility}" href="/story?id=${story.id}&callback=${currentPageMode}&category=${selectedCategoryId}"><i class="material-icons smaller">edit</i></a>
                        <a class="red-text delete-story ${setVisibility}" href="#"><i class="material-icons smaller">clear</i></a>
                    </div>
                </div>
                <div class="card-content story-content">${story.body}</div>
            </div>`;
      const storyCard = $(storyHTML);
      $storyListDiv.append(storyCard);
    });
  }

  // Gets stories from the db based on the current selection and
  // renders them on the panel
  async function fetchAndRenderStories() {
    try {
      const stories = await getStories();
      renderStories(stories);
    } catch (error) {
      handleError(error);
    }
  }

  // Event handler for post button click
  async function postButtonClick() {
    try {
      const newStory = {
        title: $titleInput.val().trim(),
        body: $bodyTextarea.val().trim(),
        CategoryId: $categorySelect.val(),
        UserId: currentUserId,
      };

      if (!newStory.title || !newStory.body) {
        return showMessage("Please enter a title and story!", formTitle);
      }

      if (await createStory(newStory)) {
        // Load the stories again
        displayStatus("Story added successfully!");
        clearStoryForm();
        fetchAndRenderStories();
        return;
      }
      return showMessage("Unable to add new story!", formTitle);
    } catch (error) {
      if (error.status === 401) {
        return showMessage("Please sign in to add a new story!", formTitle);
      }
      handleError(error);
    }
  }

  // Event handler for delete story click - delete story
  async function deleteStoryClick(event) {
    try {
      event.preventDefault();
      const $storyCard = $(this).closest(".card");
      const storyId = $storyCard.data("story-id");

      if (await deleteStory(storyId)) {
        // Remove this story from the UI
        displayStatus("Story deleted!");
        $storyCard.remove();
        return;
      }
      return showMessage(
        "Unable to delete this story - story not found!",
        formTitle
      );
    } catch (error) {
      handleError(error);
    }
  }

  // Event handlers
  $(".btn-post").on("click", postButtonClick);
  $(".btn-clear").on("click", clearStoryForm);
  $storyListDiv.on("click", ".delete-story", deleteStoryClick);

  // Initialize materialize controls
  $(".collapsible").collapsible();

  // Gets and renders the list of stories
  fetchAndRenderStories();
  clearStoryForm();
});
