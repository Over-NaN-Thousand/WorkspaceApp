import workspaces from './workspaceData.js';
import userData from './userData.js';

$(document).ready(function () {
    const leftContainer = $("#workspace-display-left");
    const rightContainer = $("#workspace-display-right");

    // testing with manualky set Id
    const targetId = 19; 
    const targetWorkspace = workspaces.find(workspace => workspace.workspaceID === targetId);
    let sectionDivR;

    if (targetWorkspace) {

        // Left section
        const sectionDivL = $("<div>").addClass("detailsBoxL");
        
         $("#workspaceTitle").text(targetWorkspace.workspaceName).appendTo(sectionDivL);

        //Left section
        const ulL = $("<ul>").addClass("detailsList");
        //propertyId: 1//needs to give address and maybe other details from property array
        $("<li>").text(`Type: ${targetWorkspace.workspaceType}`).appendTo(ulL);
        $("<li>").text(`Lease Term: ${targetWorkspace.leaseTerm}`).appendTo(ulL);
        $("<li>").text(`Square Footage: ${targetWorkspace.sqFt} sq ft`).appendTo(ulL);
        $("<li>").text(`Seat Capacity: ${targetWorkspace.seatCapacity}`).appendTo(ulL);
        $("<li>").text(`Price: $${targetWorkspace.price} /${(targetWorkspace.leaseTerm)}`).appendTo(ulL);

        // Display amenities
        $("<li>").addClass("detailBoxHeading").text("Amenities:").appendTo(ulL);

        targetWorkspace.amenities.forEach((element, key) =>{
            
            if (element) {
                $("<li>").text(`- ${key}`).appendTo(ulL);
            }
            else{
                $("<li>").text(`N/A`).appendTo(ulL);
            }
        });

        sectionDivL.append(ulL);
        leftContainer.append(sectionDivL);
        
        //right-hand section
        sectionDivR = $("<div>").addClass("detailsBoxR");

        //image
        $("<img>").attr('src',targetWorkspace.imgFileName.href).appendTo(sectionDivR);

        //rating section
        $("<div>").addClass("ratingBox").appendTo(sectionDivR);
        //rating title
        $("<div>").text("Rating").appendTo(sectionDivR.find(".ratingBox"));
        //star rating
        //plan to move this to the review container, above the review
        var count = 0;
        var sum = 0; 
        $("<div>").addClass("stars").appendTo("ratingBox");

      
        targetWorkspace.rating.forEach((value, index)=> {
            if(value){
               { count += 1;
                sum += value;
               };
            }
            else{
                $("<p>").text(`N/A`).appendTo(".stars");
            }  
        });

        const avgStarRating = sum/count;

        //add star symbols
        if (avgStarRating){
            for(let i=0; i<Math.round(avgStarRating); i++){
                $("<span>").addClass("fa fa-star checked").appendTo($(".stars"));
        }
    }else{
            $("<span>").addClass("fa fa star").appendTo(".stars");
        }
    
    }
    else 
    {
        rightContainer.html("<p>Workspace not found.</p>");
    };
 });
 
 rightContainer.append(sectionDivR);

  // imgFileName: "LargeOffice40.jpg"