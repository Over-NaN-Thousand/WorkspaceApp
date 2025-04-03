//This section is for the left side bar.
$(document).ready(function () {
    //Loading the letf side bar.
    $("#leftSideBar-mainjs").load("html/leftsidebar.html", async function () {

        // Get current user data from localStorage
        const currentUser = localStorage.getItem('email');
        const token = localStorage.getItem('token');

        if (!currentUser || !token) {
            alert('No user logged in. Redirecting to login page.');
            window.location.href = '/WorkspaceApp/pages/login.html';
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/profile2", {
                method: "GET",
                headers: {//Decoding
                    Authorization: `Bearer ${token}`//Decoding
                }
            });
            const userData = await response.json(); //Wait for backend to send back to frontend then store in data
            if (response.ok) {
                document.getElementById("first-name").textContent = userData.firstName;
                document.getElementById("owner-status").textContent = userData.owner;
                document.getElementById("coworker-status").textContent = userData.coworker;

            }
            else {
                alert("We can not get your information!")
                window.location.href = "/WorkspaceApp/pages/login.html";
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Failed to load user data.");
            console.log("Received from /profile:", data);
        }
    });

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

