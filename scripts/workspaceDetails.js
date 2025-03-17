import workspaces from './workspaceData.js';
import userData from './userData.js';//for owner contact info
import properties from './propertyData.js';
import reviews from './workspaceReviews.js';

$(document).ready(function () {
    const leftContainer = $("#workspace-display-left");
    const rightContainer = $("#workspace-display-right");

    const popupOverlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closePopup = popup.querySelector('.close');
    const ownerBtn = document.querySelector('.ownerBtn');
    const closeBtn = popup.querySelector('.closeBtn'); 

     // Ensure popup is hidden at start
     popupOverlay.style.display = 'none';

  // Open popup function
  function openPopup() {
    console.log("Opening popup");
    popupOverlay.style.display = 'block';
}

    // Close popup function
    function closeFunction() {
        console.log("Closing popup");
        popupOverlay.style.display = 'none';
    }

    // Open popup on button click
    ownerBtn.addEventListener('click', openPopup);

    // Close popup with 'x' button
    closePopup.addEventListener('click', closeFunction);

    // Close popup with close button
    closeBtn.addEventListener('click', closeFunction);

    // Close popup by clicking outside
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            closeFunction();
        }
    });


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


        function openPopup() {
            console.log("Opening popup");
            
            // Lock body width to prevent shift
            document.body.style.width = `${document.body.clientWidth}px`;
            document.body.style.overflow = 'hidden';
            
            popupOverlay.style.display = 'block';
        }


        function closeFunction() {
            console.log("Closing popup");
            
            // Reset styles
            document.body.style.width = '';
            document.body.style.overflow = '';
            
            popupOverlay.style.display = 'none';
        }

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
    
    // --- Set Owner Contact Info for popup---
    if (targetOwner) {

        // Display owner name
        $('.OwnerName').text(`${targetOwner.firstName} ${targetOwner.lastName}`).appendTo(`.OwnerName`);

        // Display owner email
        $('.ContactInfo').html(`<p>Email: <a href="mailto:${targetOwner.email}">${targetOwner.email}</a></p>`);

        // Display other workspaces by the same owner
        const ownersWorkspaces = workspaces.filter(workspace => workspace.ownerId === targetOwnerId);
        const workspaceList = $('.WorkspacesList');
        

        if (ownersWorkspaces.length > 0) {
            ownersWorkspaces.forEach(workspace => {
                $('<li>').text(workspace.workspaceName).appendTo(workspaceList);
            });
        } else {
            $('<li>').text('No other workspaces available').appendTo(workspaceList);
        }
        closeBtn.addEventListener('click', workpacesList.empty()); // Clear previous list);
    }
});



    


    