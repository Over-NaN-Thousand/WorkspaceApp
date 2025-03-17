import workspaces from './workspaceData.js';
import userData from './userData.js';//for owner contact info
import properties from './propertyData.js';
import reviews from './workspaceReviews.js';

$(document).ready(function () {
    const leftContainer = $("#workspace-display-left");
    const rightContainer = $("#workspace-display-right");

    // testing with manualky set Id
    const targetId = 19; 

    //use worskpaceId to find owner and property data
    const targetWorkspace = workspaces.find(workspace => workspace.workspaceID === targetId);
    const targetOwnerId = targetWorkspace.ownerId;
    const targetPropertyId = targetWorkspace.propertyId;
    const targetOwner = userData.find(user => user.id === targetOwnerId);
    const targetProperty = properties.find(property => property.propertyId === targetPropertyId);
    const workspaceRating = targetWorkspace.rating;
    const targetReviews = reviews.find(review => review.workspaceID === targetId);
    
        console.log("Workspace:", targetWorkspace);
        console.log("Owner:", targetOwner);
        console.log("Property:", targetProperty);
        console.log("Rating:", workspaceRating);
        console.log("Reviews:", targetReviews);

  
        //-------Left section----------------------------------------------
        const sectionDivL= $("<div>").appendTo("#workspace-display-left");
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
            //workspace details
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
            sectionDivL.append(ulL);

//-------------------------------------------------------------------------//
// //right section---------------------------------------------------
            const sectionDivR = $("<div>").appendTo(rightContainer);

        //avg rating calculation
        const averageStarRating = workspaceRating.length > 0 
        ? Math.round(workspaceRating.reduce((a, b) => a + b) / workspaceRating.length): 0;
        console.log(averageStarRating);

        //add star symbols
        const starRatingDiv = $(".starRating");
            starRatingDiv.empty(); // Clear previous content

           for(let i=0; i < averageStarRating; i++){
               $("<span>").addClass("fa fa-star checked").appendTo(starRatingDiv);
           }
            // If no rating, show empty stars
            if (averageStarRating === 0) {
                $("<span>").addClass("fa fa-star").appendTo(starRatingDiv);
            }
            

            //-------------popup---------------------------------------------           
        
    const popupOverlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closePopup = popup.querySelector('.close');
    const messageInput = document.getElementById('messageInput');
    const ownerBtn = document.querySelector('.ownerBtn');
    const closeBtn = popup.querySelector('.closeBtn'); 

    // popup is hidden at start
    popupOverlay.style.display = 'none';

     // Open popup 
     function openPopup() {
        popupOverlay.style.display = 'block';
    }
    // Close popup
    function closeFunction() {
        popupOverlay.style.display = 'none';
    }
    
    // Set owner contact info
    // Display owner contact info in popup
    const ownerName = targetOwner.first
    const ownerEmail = targetOwner.email;
    const ownerDetails = `
        <p><strong>Owner:</strong> ${ownerName}</p>
        <p><strong>Email:</strong> ${ownerEmail}</p>
    `;
    popup.querySelector('.ownerDetails').innerHTML = ownerDetails;    

    ownerName.textContent = `${targetOwner.firstName} ${targetOwner.lastName}`;
    ownerEmail.textContent = targetOwner.email;

    const ownersWorkspaces = workspaces.filter(workspace => workspace.ownerId === targetOwnerId);
    console.log(ownersWorkspaces);
              
    $("<li>").text(`Name: ${targettargetOwner.firstName}`).appendTo("OwnerName");
    $("<li>").text(`Last Name: ${targettargetOwner.lastName}`).appendTo("OwnerLastName");

    $("<h3>").text("Contact ").appendTo("ContactInfo");
    $("<li>").addClass("email").text('Email: ${email}').appendTo("ContactInfo");

    //Owners other workspaces to view
    $("<h3>").text("Workspaces").appendTo("WorkspacesList");
    ownersWorkspaces.forEach(ownersWorkspaces => {
    $("<li>").text(ownersWorkspaces.workspaceName).appendTo("WorkspacesList")
    });

    // Open popup on button click
    ownerBtn.addEventListener('click', openPopup);
    // Close popup with the 'x' button
    closePopup.addEventListener('click', closeFunction);
    // Close popup with close button
    closeBtn.addEventListener('click', closeFunction); 
    // Close popup by clicking outside the popup
    popupOverlay.addEventListener('click', function(event) {
        if (event.target === popupOverlay) {
            closeFunction();
        }
    });   
});


    


    