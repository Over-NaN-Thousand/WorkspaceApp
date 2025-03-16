document.querySelector('.informationForm form').addEventListener('submit', handleLogin);

function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check user credentials
    const currentUser = users.find(user => user.email === email && user.password === password);

    if (!currentUser) {
        alert('Invalid email or password.');
        return;
    }

    // Save current user to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert('Login successful!');
    // Redirect user to account page
    window.location.href = '/WorkspaceApp/pages/accountpage.html';
}
