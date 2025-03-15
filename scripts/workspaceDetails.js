import workspaces from './workspaceData.js';
import userData from './userData.js';

$(document).ready(function () {
    const leftContainer = $("#workspace-display-left");
    const rightContainer = $("#workspace-display-right");

    // testing with manualky set Id
    const targetId = 19; 
    const targetWorkspace = workspaces.find(workspace => workspace.workspaceID === targetId);

    if (targetWorkspace) {

        // Left section
        const sectionDivL = $("<div>").addClass("detailsBoxL");
        $("<span>").text(`${targetWorkspace.workspaceName}`).appendTo("workspaceTitle");

         // Set workspace name in the existing div
         $("#workspaceTitle").text(targetWorkspace.workspaceName).appendTo(sectionDivL);

    //Left section
    const ulL = $("<ul>").addClass("detailsList");
        //propertyId: 1//needs to give address and maybe other details from property array
        $("<li>").text(`Type: ${targetWorkspace.workspaceType}`).appendTo(ulL);
        $("<li>").text(`Lease Term: ${targetWorkspace.leaseTerm}`).appendTo(ulL);
        $("<li>").text(`Square Footage: ${targetWorkspace.sqFt} sq ft`).appendTo(ulL);
        $("<li>").text(`Seat Capacity: ${targetWorkspace.seatCapacity}`).appendTo(ulL);
        $("<li>").text(`Price: ${targetWorkspace.price}' /'${(targetWorkspace.leaseTerm)}`).appendTo(ulL);


        // Display amenities
        $("<li>").text("Amenities:").appendTo(ulL);
        targetWorkspace.amenities.forEach(amenity => {
            const [key, value] = Object.entries(amenity)[0];
            if (value) {
                $("<li>").text(`- ${key}`).appendTo(ulL);
            }
        });

    sectionDivL.append(ulL);
    leftContainer.append(sectionDivL);
    
    //right section
    const sectionDivR = $("<div>").addClass("detailsBoxR");
    

    //plan to move this to the review container, above the review
    const ulR = $("<ul>").addClass("detailsList");
    $("<li>").text(`Rating: ${targetWorkspace.rating} `).appendTo(ulR);

    sectionDivR.append(ulR);
        rightContainer.append(sectionDivR);
    } else {
        rightContainer.html("<p>Workspace not found.</p>");
    }
    });



  // imgFileName: "LargeOffice40.jpg"