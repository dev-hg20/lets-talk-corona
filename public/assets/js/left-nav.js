
// This javascript file has functions used by the left navigation panel

$(document).ready(function () {
    const $leftNavigationPanel = $(".left-nav-panel");
    const category = $leftNavigationPanel.data("selected-category");
    const $selectedCategoryTitle = $(".selected-category-title");

    if (category > 0) {
        const $category = $leftNavigationPanel.find(`.collection-item[data-id='${category}']`);
        $category.addClass('active');
        if ($selectedCategoryTitle) {
            $selectedCategoryTitle.text($category.text());
            $selectedCategoryTitle.parent().show();
        }
    } else {
        $leftNavigationPanel.find(`.collection-item[data-id='all']`).addClass('active');
        if ($selectedCategoryTitle) {
            $selectedCategoryTitle.text("");
            $selectedCategoryTitle.parent().hide();
        }
    }
});
