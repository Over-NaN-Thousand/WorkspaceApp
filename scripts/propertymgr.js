import { Property, properties } from './data/propertydata.js';
import { Workspace, workspaces } from './data/workspacedata.js';
import { User, users } from './data/userdata.js';



const currUser = users.find(user => (user.id===67890));     //AL - returns ONE object because find was used instead of filter
const propertyList = properties.filter(property => (property.ownerId===currUser.id)); //returns an array


$(document).ready(function() {
    
    
    createPropertiesHTML(propertyList);
    addWorkspacesToProperties(workspaces);

    //build field html
    const optWStypes = [...new Set(workspaces.map(workspace => workspace.workspaceType))];
    const optTerm = ["Hourly", "Daily", "Weekly", "Monthly", "Quarterly"];
    const optAmenities = ["Full Kitchen","Microwave","Coffee Maker","Copy/Print Equipment","Projector","High-Speed Wi-Fi","Whiteboards","Conference Phones","Adjustable Desks","Ergonomic Chairs","Secure Storage/Lockers","Mail and Package Handling","Outdoor Seating/Patio","Receptionist/Front Desk Service","Soundproofing","Lounge Areas","Casual Seating","Tech Support","Security Cameras","Snack Bar","Vending Machines","Fitness Room","Gym Access","Natural Lighting"];
    addOptionsToDropdown(optWStypes,"workspaceType", "optWStype", "option");
    addOptionsToDropdown(optTerm,"leaseTerm", "optLeaseTerm", "option");
    addOptionsToTarget(optAmenities,"amenities-container","optAmenities","checkbox");

    

    //bind events
    $(document).on("click", ".btnWorkspace", popWorkspaceManager);
    $("#saveWorkspace").click(saveWorkspacePop);
    $("#deleteWorkspace").click(deleteWorkspacePop);
    $("#closePopup").click(closeWorkspacePop);
    


});


function createPropertiesHTML(propList){
    $("#properties-container").empty();
    
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
                    <p> <button val="${property.propertyID}" name="Edit" class="btnProperty">Edit</button>
                        <button val="${property.propertyID}" name="Delete" class="btnProperty">Delete</button>
                    </p>
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
                const workspaceElement = `<button val="${workspace.workspaceID}" data-propID="${propertyId}" class="btnWorkspace">${workspace.workspaceName}</p>`;
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

    if (workspaceID === "_new") {
        $("#workspaceForm")[0].reset(); // clear form for adding a new workspace
    } 
    else 
    {
        const workspace = workspaces.find(ws => ws.workspaceID == workspaceID);
        if (workspace) {    // load workspace details into the form for editing
            $("#workspaceName").val(workspace.workspaceName);
            $("#workspaceType").val(workspace.workspaceType);
            $("#leaseTerm").val(workspace.leaseTerm);
            $("#seatCapacity").val(workspace.seatCapacity);
            $("#sqFt").val(workspace.sqFt);
            $("#price").val(workspace.price);
            $('input[name="optAmenities"]').each(function () {
                $(this).prop('checked', workspace.amenities.includes($(this).val()));
            });
        }
    }
    
    $('#workspaceForm').attr('data-property-id',propIDFromPropAttr); //propertyID from data-propID
    $('#saveWorkspace').val(workspaceID); //so Save/Delete knows which ID to save/delete
    $('#deleteWorkspace').val(workspaceID);

    $("#workspacePopup").css("display", "flex"); //show popup
}


function saveWorkspacePop(event) {
    const workspaceID = $(event.currentTarget).val(); //get id from Save value
    
    const workspaceData = {
        workspaceName: $("#workspaceName").val(),
        workspaceType: $("#workspaceType").val(),
        leaseTerm: $("#leaseTerm").val(),
        seatCapacity: parseInt($("#seatCapacity").val()),
        sqFt: parseInt($("#sqFt").val()),
        price: parseFloat($("#price").val()),
        amenities: $('input[name="optAmenities"]:checked').map(function() {
            return $(this).val();
        }).get()
    };
    const propID = $(this).closest('form').data("property-id");  

    if (workspaceID === "_new") {
        // Create a new workspace
        const maxWorkspaceID = Math.max(...workspaces.map(workspace => workspace.workspaceID)); // !discovery! Math.max cannot handle arrays, that's why we use the spread operator to make all the workspaceID as individual arguments

        const newWorkspace = {
            ...workspaceData,
            workspaceID: maxWorkspaceID + 1,
            propertyId: propID
        };
        workspaces.push(newWorkspace); //AL - still missing ownerId and imgFileName (to follow)
    } else {
        // Update existing workspace
        const workspace = workspaces.find(ws => ws.workspaceID == workspaceID);
        if (workspace) {
            Object.assign(workspace, workspaceData);
        }
    }

    alert("Workspace saved!");
    addWorkspacesToProperties(workspaces);
    $("#workspacePopup").css("display", "none");

    
}


function deleteWorkspacePop(event) {
    const workspaceID = $(event.currentTarget).val();
    console.log(workspaceID);
    const index = workspaces.findIndex(ws => ws.workspaceID == workspaceID);
    if (index !== -1) {
        workspaces.splice(index, 1); // remove from the array
        alert("Workspace deleted!");
    }

    addWorkspacesToProperties(workspaces);
    $("#workspacePopup").css("display", "none");
}

function closeWorkspacePop() {
    $("#workspacePopup").css("display", "none");
}
