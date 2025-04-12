// Event listener for form submission
document.querySelector('.informationForm form').addEventListener('submit', handleSignup);

async function handleSignup(event) {
    event.preventDefault();

    // Get form values
    const firstName = document.querySelector('input[placeholder="First Name"]').value;
    const lastName = document.querySelector('input[placeholder="Last Name"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const phoneNumber=document.querySelector('input[type="tel"]').value;
    const accountType = document.querySelector('.custom-select').value;

    // Validate input fields
    if (!firstName || !lastName || !email || !password || !accountType) {
        alert('Please fill in all information.');
        return;
    }

    // Determine user role based on selected account type
    const newUser = {
        //Will use email as an identifier
        //id: Date.now(),
        //Will use email as an identifier
        //id: Date.now(),
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        owner: accountType === 'list' || accountType === 'both' ? "Yes" : "No",
        coworker: accountType === 'rent' || accountType === 'both' ? "Yes" : "No"
    };

    try {
        const response = await fetch("http://localhost:3000/register", {  //Connect to /register
            method: "POST", //Request POST
            headers: {
                "Content-Type": "application/json" //Tell the database it's in json format
            },
            body: JSON.stringify(newUser) //Covert newUser to JSON string
        });


        if (response.ok) {
            alert(`Welcome ${firstName} !`);
            localStorage.removeItem("token"); //Delete token if exsited (previous user) to avoid doulbe token store in local storage
            localStorage.removeItem("email");
            window.location.href = "/WorkspaceApp/pages/login.html";
        } else {
            alert("Regiter failed!!");
        }
    } catch (error) {
        alert("Something went wrong, please try again later.");
    }
}




























//***************These are for localstorage****************** */
/*
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
}*/
}*/
