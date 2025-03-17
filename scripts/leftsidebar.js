//This section is for the left side bar.
$(document).ready(function () {
    //Loading the letf side bar.
    $("#leftSideBar-mainjs").load("leftsidebar.html", function () {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));


        $('#user').text(currentUser.firstName);
        $('#owner').text(currentUser.owner);
        $('#coworker').text(currentUser.coworker);

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

            // If clicked logout
            if (sectionId === 'logout') {
                // Clear currentUser in localStorage
                localStorage.removeItem('currentUser');
                alert('You have been successfully logged out.');
                window.location.href = '/WorkspaceApp/pages/login.html';
                return; 
            }

            if (sectionId === 'my-properties') {
                window.location.href = '/WorkspaceApp/pages/propertymgr.html';
                return; 
            }

            
            if (sectionId === 'workspaces') {
                window.location.href = '/WorkspaceApp/pages/search.html';
                return; 
            }
            $(`#${sectionId}`).show();
        });

   $('input[data-section="edit-profile"]').addClass('active');//Active "edit-profile".
    });
});