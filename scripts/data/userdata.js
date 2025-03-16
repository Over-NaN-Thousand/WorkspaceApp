class User {
    constructor(id, firstName, lastName, email, password, owner, coworker) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.owner = owner; // "Yes" or "No"
        this.coworker = coworker; // "Yes" or "No"
    }
}

const users = [
    {
      id: 59715,
      firstName: "Alice",
      lastName: "Bjorkn",
      email: "Alice@coolemail.com",
      password: "lol123",
      owner: "Yes",
      coworker: "No"
    },
    {
      id: 20967,
      firstName: "Bob",
      lastName: "Johnson",
      email: "Bob@workmail.com",
      password: "im303",
      owner: "No",
      coworker: "Yes"
    },
    {  
      id: 3,
      firstName: "Charlie",
      lastName: "Smith",
      email: "Charlie@company.com",
      password: "foxxtrotunicornkilo",
      owner: "No",
      coworker: "Yes"
    },
    {
      id: 4,
      firstName: "Diana",
      lastName: "Evans",
      email: "Diana@bestmail.com",
      password: "diannaBananananna",
      owner: "Yes",
      coworker: "No"
    },
    {
      id: 72345,
      firstName: "Evelyn",
      lastName: "Clark",
      email: "Evelyn@business.com",
      password: "Ev3lynRocks!",
      Owner: "Yes",
      Coworker: "No"
    },
    {
      id: 89012,
      firstName: "Frank",
      lastName: "Harrison",
      email: "Frank@jobmail.com",
      password: "Frankie!2025",
      owner: "No",
      coworker: "Yes"
    },
    {
      id: 67890,
      firstName: "George",
      lastName: "Andrews",
      email: "George@workmail.com",
      password: "GeorgeyBoy2024",
      owner: "Yes",
      coworker: "No"
    },
    {
      id: 45678,
      firstName: "Hannah",
      lastName: "Miller",
      email: "Hannah@company.com",
      password: "HannahBear123",
      owner: "No",
      coworker: "Yes"
    },
    {
      id: 34567,
      firstName: "Ian",
      lastName: "Dawson",
      email: "Ian@jobmail.com",
      password: "Ian4TheWin!",
      owner: "Yes",
      coworker: "No"
    },
    {
      id: 12345,
      firstName: "Julia",
      lastName: "Thompson",
      email: "Julia@company.com",
      password: "Jules123!",
      owner: "No",
      coworker: "Yes"
    }
  ];

  export {User, users};