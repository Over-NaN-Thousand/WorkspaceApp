$(document).ready(function () {
    //Loading the letf side bar.
    $("#leftSideBar-mainjs").load("leftsidebar.html", function () {

        //Get elements
        const sidebarButtons = $('.sidebar-btn');
        const contentSections = $('.content-section');

        //Click function on left side bar(Edit profile only so far)
        sidebarButtons.on('click', function (e) {
            e.preventDefault(); 

            //Remove default active class for all button
            sidebarButtons.removeClass('active');
            //Add active class to the one user pointing
            $(this).addClass('active');

            contentSections.hide();

            const sectionId = $(this).data('section');
            $(`#${sectionId}`).show();
        });

        $('input[data-section="edit-profile"]').addClass('active');
    });
});