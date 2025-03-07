/** 
* @name: Final Project 
* @Course Code: SODV1201 
* @class: Software Development Diploma program
* @author: Group 8 - Andrei Laqui, Heather-may Howse, Jordan Langley, Salman Aravai, Victor Leung 
*/ 

class City {
    constructor(Name, workspaceCount, imgFileName){
        this.name = Name;
        this.workspaceCount = workspaceCount;
        this.imgFileName = imgFileName;
    }
}

class Workspace {
    constructor(workspaceID, workspaceName, workspaceType, leaseTerm, seatCapacity, price, smokingAllowed, imgFileName) {
        this.workspaceID = workspaceID;
        this.workspaceName = workspaceName;
        this.workspaceType = workspaceType;
        this.leaseTerm = leaseTerm;
        this.seatCapacity = seatCapacity;
        this.price = price;
        this.smokingAllowed = smokingAllowed;
        this.imgFileName = imgFileName
    }
}

//AL - create a lists for the articles
const topCities = [];
const topWorkspaceList = []; 
const newestWorkspaceList = []; 

topCities.push(
    new City("Calgary", 23, "Calgary-Andrei-Laqui.jpg"),
    new City("Edmonton", 18, "pexels-kamille-mendoza-2210918-6008580.jpg"),
    new City("San Francisco", 8, "pexels-pixabay-315458.jpg"),

);

topWorkspaceList.push(
    new Workspace(1001,
        "Conference Rm1",
        "Conference Room",
        "3 months",
        8,
        2500.0,
        false,
        "pexels-pixabay-260689.jpg"),
    new Workspace(1099,
        "Blue Office",
        "Private Office",
        "1 month",
        1,
        450.0,
        false,
        "pexels-kamo11235-667838.jpg"),
    new Workspace(1001,
        "Simple Office",
        "Private Office",
        "1 months",
        1,
        300.0,
        false,
        "pexels-fotios-photos-1957478.jpg")
);

newestWorkspaceList.push(
    new Workspace(1001,
        "Cozy Office",
        "Private Office",
        "1 week",
        1,
        100.0,
        false,
        "pexels-karlsolano-2883049.jpg"),
    new Workspace(1099,
        "Blue Office",
        "Private Office",
        "1 month",
        1,
        450.0,
        false,
        "pexels-kamo11235-667838.jpg"),
    new Workspace(1001,
        "Desk 1",
        "Desk",
        "1 day",
        1,
        20.0,
        false,
        "pexels-pixabay-273671v2.jpg")
);






/*AL - CODE ABOVE IS TO CREATE OBJECTS AND LISTS AND WILL BE REPLACED*/


$(document).ready(function() {

    appendCitiesToArticle(topCities, "top-cities");
    appendWSToArticle(topWorkspaceList, "top-workspaces");
    appendWSToArticle(newestWorkspaceList, "newest-workspaces");

});

function appendCitiesToArticle(myListOfCities, myArticleID){
    myListOfCities.forEach( (city) => {
        //AL - dynamically create the html from city data
        const dynamicHTML = `
          <div class="item">
            <a name="itemLink" href="javascript:void(0);" val="${city.name}">
              <img src="resources/images/${city.imgFileName}" alt="${city.name}" title="${city.name}\n There are currently ${city.workspaceCount}\n workspaces in the city.">
              <h3>${city.name}</h3>
            </a>
          </div>\n`;
        
        //AL - append it to article/container
        $(`#${myArticleID}`).find('.items-container').append(dynamicHTML);
    });
}

function appendWSToArticle(myListOfWorkspaces, myArticleID){
    myListOfWorkspaces.forEach( (workspace) => {
        //AL - dynamically create the html from workspace data
        const dynamicHTML = `
          <div class="item">
            <a name="itemLink" href="javascript:void(0);" val="${workspace.workspaceID}">
              <img src="resources/images/${workspace.imgFileName}" alt="${workspace.workspaceName}" title="${workspace.workspaceName}\nType = ${workspace.workspaceType}\nLease Term = ${workspace.leaseTerm}\nCapacity = ${workspace.seatCapacity}\nPrice = ${workspace.price}\nSmoking is Allowed = ${workspace.smokingAllowed?'Yes':'No'} ">
              <h3>${workspace.workspaceName}</h3>
            </a>
          </div>\n`;
        
        //AL - append it to article/container
        $(`#${myArticleID}`).find('.items-container').append(dynamicHTML);
    });
}