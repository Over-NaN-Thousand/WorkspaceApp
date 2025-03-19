//Script file for public used.
$(document).ready(function(){
    $("#header-mainjs").load("html/header.html");
    $("#footer-mainjs").load("html/footer.html");
    $("#leftSideBar-mainjs").load("html/leftsidebar.html");

    $(document).on("click", "#citiesLink", function (event) {
        event.preventDefault();
        const $navMenu = $("#navMenu");

        if ($navMenu.is(":visible")) {
            $navMenu.hide();
        } else {
            $navMenu.show();
        }

        event.stopPropagation(); //prevent the clicking event to go to the document, since the link IS inside the doc, if not this will trigger the event below and just hide the dropdown immediately. source: Copilot told me
    });

    $(document).on("click", function (event) {
        const $navMenu = $("#navMenu");

        if (!$navMenu.is(event.target) && 
            !$navMenu.has(event.target).length && 
            !$(event.target).is("#citiesLink")) 
        {
            $navMenu.hide();
        }
    });

});