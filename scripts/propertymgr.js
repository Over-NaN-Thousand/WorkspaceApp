// Get current user data from localStorage

// Get current user data from localStorage and display it dynamically
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
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const userData = await response.json();

        if (response.ok) {
            // Store the user data in localStorage for later use
            localStorage.setItem('userData', JSON.stringify(userData));
        
            console.log("Setting user info...");
            console.log(userData);

        } else {
            alert("We cannot get your information!");
            window.location.href = "/WorkspaceApp/pages/login.html";
        }
    } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load user data.");
    }
});


$(document).ready(function () {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    // ===== OPEN/CLOSE POPUPS =====
    $('#addPropertyBtn').on('click', function () {
        $('#propertyForm')[0].reset();
        $('#propertyPopup h2').text('Add Property');
        $('#propertyPopup').css('display', 'flex');
    });

    $('#closePropertyPopup').on('click', function () {
        $('#propertyPopup').css('display', 'none');
    });

    $('#closeWorkspacePopup').on('click', function () {
        $('#workspacePopup').css('display', 'none');
    });

    // ===== SAVE PROPERTY =====
    $('#saveProperty').on('click', async function () {
        try {
            const form = $('#propertyForm');
            const propertyId = form.data('id'); // Will be undefined for new properties
            const method = propertyId ? 'PUT' : 'POST';
            const endpoint = propertyId
                ? `http://localhost:3000/properties/${propertyId}`
                : 'http://localhost:3000/properties';
    
            const ownerRes = await fetch(`http://localhost:3000/profile1`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!ownerRes.ok) throw new Error("Owner not found");
    
            const ownerData = await ownerRes.json();
    
            const propertyData = {
                name: $('#propertyName').val(),
                address1: $('#address1').val(),
                address2: $('#address2').val(),
                neighborhood: $('#neighborhood').val(),
                city: $('#city').val(),
                province: $('#province').val(),
                country: $('#country').val(),
                postalcode: $('#postalCode').val(),
                ownerId: ownerData.email
            };
    
            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(propertyData)
            });
    
            if (res.ok) {
                alert('Property saved!');
                $('#propertyPopup').hide();
                form[0].reset();
                form.removeData('id'); // Clear edit state
                loadProperties();
            } else {
                alert('Failed to save property.');
            }
        } catch (err) {
            console.error("Error saving property:", err);
            alert('Something went wrong.');
        }
    });
    

    // ===== SAVE WORKSPACE =====
    $('#saveWorkspace').on('click', async function () {
        const propertyId = $('#workspacePopup').data('property-id');
        if (!propertyId) {
            alert('No property selected for workspace!');
            return;
        }

        const workspaceData = {
            workspaceName: $('#workspaceName').val(),
            workspaceType: $('#workspaceType').val(),
            leaseTerm: $('#leaseTerm').val(),
            sqFt: parseInt($('#sqFt').val()),
            seatCapacity: parseInt($('#seatCapacity').val()),
            price: parseFloat($('#price').val()),
            rating: parseFloat($('#rating').val()),
            amenities: $('#amenities').val().split(',').map(a => a.trim()),
            propertyId: propertyId,
            ownerEmail: email
        };

        try {
            const res = await fetch('http://localhost:3000/addWorkspaces', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(workspaceData)
            });

            if (res.ok) {
                alert('Workspace saved!');
                $('#workspacePopup').css('display', 'none');
            } else {
                alert('Failed to save workspace.');
            }
        } catch (err) {
            console.error("Error saving workspace:", err);
            alert('Something went wrong.');
        }
    });

    $(document).ready(async function () {
        await loadProperties();
        });

  // ===== LOAD PROPERTIES =====
  async function loadProperties() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch("http://localhost:3000/properties", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log("Properties loaded:", data);
        console.log("propertyListContainer found:", document.getElementById('property-list'));
        const propertyListContainer = document.getElementById('property-list');
        if (!propertyListContainer) {
            console.error("Element with id 'property-list' not found!");
            return;
        }

        propertyListContainer.innerHTML = ''; // Clear previous content

        if (!data.properties || data.properties.length === 0) {
            propertyListContainer.innerHTML = "<p>No properties found.</p>";
            return;
        }
  
        data.properties.forEach(property => {
            const propertyDiv = document.createElement('div');
            propertyDiv.classList.add('property-item'); 
        
            propertyDiv.innerHTML = `
                <h3>${property.name}</h3>
                <p>${property.address1}, ${property.address2}</p>
                <p>${property.neighborhood}</p>
                <p>${property.city}, ${property.province} ${property.postalcode}</p>
                <p>${property.country}</p>
                <button class="edit-property-btn" data-id="${property._id}">Edit Property</button>
            `;
            propertyListContainer.appendChild(propertyDiv);

            document.querySelectorAll('.edit-property-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const propertyId = e.target.getAttribute('data-id');
                    const property = data.properties.find(p => p._id === propertyId);
                    if (property) {
                        openEditPopup(property);
                    }
                });
            });

        });
    } catch (err) {
        console.error("Error in loadProperties:", err);
    }}});

    // ===== OPEN EDIT POPUP =====
    function openEditPopup(property) {
        const form = $('#propertyForm');
    
        // Show popup centered
        $('#propertyPopup').css('display', 'flex'); 
        $('#propertyPopup h2').text('Edit Property');
    
        // Fill form with existing property data
        $('#propertyName').val(property.name);
        $('#address1').val(property.address1);
        $('#address2').val(property.address2);
        $('#neighborhood').val(property.neighborhood);
        $('#city').val(property.city);
        $('#province').val(property.province);
        $('#country').val(property.country);
        $('#postalCode').val(property.postalcode);
    
        // Store property _id for PUT request later
        form.data('id', property._id);
    }
    
    
