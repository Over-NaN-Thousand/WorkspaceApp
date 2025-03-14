const workspaces = [
    {
      workspaceID: 1,
      workspaceName: "Large Office #40",
      imgFileName: "LargeOffice40.jpg",
      workspaceType: "Private Office",
      leaseTerm: "daily",
      sqFt: 500,
      seatCapacity: 4,
      price: 150,
      amenities: [
        { "Full Kitchen": true },
        { "High-Speed Wi-Fi": true },
        { "Coffee Maker": true },
        { "Ergonomic Chairs": true }
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
      leaseTerm: "daily",
      sqFt: 250,
      seatCapacity: 2,
      price: 120,
      amenities: [
        { "Whiteboards": true },
        { "Coffee Maker": true },
        { "Ergonomic Chairs": true }
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
      leaseTerm: "daily",
      sqFt: 750,
      seatCapacity: 10,
      price: 200,
      amenities: [
        { "Projector": true },
        { "High-Speed Wi-Fi": true },
        { "Whiteboards": true },
        { "Conference Phones": true }
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
      leaseTerm: "daily",
      sqFt: 1200,
      seatCapacity: 25,
      price: 300,
      amenities: [
        { "Projector": true },
        { "Conference Phones": true },
        { "High-Speed Wi-Fi": true },
        { "Lounge Areas": true }
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
      leaseTerm: "hourly",
      sqFt: 50,
      seatCapacity: 1,
      price: 15,
      amenities: [
        { "High-Speed Wi-Fi": true },
        { "Ergonomic Chairs": true }
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
      leaseTerm: "hourly",
      sqFt: 60,
      seatCapacity: 1,
      price: 10,
      amenities: [
        { "High-Speed Wi-Fi": true },
        { "Coffee Maker": true }
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
      leaseTerm: "daily",
      sqFt: 300,
      seatCapacity: 2,
      price: 130,
      amenities: [
        { "Copy/Print Equipment": true },
        { "Ergonomic Chairs": true }
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
      leaseTerm: "daily",
      sqFt: 180,
      seatCapacity: 1,
      price: 100,
      amenities: [
        { "High-Speed Wi-Fi": true },
        { "Ergonomic Chairs": true },
        { "Secure Storage/Lockers": true }
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
      leaseTerm: "hourly",
      sqFt: 50,
      seatCapacity: 1,
      price: 12,
      amenities: [
        { "High-Speed Wi-Fi": true }
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
      leaseTerm: "daily",
      sqFt: 500,
      seatCapacity: 10,
      price: 250,
      amenities: [
        { "Projector": true },
        { "Conference Phones": true },
        { "Whiteboards": true }
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
      leaseTerm: "daily",
      sqFt: 300,
      seatCapacity: 2,
      price: 140,
      amenities: [
        { "High-Speed Wi-Fi": true },
        { "Coffee Maker": true }
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
      leaseTerm: "daily",
      sqFt: 600,
      seatCapacity: 4,
      price: 160,
      amenities: [
        { "Full Kitchen": true },
        { "High-Speed Wi-Fi": true }
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
      leaseTerm: "daily",
      sqFt: 40,
      seatCapacity: 1,
      price: 12,
      amenities: [
        { "High-Speed Wi-Fi": true }
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
      leaseTerm: "daily",
      sqFt: 400,
      seatCapacity: 5,
      price: 175,
      amenities: [
        { "Conference Phones": true },
        { "Whiteboards": true },
        { "High-Speed Wi-Fi": true }
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
      leaseTerm: "daily",
      sqFt: 350,
      seatCapacity: 2,
      price: 180,
      amenities: [
        { "High-Speed Wi-Fi": true },
        { "Ergonomic Chairs": true }
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
      leaseTerm: "daily",
      sqFt: 800,
      seatCapacity: 10,
      price: 230,
      amenities: [
        { "Projector": true },
        { "Conference Phones": true }
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
      leaseTerm: "hourly",
      sqFt: 50,
      seatCapacity: 1,
      price: 14,
      amenities: [
        { "High-Speed Wi-Fi": true }
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
      leaseTerm: "daily",
      sqFt: 280,
      seatCapacity: 2,
      price: 150,
      amenities: [
        { "Coffee Maker": true },
        { "High-Speed Wi-Fi": true }
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
      leaseTerm: "daily",
      sqFt: 500,
      seatCapacity: 4,
      price: 180,
      amenities: [
        { "High-Speed Wi-Fi": true },
        { "Whiteboards": true }
      ],
      propertyId: 10,
      ownerId: 34567, // Ian
      rating: 5
    },
    {
      workspaceID: 20,
      workspaceName: "Studio Space #11",
      imgFileName: "StudioSpace11.jpg",
      workspaceType: "Creative Studio",
      leaseTerm: "daily",
      sqFt: 450,
      seatCapacity: 3,
      price: 210,
      amenities: [
        { "Projector": true },
        { "High-Speed Wi-Fi": true },
        { "Coffee Maker": true }
      ],
      propertyId: 10,
      ownerId: 34567, // Ian
      rating: 4
    }
  ];


  export default workspaces;