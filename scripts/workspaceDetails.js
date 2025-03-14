import workspaces from './workspaceData.js';

$(document).ready(function () {
    const container = $("#workspace-display");

    // testing with manualky set Id
    const targetId = 19; 

    const targetWorkspace = workspaces.find(workspace => workspace.workspaceID === targetId);

  if(targetWorkspace) {
    const sectionDiv = $("<div>").addClass("section");
    $("<h2>").text(targetWorkspace.heading).appendTo(sectionDiv);

    const ul = $("<ul>").addClass("list");
        $("<li>").text(`Type: ${targetWorkspace.workspaceType}`).appendTo(ul);
        $("<li>").text(`Lease Term: ${targetWorkspace.leaseTerm}`).appendTo(ul);
        $("<li>").text(`Square Footage: ${targetWorkspace.sqFt} sq ft`).appendTo(ul);
        $("<li>").text(`Seat Capacity: ${targetWorkspace.seatCapacity}`).appendTo(ul);
        $("<li>").text(`Price: $${targetWorkspace.price}/day`).appendTo(ul);

        // Display amenities
        $("<li>").text("Amenities:").appendTo(ul);
        targetWorkspace.amenities.forEach(amenity => {
            const [key, value] = Object.entries(amenity)[0];
            if (value) {
                $("<li>").text(`- ${key}`).appendTo(ul);
            }
        });

    sectionDiv.append(ul);
        $("#workspace-display").append(sectionDiv);
    } else {
        $("#workspace-display").html("<p>Workspace not found.</p>");
    }
});