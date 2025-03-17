/*****I remove this part because Im going to get current user information from localStorage. Victor
import { Property, properties } from './data/propertydata.js';
import { Workspace, workspaces } from './data/workspacedata.js';
import { User, users } from './data/userdata.js';



const currUser = users.find(user => (user.id===67890));     //AL - returns ONE object because find was used instead of filter
const propertyList = properties.filter(property => (property.ownerId===currUser.id)); //returns an array*******/


$(document).ready(function () {


    /****To get current user information from localStorage. Victor*************/
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const properties = JSON.parse(localStorage.getItem('properties')) || []; // []=They might not have either properties or workspaces
    const workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    //If user has not signed in yet they cant access to this page.
    if (!currentUser) {
        alert('Please log in to view your properties.');
        window.location.href = '/pages/login.html';
        return;
    }
    /*******************************************************************************/
    const propertyList = properties.filter(property => property.ownerId === currentUser.id);

    createPropertiesHTML(propertyList);
    addWorkspacesToProperties(workspaces);

    //build field html
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



});


function createPropertiesHTML(propList) {
    $("#properties-container").empty();


    /*The img code in the html below we can swtich to
    <img src="resources/images/${property.imgFileName}" alt="${property.name}" onerror="this.src='resources/images/default property.png';">
    later as we dont have images for now so let it definded as default*/
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
                </div>
                <div class="workspace-list">
                    <h2>Workspaces in ${property.name}</h2>
                </div>
            </section>`;
        $("#properties-container").append(section);
    });
}


function addWorkspacesToProperties(allWorkspaces) {
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
    //To check if user is clicking to see details of workspace.
    //.hasclass=check the class name if it is = "btnWorkspaceDetails" when user is clicking the button
    const isDetailsMode = $(this).hasClass("btnWorkspaceDetails");
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
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); //Get current user.


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
