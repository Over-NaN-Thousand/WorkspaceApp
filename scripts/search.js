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

const resultWorkspace = [];
resultWorkspace.push(new Workspace(1, "Conference Room A", "Conference Room", "Daily", 20, 500, "conference1.jpg", "123 Main St", "Suite 101", "Downtown", "Calgary", "Alberta", "Canada", "T2P 0R3", 100, ["Projector", "Kitchen"]));
resultWorkspace.push(new Workspace(2, "Private Office Suite", "Private Office", "Monthly", 10, 1500, "private_office1.jpg", "456 Office Lane", "", "Business District", "Calgary", "Alberta", "Canada", "T3C 1X1", 75, ["Copy/Print Equipment", "Kitchen"]));
resultWorkspace.push(new Workspace(3, "Desk Space 1", "Desk", "Daily", 1, 50, "desk1.jpg", "789 CoWork St", "", "Midtown", "Calgary", "Alberta", "Canada", "T2E 5R1", 10, ["Covered Parking"]));
resultWorkspace.push(new Workspace(4, "Conference Room B", "Conference Room", "Weekly", 25, 1000, "conference2.jpg", "321 Office Tower", "Floor 3", "Downtown", "Calgary", "Alberta", "Canada", "T2P 0R4", 150, ["Projector", "Covered Parking"]));
resultWorkspace.push(new Workspace(5, "Private Office B", "Private Office", "Quarterly", 5, 2500, "private_office2.jpg", "654 Enterprise Blvd", "", "Financial District", "Calgary", "Alberta", "Canada", "T3C 1Y2", 90, ["Kitchen", "Copy/Print Equipment"]));
resultWorkspace.push(new Workspace(6, "Open Desk 2", "Desk", "Weekly", 1, 75, "desk2.jpg", "789 CoWork St", "", "Midtown", "Calgary", "Alberta", "Canada", "T2E 5R1", 10, ["Kitchen"]));
resultWorkspace.push(new Workspace(7, "Boardroom 1", "Conference Room", "Monthly", 15, 1200, "boardroom1.jpg", "123 Main St", "Suite 105", "Downtown", "Calgary", "Alberta", "Canada", "T2P 0R3", 120, ["Projector", "Covered Parking"]));
resultWorkspace.push(new Workspace(8, "Shared Office", "Private Office", "Daily", 3, 400, "shared_office.jpg", "987 Work Place", "Room 2B", "Suburbs", "Calgary", "Alberta", "Canada", "T1X 0L3", 50, ["Copy/Print Equipment"]));
resultWorkspace.push(new Workspace(9, "Desk Space 3", "Desk", "Monthly", 1, 200, "desk3.jpg", "852 Shared St", "", "Business District", "Calgary", "Alberta", "Canada", "T3C 1N9", 8, ["Kitchen"]));
resultWorkspace.push(new Workspace(10, "Executive Conference Room", "Conference Room", "Quarterly", 30, 3000, "executive_room.jpg", "321 Enterprise Plaza", "Penthouse", "Downtown", "Calgary", "Alberta", "Canada", "T2P 5G7", 180, ["Projector", "Kitchen", "Covered Parking"]));
resultWorkspace.push(new Workspace(11, "Team Workspace A", "Private Office", "Monthly", 8, 1600, "team_space1.jpg", "456 Office Lane", "Suite 202", "Business District", "Calgary", "Alberta", "Canada", "T3C 1X1", 80, ["Copy/Print Equipment"]));
resultWorkspace.push(new Workspace(12, "Solo Desk", "Desk", "Daily", 1, 30, "solo_desk.jpg", "654 Work Co.", "Floor 4", "Midtown", "Calgary", "Alberta", "Canada", "T2M 6R7", 5, ["Kitchen"]));
resultWorkspace.push(new Workspace(13, "Conference Room C", "Conference Room", "Daily", 12, 600, "conference3.jpg", "213 Tower Ave", "Level 2", "Uptown", "Calgary", "Alberta", "Canada", "T3F 2R5", 90, ["Projector"]));
resultWorkspace.push(new Workspace(14, "Solo Office Suite", "Private Office", "Weekly", 1, 800, "solo_office.jpg", "999 Prime St", "Room 1C", "Suburbs", "Calgary", "Alberta", "Canada", "T4X 0L2", 40, ["Covered Parking", "Kitchen"]));
resultWorkspace.push(new Workspace(15, "Hot Desk Zone", "Desk", "Weekly", 1, 120, "hot_desk.jpg", "555 Flex Tower", "", "Downtown", "Calgary", "Alberta", "Canada", "T1X 7P1", 8, ["Kitchen", "Covered Parking"]));
resultWorkspace.push(new Workspace(16, "Meeting Room Pro", "Conference Room", "Monthly", 20, 2400, "meeting_room.jpg", "111 Main Place", "Floor 8", "Midtown", "Calgary", "Alberta", "Canada", "T2Y 8P3", 130, ["Projector", "Kitchen"]));
resultWorkspace.push(new Workspace(17, "Startup Office", "Private Office", "Quarterly", 4, 2000, "startup_office.jpg", "777 Tech Hub", "", "Business District", "Calgary", "Alberta", "Canada", "T3C 7G5", 60, ["Copy/Print Equipment", "Kitchen"]));
resultWorkspace.push(new Workspace(18, "Flex Desk Area", "Desk", "Monthly", 1, 100, "flex_desk.jpg", "444 Open Hub", "Room 3F", "Uptown", "Calgary", "Alberta", "Canada", "T2T 5L1", 6, ["Kitchen", "Covered Parking"]));
resultWorkspace.push(new Workspace(19, "Premium Conference Suite", "Conference Room", "Daily", 25, 1500, "premium_suite.jpg", "654 Enterprise Blvd", "", "Financial District", "Calgary", "Alberta", "Canada", "T3C 1Y2", 200, ["Projector", "Copy/Print Equipment"]));
resultWorkspace.push(new Workspace(20, "Small Private Office", "Private Office", "Weekly", 2, 600, "small_office.jpg", "333 CoWork Place", "Unit 5D", "Suburbs", "Calgary", "Alberta", "Canada", "T1X 4P7", 30, ["Covered Parking"]));
resultWorkspace.push(new Workspace(21, "Downtown Meeting Hub", "Conference Room", "Daily", 18, 600, "meeting_hub.jpg", "789 Jasper Ave", "Suite 12", "Downtown", "Edmonton", "Alberta", "Canada", "T5J 4C2", 120, ["Projector", "Copy/Print Equipment"]));
resultWorkspace.push(new Workspace(22, "Northern Private Office", "Private Office", "Monthly", 6, 1400, "northern_office.jpg", "456 Edmonton Way", "Suite 201", "Old Strathcona", "Edmonton", "Alberta", "Canada", "T6E 2G8", 70, ["Covered Parking", "Kitchen"]));
resultWorkspace.push(new Workspace(23, "The Bay Conference Room", "Conference Room", "Weekly", 25, 1200, "bay_conference.jpg", "333 Market St", "Floor 8", "Financial District", "San Francisco", "California", "USA", "94105", 200, ["Projector", "Kitchen", "Covered Parking"]));
resultWorkspace.push(new Workspace(24, "Tech Hub Desk", "Desk", "Daily", 1, 50, "tech_hub_desk.jpg", "101 Silicon Alley", "Room 15", "SoMa", "San Francisco", "California", "USA", "94107", 10, ["Kitchen", "Copy/Print Equipment"]));



$(document).ready(function() {

    const optWStypes = ["Conference Room", "Private Office", "Desk"];
    const optTerm = ["Daily", "Weekly", "Monthly", "Quarterly"];
    const optAmenities = ["Covered Parking","Kitchen","Copy/Print Equipment","Projector"];

    addOptionsToSection(optWStypes,"types", "optWStypes", "checkbox");
    addOptionsToSection(optTerm,"term", "optTerm", "radio");
    addOptionsToSection(optAmenities,"amenities", "optAmenities", "checkbox");


//resources/images/office.png
    resultWorkspace.forEach(workspace => {
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
                     <p><strong>Location:</strong> ${workspace.address1}, ${workspace.city}, ${workspace.province}, ${workspace.country}</p>
                    <p><strong>Amenities:</strong> ${workspace.amenities.join(", ")}</p>
                </div>
            </section>
        `;
        // Append each section to the container
        $("#workspaces-container").append(section);
    });

   
});

function addOptionsToSection(options, targetclass, name, type) {
    options.forEach(option => {
          $(`.${targetclass}`).append(`<label><input type="${type}" name="${name}" value="${option}"> ${option}</label>`);
    });
}
