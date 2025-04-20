let propertiesData = [];  // Declare a global variable to store property data

$(document).ready(async function () {

    // Get current user data from localStorage
    const currentUser = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    console.log("token:", token);

    // ===== OPEN/CLOSE POPUPS =====
    $('#propertyPopup').hide();

    $('#addPropertyBtn').on('click', function () {
        $('#propertyForm')[0].reset();
        $('#propertyForm').removeData('id'); 
        $('#propertyPopupTitle').text('Add Property');
        $('#propertyPopup').show();
    });    

    $('#editPropertyBtn').on('click', function () {
        $('#propertyForm')[0].reset();
        $('#propertyPopupTitle').text('Edit Property');
        $('#propertyPopup').show();
    });  

    $('#closePropertyPopup').on('click', function () {
        $('#propertyPopup').hide(); 
    });

    $('#closeWorkspacePopup').on('click', function () {
        $('#workspacePopup').hide(); 
    });

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

    // ===== LOAD PROPERTIES =====
$(document).ready(function () {
    loadProperties();  
});

    

// ===== SAVE PROPERTY =====
$('#saveProperty').on('click', async function () {
    const token = localStorage.getItem('token');
    const form = $('#propertyForm');
    const propertyId = form.data('id'); // Will be undefined for new property

    const isEdit = !!propertyId;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit 
        ? `http://localhost:3000/properties/${propertyId}`
        : `http://localhost:3000/properties`;

    try {
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
            ownerEmail: ownerData.email, 
        };

        const res = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(propertyData)
        });

        if (res.ok) {
            alert(propertyId ? 'Property updated!' : 'Property added!');
            $('#propertyPopup').hide();
            form[0].reset();
            form.removeData('id');
            
            // Load the properties again to show the new one
            loadProperties();
        } else {
            const errorData = await res.json();
            alert(`Failed to save property: ${errorData.message}`);
        }
    } catch (err) {
        console.error("Error saving property:", err);
        alert('Something went wrong.');
    }
});


// ===== LOAD PROPERTIES =====
async function loadProperties() {
    const token = localStorage.getItem('token');

    try {
        const res = await fetch('http://localhost:3000/properties', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        
        propertiesData = data.properties;
        
        console.log("Stored in propertiesData:", propertiesData); // confirm it worked

        $('#property-list').empty();

        propertiesData.forEach(property => {
            const propertyCard = `
                <div class="property-card" data-id="${property.propertyId}">
                    <h3>${property.name}</h3>
                    <p>${property.address1}, ${property.city}, ${property.province}</p>
                    <button class="edit-property-btn" data-id="${property.propertyId}">Edit</button>
                    <button class="delete-property-btn" data-id="${property.propertyId}">Delete</button>
                    </div>
            `;
            $('#property-list').append(propertyCard);
        });

    } catch (err) {
        console.error("Error loading properties:", err);
    }
}


// Edit Property Popup Action
$(document).on('click', '.edit-property-btn', function () {
    const propertyId = $(this).data('id');
    console.log('Edit button clicked. Property ID:', propertyId);

    // Find the property object from the globally stored propertiesData array
    const property = propertiesData.find(p => p.propertyId === propertyId);
    console.log('Found property object:', property);

    if (property) {
        openEditPopup(property); // Open the edit popup with the existing property data
    }
});

// Open the edit popup with existing property data
function openEditPopup(property) {
    console.log('Opening edit popup for property ID:', property.propertyId);

    // Show the popup (display: block)
    $('#propertyPopup').show();

    // Change the popup title to 'Edit Property'
    $('#propertyPopupTitle').text('Edit Property');  

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
    $('#propertyForm').data('id', property.propertyId);
    console.log('Property ID stored in form data:', property.propertyId);
}

//======= DELETE PROPERTY =======

$(document).on('click', '.delete-property-btn', async function () {
    const propertyId = $(this).data('id');
    console.log('Delete button clicked. Property ID:', propertyId);

    if (confirm('Are you sure you want to delete this property?')) {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/properties/${propertyId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert('Property deleted!');
                loadProperties(); // Reload properties after deletion
            } else {
                alert('Failed to delete property.');
            }
        } catch (err) {
            console.error("Error deleting property:", err);
        }
    }
});




 // ===== SAVE WORKSPACE =====
    $('#saveWorkspace').on('click', async function () {
        const propertyId = $('#workspacePopup').data('property-id');
        if (!propertyId) {
            alert('No property selected for workspace!');
            return;
        }

        const userData = JSON.parse(localStorage.getItem('userData'));  // Get user data from localStorage
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
            ownerEmail: userData.email  // Use owner email from the logged-in user
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
});