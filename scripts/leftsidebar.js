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
                document.getElementById("sidebar-first-name").textContent = userData.firstName;
            
                // Set owner status
                let ownerStatusText = userData.owner === "Yes" ? "Owner" : "";
                let coworkerStatusText = userData.coworker === "Yes" ? "Coworker" : "";
            
                // Combine statuses
                let statusMessage = "";
                if (ownerStatusText && coworkerStatusText) {
                    statusMessage = `You are an ${ownerStatusText} and a ${coworkerStatusText}`;
                } else if (ownerStatusText) {
                    statusMessage = `You are an ${ownerStatusText}`;
                } else if (coworkerStatusText) {
                    statusMessage = `You are a ${coworkerStatusText}`;
                }
            
                // Display the message in the sidebar
                document.getElementById("sidebar-owner-coworker-status").textContent = statusMessage;
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


    //Click function on left side bar(Edit profile only so far).
    $(document).on('click', '.sidebar-btn', function (e) {
        e.preventDefault();



        //Remove default active class from all button
        $('.sidebar-btn').removeClass('active');
        //Add active class to the button that user clicked
        $(this).addClass('active');

        const sectionId = $(this).data('section');//display the section which the user clicked

        // If clicked logout
        if (sectionId === 'logout') {
            // Clear currentUser in localStorage
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            alert('You have been successfully logged out.');
            window.location.href = '/WorkspaceApp/pages/login.html';
            return;
        }

        if (sectionId === 'propertymgr') {
            window.location.href = '/WorkspaceApp/pages/propertymgr.html';
            return;
        }


        if (sectionId === 'search') {
            window.location.href = '/WorkspaceApp/pages/search.html';
            return;
        }
        if (sectionId === 'accountpage') {
            window.location.href = '/WorkspaceApp/pages/accountpage.html';
            return;
        }
        if (sectionId === 'review') {
            window.location.href = '/WorkspaceApp/pages/reviews.html';
            return;
        }
        $(`#${sectionId}`).show();
    });

    $('input[data-section="edit-profile"]').addClass('active');//Active "edit-profile".
});
