class Workspace {
    constructor(workspaceID, workspaceName, workspaceType, leaseTerm, seatCapacity, price, imgFileName, address1, address2, neighborhood, city, province, country, postalcode, areaSqM, amenities = []) {
        this.workspaceID = workspaceID;
        this.workspaceName = workspaceName;
        this.workspaceType = workspaceType;
        this.leaseTerm = leaseTerm;
        this.seatCapacity = seatCapacity;
        this.price = price;
        this.imgFileName = imgFileName;
        this.address1 = address1;
        this.address2 = address2;
        this.neighborhood = neighborhood;
        this.city = city;
        this.province = province;
        this.country = country;
        this.postalcode = postalcode;
        this.areaSqM = areaSqM;
        this.amenities = amenities; //we'll save an array of amenities
    }
}

const allWorkspaces = [];
allWorkspaces.push(new Workspace(1, "Conference Room A", "Conference Room", "Daily", 20, 500, "conference1.jpg", "123 Main St", "Suite 101", "Downtown", "Calgary", "Alberta", "Canada", "T2P 0R3", 100, ["Projector", "Kitchen"]));
allWorkspaces.push(new Workspace(2, "Private Office Suite", "Private Office", "Monthly", 10, 1500, "private_office1.jpg", "456 Office Lane", "", "Business District", "Calgary", "Alberta", "Canada", "T3C 1X1", 75, ["Copy/Print Equipment", "Kitchen"]));
allWorkspaces.push(new Workspace(3, "Desk Space 1", "Desk", "Daily", 1, 50, "desk1.jpg", "789 CoWork St", "", "Midtown", "Calgary", "Alberta", "Canada", "T2E 5R1", 10, ["Covered Parking"]));
allWorkspaces.push(new Workspace(4, "Conference Room B", "Conference Room", "Weekly", 25, 1000, "conference2.jpg", "321 Office Tower", "Floor 3", "Downtown", "Calgary", "Alberta", "Canada", "T2P 0R4", 150, ["Projector", "Covered Parking"]));
allWorkspaces.push(new Workspace(5, "Private Office B", "Private Office", "Quarterly", 5, 2500, "private_office2.jpg", "654 Enterprise Blvd", "", "Financial District", "Calgary", "Alberta", "Canada", "T3C 1Y2", 90, ["Kitchen", "Copy/Print Equipment"]));
allWorkspaces.push(new Workspace(6, "Open Desk 2", "Desk", "Weekly", 1, 75, "desk2.jpg", "789 CoWork St", "", "Midtown", "Calgary", "Alberta", "Canada", "T2E 5R1", 10, ["Kitchen"]));
allWorkspaces.push(new Workspace(7, "Boardroom 1", "Conference Room", "Monthly", 15, 1200, "boardroom1.jpg", "123 Main St", "Suite 105", "Downtown", "Calgary", "Alberta", "Canada", "T2P 0R3", 120, ["Projector", "Covered Parking"]));
allWorkspaces.push(new Workspace(8, "Shared Office", "Private Office", "Daily", 3, 400, "shared_office.jpg", "987 Work Place", "Room 2B", "Suburbs", "Calgary", "Alberta", "Canada", "T1X 0L3", 50, ["Copy/Print Equipment"]));
allWorkspaces.push(new Workspace(9, "Desk Space 3", "Desk", "Monthly", 1, 200, "desk3.jpg", "852 Shared St", "", "Business District", "Calgary", "Alberta", "Canada", "T3C 1N9", 8, ["Kitchen"]));
allWorkspaces.push(new Workspace(10, "Executive Conference Room", "Conference Room", "Quarterly", 30, 3000, "executive_room.jpg", "321 Enterprise Plaza", "Penthouse", "Downtown", "Calgary", "Alberta", "Canada", "T2P 5G7", 180, ["Projector", "Kitchen", "Covered Parking"]));
allWorkspaces.push(new Workspace(11, "Team Workspace A", "Private Office", "Monthly", 8, 1600, "team_space1.jpg", "456 Office Lane", "Suite 202", "Business District", "Calgary", "Alberta", "Canada", "T3C 1X1", 80, ["Copy/Print Equipment"]));
allWorkspaces.push(new Workspace(12, "Solo Desk", "Desk", "Daily", 1, 30, "solo_desk.jpg", "654 Work Co.", "Floor 4", "Midtown", "Calgary", "Alberta", "Canada", "T2M 6R7", 5, ["Kitchen"]));
allWorkspaces.push(new Workspace(13, "Conference Room C", "Conference Room", "Daily", 12, 600, "conference3.jpg", "213 Tower Ave", "Level 2", "Uptown", "Calgary", "Alberta", "Canada", "T3F 2R5", 90, ["Projector"]));
allWorkspaces.push(new Workspace(14, "Solo Office Suite", "Private Office", "Weekly", 1, 800, "solo_office.jpg", "999 Prime St", "Room 1C", "Suburbs", "Calgary", "Alberta", "Canada", "T4X 0L2", 40, ["Covered Parking", "Kitchen"]));
allWorkspaces.push(new Workspace(15, "Hot Desk Zone", "Desk", "Weekly", 1, 120, "hot_desk.jpg", "555 Flex Tower", "", "Downtown", "Calgary", "Alberta", "Canada", "T1X 7P1", 8, ["Kitchen", "Covered Parking"]));
allWorkspaces.push(new Workspace(16, "Meeting Room Pro", "Conference Room", "Monthly", 20, 2400, "meeting_room.jpg", "111 Main Place", "Floor 8", "Midtown", "Calgary", "Alberta", "Canada", "T2Y 8P3", 130, ["Projector", "Kitchen"]));
allWorkspaces.push(new Workspace(17, "Startup Office", "Private Office", "Quarterly", 4, 2000, "startup_office.jpg", "777 Tech Hub", "", "Business District", "Calgary", "Alberta", "Canada", "T3C 7G5", 60, ["Copy/Print Equipment", "Kitchen"]));
allWorkspaces.push(new Workspace(18, "Flex Desk Area", "Desk", "Monthly", 1, 100, "flex_desk.jpg", "444 Open Hub", "Room 3F", "Uptown", "Calgary", "Alberta", "Canada", "T2T 5L1", 6, ["Kitchen", "Covered Parking"]));
allWorkspaces.push(new Workspace(19, "Premium Conference Suite", "Conference Room", "Daily", 25, 1500, "premium_suite.jpg", "654 Enterprise Blvd", "", "Financial District", "Calgary", "Alberta", "Canada", "T3C 1Y2", 200, ["Projector", "Copy/Print Equipment"]));
allWorkspaces.push(new Workspace(20, "Small Private Office", "Private Office", "Weekly", 2, 600, "small_office.jpg", "333 CoWork Place", "Unit 5D", "Suburbs", "Calgary", "Alberta", "Canada", "T1X 4P7", 30, ["Covered Parking"]));
allWorkspaces.push(new Workspace(21, "Downtown Meeting Hub", "Conference Room", "Daily", 18, 600, "meeting_hub.jpg", "789 Jasper Ave", "Suite 12", "Downtown", "Edmonton", "Alberta", "Canada", "T5J 4C2", 120, ["Projector", "Copy/Print Equipment"]));
allWorkspaces.push(new Workspace(22, "Northern Private Office", "Private Office", "Monthly", 6, 1400, "northern_office.jpg", "456 Edmonton Way", "Suite 201", "Old Strathcona", "Edmonton", "Alberta", "Canada", "T6E 2G8", 70, ["Covered Parking", "Kitchen"]));
allWorkspaces.push(new Workspace(23, "The Bay Conference Room", "Conference Room", "Weekly", 25, 1200, "bay_conference.jpg", "333 Market St", "Floor 8", "Financial District", "San Francisco", "California", "USA", "94105", 200, ["Projector", "Kitchen", "Covered Parking"]));
allWorkspaces.push(new Workspace(24, "Tech Hub Desk", "Desk", "Daily", 1, 50, "tech_hub_desk.jpg", "101 Silicon Alley", "Room 15", "SoMa", "San Francisco", "California", "USA", "94107", 10, ["Kitchen", "Copy/Print Equipment"]));



$(document).ready(function() {

    const optWStypes = ["Conference Room", "Private Office", "Desk"];
    const optTerm = ["Daily", "Weekly", "Monthly", "Quarterly"];
    const optAmenities = ["Covered Parking","Kitchen","Copy/Print Equipment","Projector", "Yoga Room"];
    addOptionsToSection(optWStypes,"types", "optWStypes", "checkbox");
    addOptionsToSection(optTerm,"term", "optTerm", "radio");
    addOptionsToSection(optAmenities,"amenities", "optAmenities", "checkbox");

    loadFiltersFromSession();

    const currUrl = new URL(window.location.href);
    const params = new URLSearchParams(currUrl.search);
    const searchText = params.get('searchtext');
    if (searchText !== "")
        $("#searchtext").val(searchText);
    
    ClickApplyBtn();

});



function addOptionsToSection(options, targetclass, name, type) {
    options.forEach(option => {
          $(`.${targetclass}`).find('details').append(`<label><input type="${type}" name="${name}" value="${option}"> ${option}</label>`);
    });
}

function loadFiltersFromSession() {
    const filters = JSON.parse(sessionStorage.getItem('filters'));

    if (filters) {
        $('input[name="optWStypes"]').each(function () {
            $(this).prop('checked', filters.workspaceTypes.includes($(this).val()));
        });

        // Load price range inputs
        $("#minPrice").val(filters.minPrice || '');
        $("#maxPrice").val(filters.maxPrice || '');

        // Load Lease Term
        $('input[name="optTerm"]').each(function () {
            $(this).prop('checked', $(this).val() === filters.leaseTerm);
        });

    // Load seat capacity inputs
        $("#minCapacity").val(filters.minCapacity || '');
        $("#maxCapacity").val(filters.maxCapacity || '');

        // Load Amenities
        $('input[name="optAmenities"]').each(function () {
            $(this).prop('checked', filters.amenities.includes($(this).val()));
        });
    }
}

function DisplayWorkspaces(workspaceList){
    $("#workspaces-container").empty();
    workspaceList.forEach(workspace => {
        const section = `
            <section class="workspace-item" >
                <div class="workspace-picture">
                    <img src="${workspace.imgFileName}" alt="${workspace.workspaceName}" onerror="this.src='resources/images/pexels-fotios-photos-1957478.jpg';">
                </div>
                <div class="workspace-details">
                    <h2 style="margin-top: 0;">${workspace.workspaceName}</h2>
                    <p><strong>Type:</strong> ${workspace.workspaceType}</p>
                    <p><strong>Lease Term:</strong> ${workspace.leaseTerm}</p>
                    <p><strong>Price:</strong> $${workspace.price} per term</p>
                    <p><strong>Capacity:</strong> ${workspace.seatCapacity} seats</p>
                    <p><strong>Neighborhood:</strong> ${workspace.neighborhood}</p>
                    <p><strong>Location:</strong> ${workspace.address1}, ${workspace.city}, ${workspace.province}, ${workspace.country}</p>
                    <p><strong>Amenities:</strong> ${workspace.amenities.join(", ")}</p>
                </div>
            </section>`;
        $("#workspaces-container").append(section); // Append created section to the container
    });
    $("#display-count").text(`${workspaceList.length} records found.`);
}

function ApplyFilters(workspaceList){
    let returnList = workspaceList; //AL - create a shallow copy, all filters shall be applied to this

    //FILTER BY WORKSPACE TYPE
    const pickedTypes = $('input[name="optWStypes"]:checked').map( function(){
        return $(this).val(); //AL -  get all inputs with name optWStypes using jQ, go through them one by one
    }).get();           //!discovery! jQ object not automatically an array, must use get() to convert
    
    if (pickedTypes.length>0) //AL - only apply filter if one or more was picked
        returnList = workspaceList.filter(workspace => pickedTypes.includes(workspace.workspaceType));

    
    //FILTER BY PRICE
    const rawMinPrice = $("#minPrice").val().trim(); // AL - trim user input for safety
    const rawMaxPrice = $("#maxPrice").val().trim();
    const priceMin = parseFloat(rawMinPrice); // then try to convert to float
    const priceMax = parseFloat(rawMaxPrice);

    if (!isNaN(priceMin) && priceMin > 0) { // AL - only apply filter if user entered valid filter value
        returnList = returnList.filter(workspace => workspace.price >= priceMin);
    }
    if (!isNaN(priceMax) && priceMax > 0) {
        returnList = returnList.filter(workspace => workspace.price <= priceMax);
    }


    //FILTER BY LEASE TERM
    const pickedTerm = $('input[name="optTerm"]:checked').val(); // AL - get value of the selected radio button
    if (pickedTerm) {                 // AL - only filter if a term is selected
        returnList = returnList.filter(workspace => workspace.leaseTerm === pickedTerm);
    }


    //FILTER BY SEAT CAPACITY
    const rawMinCapacity = $("#minCapacity").val().trim(); //AL - just like price above
    const rawMaxCapacity = $("#maxCapacity").val().trim();
    const capacityMin = parseInt(rawMinCapacity); //no decimals! imagine 0.78 of a chair
    const capacityMax = parseInt(rawMaxCapacity);

    if (!isNaN(capacityMin) && capacityMin > 0) { // AL - only apply filter if user entered valid filter value
        returnList = returnList.filter(workspace => workspace.seatCapacity >= capacityMin);
    }
    if (!isNaN(capacityMax) && capacityMax > 0) {
        returnList = returnList.filter(workspace => workspace.seatCapacity <= capacityMax);
    }


    //FILTER BY AMENITIES
    const pickedAmenities = $('input[name="optAmenities"]:checked').map(function() {
        return $(this).val(); // AL - just like workspace type above
    }).get();

    if (pickedAmenities.length > 0) { // AL - only filter if at least one amenity is selected
        returnList = returnList.filter(workspace =>
            pickedAmenities.every(amenity => workspace.amenities.includes(amenity)) //!discovery! for every [amenity filter], the workspace MUST have it in its workspace.amenities field  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
        );
    }

    
    // FILTER BY SEARCH TEXT
    const searchText = $("#searchtext").val();
    if (searchText.length != 0) { // AL - only apply filter if searchText is not blank
        const lowerSearchText = searchText.toLowerCase();   // convert to lowercase
        returnList = returnList.filter(workspace =>
            workspace.workspaceName.toLowerCase().includes(lowerSearchText) ||      //check in workspaceName
            workspace.city.toLowerCase().includes(lowerSearchText) ||               //check in city
            workspace.neighborhood.toLowerCase().includes(lowerSearchText)          //check in neighborhood
        );
    }


    //SAVE FILTERS TO SESSION STORAGE 
    const filters = {
        workspaceTypes: pickedTypes,
        minPrice: priceMin,
        maxPrice: priceMax,
        leaseTerm: pickedTerm,
        minCapacity: capacityMin,
        maxCapacity: capacityMax,
        amenities: pickedAmenities
    };
    sessionStorage.setItem('filters', JSON.stringify(filters));


    //FINALLY! What remains from all these filtering is returned
    return returnList;
}

function ClickApplyBtn() {
    const filteredWorkspaces = ApplyFilters(allWorkspaces);
    DisplayWorkspaces(filteredWorkspaces);

    $('html, body').animate({
        scrollTop: $('main').offset().top
    }, 500); //AL - scroll view to results; got this from Copilot AI
}

function ClickResetBtn() {
    $('input[type="checkbox"]').prop('checked', false); // Reset checkboxes
    $('input[type="radio"]').prop('checked', false); 
    $('input[type="number"]').val(''); // reset price range and seat capacity
    $("#searchtext").val(''); //reset even the search box
    sessionStorage.removeItem('filters'); //clear session
    DisplayWorkspaces(allWorkspaces);
}