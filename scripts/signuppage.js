// Event listener for form submission
document.querySelector('.informationForm form').addEventListener('submit', handleSignup);

function handleSignup(event) {
    event.preventDefault();

    // Get form values
    const firstName = document.querySelector('input[placeholder="First Name"]').value;
    const lastName = document.querySelector('input[placeholder="Last Name"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const accountType = document.querySelector('.custom-select').value;

    // Validate input fields
    if (!firstName || !lastName || !email || !password || !accountType) {
        alert('Please fill in all information.');
        return;
    }

    // Determine user role based on selected account type
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        password,
        owner: accountType === 'list' || accountType === 'both' ? "Yes" : "No",
        coworker: accountType === 'rent' || accountType === 'both' ? "Yes" : "No"
    };

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user
    users.push(newUser);

    // Store updated users array in localStorage
    localStorage.setItem('users', JSON.stringify(users));

    
    alert('Registration successful! You can now log in.');

    // Redirect to login page
    window.location.href = '/WorkspaceApp/pages/login.html';
    
    //For testing
    console.log(newUser);
}
