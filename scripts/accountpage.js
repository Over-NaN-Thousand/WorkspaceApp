$(document).ready(function () {

    $("#header-mainjs").load("header.html");
    $("#leftSideBar-mainjs").load("leftsidebar.html", function () {

        const sidebarButtons = $('.sidebar-btn');
        const contentSections = $('.content-section');

        sidebarButtons.on('click', function (e) {
            e.preventDefault(); 


            sidebarButtons.removeClass('active');

            $(this).addClass('active');


            contentSections.hide();

            const sectionId = $(this).data('section');
            $(`#${sectionId}`).show();
        });


        $('input[data-section="edit-profile"]').addClass('active');
    });
    $("#footer-mainjs").load("footer.html");
});