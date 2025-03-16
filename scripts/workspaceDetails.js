import workspaces from './workspaceData.js';
import userData from './userData.js';//for owner contact info
import properties from './propertyData.js';

$(document).ready(function () {
    const leftContainer = $("workspace-display-left");
    const rightContainer = $("workspace-display-right");

    // testing with manualky set Id
    const targetId = 19; 

    //use worskpaceId to find owner and property data
    const targetWorkspace = workspaces.find(workspace => workspace.workspaceID === targetId);
    const targetOwnerId = targetWorkspace.ownerId;
    const targetPropertyId = targetWorkspace.propertyId;
    const targetOwner = userData.find(user => user.id === targetOwnerId);
    const targetProperty = properties.find(property => property.propertyId === targetPropertyId);
    const workspaceRating = targetWorkspace.rating;
    
        console.log("Workspace:", targetWorkspace);
        console.log("Owner:", targetOwner);
        console.log("Property:", targetProperty);
        console.log("Rating:", workspaceRating);


  
        // Left section----------------------------------------------
        const sectionDivL = $("<div>").appendTo("#workspace-display-left");
         // Set workspace name in the existing div
         $("#workspaceTitle").text(targetWorkspace.workspaceName).appendTo(sectionDivL);

        //Left section list
        const ulL = $("<ul>").addClass("detailsList");
            //address
            $("<li>").addClass("detailBoxHeading").text("Address").appendTo(ulL);
            $("<li>").text(`Line 1: ${targetProperty.address1}`).appendTo(ulL);
            $("<li>").text(`Line 2: ${targetProperty.address2}`).appendTo(ulL);
            $("<li>").text(`Postal Code: ${targetProperty.postalcode}`).appendTo(ulL);
            $("<li>").text(`City: ${targetProperty.city}`).appendTo(ulL);
            $("<li>").text(`Province: ${targetProperty.province}`).appendTo(ulL);
            $("<li>").text(`Country: ${targetProperty.country}`).appendTo(ulL);
            
            $("<li>").addClass("detailBoxHeading").text("Details").appendTo(ulL);
            $("<li>").text(`Type: ${targetWorkspace.workspaceType}`).appendTo(ulL);
            $("<li>").text(`Lease Term: ${targetWorkspace.leaseTerm}`).appendTo(ulL);
            $("<li>").text(`Square Footage: ${targetWorkspace.sqFt} sq ft`).appendTo(ulL);
            $("<li>").text(`Seat Capacity: ${targetWorkspace.seatCapacity}`).appendTo(ulL);
            $("<li>").text(`Price: ${targetWorkspace.price}' /'${(targetWorkspace.leaseTerm)}`).appendTo(ulL);

            // Display amenities
            $("<li>").addClass("detailBoxHeading").text("Amenities").appendTo(ulL);

            targetWorkspace.amenities.forEach( amenity =>{
                const [key, value] = Object.entries(amenity)[0];
                if (value) {
                    $("<li>").text(`- ${key}`).appendTo(ulL);
                }
                else{
                    $("<li>").text(`- ${key}: N/A`).appendTo(ulL);
                }
            });

            //Buttons
            //PopupTitle
            //$.text(`${targetOwnerId}`).appendTo("PopupTitle");

        sectionDivL.append(ulL);
        leftContainer.append(sectionDivL);

        

    
        //right section---------------------------------------------------
        const sectionDivR = $("<div>").appendTo("#workspace-display-right");

        //Image, may add later

        //avg rating calculation
        const averageStarRating = Math.round(workspaceRating.reduce((a, b) => a + b) / workspaceRating.length);
        console.log(averageStarRating);
        //rating title
        $("<div>").addClass("detailBoxHeading").text("Rating").appendTo("starRating");

        //add star symbols
        if(averageStarRating){

           for(let i=0; i<Math.round(averageStarRating); i++){
               $("<span>").addClass("fa fa-star checked").appendTo($("starRating"))

           }
        }else{
            $.addClass("fa fa star").appendTo("starRating");
   
         rightContainer.html("<p>Workspace not found.</p>")};

        
         rightContainer.append(sectionDivR);
        
 });
    