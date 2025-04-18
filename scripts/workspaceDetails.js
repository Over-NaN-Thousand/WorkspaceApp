import workspaces from './workspaceData.js';
import userData from './userData.js';//for owner contact info
import properties from './propertyData.js';
import reviews from './workspaceReviews.js';


$(document).ready(function () {
    const leftContainer = $("#workspace-display-left");
    const rightContainer = $("#workspace-display-right");

//----------------------------------popups---------------------------------------------// 
 
const popupOverlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const closePopup = popup.querySelector('.close');
const ownerBtn = document.querySelector('.ownerBtn');
const bookingBtn = document.querySelector('.bookingBtn');
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
$('#overlay').on('click', (event) => {
    if (event.target === popupOverlay) {
        closeFunction();
    }
});


/*
// ----------------- Popup Elements -----------------
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const closePopupBtn = popup.querySelector('.close');
const ownerBtn = document.querySelector('.ownerBtn');
const bookingBtn = document.querySelector('.bookingBtn');
const closeBtn = popup.querySelector('.closeBtn');

// ----------------- Ensure default state -----------------

overlay.style.display = 'none';

// ----------------- General Popup Functions -----------------

// Close all overlays
function closeAllPopups() {
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.style.display = 'none';
    });
}

// Open specific overlay by ID
function openSpecificPopup(overlayId) {
    closeAllPopups(); // Hide others
    const targetOverlay = document.getElementById(overlayId);
    if (targetOverlay) {
        targetOverlay.style.display = 'block';
    }
}
    

// ----------------- Event Listeners -----------------

document.querySelector('.ownerBtn')?.addEventListener('click', () => {
    openSpecificPopup('overlay-owner');
});

document.querySelector('.reviewBtn')?.addEventListener('click', () => {
    openSpecificPopup('overlay-review');
});

document.querySelectorAll('.overlay .close, .overlay .closeBtn').forEach(btn => {
    btn.addEventListener('click', closeAllPopups);
});

document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeAllPopups();
        }
    });
});
*/
//------------------------Booking form---------------------------------//

    // Function to handle booking button click
    function bookingForm(){
    // Redirect to book.html page
    window.location.href = '/WorkspaceApp/pages/bookingtemp.html';
    }

    bookingBtn.addEventListener('click', bookingForm);
   
function receiveSearchString(){
    const currUrl = new URL(window.location.href);
    const params = new URLSearchParams(currUrl.search);
    const searchText = ("workspace.workspaceID");
    return searchText;
}

var targetId = Number(receiveSearchString());

    //const workspace = JSON.parse(localStorage.getItem('Workspace'));
    //var targetId = workspace;

    //const workspace = JSON.parse(localStorage.getItem('Workspace'));

    //var targetId = 19;

      // fallBack to default workspace ID if not found in URL
      if (!targetId) {
        targetId = 19; 
    }

    const targetWorkspace = workspaces.find(workspace => workspace.workspaceID === Number(targetId));

    const targetOwnerId = targetWorkspace.ownerId;
    const targetPropertyId = targetWorkspace.propertyId;
    const targetOwner = userData.find(user => user.id === targetOwnerId);
    const targetProperty = properties.find(property => property.propertyId === targetPropertyId);
    const workspaceRating = targetWorkspace.rating;
    const targetReviews = reviews.filter(review => review.workspaceID === targetId);

    console.log("Workspace:", targetWorkspace);
    console.log("Owner:", targetOwner);
    console.log("Property:", targetProperty);
    console.log("Rating:", workspaceRating);
    console.log("Reviews:", targetReviews);


//------------------------Owner contact info---------------------------------//

    if (targetOwner) {
        // Display owner name
        $('.OwnerName').text(`${targetOwner.firstName} ${targetOwner.lastName}`);

        // Display owner email
        $('.ContactInfo').html(`<p>Email: <a href="mailto:${targetOwner.email}">${targetOwner.email}</a></p>`);

        // Display other workspaces by the same owner
        const ownersWorkspaces = workspaces.filter(workspace => workspace.ownerId === targetOwnerId);
        const workspaceList = $('.WorkspacesList');
        workspaceList.empty(); // Clear previous list

        if (ownersWorkspaces.length > 0) {
            ownersWorkspaces.forEach(workspace => {
                $('<li>').text(workspace.workspaceName).appendTo(workspaceList);
            });
        } else {
            $('<li>').text('No other workspaces available').appendTo(workspaceList);
        }
    }

//------------------------Left Section---------------------------------//

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
            $("<li>").text(`Price: $${targetWorkspace.price} / ${targetWorkspace.leaseTerm}`).appendTo(ulL);
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

//------------------------Right Section---------------------------------//

            const sectionDivR = $("<div>").appendTo(rightContainer);

        //avg rating calculation
        const averageStarRating = workspaceRating.length > 0 
        ? Math.round(workspaceRating.reduce((a, b) => a + b) / workspaceRating.length): 0;
        console.log(averageStarRating);

        //add star symbols
        const starRatingDiv = $(".starRating").empty(); 

           for(let i=0; i < averageStarRating; i++){
               $("<span>").addClass("fa fa-star checked").appendTo(starRatingDiv);
           }
            // If no rating, show empty stars
            if (averageStarRating === 0) {
                $("<span>").addClass("fa fa-star").appendTo(starRatingDiv);
            }

//------------------------Reviews---------------------------------//

            const reviewContainer = $(".reviewBody").empty();

            // track review index
            let currentReviewIndex = 0;

            function displayReview(index) {
            reviewContainer.empty();
            if (targetReviews.length > 0) {
                const review = targetReviews[index];
                $("<p>").text(`${review.date}`).appendTo(".reviewBody"),
                $("<p>").text(`${review.comment}`).appendTo(".reviewBody");
                } else {
                $("<p>").text("No reviews available").appendTo(".reviewBody");
            }
            }
            
            if (targetReviews.length > 0) {
                displayReview(currentReviewIndex);

                // Prev/Next buttons
                const prevButton = $(`<button>`).text(`Prev`).addClass(`review-btn prev-btn`).appendTo(`.leftBtn`);
                const nextButton = $(`<button>`).text(`Next`).addClass(`review-btn next-btn`).appendTo(`.rightBtn`);

                // Event listeners 
                prevButton.on("click", () => {
                    currentReviewIndex = (currentReviewIndex - 1 + targetReviews.length) % targetReviews.length;
                    displayReview(currentReviewIndex);
                });

                nextButton.on("click", () => {
                    currentReviewIndex = (currentReviewIndex + 1) % targetReviews.length;
                    displayReview(currentReviewIndex);
                });
            } else {
                displayReview(currentReviewIndex);
            };
            
    });



    


    