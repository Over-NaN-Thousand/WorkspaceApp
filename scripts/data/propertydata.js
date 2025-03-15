class Property {
  constructor(propertyId, name, address1, address2, postalcode, city, province, country, neighbourhood, imgFileName, ownerId) {
      this.propertyId = propertyId;
      this.name = name;
      this.address1 = address1;
      this.address2 = address2;
      this.postalcode = postalcode;
      this.city = city;
      this.province = province;
      this.country = country;
      this.neighbourhood = neighbourhood;
      this.imgFileName = imgFileName;
      this.ownerId = ownerId;
  }
}

const properties = [
    {
      propertyId: 1,
      name: "Acme Corp",
      address1: "123 Main St",
      address2: "Suite 400",
      postalcode: "T3G 1A1",
      city: "Calgary",
      province: "AB",
      country: "Canada",
      neighbourhood: "Downtown",
      imgFileName: "Acmeimg.jpg",
      ownerId: 59715 // Alice
    },
    {
      propertyId: 2,
      name: "Bayview Properties",
      address1: "555 Bay St",
      address2: "Floor 8",
      postalcode: "M5J 2L3",
      city: "Toronto",
      province: "ON",
      country: "Canada",
      neighbourhood: "Financial District",
      imgFileName: "BayviewProperties.jpg",
      ownerId: 59715 // Alice
    },
    {
      propertyId: 3,
      name: "Rocky Mountain Ventures",
      address1: "321 Summit Way",
      address2: "Suite 450",
      postalcode: "T1W 1P5",
      city: "Banff",
      province: "AB",
      country: "Canada",
      neighbourhood: "Tunnel Mountain",
      imgFileName: "RockyMountainVentures.jpg",
      ownerId: 4 // Diana
    },
    {
      propertyId: 4,
      name: "Atlantic Enterprises",
      address1: "876 Ocean Rd",
      address2: "Unit 101",
      postalcode: "B3K 5T7",
      city: "Halifax",
      province: "NS",
      country: "Canada",
      neighbourhood: "North End",
      imgFileName: "AtlanticEnterprises.jpg",
      ownerId: 4 // Diana
    },
    {
      propertyId: 5,
      name: "Sunrise Developments",
      address1: "222 Sunrise Ave",
      address2: "Penthouse",
      postalcode: "H3Z 2Y7",
      city: "Montreal",
      province: "QC",
      country: "Canada",
      neighbourhood: "Westmount",
      imgFileName: "SunriseDevelopments.jpg",
      ownerId: 72345 // Evelyn
    },
    {
      propertyId: 6,
      name: "Maple Holdings",
      address1: "456 Oak Ave",
      address2: "Unit 12",
      postalcode: "V5K 0A1",
      city: "Vancouver",
      province: "BC",
      country: "Canada",
      neighbourhood: "Hastings-Sunrise",
      imgFileName: "MapleHoldings.jpg",
      ownerId: 72345 // Evelyn
    },
    {
      propertyId: 7,
      name: "Prairie Investments",
      address1: "789 Prairie Dr",
      address2: "Building 3",
      postalcode: "S7K 3J6",
      city: "Saskatoon",
      province: "SK",
      country: "Canada",
      neighbourhood: "River Heights",
      imgFileName: "PrairieInvestments.jpg",
      ownerId: 67890 // George
    },
    {
      propertyId: 8,
      name: "Northern Lights Realty",
      address1: "101 Polar Bear Ln",
      address2: "Suite 200",
      postalcode: "X0A 0H0",
      city: "Iqaluit",
      province: "NU",
      country: "Canada",
      neighbourhood: "Apex",
      imgFileName: "NorthernLightsRealty.jpg",
      ownerId: 67890 // George
    },
    {
      propertyId: 9,
      name: "Capital Hill Properties",
      address1: "111 Parliament St",
      address2: "Office 30",
      postalcode: "K1A 0A9",
      city: "Ottawa",
      province: "ON",
      country: "Canada",
      neighbourhood: "Centretown",
      imgFileName: "CapitalHillProperties.jpg",
      ownerId: 34567 // Ian
    },
    {
      propertyId: 10,
      name: "Forest View Holdings",
      address1: "890 Cedar Dr",
      address2: "Cabin 2",
      postalcode: "E2K 4J8",
      city: "Saint John",
      province: "NB",
      country: "Canada",
      neighbourhood: "Millidgeville",
      imgFileName: "ForestViewHoldings.jpg",
      ownerId: 34567 // Ian
    }
  ];

  export { Property, properties };  //export so we can import in another .js   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export