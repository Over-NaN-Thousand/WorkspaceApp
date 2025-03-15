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
      rating: [4, 5]
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
      rating: [4, 5, 1, 2, 5]
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
      rating: [] // No ratings yet
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
      rating: [3]
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
      rating: [4, 4, 5]
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
      rating: [] // No ratings yet
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
      rating: [3, 2, 4]
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
      rating: [4, 5, 5]
    }
  ];
  

  export default workspaces;