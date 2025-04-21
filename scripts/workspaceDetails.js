
//----------------------- Get workspace from session storage-----------------------// 
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const workspaceID = parseInt(urlParams.get('workspaceid')); // convert to number

    const workspaceList = JSON.parse(sessionStorage.getItem('workspaceList'));
    console.log("workspaceList from sessionStorage:", workspaceList);
    console.log("workspaceID from URL:", workspaceID);

    if (!workspaceList || isNaN(workspaceID)) {
        console.error('Workspace list or workspace ID is missing or invalid');
        return;
    }

    const selectedWorkspace = workspaceList.find(ws => ws.workspaceID === workspaceID);

    console.log("Selected Workspace:", selectedWorkspace);


    if (!selectedWorkspace) {
        console.error('Workspace not found in list');
        return;
    }

    console.log("Selected Workspace:", selectedWorkspace);
    $("#workspaceTitle").text(selectedWorkspace.workspaceName);




//----------------------------------popups---------------------------------------------// 
 
// ----------------- Popup Elements -----------------//
const popupOverlay = document.getElementById('overlay');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const ownerBtn = document.querySelector('.ownerBtn');
const bookingBtn = document.querySelector('.bookingBtn');
const closeBtn = popup.querySelector('.closeBtn');
const closePopup = popup.querySelector('.close');

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

$('.ownerBtn').on('click', async function () {
    if (!selectedWorkspace || !selectedWorkspace.workspaceID) {
        console.error('Workspace ID is undefined');
        $(".ownerName").text("No owner information found.");
        $(".contactInfo").html(`<p>Not available</p>`);
        return;
    }

    const workspaceID = selectedWorkspace.workspaceID;

    try {
        // Make a request to the backend to fetch workspace and owner info
        const response = await fetch(`http://localhost:3000/workspaceDetails/${workspaceID}`);
        
        if (response.ok) {
            const data = await response.json();
            
            // Display workspace and owner info in the popup
            $(".ownerName").text(`${data.owner.firstName} ${data.owner.lastName}`);
            $(".contactInfo").html(`
                <p>Email: <a href="mailto:${data.owner.email}">${data.owner.email}</a></p>
                <p>Phone: <a href="tel:${data.owner.phoneNumber}">${data.owner.phoneNumber}</a></p>
            `);
        } else {
            $(".ownerName").text("No owner information found.");
            $(".contactInfo").html(`<p>Not available</p>`);
        }
    } catch (error) {
        console.error("Error fetching workspace details:", error);
        $(".ownerName").text("No owner information found.");
        $(".contactInfo").html(`<p>Not available</p>`);
    }
});


//------------------------Booking form---------------------------------//

    // Function to handle booking button click
    function bookingForm(){
    // Redirect to book.html page
    window.location.href = '/WorkspaceApp/pages/bookingtemp.html';
    }

    bookingBtn.addEventListener('click', bookingForm);


//------------------------Owner contact info---------------------------------//
$(document).on('click', '.ownerBtn', async function () {
    if (!selectedWorkspace || !selectedWorkspace.propertyId || !selectedWorkspace.propertyId.ownerId) {
        console.error("No ownerId found in selectedWorkspace");
        $(".ownerName").text("No owner information found.");
        $(".contactInfo").html(`<p>Not available</p>`);
        return;
    }

    const ownerId = selectedWorkspace.propertyId.ownerId;

    try {
        const response = await fetch(`http://localhost:3000/ownerContactInfoById/${ownerId}`);
        if (response.ok) {
            const ownerData = await response.json();
            $(".ownerName").text(`${ownerData.firstName} ${ownerData.lastName}`);
            $(".contactInfo").html(`
                <p>Email: <a href="mailto:${ownerData.email}">${ownerData.email}</a></p>
                <p>Phone: <a href="tel:${ownerData.phoneNumber}">${ownerData.phoneNumber}</a></p>
            `);
        } else {
            $(".ownerName").text("No owner information found.");
            $(".contactInfo").html(`<p>Not available</p>`);
        }
    } catch (error) {
        console.error("Error fetching owner info:", error);
        $(".ownerName").text("No owner information found.");
        $(".contactInfo").html(`<p>Not available</p>`);
    }
});



//------------------------Left Section---------------------------------//


const sectionDivL = $("<div>").appendTo("#workspace-display-left");

// Set workspace name in the existing div
$("#workspaceTitle").text(selectedWorkspace.workspaceName).appendTo(sectionDivL);

// Left section list
const ulL = $("<ul>").addClass("detailsList");

// Address details
$("<li>").addClass("detailBoxHeading").text("Address").appendTo(ulL);
$("<li>").text(`Line 1: ${selectedWorkspace.address1}`).appendTo(ulL);
$("<li>").text(`Line 2: ${selectedWorkspace.address2}`).appendTo(ulL);
$("<li>").text(`Postal Code: ${selectedWorkspace.postalcode}`).appendTo(ulL);
$("<li>").text(`City: ${selectedWorkspace.city}`).appendTo(ulL);
$("<li>").text(`Province: ${selectedWorkspace.province}`).appendTo(ulL);
$("<li>").text(`Country: ${selectedWorkspace.country}`).appendTo(ulL);

// Workspace details
$("<li>").addClass("detailBoxHeading").text("Details").appendTo(ulL);
$("<li>").text(`Type: ${selectedWorkspace.workspaceType}`).appendTo(ulL);
$("<li>").text(`Price: $${selectedWorkspace.price} / ${selectedWorkspace.leaseTerm}`).appendTo(ulL);
$("<li>").text(`Square Footage: ${selectedWorkspace.sqFt} sq ft`).appendTo(ulL);
$("<li>").text(`Seat Capacity: ${selectedWorkspace.seatCapacity}`).appendTo(ulL);

// Display amenities if they exist
if (selectedWorkspace.amenities && selectedWorkspace.amenities.length > 0) {
    $("<li>").addClass("detailBoxHeading").text("Amenities").appendTo(ulL);
    selectedWorkspace.amenities.forEach(amenity => {
        $("<li>").text(`- ${amenity}`).appendTo(ulL);  // Display each amenity directly
    });
} else {
    // If no amenities, hide the section (or show "N/A")
    $("<li>").addClass("detailBoxHeading").text("Amenities: N/A").appendTo(ulL);
}

sectionDivL.append(ulL);

//------------------------Right Section---------------------------------//

// Get ratings array from the selected workspace
let workspaceRating = selectedWorkspace.rating || [];

// If the rating is an array with a single string (like ["2, 3, 5, 2, 2"]), split it into individual numbers
if (workspaceRating.length === 1 && typeof workspaceRating[0] === "string") {
    workspaceRating = workspaceRating[0].split(",").map(r => Number(r.trim()));
}

console.log("Raw Ratings Array:", workspaceRating);

// Calculate average rating
const averageStarRating = workspaceRating.length > 0 
    ? Math.round(workspaceRating.reduce((a, b) => a + b, 0) / workspaceRating.length)
    : 0;

console.log("Average Rating:", averageStarRating);

const starRatingDiv = $(".starRating").empty();
const ratingHeading = $(".detailBoxHeading:contains('Average Rating')");

// Toggle visibility based on rating availability
ratingHeading.toggle(workspaceRating.length > 0);
starRatingDiv.toggle(workspaceRating.length > 0);

// If ratings exist, render stars
if (workspaceRating.length > 0) {
    for (let i = 0; i < averageStarRating; i++) {
        $("<span>").addClass("fa fa-star checked").appendTo(starRatingDiv);
    }
}

//------------------------Reviews---------------------------------//
const targetReviews = selectedWorkspace.reviews || [];

const reviewContainer = $(".reviewBody").empty();
const reviewSection = $(".reviewContainer"); // Full review block
const reviewHeading = $(".reviewContainer .subHeading"); // Just the heading inside review section

let currentReviewIndex = 0;

function displayReview(index) {
    reviewContainer.empty();
    const review = targetReviews[index];
    $("<p>").text(`${review.date}`).appendTo(".reviewBody");
    $("<p>").text(`${review.comment}`).appendTo(".reviewBody");
}

// Only show the review section if there are reviews
if (targetReviews.length > 0) {
    reviewSection.show();
    reviewHeading.show();

    displayReview(currentReviewIndex);

    // Prev/Next buttons
    const prevButton = $(`<button>`).text(`Prev`).addClass(`review-btn prev-btn`).appendTo(`.leftBtn`);
    const nextButton = $(`<button>`).text(`Next`).addClass(`review-btn next-btn`).appendTo(`.rightBtn`);

    prevButton.on("click", () => {
        currentReviewIndex = (currentReviewIndex - 1 + targetReviews.length) % targetReviews.length;
        displayReview(currentReviewIndex);
    });

    nextButton.on("click", () => {
        currentReviewIndex = (currentReviewIndex + 1) % targetReviews.length;
        displayReview(currentReviewIndex);
    });
} else {
    reviewSection.hide(); // This hides the whole block, including heading
}

}); 
    