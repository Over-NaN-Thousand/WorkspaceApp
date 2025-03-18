class Workspace {
  constructor(workspaceID, workspaceName, imgFileName, workspaceType, leaseTerm, sqFt, seatCapacity, price, amenities, propertyId, ownerId, rating) {
    this.workspaceID = workspaceID;
    this.workspaceName = workspaceName;
    this.imgFileName = imgFileName;
    this.workspaceType = workspaceType;
    this.leaseTerm = leaseTerm;
    this.sqFt = sqFt;
    this.seatCapacity = seatCapacity;
    this.price = price;
    this.amenities = amenities; // Array of amenities
    this.propertyId = propertyId; // Reference to a Property
    this.ownerId = ownerId;
    this.rating = rating;
  }
}

const workspaces = [
  {
    workspaceID: 1,
    workspaceName: "Large Office #40",
    imgFileName: "LargeOffice40.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Daily",
    sqFt: 500,
    seatCapacity: 4,
    price: 150,
    amenities: [
      "Full Kitchen",
      "High-Speed Wi-Fi",
      "Coffee Maker",
      "Ergonomic Chairs"
    ],
    propertyId: 1,
    ownerId: 59715, // Alice
    rating: 4
  },
  {
    workspaceID: 2,
    workspaceName: "Sunny Main Floor, Office #12",
    imgFileName: "SunnyOffice12.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Weekly",
    sqFt: 250,
    seatCapacity: 2,
    price: 120,
    amenities: [
      "Whiteboards",
      "Coffee Maker",
      "Ergonomic Chairs"
    ],
    propertyId: 1,
    ownerId: 59715, // Alice
    rating: 3
  },
  {
    workspaceID: 3,
    workspaceName: "East Conservatory, Second floor",
    imgFileName: "EastConservatory.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Monthly",
    sqFt: 750,
    seatCapacity: 10,
    price: 200,
    amenities: [
      "Projector",
      "High-Speed Wi-Fi",
      "Whiteboards",
      "Conference Phones"
    ],
    propertyId: 2,
    ownerId: 59715, // Alice
    rating: 5
  },
  {
    workspaceID: 4,
    workspaceName: "Penthouse Lounge",
    imgFileName: "PenthouseLounge.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Weekly",
    sqFt: 1200,
    seatCapacity: 25,
    price: 300,
    amenities: [
      "Projector",
      "Conference Phones",
      "High-Speed Wi-Fi",
      "Lounge Areas"
    ],
    propertyId: 2,
    ownerId: 59715, // Alice
    rating: 4
  },
  {
    workspaceID: 5,
    workspaceName: "Cubicle #145",
    imgFileName: "Cubicle145.jpg",
    workspaceType: "Desk",
    leaseTerm: "Hourly",
    sqFt: 50,
    seatCapacity: 1,
    price: 15,
    amenities: [
      "High-Speed Wi-Fi",
      "Ergonomic Chairs"
    ],
    propertyId: 3,
    ownerId: 4, // Diana
    rating: 3
  },
  {
    workspaceID: 6,
    workspaceName: "North Window Desk, #6",
    imgFileName: "NorthWindowDesk.jpg",
    workspaceType: "Desk",
    leaseTerm: "Hourly",
    sqFt: 60,
    seatCapacity: 1,
    price: 10,
    amenities: [
      "High-Speed Wi-Fi",
      "Coffee Maker"
    ],
    propertyId: 3,
    ownerId: 4, // Diana
    rating: 4
  },
  {
    workspaceID: 7,
    workspaceName: "Sunny Office #3",
    imgFileName: "SunnyOffice3.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Daily",
    sqFt: 300,
    seatCapacity: 2,
    price: 130,
    amenities: [
      "Copy/Print Equipment",
      "Ergonomic Chairs"
    ],
    propertyId: 4,
    ownerId: 4, // Diana
    rating: 5
  },
  {
    workspaceID: 8,
    workspaceName: "Private Office #15",
    imgFileName: "PrivateOffice15.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Daily",
    sqFt: 180,
    seatCapacity: 1,
    price: 100,
    amenities: [
      "High-Speed Wi-Fi",
      "Ergonomic Chairs",
      "Secure Storage/Lockers"
    ],
    propertyId: 4,
    ownerId: 4, // Diana
    rating: 4
  },
  {
    workspaceID: 9,
    workspaceName: "Open-concept Desk #10",
    imgFileName: "OpenConceptDesk10.jpg",
    workspaceType: "Desk",
    leaseTerm: "Hourly",
    sqFt: 50,
    seatCapacity: 1,
    price: 12,
    amenities: [
      "High-Speed Wi-Fi"
    ],
    propertyId: 5,
    ownerId: 72345, // Evelyn
    rating: 3
  },
  {
    workspaceID: 10,
    workspaceName: "Conference Room #5",
    imgFileName: "ConferenceRoom5.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Daily",
    sqFt: 500,
    seatCapacity: 10,
    price: 250,
    amenities: [
      "Projector",
      "Conference Phones",
      "Whiteboards"
    ],
    propertyId: 5,
    ownerId: 72345, // Evelyn
    rating: 4
  },
  {
    workspaceID: 11,
    workspaceName: "Penthouse View Office #8",
    imgFileName: "PenthouseViewOffice8.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Daily",
    sqFt: 300,
    seatCapacity: 2,
    price: 140,
    amenities: [
      "High-Speed Wi-Fi",
      "Coffee Maker"
    ],
    propertyId: 6,
    ownerId: 72345, // Evelyn
    rating: 4
  },
  {
    workspaceID: 12,
    workspaceName: "Large Office #2",
    imgFileName: "LargeOffice2.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Daily",
    sqFt: 600,
    seatCapacity: 4,
    price: 160,
    amenities: [
      "Full Kitchen",
      "High-Speed Wi-Fi"
    ],
    propertyId: 6,
    ownerId: 72345, // Evelyn
    rating: 5
  },
  {
    workspaceID: 13,
    workspaceName: "Shared Desk #7",
    imgFileName: "SharedDesk7.jpg",
    workspaceType: "Desk",
    leaseTerm: "Monthly",
    sqFt: 40,
    seatCapacity: 1,
    price: 12,
    amenities: [
      "High-Speed Wi-Fi"
    ],
    propertyId: 7,
    ownerId: 67890, // George
    rating: 3
  },
  {
    workspaceID: 14,
    workspaceName: "Meeting Room #15",
    imgFileName: "MeetingRoom15.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Quarterly",
    sqFt: 400,
    seatCapacity: 5,
    price: 175,
    amenities: [
      "Conference Phones",
      "Whiteboards",
      "High-Speed Wi-Fi"
    ],
    propertyId: 7,
    ownerId: 67890, // George
    rating: 4
  },
  {
    workspaceID: 15,
    workspaceName: "Ocean View Office #12",
    imgFileName: "OceanViewOffice12.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Daily",
    sqFt: 350,
    seatCapacity: 2,
    price: 180,
    amenities: [
      "High-Speed Wi-Fi",
      "Ergonomic Chairs"
    ],
    propertyId: 8,
    ownerId: 67890, // George
    rating: 5
  },
  {
    workspaceID: 16,
    workspaceName: "Seaside Meeting Room #10",
    imgFileName: "SeasideMeetingRoom10.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Daily",
    sqFt: 800,
    seatCapacity: 10,
    price: 230,
    amenities: [
      "Projector",
      "Conference Phones"
    ],
    propertyId: 8,
    ownerId: 67890, // George
    rating: 4
  },
  {
    workspaceID: 17,
    workspaceName: "Desks #20-22",
    imgFileName: "Desks2022.jpg",
    workspaceType: "Desk",
    leaseTerm: "Hourly",
    sqFt: 50,
    seatCapacity: 1,
    price: 14,
    amenities: [
      "High-Speed Wi-Fi"
    ],
    propertyId: 9,
    ownerId: 34567, // Ian
    rating: 3
  },
  {
    workspaceID: 18,
    workspaceName: "Creative Office #8",
    imgFileName: "CreativeOffice8.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Monthly",
    sqFt: 280,
    seatCapacity: 2,
    price: 150,
    amenities: [
      "Coffee Maker",
      "High-Speed Wi-Fi"
    ],
    propertyId: 9,
    ownerId: 34567, // Ian
    rating: 4
  },
  {
    workspaceID: 19,
    workspaceName: "Team Workstation #6",
    imgFileName: "TeamWorkstation6.jpg",
    workspaceType: "Team Desk",
    leaseTerm: "Daily",
    sqFt: 500,
    seatCapacity: 4,
    price: 180,
    amenities: [
      "High-Speed Wi-Fi",
      "Whiteboards"
    ],
    propertyId: 5,
    ownerId: 34567, // Ian
    rating: 5
  },
  {
    workspaceID: 20,
    workspaceName: "Studio Space #11",
    imgFileName: "StudioSpace11.jpg",
    workspaceType: "Creative Studio",
    leaseTerm: "Daily",
    sqFt: 450,
    seatCapacity: 3,
    price: 210,
    amenities: [
      "Projector",
      "High-Speed Wi-Fi",
      "Coffee Maker"
    ],
    propertyId: 10,
    ownerId: 34567, // Ian
    rating: 4
  },
  {
    workspaceID: 21,
    workspaceName: "Skyline Boardroom",
    imgFileName: "SkylineBoardroom.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Monthly",
    sqFt: 1000,
    seatCapacity: 20,
    price: 400,
    amenities: ["Projector", "Whiteboards", "High-Speed Wi-Fi", "Ergonomic Chairs"],
    propertyId: 11,
    ownerId: 59715,
    rating: 5
  },
  {
    workspaceID: 22,
    workspaceName: "Private Executive Suite",
    imgFileName: "ExecutiveSuite.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Weekly",
    sqFt: 500,
    seatCapacity: 4,
    price: 300,
    amenities: ["High-Speed Wi-Fi", "Coffee Maker", "Secure Storage/Lockers"],
    propertyId: 11,
    ownerId: 59715,
    rating: 4
  },
  {
    workspaceID: 23,
    workspaceName: "Open Collaboration Space",
    imgFileName: "CollaborationSpace.jpg",
    workspaceType: "Shared Desk",
    leaseTerm: "Daily",
    sqFt: 200,
    seatCapacity: 6,
    price: 150,
    amenities: ["High-Speed Wi-Fi", "Standing Desks", "Copy/Print Equipment"],
    propertyId: 11,
    ownerId: 59715,
    rating: 3
  },

  // Property 12 - 3個 Workspaces
  {
    workspaceID: 24,
    workspaceName: "Sunset Private Office",
    imgFileName: "SunsetPrivateOffice.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Daily",
    sqFt: 300,
    seatCapacity: 2,
    price: 150,
    amenities: ["High-Speed Wi-Fi", "Secure Storage/Lockers", "Coffee Maker"],
    propertyId: 12,
    ownerId: 59715,
    rating: 4
  },
  {
    workspaceID: 25,
    workspaceName: "Boardroom #12",
    imgFileName: "Boardroom12.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Weekly",
    sqFt: 800,
    seatCapacity: 12,
    price: 350,
    amenities: ["Projector", "Conference Phones", "Whiteboards"],
    propertyId: 12,
    ownerId: 59715,
    rating: 5
  },
  {
    workspaceID: 26,
    workspaceName: "Solo Workstation",
    imgFileName: "SoloWorkstation.jpg",
    workspaceType: "Desk",
    leaseTerm: "Hourly",
    sqFt: 50,
    seatCapacity: 1,
    price: 20,
    amenities: ["High-Speed Wi-Fi", "Ergonomic Chairs"],
    propertyId: 12,
    ownerId: 59715,
    rating: 3
  },

  // Property 13 - 3個 Workspaces
  {
    workspaceID: 27,
    workspaceName: "Northern Lights Desk",
    imgFileName: "NorthernLightsDesk.jpg",
    workspaceType: "Desk",
    leaseTerm: "Hourly",
    sqFt: 50,
    seatCapacity: 1,
    price: 20,
    amenities: ["High-Speed Wi-Fi", "Ergonomic Chairs"],
    propertyId: 13,
    ownerId: 59715,
    rating: 3
  },
  {
    workspaceID: 28,
    workspaceName: "Maple Conference Room",
    imgFileName: "MapleConferenceRoom.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Weekly",
    sqFt: 750,
    seatCapacity: 15,
    price: 250,
    amenities: ["Projector", "Whiteboards", "Conference Phones", "High-Speed Wi-Fi"],
    propertyId: 13,
    ownerId: 59715,
    rating: 5
  },
  {
    workspaceID: 29,
    workspaceName: "Team Collaboration Hub",
    imgFileName: "CollaborationHub.jpg",
    workspaceType: "Shared Desk",
    leaseTerm: "Monthly",
    sqFt: 400,
    seatCapacity: 8,
    price: 180,
    amenities: ["High-Speed Wi-Fi", "Standing Desks", "Copy/Print Equipment"],
    propertyId: 13,
    ownerId: 59715,
    rating: 4
  },

  // Property 14 - 3個 Workspaces
  {
    workspaceID: 30,
    workspaceName: "Summit Open Workspace",
    imgFileName: "SummitOpenWorkspace.jpg",
    workspaceType: "Shared Desk",
    leaseTerm: "Monthly",
    sqFt: 500,
    seatCapacity: 5,
    price: 180,
    amenities: ["High-Speed Wi-Fi", "Standing Desks", "Copy/Print Equipment"],
    propertyId: 14,
    ownerId: 59715,
    rating: 4
  },
  {
    workspaceID: 31,
    workspaceName: "Glass-Walled Meeting Room",
    imgFileName: "GlassMeetingRoom.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Weekly",
    sqFt: 900,
    seatCapacity: 20,
    price: 320,
    amenities: ["Projector", "Conference Phones", "Whiteboards"],
    propertyId: 14,
    ownerId: 59715,
    rating: 5
  },
  {
    workspaceID: 32,
    workspaceName: "Zen Quiet Office",
    imgFileName: "ZenQuietOffice.jpg",
    workspaceType: "Private Office",
    leaseTerm: "Daily",
    sqFt: 350,
    seatCapacity: 3,
    price: 170,
    amenities: ["High-Speed Wi-Fi", "Coffee Maker", "Ergonomic Chairs"],
    propertyId: 14,
    ownerId: 59715,
    rating: 4
  },

  // Property 15 - 3個 Workspaces
  {
    workspaceID: 33,
    workspaceName: "Innovators' Lab",
    imgFileName: "InnovatorsLab.jpg",
    workspaceType: "Shared Desk",
    leaseTerm: "Monthly",
    sqFt: 450,
    seatCapacity: 6,
    price: 190,
    amenities: ["High-Speed Wi-Fi", "Standing Desks", "Copy/Print Equipment"],
    propertyId: 15,
    ownerId: 59715,
    rating: 4
  },
  {
    workspaceID: 34,
    workspaceName: "Executive Conference Suite",
    imgFileName: "ExecutiveConference.jpg",
    workspaceType: "Meeting Room",
    leaseTerm: "Monthly",
    sqFt: 1100,
    seatCapacity: 25,
    price: 500,
    amenities: ["Projector", "Conference Phones", "High-Speed Wi-Fi", "Whiteboards"],
    propertyId: 15,
    ownerId: 59715,
    rating: 5
  },
  {
    workspaceID: 35,
    workspaceName: "Focus Booth",
    imgFileName: "FocusBooth.jpg",
    workspaceType: "Desk",
    leaseTerm: "Hourly",
    sqFt: 40,
    seatCapacity: 1,
    price: 15,
    amenities: ["High-Speed Wi-Fi", "Ergonomic Chairs"],
    propertyId: 15,
    ownerId: 59715,
    rating: 3
  }

];


export { Workspace, workspaces };