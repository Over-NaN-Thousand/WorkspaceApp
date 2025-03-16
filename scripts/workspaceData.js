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
    rating: [4, 5, 3, 4, 4, 5, 4, 3, 4]
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
    rating: [3, 4, 2, 3, 3]
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
    rating: [5, 4, 5, 4, 5, 5, 4]
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
    rating: [4, 3, 4, 5, 4, 4]
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
    rating: [3, 2, 3, 3, 3]
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
    rating: [4, 3, 4, 4]
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
    rating: [5, 5, 5, 4, 5]
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
    rating: [4, 4, 3, 4]
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
    rating: [3, 3, 3, 2, 3]
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
    rating: [4, 5, 4, 3, 4]
},
{
  workspaceID: 11,
  workspaceName: "Quiet Corner Desk #18",
  imgFileName: "QuietCornerDesk18.jpg",
  workspaceType: "Desk",
  leaseTerm: "hourly",
  sqFt: 40,
  seatCapacity: 1,
  price: 8,
  amenities: [
      { "High-Speed Wi-Fi": true }
  ],
  propertyId: 6,
  ownerId: 59715, // Alice
  rating: [4, 3, 4, 4, 3]
},
{
  workspaceID: 12,
  workspaceName: "Creative Pod #22",
  imgFileName: "CreativePod22.jpg",
  workspaceType: "Desk",
  leaseTerm: "hourly",
  sqFt: 45,
  seatCapacity: 1,
  price: 12,
  amenities: [
      { "High-Speed Wi-Fi": true },
      { "Ergonomic Chairs": true },
      { "Coffee Maker": true }
  ],
  propertyId: 6,
  ownerId: 59715, // Alice
  rating: [5, 4, 5, 4, 4]
},
{
  workspaceID: 13,
  workspaceName: "West Wing Office #6",
  imgFileName: "WestWingOffice6.jpg",
  workspaceType: "Private Office",
  leaseTerm: "daily",
  sqFt: 400,
  seatCapacity: 3,
  price: 180,
  amenities: [
      { "Projector": true },
      { "High-Speed Wi-Fi": true }
  ],
  propertyId: 7,
  ownerId: 4, // Diana
  rating: [3, 4, 3, 4, 4, 3]
},
{
  workspaceID: 14,
  workspaceName: "Glass View Lounge",
  imgFileName: "GlassViewLounge.jpg",
  workspaceType: "Meeting Room",
  leaseTerm: "daily",
  sqFt: 600,
  seatCapacity: 12,
  price: 220,
  amenities: [
      { "High-Speed Wi-Fi": true },
      { "Lounge Areas": true },
      { "Conference Phones": true }
  ],
  propertyId: 7,
  ownerId: 4, // Diana
  rating: [4, 4, 5, 4, 4, 4]
},
{
  workspaceID: 15,
  workspaceName: "Open Desk Cluster #5",
  imgFileName: "OpenDeskCluster5.jpg",
  workspaceType: "Desk",
  leaseTerm: "hourly",
  sqFt: 35,
  seatCapacity: 1,
  price: 10,
  amenities: [
      { "High-Speed Wi-Fi": true },
      { "Ergonomic Chairs": true }
  ],
  propertyId: 8,
  ownerId: 72345, // Evelyn
  rating: [3, 3, 3, 2, 4]
},
{
  workspaceID: 16,
  workspaceName: "Executive Suite #1",
  imgFileName: "ExecutiveSuite1.jpg",
  workspaceType: "Private Office",
  leaseTerm: "monthly",
  sqFt: 800,
  seatCapacity: 6,
  price: 1200,
  amenities: [
      { "Projector": true },
      { "High-Speed Wi-Fi": true },
      { "Conference Phones": true },
      { "Coffee Maker": true }
  ],
  propertyId: 8,
  ownerId: 72345, // Evelyn
  rating: [5, 5, 4, 5, 4, 5, 5, 4]
},
{
  workspaceID: 17,
  workspaceName: "Corner Office #10",
  imgFileName: "CornerOffice10.jpg",
  workspaceType: "Private Office",
  leaseTerm: "weekly",
  sqFt: 450,
  seatCapacity: 3,
  price: 600,
  amenities: [
      { "High-Speed Wi-Fi": true },
      { "Ergonomic Chairs": true }
  ],
  propertyId: 9,
  ownerId: 59715, // Alice
  rating: [4, 3, 4, 4, 4, 4]
},
{
  workspaceID: 18,
  workspaceName: "Shared Coworking Space #15",
  imgFileName: "CoworkingSpace15.jpg",
  workspaceType: "Desk",
  leaseTerm: "hourly",
  sqFt: 30,
  seatCapacity: 1,
  price: 7,
  amenities: [
      { "High-Speed Wi-Fi": true },
      { "Coffee Maker": true }
  ],
  propertyId: 9,
  ownerId: 72345, // Evelyn
  rating: [3, 2, 3, 3]
},
{
  workspaceID: 19,
  workspaceName: "High-Rise Penthouse #5",
  imgFileName: "HighRisePenthouse5.jpg",
  workspaceType: "Meeting Room",
  leaseTerm: "monthly",
  sqFt: 1000,
  seatCapacity: 20,
  price: 2500,
  amenities: [
      { "Projector": true },
      { "Conference Phones": true },
      { "Lounge Areas": true },
      { "High-Speed Wi-Fi": true }
  ],
  propertyId: 10,
  ownerId: 4, // Diana
  rating: [5, 5, 5, 4, 5, 5, 4]
},
{
  workspaceID: 20,
  workspaceName: "Urban Loft Office #7",
  imgFileName: "UrbanLoftOffice7.jpg",
  workspaceType: "Private Office",
  leaseTerm: "weekly",
  sqFt: 350,
  seatCapacity: 2,
  price: 500,
  amenities: [
      { "High-Speed Wi-Fi": true },
      { "Ergonomic Chairs": true },
      { "Coffee Maker": true }
  ],
  propertyId: 10,
  ownerId: 72345, // Evelyn
  rating: [4, 4, 4, 4, 3, 4]
}
];

export default workspaces;
