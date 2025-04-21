let propertiesData = [];  // Declare a global variable to store property data

let workspacesData = {};  // Global object to store workspaces per property
let currentPropertyId = null;
let currentWorkspaceID = null;

// =============================================== PROPERTY MANAGER ===========================================================


$(document).ready(async function () {

    // Get current user data from localStorage
    const currentUser = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    console.log("token:", token);


    await loadProperties();

    // ===== OPEN/CLOSE POPUPS =====
    $('#propertyPopup').hide();
    $('#workspacePopup').hide();

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
    
    // Delegated because buttons are created dynamically
    $(document).on('click', '.add-workspace-btn', function () {
        const propertyId = $(this).data('property-id');
        $('#workspaceForm')
            .removeData('id') // Clear any existing workspace ID
            .data('property-id', propertyId); // Set the current property ID
        $('#workspacePopupTitle').text('Add Workspace');
        $('#workspaceForm')[0].reset();
        $('#workspacePopup').show();
    });

     $(document).on('click', '#edit-Workspace-Btn', function () {
        currentWorkspaceID = $(this).data('id'); // get from button
        $('#workspaceForm').data('id', currentWorkspaceID);
        $('#workspacePopupTitle').text('Edit Workspace');
        $('#workspacePopup').show();
    });


    $('#closePropertyPopup').on('click', function () {
        $('#propertyPopup').hide(); 
    });


    $(document).on('click', '#closeWorkspacePopup', function () {

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

        $('#property-list').empty();

        propertiesData.forEach(property => {
            const propertyCard = `
                <div class="property-card" data-property-id="${property.propertyId}">
                    <h3>${property.name}</h3>
                    <p>${property.address1}, ${property.city}, ${property.province}</p>

                    <div class="property-actions">
                        <button class="edit-property-btn" data-property-id="${property.propertyId}">Edit</button>
                        <button class="delete-property-btn" data-property-id="${property.propertyId}">Delete</button>
                        <button class="toggle-workspaces-btn" data-property-id="${property.propertyId}">Show Workspaces</button>
                        <button class="add-workspace-btn" data-property-id="${property.propertyId}">Add Workspace</button>
                    </div>

                    <div class="workspaces-section" data-property-id="${property.propertyId}" style="display: none;">
                        <ul class="workspaces-card" data-workspace-id="${property.propertyId}">
                            <!-- Workspaces will load here -->
                        </ul>
                    </div>
                </div>
            `;
            $('#property-list').append(propertyCard);
        });

    } catch (err) {
        console.error("Error loading properties:", err);
    }
}

// ===== SAVE PROPERTY (ADD/EDIT) =====

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


// Edit Property Popup Action
$(document).on('click', '.edit-property-btn', function () {
    const propertyId = $(this).data('property-id');

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


    // Boolean radio buttons
    const booleanFields = ['parkingGarage', 'publicTransportation', 'smokingAllowed'];
    booleanFields.forEach(field => {
        $(`input[name="${field}"][value="${property[field].toString()}"]`).prop('checked', true);
    });


    // Store property _id for PUT request later
    $('#propertyForm').data('id', property.propertyId);
    console.log('Property ID stored in form data:', property.propertyId);
}

//======= DELETE PROPERTY =======

$(document).on('click', '.delete-property-btn', async function () {

    const propertyId = $(this).data('property-id');
    console.log('Delete button clicked. Property ID:', propertyId);

    if (confirm('Are you sure you want to delete this property and all its associated workspaces?')) {
        try {
            const token = localStorage.getItem('token');

            // Step 1: Fetch associated workspaces
            const workspacesRes = await fetch(`http://localhost:3000/workspaces`, {
                method: 'GET',

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!workspacesRes.ok) throw new Error('Failed to fetch workspaces.');

            const workspacesData = await workspacesRes.json();
            const associatedWorkspaces = workspacesData.workspaces.filter(ws => ws.propertyId === propertyId);

            // Step 2: Delete each associated workspace
            for (const workspace of associatedWorkspaces) {
                const deleteWorkspaceRes = await fetch(`http://localhost:3000/workspaces/${workspace.workspaceID}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!deleteWorkspaceRes.ok) {
                    console.error(`Failed to delete workspace ID: ${workspace.workspaceID}`);
                }
            }


            // Step 3: Delete the property
            const deletePropertyRes = await fetch(`http://localhost:3000/properties/${propertyId}`, {
                method: 'DELETE',
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            });

            if (deletePropertyRes.ok) {
                alert('Property and its associated workspaces deleted!');
                loadProperties(); // Reload properties after deletion
            } else {
                alert('Failed to delete property.');
            }
        } catch (err) {
            console.error("Error deleting property and its workspaces:", err);
        }
    }
});

//===================================== WORKSPACE MANAGER ============================================

// ====== WORKSPACES Toggle ======

$(document).on('click', '.toggle-workspaces-btn', function () {
    const propertyId = $(this).data('property-id');
    const $workspacesSection = $(`.workspaces-section[data-property-id="${propertyId}"]`);

    const isVisible = $workspacesSection.is(':visible');
    $(this).text(isVisible ? 'Show Workspaces' : 'Hide Workspaces');
    $workspacesSection.toggle();

    // Always load the latest data on toggle
    loadWorkspaces(propertyId);
});

// ===== LOAD Workspaces =====

async function loadWorkspaces(propertyId) {
    const token = localStorage.getItem('token');

    try {
        const res = await fetch('http://localhost:3000/workspaces', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        const filteredWorkspaces = data.workspaces.filter(ws => ws.propertyId === propertyId);

        // Store workspaces in the global object
        workspacesData[propertyId] = filteredWorkspaces;

        const $workspaceList = $(`.workspaces-card[data-workspace-id="${propertyId}"]`);
        $workspaceList.empty();

        if (filteredWorkspaces.length === 0) {
            $workspaceList.append('<li>No workspaces found.</li>');
            return;
        }

        // Append the filtered workspaces
        filteredWorkspaces.forEach(workspace => {
            const workspaceItem = `
                <li class="workspace-item" data-id="${workspace.workspaceID}">
                    <h4 class="workspaceTitle">${workspace.workspaceName}</h4>
                    <p>Type: ${workspace.workspaceType}</p>
                    <p>Lease Term: ${workspace.leaseTerm}</p>
                    <p>Size: ${workspace.sqFt} sq ft</p>
                    <p>Seats: ${workspace.seatCapacity}</p>
                    <p>Price: $${workspace.price}</p>
                    <p>Rating: ${workspace.rating || 'N/A'}</p>
                    <p>Amenities: ${workspace.amenities.join(', ')}</p>
                    <button class="edit-workspace-btn" data-id="${workspace.workspaceID}" data-property-id="${propertyId}">Edit</button>
                    <button class="delete-workspace-btn" data-id="${workspace.workspaceID}" data-property-id="${propertyId}">Delete</button>
                </li>
            `;
            $workspaceList.append(workspaceItem);
        });

    } catch (err) {
        console.error("Error loading workspaces:", err);
    }
}




// =====SAVE (ADD/EDIT) Workspace =====

$('#saveWorkspace').on('click', async function () {
    const token = localStorage.getItem('token');
    const form = $('#workspaceForm');
    const workspaceID = form.data('id'); // Will be undefined for new workspace
    const propertyId = form.data('property-id'); // Retrieve propertyId

    const isEdit = !!workspaceID;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit 
        ? `http://localhost:3000/workspaces/${workspaceID}`
        : `http://localhost:3000/workspaces`;

    try {
        // Fetch the owner information
        const ownerRes = await fetch(`http://localhost:3000/profile1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!ownerRes.ok) throw new Error("Owner not found");

        const ownerData = await ownerRes.json();

        // Gather workspace data from the form
        const workspaceData = {
            workspaceName: $('#workspaceName').val(),
            workspaceType: $('#workspaceType').val(),
            leaseTerm: $('#leaseTerm').val(),
            sqFt: $('#sqFt').val(),
            seatCapacity: $('#seatCapacity').val(),
            price: $('#price').val(),
            amenities: $('.amenity:checked').map(function () {
                return $(this).val();
            }).get(),
            propertyId: propertyId,  // Use the propertyId from form data
            ownerEmail: ownerData.email, 
        };

        // Make the request to save the workspace
        const res = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workspaceData)
        });

        if (res.ok) {
            alert(workspaceID ? 'Workspace updated!' : 'Workspace added!');
            $('#workspacePopup').hide();
            form[0].reset();
            form.removeData('id');
            form.removeData('property-id');
        
            // Ensure the workspaces section is visible
            const $workspacesSection = $(`.workspaces-section[data-property-id="${propertyId}"]`);
            if (!$workspacesSection.is(':visible')) {
                $workspacesSection.show();
                $(`.toggle-workspaces-btn[data-property-id="${propertyId}"]`).text('Hide Workspaces');
            }
        
            // Reload the workspaces for the current property
            await loadWorkspaces(propertyId);
        }
         else {
            const errorData = await res.json();
            alert(`Failed to save workspace: ${errorData.message}`);
        }
    } catch (err) {
        console.error("Error saving workspace:", err);
        alert('Something went wrong.');
    }
});



// ====== EDIT WORKSPACE popup action ======
$(document).on('click', '.edit-workspace-btn', async function () {
    const workspaceID = $(this).data('id');
    const propertyId = $(this).data('property-id');

    const workspaceList = workspacesData[propertyId] || [];
    const workspace = workspaceList.find(ws => ws.workspaceID === workspaceID);

    if (workspace) {
        openEditWorkspacePopup(workspace);
    } else {
        console.error("Workspace not found in workspacesData");
    }
});

// Open the edit popup with existing workspace data
function openEditWorkspacePopup(workspace) {
    console.log('Opening edit popup for workspace ID:', workspace.workspaceID);

    $('#workspacePopupTitle').text('Edit Workspace');  

    if (workspace) {
        $('#workspaceName').val(workspace.workspaceName);
        $('#workspaceType').val(workspace.workspaceType);
        $('#leaseTerm').val(workspace.leaseTerm);
        $('#sqFt').val(workspace.sqFt);
        $('#seatCapacity').val(workspace.seatCapacity);
        $('#price').val(workspace.price);
        
        workspace.amenities.forEach(amenity => {
            $(`input[value="${amenity}"]`).prop('checked', true);
        });

        // Show the popup (display: block)
        $('#workspacePopup').show();

        // Store workspace ID and property ID for PUT request later
        $('#workspaceForm')
            .data('id', workspace.workspaceID)
            .data('property-id', workspace.propertyId);  // Storing propertyId for PUT request
            
        console.log('Workspace ID and Property ID stored in form data:', workspace.workspaceID, workspace.propertyId);
    }
}



// ======= DELETE WORKSPACE ======
$(document).on('click', '.delete-workspace-btn', async function () {
    const workspaceID = $(this).data('id');

    if (confirm('Are you sure you want to delete this workspace?')) {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/workspaces/${workspaceID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                // Reload the workspaces for the current property
                console.log('Delete button clicked. Workspace ID:', workspaceID);
                const propertyId = $(this).data('property-id'); // Ensure this data attribute is set on the delete button
                await loadWorkspaces(propertyId);
                alert('Workspace deleted!');
                loadWorkspaces(); // Reload workspaces after deletion
            } else {
                alert('Failed to delete workspace.');
            }
        } catch (err) {
            console.error("Error deleting workspace:", err);
        }
    }
});

});