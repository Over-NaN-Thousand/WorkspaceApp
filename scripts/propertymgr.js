
/*****I remove this part because Im going to get current user information from localStorage. Victor
import { Property, properties } from './data/propertydata.js';
import { Workspace, workspaces } from './data/workspacedata.js';
import { User, users } from './data/userdata.js';

const currUser = users.find(user => (user.id===67890));     //AL - returns ONE object because find was used instead of filter
const propertyList = properties.filter(property => (property.ownerId===currUser.id)); //returns an array*******/


const currentUser = JSON.parse(localStorage.getItem('currentUser'));

$(document).ready(function () {


    //If user has not signed in yet they cant access to this page.
    if (!currentUser) {
        alert('Please log in to view your properties.');
        window.location.href = 'pages/login.html';
        return;
    }

    //"Apply" button action 
    $("#btnApply").click(function () {
        const propertySortBy = $("#selSortProperty").val();
        const workspaceSortBy = $("#selSortWorkspace").val();

        sortProperty(propertySortBy);
        sortWorkspaces(workspaceSortBy);
        updateScreen();
    });
    //"Reset" button action
    $("#btnReset").click(function () { 
        //Default reset sort by "name" and "workspaceName"
        $("#selSortProperty").val("name");
        $("#selSortWorkspace").val("workspaceName"); 
        sortProperty("name"); 
        sortWorkspaces("workspaceName"); 
        updateScreen();
    });

    updateScreen(); //loads properties owned by user and workspaces inside each property

    //build field html
    const workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    const optWStypes = [...new Set(workspaces.map(workspace => workspace.workspaceType))];
    const optTerm = ["Hourly", "Daily", "Weekly", "Monthly", "Quarterly"];
    const optAmenities = ["Full Kitchen", "Microwave", "Coffee Maker", "Copy/Print Equipment", "Projector", "High-Speed Wi-Fi", "Whiteboards", "Conference Phones", "Adjustable Desks", "Ergonomic Chairs", "Secure Storage/Lockers", "Mail and Package Handling", "Outdoor Seating/Patio", "Receptionist/Front Desk Service", "Soundproofing", "Lounge Areas", "Casual Seating", "Tech Support", "Security Cameras", "Snack Bar", "Vending Machines", "Fitness Room", "Gym Access", "Natural Lighting"];


    addOptionsToDropdown(optWStypes, "workspaceType", "optWStype", "option");
    addOptionsToDropdown(optTerm, "leaseTerm", "optLeaseTerm", "option");
    addOptionsToTarget(optAmenities, "amenities-container", "optAmenities", "checkbox");



    //bind events
    $(document).on("click", ".btnWorkspace", popWorkspaceManager);
    $(document).on("click", ".btnWorkspaceDetails", popWorkspaceManager);//Create a new click for workspace details
    $("#saveWorkspace").click(saveWorkspacePop);
    $("#deleteWorkspace").click(deleteWorkspacePop);
    $("#closePopup").click(closeWorkspacePop);


    $(document).on("click", ".btnProperty[name='Edit']", popPropertyManager);
    $(document).on("click", ".btnProperty[name='Delete']", deleteProperty);
    // $('#editProperty').click(popPropertyManager);
    $('#addProperty').click(popPropertyManager);
    $("#saveProperty").click(savePropertyPop);
    $("#closePropertyPopup").click(closePropertyPop);

});

function updateScreen() {
    //AL - bundled here and de-parameterized for easy reuse
    createPropertiesHTML();
    addWorkspacesToProperties();
}

function createPropertiesHTML() {
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    const propList = properties.filter(property => property.ownerId === currentUser.id); //filter to only properties owned by user

    $("#properties-container").empty();
    /*The img code in the html below we can swtich to
    <img src="resources/images/${property.imgFileName}" alt="${property.name}" onerror="this.src='resources/images/default property.png';">
    later as we dont have images for now so let it defined as default*/
    propList.forEach(property => {
        //AL - !discovery! you can add a data-___ attribute that you can access later by jQuery
        const section = `
            <section class="property-item" data-property-id="${property.propertyId}">
                <div class="property-picture">
                    <img src="resources/images/default property.png" alt="${property.name}" onerror="this.src='resources/images/default property.png';"> 
                </div>
                <div class="property-details">
                    <h2>${property.name}</h2>
                    <p><strong>Address 1:</strong> ${property.address1}</p>
                    <p><strong>Address 2:</strong> ${property.address2}</p>
                    <p><strong>Neighborhood:</strong> ${property.neighbourhood}</p>
                    <p><strong>City:</strong> ${property.city}</p>
                    <p><strong>Province:</strong> ${property.province}</p>
                    <p><strong>Country:</strong> ${property.country}</p>
                    <p><strong>Postal Code:</strong> ${property.postalcode}</p>
                    <p> <button val="${property.propertyId}" id="editProperty" name="Edit" class="btnProperty">Edit</button>
                        <button val="${property.propertyId}" id="delProperty" name="Delete" class="btnProperty">Delete</button>
                    </p>
                </div>
                <div class="workspace-list">
                    <h2>Workspaces in ${property.name}</h2>
                </div>
            </section>`;
        $("#properties-container").append(section);
    });
}


function addWorkspacesToProperties() {
    const allWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];

    $(".property-item").each(function () {
        const propertyId = $(this).data("property-id");                 // !discovery! get the propertyId from the data attribute 
        const workspaceListContainer = $(this).find(".workspace-list"); // workspace list container
        const filteredWorkspaces = allWorkspaces.filter(workspace => workspace.propertyId === propertyId); // array of workspaces for this property

        workspaceListContainer.empty();

        if (filteredWorkspaces.length > 0) {
            filteredWorkspaces.forEach(workspace => {   // go through workspaces in array and write html for them
                const workspaceElement = `
                <button val="${workspace.workspaceID}" data-propID="${propertyId}" class="btnWorkspace">${workspace.workspaceName} (Edit)</button>`;
                workspaceListContainer.append(workspaceElement);
            });
        } else {
            workspaceListContainer.html("<p>No workspaces available for this property.</p>");
        }
        workspaceListContainer.append(`<button val="_new" data-propID="${propertyId}" class="btnWorkspace">Add a new Workspace</p>`);
    });
}


function addOptionsToDropdown(options, targetID, type) {
    options.forEach(option => {
        $(`#${targetID}`).append(`<option value="${option}"> ${option}</option>`);
    });
}
function addOptionsToTarget(options, targetID, name, type) {
    options.forEach(option => {
        $(`#${targetID}`).append(`<label><input type="${type}" name="${name}" value="${option}" title="${option}"> ${option}</label>`);
    });
}










function popWorkspaceManager() {
    const workspaceID = $(this).attr("val");
    const propIDFromPropAttr = $(this).data("propid");
    const workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    const workspace = workspaces.find(ws => ws.workspaceID == workspaceID);//Moved out from if-else statement to make it work in the whole function. 

    if (workspaceID === "_new") { //If adding details
        $("#workspaceForm")[0].reset(); // clear form for adding a new workspace
        $("#workspaceForm").removeClass("details-mode").addClass("edit-mode");//Change the class to "edit-mode"
        $("#workspaceForm h2").text("Add New Workspace");//Change the title
        //When it's false, means allow input and button.
        $("#workspaceName").prop("readonly", false);
        $("#workspaceType").prop("disabled", false);
        $("#leaseTerm").prop("disabled", false);
        $("#seatCapacity").prop("readonly", false);
        $("#sqFt").prop("readonly", false);
        $("#price").prop("readonly", false);
        $('input[name="optAmenities"]').prop("disable", false);
        $("#saveWorkspace").show();//Show save button
        $("#deleteWorkspace").hide(); // Hide delete button
        $("#closePopup").text("Close");
    }
    else {
        // load workspace details into the form for editing
        $("#workspaceForm").removeClass("details-mode").addClass("edit-mode");
        $("#workspaceForm h2").text("Edit Workspace");
        $("#workspaceName").val(workspace.workspaceName).prop("readonly", false);
        $("#workspaceType").val(workspace.workspaceType).prop("disabled", false);
        $("#leaseTerm").val(workspace.leaseTerm).prop("disabled", false);
        $("#seatCapacity").val(workspace.seatCapacity).prop("readonly", false);
        $("#sqFt").val(workspace.sqFt).prop("readonly", false);
        $("#price").val(workspace.price).prop("readonly", false);
        $('input[name="optAmenities"]').each(function () {
            $(this).prop('checked', workspace.amenities.includes($(this).val())).prop("disabled", false);
        });
        $("#saveWorkspace").show();
        $("#deleteWorkspace").show();
        $("#closePopup").text("Close");
    }

    $('#workspaceForm').attr('data-property-id', propIDFromPropAttr); //propertyID from data-propID
    $('#saveWorkspace').val(workspaceID); //so Save/Delete knows which ID to save/delete
    $('#deleteWorkspace').val(workspaceID);

    $("#workspacePopup").css("display", "flex"); //show popup
}


function saveWorkspacePop(event) {
    const workspaceID = $(event.currentTarget).val(); //get id from Save value
    let workspaces = JSON.parse(localStorage.getItem('workspaces')) || []; //Get workspace from localStorage.


    const workspaceData = {
        workspaceName: $("#workspaceName").val(),
        workspaceType: $("#workspaceType").val(),
        leaseTerm: $("#leaseTerm").val(),
        seatCapacity: parseInt($("#seatCapacity").val()),
        sqFt: parseInt($("#sqFt").val()),
        price: parseFloat($("#price").val()),
        amenities: $('input[name="optAmenities"]:checked').map(function () {
            return $(this).val();
        }).get()
    };
    const propID = parseInt($(this).closest('form').data("property-id"));//Added parseInt to make sure propID=numebr.

    if (workspaceID === "_new") {
        // Create a new workspace
        const maxWorkspaceID = Math.max(...workspaces.map(workspace => workspace.workspaceID)); // !discovery! Math.max cannot handle arrays, that's why we use the spread operator to make all the workspaceID as individual arguments
        const newWorkspace = {
            ...workspaceData,
            workspaceID: maxWorkspaceID + 1,
            propertyId: propID,
            //Adder owner id and imgae file name.
            ownerId: currentUser.id,
            imgFileName: "default private office.png",
            rating: 0
        };
        workspaces.push(newWorkspace); //AL - still missing ownerId and imgFileName (to follow)
    } else {
        // Update existing workspace
        const workspace = workspaces.find(ws => ws.workspaceID == workspaceID);
        if (workspace) {
            Object.assign(workspace, workspaceData);
        }
    }

    //Save to localStorage
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
    alert("Workspace saved!");
    addWorkspacesToProperties(workspaces);
    $("#workspacePopup").css("display", "none");
}


function deleteWorkspacePop(event) {
    const workspaceID = $(event.currentTarget).val();
    console.log(workspaceID);
    const workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    const index = workspaces.findIndex(ws => ws.workspaceID == workspaceID);
    if (index !== -1) {
        workspaces.splice(index, 1); // remove from the array
        alert("Workspace deleted!");
        localStorage.setItem('workspaces', JSON.stringify(workspaces));//Save in localStorage
    }

    addWorkspacesToProperties(workspaces);
    $("#workspacePopup").css("display", "none");
}


function closeWorkspacePop() {
    $("#workspacePopup").css("display", "none");
}













function popPropertyManager() {
    const propertyID = $(this).attr("val");
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    const property = properties.find(prop => prop.propertyId == propertyID); // Find the property

    if (propertyID === "_new") {
        // Clear form for adding a new property
        $("#propertyForm")[0].reset();
        $("#propertyForm").removeClass("details-mode").addClass("edit-mode");
        $("#propertyForm h2").text("Add New Property");
        $("#propertyName, #address1, #address2, #neighborhood, #city, #province, #country, #postalCode, #ownerId")
            .prop("readonly", false);
        $("#saveProperty").show();
        $("#deleteProperty").hide();
        $("#closePropertyPopup").text("Close");
    } else {
        // Load property details into the form for editing
        $("#propertyForm").removeClass("details-mode").addClass("edit-mode");
        $("#propertyForm h2").text("Edit Property");
        $("#propertyName").val(property.name).prop("readonly", false);
        $("#address1").val(property.address1).prop("readonly", false);
        $("#address2").val(property.address2).prop("readonly", false);
        $("#neighborhood").val(property.neighbourhood).prop("readonly", false);
        $("#city").val(property.city).prop("readonly", false);
        $("#province").val(property.province).prop("readonly", false);
        $("#country").val(property.country).prop("readonly", false);
        $("#postalCode").val(property.postalcode).prop("readonly", false);
        $("#saveProperty").show();
        $("#deleteProperty").show();
        $("#closePropertyPopup").text("Close");
    }

    $('#saveProperty').val(propertyID); // Make the Save button know the ID
    $('#deleteProperty').val(propertyID);

    $("#propertyPopup").css("display", "flex"); // Show pop-up
}


function savePropertyPop(event) {
    const propertyID = $(event.currentTarget).val(); // Get the ID from Save button value
    let properties = JSON.parse(localStorage.getItem('properties')) || [];

    const propertyData = {
        name: $("#propertyName").val(),
        address1: $("#address1").val(),
        address2: $("#address2").val(),
        neighbourhood: $("#neighborhood").val(),
        city: $("#city").val(),
        province: $("#province").val(),
        country: $("#country").val(),
        postalcode: $("#postalCode").val()
    };

    if (propertyID === "_new") {
        // Add a new property
        const maxPropertyID = Math.max(...properties.map(prop => prop.propertyId), 0); // Handle empty list case with 0
        const newProperty = {
            ...propertyData,
            propertyId: maxPropertyID + 1, // Increment ID for the new property
            ownerId: currentUser.id // user is the owner
        };
        properties.push(newProperty);
    } else {
        // Update an existing property
        const property = properties.find(prop => prop.propertyId == propertyID);
        if (property) {
            Object.assign(property, propertyData);
        }
    }

    // Save to localStorage
    localStorage.setItem('properties', JSON.stringify(properties));
    alert("Property saved!");
    $("#propertyPopup").css("display", "none"); // close pop-up


    updateScreen();
}


function deleteProperty(event) {
    const propertyID = $(event.currentTarget).attr("val");
    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    const index = properties.findIndex(prop => prop.propertyId == propertyID);

    if (index !== -1) {
        properties.splice(index, 1); // remove property from array
        alert("Property deleted!");
        localStorage.setItem('properties', JSON.stringify(properties)); // save updated list
    }

    $("#propertyPopup").css("display", "none"); // close pop-up
    updateScreen();
}


function closePropertyPop() {
    $("#propertyPopup").css("display", "none");
}

//Sort properties section.
function sortProperty(sortBy) {
    let properties = JSON.parse(localStorage.getItem('properties')) || [];


    const propertiesList = properties.filter(property => property.ownerId === currentUser.id);

    //Using switch and localeCompare to sort
    switch (sortBy) {
        case 'name':
            propertiesList.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'city':
            propertiesList.sort((a, b) => a.city.localeCompare(b.city));
            break;
        case 'province':
            propertiesList.sort((a, b) => a.province.localeCompare(b.province));
            break;
        case 'country':
            propertiesList.sort((a, b) => a.country.localeCompare(b.country));
            break;
    }

    //Update new sorted array to localStorage, delete the old array
    properties = [
        ...properties.filter(p => p.ownerId !== currentUser.id),
        ...propertiesList
    ];
    //Save to localStorage
    localStorage.setItem('properties', JSON.stringify(properties));

}
function sortWorkspaces(sortBy) {
    let workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    const workspaceList = workspaces.filter(workspace => workspace.ownerId === currentUser.id);


        switch (sortBy) {
            case 'workspaceName':
                workspaceList.sort((a, b) => a.workspaceName.localeCompare(b.workspaceName));
                break;
            case 'workspaceType':
                workspaceList.sort((a, b) => a.workspaceType.localeCompare(b.workspaceType));
                break;
            case 'price':
                workspaceList.sort((a, b) => a.price - b.price);
                break;
            case 'leaseTerm':
                workspaceList.sort((a, b) => a.leaseTerm.localeCompare(b.leaseTerm));
                break;
        }
    workspaces = [
        ...workspaces.filter(w => w.ownerId !== currentUser.id),
        ...workspaceList
    ];
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
}