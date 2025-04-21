// import { Property, properties } from './data/propertydata.js';
// import { Workspace, workspaces } from './data/workspacedata.js';

// const allWorkspaces = workspaces.map(workspace => {                                     // AL: go through every workspace object in workspaces list...
//     const property = properties.find(prop => prop.propertyId === workspace.propertyId); //...for each workspace, look for their matching property using propertyID
//     return {
//         ...workspace,               //combine fields that workspace already has ..
//         propertyName: property.name, // .. with the fields of the property its located in
//         address1: property.address1,
//         address2: property.address2,
//         neighborhood: property.neighbourhood,
//         city: property.city,
//         province: property.province,
//         country: property.country,
//         postalcode: property.postalcode,
//         propertyImgFileName: property.imgFileName,
//         propertyOwnerId: property.ownerId
//     };
// });





const fetchAllWorkspaces = async ()=> {
    try {
  
        //public/workspacedetails is the endpoint to get all workspaces without a token
        const response = await fetch("http://localhost:3000/publicWorkspaces");

        
        if (!response.ok) {
            throw new Error(`Failed to fetch workspaces: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Update the global allWorkspaces variable
        return data.workspaces.map(workspace => ({
            ...workspace,  // Keep all workspace fields
            workspaceName: workspace.name,
            workspaceType: workspace.workspaceType,
            address1: workspace.address1,
            address2: workspace.address2,
            neighborhood: workspace.neighborhood,
            city: workspace.city,
            province: workspace.province,
            country: workspace.country,
            postalcode: workspace.postalcode,
            price: workspace.price,
            amenities: workspace.amenities,
            sqft: workspace.sqft,
            leaseTerm: workspace.leaseTerm,
            seatCapacity: workspace.seatCapacity,
            propertyId: workspace.PropertyId,
            propertyName: workspace.propertyName,
            ownerEmail: workspace.ownerEmail,
            workspaceID: workspace.workspaceID
        }));

    } catch (error) {
        console.error("Error fetching workspaces:", error);
        return [];
    } 
}


//const allWorkspaces = await fetchAllWorkspaces();
//console.log(allWorkspaces); // AL - check if all workspaces are loaded correctly

let allWorkspaces = [];

$(document).ready(function() {
    (async function () {

    allWorkspaces = await fetchAllWorkspaces(); // Make sure data is ready
    console.log(allWorkspaces); // Confirm it’s loaded

    //Create the filters in the page
    const optWStypes = [...new Set(allWorkspaces.map(workspace => workspace.workspaceType))]; //dynamic by using map // new Set() goes through the list and only adds unique values, but the result is not yet an array, that's what you need the dots before it ...new Set() to make it an array
    const optTerm = ["Hourly", "Daily", "Weekly", "Monthly", "Quarterly"];
    const optAmenities = ["Full Kitchen","Microwave","Coffee Maker","Copy/Print Equipment","Projector","High-Speed Wi-Fi","Whiteboards","Conference Phones","Adjustable Desks","Ergonomic Chairs","Secure Storage/Lockers","Mail and Package Handling","Outdoor Seating/Patio","Receptionist/Front Desk Service","Soundproofing","Lounge Areas","Casual Seating","Tech Support","Security Cameras","Snack Bar","Vending Machines","Fitness Room","Gym Access","Natural Lighting"];

    addOptionsToSection(optWStypes,"types", "optWStypes", "checkbox");
    addOptionsToSection(optTerm,"term", "optTerm", "radio");
    addOptionsToSection(optAmenities,"amenities", "optAmenities", "checkbox");

    //load saved filters, I decided to use session storage instead of local
    loadFiltersFromSession();

    //receive the url querystring parameter from index.html or search.html
    const searchText = receiveSearchString();
    if (searchText !== "")
        $("#searchtext").val(searchText);
    
    //add event handlers, onclick="ClickResetBtn()" stopped working because this js is now type=module
    $('#btnApply').on('click',  ClickApplyBtn);
    $('#btnReset').on('click',  ClickResetBtn);
    $('#selSort').on('change',  ClickApplyBtn);

    $("form").on("submit", function(event) {
        event.preventDefault(); // stop submitting, we'll do that later
        ClickApplyBtn(); //filter and sort saved
        this.submit(); //now we can submit
    });

    //run Apply to initialize list
    ClickApplyBtn();
})();
});



   





function addOptionsToSection(options, targetclass, name, type) {
    options.forEach(option => {
          $(`.${targetclass}`).find('details').append(`<label><input type="${type}" name="${name}" value="${option}"> ${option}</label>`);
    });
}

function loadFiltersFromSession() {
    const filters = JSON.parse(sessionStorage.getItem('filters'));

    if (filters) {
        //null/undefined protection for arrays
        filters.workspaceTypes = filters.workspaceTypes || [];
        filters.amenities = filters.amenities || [];


        $('input[name="optWStypes"]').each(function () {
            $(this).prop('checked', filters.workspaceTypes.includes($(this).val())); //mark optWStypes checked if the opt's value is in the list in the filter
        });
        $('input[name="optAmenities"]').each(function () {
            $(this).prop('checked', filters.amenities.includes($(this).val())); //same as above
        });
        $('input[name="optTerm"]').each(function () {
            $(this).prop('checked', $(this).val() === filters.leaseTerm); //mark option if its val is equal to what is saved in filter
        });
        $("#minPrice").val(filters.minPrice || ''); //write string stored in filters but if undefined use blank
        $("#maxPrice").val(filters.maxPrice || '');
        $("#minCapacity").val(filters.minCapacity || '');
        $("#maxCapacity").val(filters.maxCapacity || '');
         $("#selSort").val(filters.sortField || "workspaceName"); //load sort field

        // restores previous filters when the user returns to the page to see their last filtered results
        DisplayWorkspaces(allWorkspaces); //AL - this will show the filtered workspaces when the page is loaded
    }
}

function receiveSearchString(){
    const currUrl = new URL(window.location.href);
    const params = new URLSearchParams(currUrl.search);
    const searchText = params.get('searchtext');
    return searchText;
}

function DisplayWorkspaces(workspaceList){
    $("#workspaces-container").empty();

    
    
    workspaceList.forEach(workspace => {
        console.log(workspace.workspaceType)
        let defaultPic = setDefaultPic(workspace.workspaceType) || "desk.png";

        

        const section = `
            <section class="workspace-item" >
                <div class="workspace-picture">
                    <img src="resources/images/${defaultPic}" alt="${workspace.workspaceName}" onerror="this.src='resources/images/${defaultPic}';">
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
                    <a href="pages/workspaceDetails.html?workspaceid=${workspace.workspaceID}" class="btnWSdetail">Details</a>
                </div>
            </section>`;
        $("#workspaces-container").append(section); // Append created section to the container
    });
    $("#display-count").text(`${workspaceList.length} records found.`);
}

function setDefaultPic(type) {
    let defaultPic;
    switch (type) {
        case "Meeting Room":
            defaultPic = "default conference room.png";
            break;
        case "Private Office":
            defaultPic = "default private office.png";
            break;
        case "Desk":
            defaultPic = "default desk.png";
            break;
        case "Team Desk":
            defaultPic = "default team desk.png";
            break; 
        case "Creative Studio":
            defaultPic = "default creative studio.png";
            break;
        default:
            defaultPic = "desk.png";
    }
    return defaultPic;
}

function ApplyFilters(workspaceList){
    let returnList = workspaceList; //AL - create a shallow copy, all filters shall be applied to this

    //FILTER BY WORKSPACE TYPE
    const pickedTypes = $('input[name="optWStypes"]:checked').map( function(){
        return $(this).val();   //AL -  get all inputs with name optWStypes using jQ, go through them one by one
    }).get();                   //!discovery! jQ object not automatically an array, must use get() to convert
    
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

    // SORTING
    const sortField = $("#selSort").val();
    returnList.sort((a, b) => {
        if (sortField === "price" || sortField === "seatCapacity") {
            // low to high for numeric
            return a[sortField] - b[sortField];
        } else {
            // alphabetic for string
            const fieldA = a[sortField].toString().toLowerCase();
            const fieldB = b[sortField].toString().toLowerCase();
            return fieldA.localeCompare(fieldB);
        }
    });

    //SAVE FILTERS TO SESSION STORAGE 
    const filters = {
        workspaceTypes: pickedTypes,
        minPrice: priceMin,
        maxPrice: priceMax,
        leaseTerm: pickedTerm,
        minCapacity: capacityMin,
        maxCapacity: capacityMax,
        amenities: pickedAmenities,
        sortField: sortField    //tuck sort field with filters instead of creating a new one
    };
    sessionStorage.setItem('filters', JSON.stringify(filters));

    // SAVE FILTERED WORKSPACE LIST TO SESSION STORAGE
    sessionStorage.setItem('workspaceList', JSON.stringify(returnList));

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
    $('input[type="checkbox"]').prop('checked', false); //type, amenities
    $('input[type="radio"]').prop('checked', false);//least tearm
    $('input[type="number"]').val('');              //price range, seat capacity
    $("#searchtext").val('');                       //search box
    sessionStorage.removeItem('filters');           //clear session
    DisplayWorkspaces(allWorkspaces);
}
