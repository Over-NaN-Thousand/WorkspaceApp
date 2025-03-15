//This session is for the left side bar.
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

//This session is for the "Edit Profile" page.
$(document).ready(function() {
    // Get current user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('No user logged in. Redirecting to login page.');
        window.location.href = '/pages/login.html';
        return;
    }

    // Display user infomations
    $('#user-id').text(currentUser.id);
    $('#first-name').text(currentUser.firstName);
    $('#last-name').text(currentUser.lastName);
    $('#email').text(currentUser.email);
    $('#owner-status').text(currentUser.owner);
    $('#coworker-status').text(currentUser.coworker);


    // This session is for changing password
    $('#save-password').click(function(){
        const currentPassword = $('#current-password').val();
        const newPassword = $('#new-password').val();
        const confirmPassword = $('#confirm-password').val();
        
        //Checking does current password match with password in the database
        if (currentPassword !== currentUser.password) {
            $('#password-message').text('Current password is incorrect.');
            return;
        }

        //Checking does new and confirm password match.
        if (newPassword !== confirmPassword) {
            $('#password-message').text('New passwords do not match.');
            return;
        }

        // Update password in currentUser and localStorage
        currentUser.password = newPassword;
        $('#password-message').text('Password changed successfully.');

        // Update user data in localStorage
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(user => user.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        }

        // Clear input fields
        $('#current-password, #new-password, #confirm-password').val('');
    });
});
