
// Get current user data from localStorage

$(document).ready(async function () {
    const currentUser = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    console.log("token:", token);

    if (!currentUser || !token) {
        alert('No user logged in. Redirecting to login page.');
        window.location.href = '/WorkspaceApp/pages/login.html';
        return;
    }
    try {

        const response = await fetch("http://localhost:3000/profile1", {

            method: "GET",
            headers: {//Decoding
                Authorization: `Bearer ${token}`//Decoding
            }
        });
        const userData = await response.json(); //Wait for backend to send back to frontend then store in data
        if (response.ok) {
            console.log("Setting user info...");
            document.getElementById("email").textContent = userData.email;
            document.getElementById("phone").textContent = userData.phoneNumber;
            document.getElementById("owner-status").textContent = userData.owner;
            document.getElementById("coworker-status").textContent = userData.coworker;
            document.getElementById("profile-first-name").textContent = userData.firstName;
            document.getElementById("last-name").textContent = userData.lastName;
            console.log("userData:", userData);
        }
        else {
            alert("We can not get your information!")
            window.location.href = "/WorkspaceApp/pages/login.html";
        }
    } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load user data.");
        console.log("Received from /profile1:", data);
    }
});
/*
    // Display user infomations
$('#user-id').text(currentUser.id);
$('#first-name').text(currentUser.firstName);
$('#last-name').text(currentUser.lastName);
$('#email').text(currentUser.email);
$('#owner-status').text(currentUser.owner);
$('#coworker-status').text(currentUser.coworker);*/


// This session is for changing password
$('#save-password').click(async function () {
    const newPassword = document.getElementById("new-password").value;
    const currentPassword = document.getElementById("current-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const token = localStorage.getItem('token');
    console.log("token:",token);

    //Checking does new and confirm password match.
    if (newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/changePassword", {

            method: "PATCH",
            headers: {//Decoding
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`//Decoding
            },
            body: JSON.stringify({
                newPassword,
                currentPassword,
                confirmPassword
            })
        });
        const data = await response.json();
        if (!response) {
            alert("Something went wrong, please try again!");
        } else {
            alert("Your password has been changed! Please re-login again");
            window.location.href = "/WorkspaceApp/pages/login.html";
        }
    } catch (err) {
        alert("Failed to change your password!.");
    }
});


// This session is for the "Edit Profile" page.
$(document).ready(function() {
    // Get current user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('No user logged in. Redirecting to login page.');
        window.location.href = '/WorkspaceApp/pages/login.html';
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

        document.addEventListener('DOMContentLoaded', () => {
            const deleteButton = document.getElementById('delete-property-btn');
            deleteButton.addEventListener('click', () => {
                alert('Delete Property button clicked!');
                // Add logic to delete a property
            });
        });

        // Clear input fields
        $('#current-password, #new-password, #confirm-password').val('');
    });
});
