let propertiesData = [];  // Declare a global variable to store property data
let workspaceData = [];  // Declare a global variable to store workspace data
let currentPropertyId = null;

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
    currentPropertyId = $(this).data('property-id');
    $('#workspacePopup').data('property-id', currentPropertyId);
    $('#workspaceForm')[0].reset(); 
    $('#workspaceForm').removeData('id'); 
    $('#workspacePopupTitle').text('Add Workspace');
    $('#workspacePopup').show(); 
});

     $(document).on('click', '#edit-Workspace-Btn', function () {
        const workspaceId = $(this).data('workspace-id'); // get from button
        $('#workspaceForm').data('id', workspaceId);
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
        
        console.log("Stored in propertiesData:", propertiesData); // confirm it worked

        $('#property-list').empty();

        propertiesData.forEach(property => {
            const propertyCard = `
                <div class="property-card" data-property-id="${property.propertyId}">
                    <h3>${property.name}</h3>
                    <p>${property.address1}, ${property.city}, ${property.province}</p>
                    
                    <div class="property-details">
                        <button class="edit-property-btn" data-property-id="${property.propertyId}">Edit</button>
                        <button class="delete-property-btn" data-property-id="${property.propertyId}">Delete</button>

                            <div class="workspaces-section" data-property-id="${property.propertyId}">
                                <button class="toggle-workspaces-btn" data-property-id="${property.propertyId}">Show Workspaces</button>
                                <button class="add-workspace-btn" data-property-id="${property.propertyId}">Add Workspace</button>
                            </div>
                    </div>

                    <div class="workspaces-section" data-property-id="${property.propertyId}" style="display: none;">
                        <ul class="workspaces-card" data-workspace-Id="${property.propertyId}">
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
            ownerEmail: ownerData.email,
            
            // Collecting amenities
            parkingGarage: $('input[name="parkingGarage"]:checked').val() === 'true', 
            publicTransportation: $('input[name="publicTransportation"]:checked').val() === 'true',
            smokingAllowed: $('input[name="smokingAllowed"]:checked').val() === 'true' 
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

//===================================== WORKSPACE MANAGER ============================================

// ====== WORKSPACES Toggle ======

$(document).on('click', '.toggle-workspaces-btn', function () {
    const propertyId = $(this).data('property-id');
const workspacesSection = $(`.workspaces-section[data-property-id="${propertyId}"]`);

    if (workspaceData.length === 0 ) {
        alert("Please add a workspace.");
        return;
    }

    // Toggle the visibility of the workspaces section
    workspacesSection.toggle();

    // Toggle button text
    if (workspacesSection.is(':visible')) {
        $(this).text('Hide Workspaces');
    } else {
        $(this).text('Show Workspaces');
    }

    // If the workspaces haven't been loaded yet, load them
    if (!workspacesSection.hasClass('loaded')) {
        loadWorkspaces(propertyId);
        workspacesSection.addClass('loaded');
    }

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
        
        workspaceData = data.workspaces.filter(ws => ws.propertyId === propertyId);

        // Store the workspace data in a global variable for later use
        console.log("Filtered workspaceData:", workspaceData);

        const $workspaceList = $(`#workspaces-${propertyId}`);
        $workspaceList.empty(); // Clear any previous entries

        workspaceData.forEach(workspace => {
            const workspaceItem = `
                <li class="workspace-item" data-id="${workspace.workspaceId}">
                    <h4>${workspace.name}</h4>
                    <p>Type: ${workspace.type}</p>
                    <p>Lease Term: ${workspace.leaseTerm}</p>
                    <p>Size: ${workspace.sqFt} sq ft</p>
                    <p>Seats: ${workspace.seatCapacity}</p>
                    <p>Price: $${workspace.price}</p>
                    <p>Rating: ${workspace.rating || 'N/A'}</p>
                    <p>Amenities: ${workspace.amenities.join(', ')}</p>
                    <button id="edit-workspace-btn" data-id="${workspace.workspaceId}">Edit</button>
                    <button class="delete-workspace-btn" data-id="${workspace.workspaceId}">Delete</button>
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
    const workspaceId = form.data('id'); // Will be undefined for new workspace

    const isEdit = !!workspaceId;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit 
        ? `http://localhost:3000/workspaces/${workspaceId}`
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
        console.log("Owner Data:", ownerData);  // Log owner data to verify it's being fetched correctly

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
            propertyId: currentPropertyId,  
            ownerEmail: ownerData.email, 
        };

        console.log("Workspace Data:", workspaceData);  

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
            alert(workspaceId ? 'Workspace updated!' : 'Workspace added!');
            $('#workspacePopup').hide();
            form[0].reset();
            form.removeData('id');
            
            loadWorkspaces();
        } else {
            const errorData = await res.json();
            alert(`Failed to save workspace: ${errorData.message}`);
        }
    } catch (err) {
        console.error("Error saving workspace:", err);
        alert('Something went wrong.');
    }
});



// ======= DELETE WORKSPACE ======
$(document).on('click', '.delete-workspace-btn', async function () {
    const workspaceId = $(this).data('id');
    console.log('Delete button clicked. Workspace ID:', workspaceId);

    if (confirm('Are you sure you want to delete this workspace?')) {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/workspaces/${workspaceId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
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