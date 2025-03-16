import { users as initialUsers } from './data/userdata.js';
import { properties as initialProperties } from './data/propertydata.js';
import { workspaces as initialWorkspaces } from './data/workspacedata.js';

document.querySelector('.informationForm form').addEventListener('submit', handleLogin);

function handleLogin(event) {
    event.preventDefault();

    
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users'));

    //If there is no data in localStore, get mock data from userdat.js
    if (!users || users.length === 0) {
        users = initialUsers;
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Check user credentials
    const currentUser = users.find(user => user.email === email && user.password === password);

    if (!currentUser) {
        alert('Invalid email or password.');
        return;
    }


    // Save current user to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    //For testing used, get items from data file.
    if (!localStorage.getItem('properties')) {
        localStorage.setItem('properties', JSON.stringify(initialProperties));
    }
    if (!localStorage.getItem('workspaces')) {
        localStorage.setItem('workspaces', JSON.stringify(initialWorkspaces));
    }



    alert('Login successful!');
    // Redirect user to account page
    window.location.href = '/pages/accountpage.html';
}
