//This section is for the left side bar.
$(document).ready(function () {
    //Loading the letf side bar.
    $("#leftSideBar-mainjs").load("leftsidebar.html", function () {

        //Get elements
        const sidebarButtons = $('.sidebar-btn');
        const contentSections = $('.content-section');

        //Click function on left side bar(Edit profile only so far).
        sidebarButtons.on('click', function (e) {
            e.preventDefault(); 

            //Remove default active class from all button
            sidebarButtons.removeClass('active');
            //Add active class to the button that user clicked
            $(this).addClass('active');

            contentSections.hide();//Hide all contect section

            const sectionId = $(this).data('section');//display the section which the user clicked
            $(`#${sectionId}`).show();
        });

   $('input[data-section="edit-profile"]').addClass('active');//Active "edit-profile".
    });
});

// Logout button
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('input[data-section="logout"]');

    logoutBtn.addEventListener('click', () => {
        // Remove the current user from localStorage but keep user which means the user can re-login again.
        localStorage.removeItem('currentUser');

        // Confirm logout
        alert('You have been successfully logged out.');

        // Redirect to login page
        window.location.href = '/pages/login.html';
    });
});