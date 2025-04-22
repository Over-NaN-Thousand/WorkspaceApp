//----------------------- Get workspace from session storage-----------------------// 

$(document).ready(function () {
    // Fetch the workspace ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const workspaceId = urlParams.get('workspaceid');

    // Retrieve the workspace list from sessionStorage
    const workspaceList = JSON.parse(sessionStorage.getItem('workspaceList')); // sessionStorage instead of localStorage

    // Check if workspace list or workspace ID is missing
    if (!workspaceList || !workspaceId) {
        $('#workspace-details').text('Workspace not found.');
        return;
    }

    // Find the specific workspace from the list based on the workspace ID
    const selectedWorkspace = workspaceList.find(ws => ws.workspaceID == workspaceId);

    // If the workspace isn't found, show an error
    if (!selectedWorkspace) {
        $('#workspace-details').text('Workspace not found.');
        return;
    }


    // ----------------------Populate the workspace details in the HTML---------------------------------//
    /*
        const targetId = selectedWorkspace.workspaceID; // Get the workspace ID from the URL
        const targetWorkspace = workspaces.find(workspace => workspace.workspaceID === Number(targetId));
        const targetOwnerId = targetWorkspace.ownerId;
        const targetPropertyId = targetWorkspace.propertyId;
        const targetOwner = userData.find(user => user.id === targetOwnerId);
        const targetProperty = properties.find(property => property.propertyId === targetPropertyId);
        const workspaceRating = targetWorkspace.rating;
        const targetReviews = reviews.filter(review => review.workspaceID === targetId);
    
    
    //------------------------Workspace details page---------------------------------//
    
        const leftContainer = $("#workspace-display-left");
        const rightContainer = $("#workspace-display-right");
    */
    //----------------------------------popups---------------------------------------------// 

    const popupOverlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closePopup = popup.querySelector('.close');
    const ownerBtn = document.querySelector('.ownerBtn');
    const bookingBtn = document.querySelector('.bookingBtn');
    const closeBtn = popup.querySelector('.closeBtn');


    // Ensure popup is hidden at start

    popupOverlay.style.display = 'none';




    function openPopup() {
        popupOverlay.style.display = 'block';
    }

    function closeFunction() {
        popupOverlay.style.display = 'none';
    }
    // Close popup with close button
    closeBtn.addEventListener('click', closeFunction);

    // Close popup by clicking outside
    $('#overlay').on('click', (event) => {
        if (event.target === popupOverlay) {
            closeFunction();
        }
    });

    //------------------------Booking form---------------------------------//

    // Function to handle booking button click
    function bookingForm() {
        // Redirect to book.html page
        window.location.href = '/WorkspaceApp/pages/bookingtemp.html';
    }

    bookingBtn.addEventListener('click', bookingForm);


    //------------------------Owner contact info---------------------------------//

    const ownerId = selectedWorkspace.ownerId;

    if (!ownerId) {
        // No ownerId found – show fallback text
        $(".OwnerName").text("No owner information found.");
        $(".ContactInfo").html(`<p>Not available</p>`);
        $(".WorkspacesList").html(`<li>No other workspaces available</li>`);
        $(".contact-owner-btn").prop("disabled", true); // Optional
    } else {
        // Fetch owner contact info
        $.get(`/ownerContactInfo/${ownerId}`, function (ownerData) {
            $(".OwnerName").text(`${ownerData.firstName} ${ownerData.lastName}`);
            $(".ContactInfo").html(`
            <p>Email: <a href="mailto:${ownerData.email}">${ownerData.email}</a></p>
            <p>Phone: <a href="tel:${ownerData.phoneNumber}">${ownerData.phoneNumber}</a></p>
        `);


            // Fetch other workspaces by the same owner
            $.get(`/ownersWorkspaceList/${ownerId}`, function (workspaces) {
                const ownersOtherWorkspaces = $(".WorkspacesList").empty();
                const filtered = workspaces.filter(ws => ws.workspaceID != selectedWorkspace.workspaceID);

                if (filtered.length > 0) {
                    filtered.forEach(ws => {
                        $("<li>").text(ws.workspaceName).appendTo(ownersOtherWorkspaces);
                    });
                } else {
                    $("<li>").text("No other workspaces available").appendTo(ownersOtherWorkspaces);
                }
            }).fail(() => {
                $(".WorkspacesList").html(`<li>Failed to load other workspaces</li>`);
            });

        }).fail(() => {
            $(".OwnerName").text("No owner information found.");
            $(".ContactInfo").html(`<p>Not available</p>`);
            $(".WorkspacesList").html(`<li>No other workspaces available</li>`);
            $(".contact-owner-btn").prop("disabled", true);
        });
    }

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



    //------------------------Reviews---------------------------------/

    // Handle Submit Review Button
    $(".reviewBtn").click(() => {
        $("#overlay-review").fadeIn();
    });

    $("#overlay-review .close").click(() => {
        $("#overlay-review").fadeOut();
    });

    //Handle star selection
    $(".star-input .fa-star").click(function () {
        const index = $(this).index();
        $(".star-input .fa-star").removeClass("checked");
        for (let i = 0; i <= index; i++) {
            $(".star-input .fa-star").eq(i).addClass("checked");
        }

        // Save rating to a hidden field or variable
        $("#reviewStars").val(index + 1); // if you're using a hidden input with ID 'reviewStars'
    });

    //Submit review
    $("#submitReviewBtn").click(async () => {
        const rating = $("#reviewStars").val();
        const comment = $("#reviewComment").val().trim();
        const workspaceName = $("#workspaceTitle").text();

        if (!rating || !comment) {
            alert("Please select stars and write a comment!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${localStorage.getItem("token")}` // if needed
                },
                body: JSON.stringify({
                    workspaceName,
                    rating: parseInt(rating),
                    comment,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Review submitted!");
                $("#overlay-review").fadeOut();
                $("#reviewComment").val("");
                $("#reviewStars").val("");
                $(".fa-star").removeClass("checked");

                fetchReviewsAndRender(workspaceName);
            } else {
                alert(data.message || "Review failed.");
            }
        } catch (err) {
            console.error("Review error:", err);
            alert("Something went wrong submitting review.");
        }
    });


    const starRatingDiv = $(".starRating").empty();
    const ratingHeading = $(".detailBoxHeading:contains('Average Rating')");


    function renderReviewSlider(reviews) {
        const container = $("#reviewCardsContainer");
        let current = 0;

        function render(index) {
            container.fadeOut(150, () => {
                container.empty();

                const review = reviews[index];
                const card = $("<div>").addClass("review-card active");
                const starsDiv = $("<div>").addClass("review-stars");

                for (let i = 0; i < review.rating; i++) {
                    starsDiv.append('<i class="fa fa-star checked"></i>');
                }

                const commentDiv = $("<div>").addClass("review-comment").text(review.comment);
                card.append(starsDiv, commentDiv);
                container.append(card);

                container.fadeIn(150);
            });
        }

        $("#prevReviewBtn").off("click").on("click", () => {
            current = (current - 1 + reviews.length) % reviews.length;
            render(current);
        });

        $("#nextReviewBtn").off("click").on("click", () => {
            current = (current + 1) % reviews.length;
            render(current);
        });

        render(current); // show first review
    }


    async function fetchReviewsAndRender(workspaceName) {
        try {
            const response = await fetch(`http://localhost:3000/reviews?workspaceName=${encodeURIComponent(workspaceName)}`);
            const data = await response.json();
            if (response.ok && data.reviews) {
                renderReviewSlider(data.reviews); // existing function
            }
        } catch (error) {
            console.error("Error fetching updated reviews:", error);
        }
    }

    const workspaceName = $("#workspaceTitle").text();
    fetchReviewsAndRender(workspaceName);


    displayReview(currentReviewIndex);


})


